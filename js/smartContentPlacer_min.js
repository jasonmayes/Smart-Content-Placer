/**
 * ContentPlacer v8.0 - A small class which allows you to arrange data of 
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
 * @param {String} target The DOM element ID we wish to render content in to.
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
var ContentPlacer=function(a,e,c,d,g){this.target=document.getElementById(a);this.unitSize=e;this.margin=c;this.data=d;this.rowsTot=1;this.initiated=!1;this.largestElement=1;this.renderDelay=g;this.itteration=0;this.elemCache=[];for(a=this.data.length;a--;)this.data[a].width>this.largestElement&&(this.largestElement=this.data[a].width);this.columns=Math.max(Math.floor(this.target.offsetWidth/(this.unitSize+this.margin)),this.largestElement);a=function(){var a=Math.max(Math.floor(this.target.offsetWidth/
(this.unitSize+this.margin)),this.largestElement);a!=this.columns&&(this.rowsTot=1,this.columns=a,this.render())}.bind(this);this.addEventHandler_(window,"resize",a);this.render()};ContentPlacer.prototype.matrix_=function(a,e,c){for(var d=[],g=0;g<a;g++){for(var b=[],f=0;f<e;f++)b.push(c);d.push(b)}return d};ContentPlacer.prototype.growMatrix_=function(a,e,c){for(var d=0;d<e;d++){for(var g=[],b=0;b<this.columns;b++)g.push(c);a.push(g)}return a};
ContentPlacer.prototype.addEventHandler_=function(a,e,c){a.addEventListener?a.addEventListener(e,c,!1):a.attachEvent&&a.attachEvent("on"+e,c)};
ContentPlacer.prototype.generatePosition_=function(a,e,c){var d=0,g=0,b,f=0,n=a[0].length,p=a.length,m=!1;e>this.largestElement&&(this.largestElement=e);for(;f<p;){for(b=0;b<n;){if(0===a[f][b]){var l=!0;b+e-1>=n&&(l=!1);f+c-1>=p&&(l=!1);if(l)for(var h=0;h<e;){for(var k=0;k<c;){if(0!==a[f+k][b+h]){l=!1;break}k++}if(!l)break;h++}if(l){m=!0;g=b*(this.unitSize+this.margin);d=f*(this.unitSize+this.margin);f+c>this.rowsTot&&(this.rowsTot=f+c);for(h=0;h<e;){for(k=0;k<c;)a[f+k][b+h]=1,k++;h++}break}}b++}if(m)break;
f++}if(m)return{top:d,left:g};this.growMatrix_(a,Math.ceil(a.length/2),0);return this.generatePosition_(a,e,c)};
ContentPlacer.prototype.render=function(){var a=this.data,e=this.matrix_(this.rowsTot,this.columns,0),c=this.unitSize;if(this.initiated){for(b=0;b<a.length;)f=this.generatePosition_(e,a[b].width,a[b].height),this.elemCache[b].style.top=f.top+"px",this.elemCache[b].style.left=f.left+"px",b++;a=this.rowsTot*c+(this.rowsTot-1)*this.margin;this.target.style.height=a+"px";this.target.children.item(0).style.height=a+"px"}else{for(var d="",g=function(){void 0!==this.renderDelay?this.elemCache[this.itteration].setAttribute("class",
"contentPlacerElement transition"):this.elemCache[this.itteration].setAttribute("class","contentPlacerElement");this.itteration++;this.itteration<this.elemCache.length&&setTimeout(g.bind(this),this.renderDelay)},b=0;b<a.length;){var f=this.generatePosition_(e,a[b].width,a[b].height),d=d+('<div id="elem'+b+'" class="contentPlacerElement');void 0!==this.renderDelay&&(d+=" hidden transition");d+='" style="width:'+(a[b].width*c+(a[b].width-1)*this.margin)+"px; height:"+(a[b].height*c+(a[b].height-1)*
this.margin)+"px; top:"+f.top+"px; left:"+f.left+'px;">'+a[b].content+"</div>";b++}a=this.rowsTot*c+(this.rowsTot-1)*this.margin;d='<div class="contentPlacerContainer" style="height:'+a+'px">'+(d+"</div>");this.target.innerHTML=d;this.target.style.height=a+"px";this.target.style.minWidth=(c+this.margin)*this.largestElement+"px";this.elemCache=document.getElementsByClassName("contentPlacerElement");void 0!==this.renderDelay&&(this.itteration=0,setTimeout(g.bind(this),5));this.initiated=!0}};