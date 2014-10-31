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
var ContentPlacer=function(a,c,d,f,g){"string"===typeof a?this.target=document.getElementById(a):this.target=a;this.unitSize=c;this.margin=d;this.data=f;this.rowsTot=1;this.initiated=!1;this.largestElement=1;this.renderDelay=g;this.itteration=0;this.elemCache=[];this.findLargestNode_();this.calculateColumns_();a=function(){if(0<this.data.length){var a=Math.max(Math.floor(this.target.offsetWidth/(this.unitSize+this.margin)),this.largestElement);a!=this.columns&&(this.rowsTot=1,this.columns=a,this.render_())}}.bind(this);
this.addEventHandler_(window,"resize",a);this.render_()};ContentPlacer.prototype.calculateColumns_=function(){this.columns=Math.max(Math.floor(this.target.offsetWidth/(this.unitSize+this.margin)),this.largestElement)};ContentPlacer.prototype.findLargestNode_=function(){for(var a=this.data.length;a--;)this.data[a].width>this.largestElement&&(this.largestElement=this.data[a].width)};ContentPlacer.prototype.matrix_=function(a,c,d){for(var f=[],g=0;g<a;g++){for(var b=[],e=0;e<c;e++)b.push(d);f.push(b)}return f};
ContentPlacer.prototype.growMatrix_=function(a,c,d){for(var f=0;f<c;f++){for(var g=[],b=0;b<this.columns;b++)g.push(d);a.push(g)}return a};ContentPlacer.prototype.addEventHandler_=function(a,c,d){a.addEventListener?a.addEventListener(c,d,!1):a.attachEvent&&a.attachEvent("on"+c,d)};
ContentPlacer.prototype.generatePosition_=function(a,c,d){var f=0,g=0,b,e=0,h=a[0].length,p=a.length,n=!1;c>this.largestElement&&(this.largestElement=c);for(;e<p;){for(b=0;b<h;){if(0===a[e][b]){var m=!0;b+c-1>=h&&(m=!1);e+d-1>=p&&(m=!1);if(m)for(var k=0;k<c;){for(var l=0;l<d;){if(0!==a[e+l][b+k]){m=!1;break}l++}if(!m)break;k++}if(m){n=!0;g=b*(this.unitSize+this.margin);f=e*(this.unitSize+this.margin);e+d>this.rowsTot&&(this.rowsTot=e+d);for(k=0;k<c;){for(l=0;l<d;)a[e+l][b+k]=1,l++;k++}break}}b++}if(n)break;
e++}if(n)return{top:f,left:g};this.growMatrix_(a,Math.ceil(a.length/2),0);return this.generatePosition_(a,c,d)};
ContentPlacer.prototype.render_=function(){var a=this.data,c=this.matrix_(this.rowsTot,this.columns,0),d=this.unitSize;if(this.initiated){for(b=0;b<a.length;)e=this.generatePosition_(c,a[b].width,a[b].height),this.elemCache[b].style.top=e.top+"px",this.elemCache[b].style.left=e.left+"px",this.elemCache[b].style.width=a[b].width*d+(a[b].width-1)*this.margin+"px",this.elemCache[b].style.height=a[b].height*d+(a[b].height-1)*this.margin+"px",b++;a=this.rowsTot*d+(this.rowsTot-1)*this.margin;this.target.style.height=
a+"px";this.target.children.item(0).style.height=a+"px"}else{for(var f=function(){void 0!==this.renderDelay?this.elemCache[this.itteration].setAttribute("class","contentPlacerElement transition"):this.elemCache[this.itteration].setAttribute("class","contentPlacerElement");this.itteration++;this.itteration<this.elemCache.length&&setTimeout(f.bind(this),this.renderDelay)},g=document.createDocumentFragment(),b=0;b<a.length;){var e=this.generatePosition_(c,a[b].width,a[b].height),h=document.createElement("div");
h.className="contentPlacerElement";void 0!==this.renderDelay&&(h.className+=" hidden transition");h.style.width=a[b].width*d+(a[b].width-1)*this.margin+"px";h.style.height=a[b].height*d+(a[b].height-1)*this.margin+"px";h.style.top=e.top+"px";h.style.left=e.left+"px";h.innerHTML=a[b].content;g.appendChild(h);b++}a=this.rowsTot*d+(this.rowsTot-1)*this.margin;c=document.createElement("div");c.className="contentPlacerContainer";c.style.height=a+"px";c.appendChild(g);this.target.appendChild(c);this.target.style.height=
a+"px";this.target.style.minWidth=(d+this.margin)*this.largestElement+"px";this.elemCache=document.getElementsByClassName("contentPlacerElement");void 0!==this.renderDelay&&(this.itteration=0,setTimeout(f.bind(this),5));this.initiated=!0}};ContentPlacer.prototype.setMargin=function(a){this.margin=a;this.columns=Math.max(Math.floor(this.target.offsetWidth/(this.unitSize+this.margin)),this.largestElement);this.render_()};
ContentPlacer.prototype.setUnitSize=function(a){this.unitSize=a;this.columns=Math.max(Math.floor(this.target.offsetWidth/(this.unitSize+this.margin)),this.largestElement);this.render_()};ContentPlacer.prototype.setData=function(a){this.data=a;this.findLargestNode_();this.calculateColumns_();this.target.innerHTML="";this.initiated=!1;this.render_()};
ContentPlacer.prototype.addData=function(a){this.data=this.data.concat(a);this.findLargestNode_();this.calculateColumns_();this.target.innerHTML="";this.initiated=!1;this.render_()};ContentPlacer.prototype.setDelay=function(a){this.renderDelay=a};
