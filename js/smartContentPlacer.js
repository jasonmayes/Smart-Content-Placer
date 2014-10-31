/**
 * ContentPlacer v10.0 - A small class which allows you to arrange data of
 * different widths / heights such that white space is minimized.
 * Coded by Jason Mayes 2014. A present to all the developers out there.
 * www.jasonmayes.com
 * Please keep this disclaimer with my code if you use it. Thanks. :-)
 * Got feedback or questions, ask here:
 * https://plus.google.com/u/0/+JasonMayes/posts
 * Updates will be posted to this site:
 * http://www.jasonmayes.com/projects/contentPlacer/
 * Or see Github:
 * https://github.com/jasonmayes/Smart-Content-Placer
 * @constructor
 * @param {String|HTMLElement} target The DOM element ID/HTMLElement we wish to
 *     render content in to.
 * @param {Number} unitWidthHeight The width and height of the smallest element
 *     (a square). All
 *     other elements are whole number multiple of this number. For example if
 *     your smallest element was 100px by 100px, your other elements should be
 *     multiples of that eg 200px x 300px (2x3 units).
 * @param {Number} margin The margin each element will have.
 * @param {Array<ContentPlacerData>} dataArray An array of type
 *     <ContentPlacerData> containing content we wish to render.
 * @param {Number} renderDelay Optional fade in delay for each item in ms.
 */
var ContentPlacer = function(target, unitSize, margin, dataArray, renderDelay) {
  typeof target === 'string' ?
      this.target = document.getElementById(target) : this.target = target;
  this.unitSize = unitSize;
  this.margin = margin;
  this.data = dataArray;
  this.rowsTot = 1;
  this.initiated = false;
  this.largestElement = 1;

  // Variables to do with animation.
  this.renderDelay = renderDelay;
  this.itteration = 0;
  this.elemCache = [];

  // Figure out the minimum number of cols by respecting the width of
  // largest element.
  this.findLargestNode_();
  this.calculateColumns_();

  var handler = function() {
    if (this.data.length > 0) {
      var newCols = Math.max(Math.floor(this.target.offsetWidth / (this.unitSize +
          this.margin)), this.largestElement);
      if (newCols != this.columns) {
        this.rowsTot = 1;
        this.columns = newCols;
        this.render_();
      }
    }
  }
  var boundHandler = handler.bind(this);
  this.addEventHandler_(window, 'resize', boundHandler);
  this.render_();
};


/**
 * @private
 */
ContentPlacer.prototype.calculateColumns_ = function() {
  this.columns = Math.max(Math.floor(this.target.offsetWidth / (this.unitSize +
      this.margin)), this.largestElement);
}


/**
 * @private
 */
ContentPlacer.prototype.findLargestNode_ = function() {
  var i = this.data.length;
  while (i--) {
    if (this.data[i].width > this.largestElement) {
      this.largestElement = this.data[i].width;
    }
  }
}


/**
 * @private
 */
ContentPlacer.prototype.matrix_ = function(numrows, numcols, initial) {
  var arr = [];
  for (var y = 0; y < numrows; y++) {
    var columns = [];
    for (var x = 0; x < numcols; x++) {
      columns.push(initial);
    }
    arr.push(columns);
  }
  return arr;
};


/**
 * @private
 */
ContentPlacer.prototype.growMatrix_ = function(arr, numrows, initial) {
  for (var y = 0; y < numrows; y++) {
    var columns = [];
    for (var x = 0; x < this.columns; x++) {
      columns.push(initial);
    }
    arr.push(columns);
  }
  return arr;
};


/**
 * Attach desired event handler. Cross browser.
 */
ContentPlacer.prototype.addEventHandler_ = function(elem, eventType, handler) {
  if (elem.addEventListener) {
    elem.addEventListener (eventType, handler, false);
  }
  else if (elem.attachEvent) {
    elem.attachEvent ('on' + eventType, handler);
  }
};


/**
 * @private
 */
ContentPlacer.prototype.generatePosition_ = function(dataMatrix, unitWidth,
    unitHeight) {
  var top = 0;
  var left = 0;
  var x = 0;
  var y = 0;
  var cols = dataMatrix[x].length;
  var rows = dataMatrix.length;
  var foundSpot = false;

  function printArray(arr) {
    var str = '';
    var cols = arr[0].length;
    var rows = arr.length;
    var k = 0;
    while (k < rows) {
      var j = 0;
      while (j < cols) {
      str += arr[k][j];
        j++;
      }
      str += '\n';
      k++;
    }
    console.log(str);
  }

  if (unitWidth > this.largestElement) {
    this.largestElement = unitWidth;
  }

  while (y < rows) {
    x = 0;
    while (x < cols) {
      // Find an empty space.
      if (dataMatrix[y][x] === 0) {
        // Check that surrounding elements equal to size are also free.
        var allGood = true;
        // Lets check bounds first.
        if ((x + unitWidth - 1) >= cols) {
          allGood = false;
        }
        if ((y + unitHeight - 1) >= rows) {
          allGood = false;
        }
        // If all good so far, then check each space.
        if (allGood){
          var j = 0;
          while (j < unitWidth) {
            var k = 0;
            while (k < unitHeight) {
              if (dataMatrix[y + k][x + j] !== 0) {
                allGood = false;
                break;
              }
              k++;
            }
            if (!allGood){
              break;
            }
            j++;
          }
        }
        if (allGood) {
          foundSpot = true;
          left = (x * (this.unitSize + this.margin));
          top = (y * (this.unitSize + this.margin));
          if ((y + unitHeight) > this.rowsTot) {
            this.rowsTot = y + unitHeight;
          }
          // Now go and claim those spaces as taken.
          var j = 0;
          while (j < unitWidth) {
            var k = 0;
            while (k < unitHeight) {
              dataMatrix[y + k][x + j] = 1;
              k++;
            }
            j++;
          }
          // Debug: Show dataMatrix steps.
          // printArray(dataMatrix);
          break;
        }
      }
      x++;
    }
    if (foundSpot) {
      break;
    }
    y++;
  }
  if (foundSpot) {
    return {"top": top, "left": left};
  } else {
    // If we could not fit in to the current row count, then lets expand our
    // rows and try again.
    this.growMatrix_(dataMatrix, Math.ceil(dataMatrix.length / 2), 0);
    return this.generatePosition_(dataMatrix, unitWidth, unitHeight);
  }
};


/**
 * @private
 */
ContentPlacer.prototype.render_ = function() {
  var data = this.data;
  var dataMatrix = this.matrix_(this.rowsTot, this.columns, 0);
  var unitSize = this.unitSize;

  if (!this.initiated) {
    var frag = document.createDocumentFragment();

    function itterativeRender() {
      if (this.renderDelay !== undefined) {
        this.elemCache[this.itteration].setAttribute('class',
          'contentPlacerElement transition');
      } else {
        this.elemCache[this.itteration].setAttribute('class',
          'contentPlacerElement');
      }
      this.itteration++;
      if (this.itteration < this.elemCache.length) {
        setTimeout(itterativeRender.bind(this), this.renderDelay);
      }
    }

    var n = 0;
    while (n < data.length) {
      var pos = this.generatePosition_(dataMatrix, data[n].width,
          data[n].height);

      var div = document.createElement('div');
      div.className = 'contentPlacerElement';
      if (this.renderDelay !== undefined) {
        div.className += ' hidden transition';
      }
      div.style.width = ((data[n].width * unitSize) + ((data[n].width - 1) *
          this.margin)) + 'px';
      div.style.height = ((data[n].height * unitSize) + ((data[n].height - 1) *
          this.margin)) + 'px';
      div.style.top = pos.top + 'px';
      div.style.left = pos.left + 'px';
      div.innerHTML = data[n].content;
      frag.appendChild(div);
      n++;
    }

    var rHeight = ((this.rowsTot * unitSize) + ((this.rowsTot - 1) *
        this.margin));

    var container = document.createElement('div');
    container.className = 'contentPlacerContainer';
    container.style.height = rHeight + 'px';
    container.appendChild(frag);

    this.target.appendChild(container);

    this.target.style.height = rHeight + 'px';
    this.target.style.minWidth = ((unitSize + this.margin) *
        this.largestElement) + 'px';

    this.elemCache = document.getElementsByClassName('contentPlacerElement');

    // If render delay specified, fade in images each after that delay.
    if (this.renderDelay !== undefined) {
      this.itteration = 0;
      setTimeout(itterativeRender.bind(this), 5);
    }
    this.initiated = true;
  } else {
    var n = 0;
    while(n < data.length) {
      var pos = this.generatePosition_(dataMatrix, data[n].width,
          data[n].height);
      this.elemCache[n].style.top = pos.top + 'px';
      this.elemCache[n].style.left = pos.left + 'px';
      this.elemCache[n].style.width = ((data[n].width * unitSize) +
          ((data[n].width - 1) * this.margin)) + 'px';
      this.elemCache[n].style.height = ((data[n].height * unitSize) +
          ((data[n].height - 1) * this.margin)) + 'px';
      n++;
    }

    // Update height of containers.
    var rHeight = ((this.rowsTot * unitSize) + ((this.rowsTot - 1) *
        this.margin));
    this.target.style.height = rHeight + 'px';
    this.target.children.item(0).style.height = rHeight + 'px';
  }
};

// Public functions to programatically change things after initial instance has
// been created.

/**
 * Set a new margin size.
 */
ContentPlacer.prototype.setMargin = function(marginSizePx) {
  this.margin = marginSizePx;
  this.columns = Math.max(Math.floor(this.target.offsetWidth / (this.unitSize +
      this.margin)), this.largestElement);
  this.render_();
};


/**
 * Set a new default unit size.
 */
ContentPlacer.prototype.setUnitSize = function(size) {
  this.unitSize = size;
  this.columns = Math.max(Math.floor(this.target.offsetWidth / (this.unitSize +
      this.margin)), this.largestElement);
  this.render_();
};


/**
 * Set new data to use, overwrites existing.
 * @param {Array.<Object>} dataArray An array containing data we wish to use.
 */
ContentPlacer.prototype.setData = function(dataArr) {
  this.data = dataArr;
  this.findLargestNode_();
  this.calculateColumns_();
  this.target.innerHTML = '';
  this.initiated = false;
  this.render_();
};


/**
 * Add new data to use, appends to existing.
 * @param {Array.<Object>} dataArray An array containing data we wish to add.
 */
ContentPlacer.prototype.addData = function(dataArr) {
  this.data = this.data.concat(dataArr);
  this.findLargestNode_();
  this.calculateColumns_();
  this.target.innerHTML = '';
  this.initiated = false;
  this.render_();
};


/**
 * Set a new transition delay.
 */
ContentPlacer.prototype.setDelay = function(delayMs) {
  this.renderDelay = delayMs;
};
