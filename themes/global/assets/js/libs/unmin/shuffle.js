// Shuffle.js
(function(n){typeof define=="function"&&define.amd?define(["jquery","modernizr"],n):window.Shuffle=n(window.jQuery,window.Modernizr)})(function(n,t,i){"use strict";function nt(n){return n?n.replace(/([A-Z])/g,function(n,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-"):""}function rt(t,i,r){var u,f,s,e=null,o=0,h;return r=r||{},h=function(){o=r.leading===!1?0:n.now(),e=null,s=t.apply(u,f),u=f=null},function(){var l=n.now(),c;return o||r.leading!==!1||(o=l),c=i-(l-o),u=this,f=arguments,c<=0||c>i?(clearTimeout(e),e=null,o=l,s=t.apply(u,f),u=f=null):e||r.trailing===!1||(e=setTimeout(h,c)),s}}function u(n,t,i){for(var r=0,u=n.length;r<u;r++)if(t.call(i,n[r],r,n)==={})return}function h(t,i,r){return setTimeout(n.proxy(t,i),r)}function d(n){return Math.max.apply(Math,n)}function et(n){return Math.min.apply(Math,n)}function s(t){return n.isNumeric(t)?t:0}function ot(n){var r,i,t=n.length;if(!t)return n;while(--t)i=Math.floor(Math.random()*(t+1)),r=n[i],n[i]=n[t],n[t]=r;return n}var e;if(typeof t!="object")throw new Error("Shuffle.js requires Modernizr.\nhttp://vestride.github.io/Shuffle/#dependencies");var y=t.prefixed("transition"),k=t.prefixed("transitionDelay"),a=t.prefixed("transitionDuration"),l={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[y],b=t.prefixed("transform"),ft=nt(b),it=t.csstransforms&&t.csstransitions,tt=t.csstransforms3d,f="shuffle",w=.3,c="all",ut="groups",o=1,v=.001;e=function(n,t){this.x=s(n),this.y=s(t)},e.equals=function(n,t){return n.x===t.x&&n.y===t.y};var g=0,p=n(window),r=function(t,i){i=i||{},n.extend(this,r.options,i,r.settings),this.$el=n(t),this.element=t,this.unique="shuffle_"+g++,this._fire(r.EventType.LOADING),this._init(),h(function(){this.initialized=!0,this._fire(r.EventType.DONE)},this,16)};return r.EventType={LOADING:"loading",DONE:"done",LAYOUT:"layout",REMOVED:"removed"},r.ClassName={BASE:f,SHUFFLE_ITEM:"shuffle-item",FILTERED:"filtered",CONCEALED:"concealed"},r.options={group:c,speed:250,easing:"ease-out",itemSelector:"",sizer:null,gutterWidth:0,columnWidth:0,delimeter:null,buffer:0,initialSort:null,throttle:rt,throttleTime:300,sequentialFadeDelay:150,supported:it},r.settings={useSizer:!1,itemCss:{position:"absolute",top:0,left:0,visibility:"visible"},revealAppendedDelay:300,lastSort:{},lastFilter:c,enabled:!0,destroyed:!1,initialized:!1,_animations:[],styleQueue:[]},r.Point=e,r._getItemTransformString=function(n,t){return tt?"translate3d("+n.x+"px, "+n.y+"px, 0) scale3d("+t+", "+t+", 1)":"translate("+n.x+"px, "+n.y+"px) scale("+t+")"},r._getNumberStyle=function(t,i){return r._getFloat(n(t).css(i))},r._getInt=function(n){return s(parseInt(n,10))},r._getFloat=function(n){return s(parseFloat(n))},r._getOuterWidth=function(n,t){var i=n.offsetWidth,u,f;return t&&(u=r._getNumberStyle(n,"marginLeft"),f=r._getNumberStyle(n,"marginRight"),i+=u+f),i},r._getOuterHeight=function(n,t){var i=n.offsetHeight,u,f;return t&&(u=r._getNumberStyle(n,"marginTop"),f=r._getNumberStyle(n,"marginBottom"),i+=u+f),i},r._skipTransition=function(n,t,i){var u=n.style[a],r;n.style[a]="0ms",t.call(i),r=n.offsetWidth,r=null,n.style[a]=u},r.prototype._init=function(){this.$items=this._getItems(),this.sizer=this._getElementOption(this.sizer),this.sizer&&(this.useSizer=!0),this.$el.addClass(r.ClassName.BASE),this._initItems();p.on("resize."+f+"."+this.unique,this._getResizeFunction());var n=this.$el.css(["position","overflow"]),t=r._getOuterWidth(this.element);this._validateStyles(n),this._setColumns(t),this.shuffle(this.group,this.initialSort),this.supported&&h(function(){this._setTransitions(),this.element.style[y]="height "+this.speed+"ms "+this.easing},this)},r.prototype._getResizeFunction=function(){var t=n.proxy(this._onResize,this);return this.throttle?this.throttle(t,this.throttleTime):t},r.prototype._getElementOption=function(n){return typeof n=="string"?this.$el.find(n)[0]||null:n&&n.nodeType&&n.nodeType===1?n:n&&n.jquery?n[0]:null},r.prototype._validateStyles=function(n){n.position==="static"&&(this.element.style.position="relative"),n.overflow!=="hidden"&&(this.element.style.overflow="hidden")},r.prototype._filter=function(n,t){n=n||this.lastFilter,t=t||this.$items;var i=this._getFilteredSets(n,t);return this._toggleFilterClasses(i.filtered,i.concealed),this.lastFilter=n,typeof n=="string"&&(this.group=n),i.filtered},r.prototype._getFilteredSets=function(t,i){var r=n(),f=n();return t===c?r=i:u(i,function(i){var u=n(i);this._doesPassFilter(t,u)?r=r.add(u):f=f.add(u)},this),{filtered:r,concealed:f}},r.prototype._doesPassFilter=function(t,i){if(n.isFunction(t))return t.call(i[0],i,this);var r=i.data(ut),u=this.delimeter&&!n.isArray(r)?r.split(this.delimeter):r;return n.inArray(t,u)>-1},r.prototype._toggleFilterClasses=function(n,t){n.removeClass(r.ClassName.CONCEALED).addClass(r.ClassName.FILTERED),t.removeClass(r.ClassName.FILTERED).addClass(r.ClassName.CONCEALED)},r.prototype._initItems=function(n){n=n||this.$items,n.addClass([r.ClassName.SHUFFLE_ITEM,r.ClassName.FILTERED].join(" ")),n.css(this.itemCss).data("point",new e).data("scale",o)},r.prototype._updateItemCount=function(){this.visibleItems=this._getFilteredItems().length},r.prototype._setTransition=function(n){n.style[y]=ft+" "+this.speed+"ms "+this.easing+", opacity "+this.speed+"ms "+this.easing},r.prototype._setTransitions=function(n){n=n||this.$items,u(n,function(n){this._setTransition(n)},this)},r.prototype._setSequentialDelay=function(n){this.supported&&u(n,function(n,t){n.style[k]="0ms,"+(t+1)*this.sequentialFadeDelay+"ms"},this)},r.prototype._getItems=function(){return this.$el.children(this.itemSelector)},r.prototype._getFilteredItems=function(){return this.$items.filter("."+r.ClassName.FILTERED)},r.prototype._getConcealedItems=function(){return this.$items.filter("."+r.ClassName.CONCEALED)},r.prototype._getColumnSize=function(t,i){var u;return u=n.isFunction(this.columnWidth)?this.columnWidth(t):this.useSizer?r._getOuterWidth(this.sizer):this.columnWidth?this.columnWidth:this.$items.length>0?r._getOuterWidth(this.$items[0],!0):t,u===0&&(u=t),u+i},r.prototype._getGutterSize=function(t){var i;return i=n.isFunction(this.gutterWidth)?this.gutterWidth(t):this.useSizer?r._getNumberStyle(this.sizer,"marginLeft"):this.gutterWidth},r.prototype._setColumns=function(n){var i=n||r._getOuterWidth(this.element),u=this._getGutterSize(i),f=this._getColumnSize(i,u),t=(i+u)/f;Math.abs(Math.round(t)-t)<w&&(t=Math.round(t)),this.cols=Math.max(Math.floor(t),1),this.containerWidth=i,this.colWidth=f},r.prototype._setContainerSize=function(){this.$el.css("height",this._getContainerSize())},r.prototype._getContainerSize=function(){return d(this.positions)},r.prototype._fire=function(n,t){this.$el.trigger(n+"."+f,t&&t.length?t:[this])},r.prototype._resetCols=function(){var n=this.cols;for(this.positions=[];n--;)this.positions.push(0)},r.prototype._layout=function(n,t){u(n,function(n){this._layoutItem(n,!!t)},this),this._processStyleQueue(),this._setContainerSize()},r.prototype._layoutItem=function(t,i){var u=n(t),f=u.data(),h=f.point,c=f.scale,l={width:r._getOuterWidth(t,!0),height:r._getOuterHeight(t,!0)},s=this._getItemPosition(l);e.equals(h,s)&&c===o||(f.point=s,f.scale=o,this.styleQueue.push({$item:u,point:s,scale:o,opacity:i?0:1,skipTransition:i,callfront:function(){i||u.css("visibility","visible")},callback:function(){i&&u.css("visibility","hidden")}}))},r.prototype._getItemPosition=function(n){for(var u=this._getColumnSpan(n.width,this.colWidth,this.cols),t=this._getColumnSet(u,this.cols),i=this._getShortColumn(t,this.buffer),f=new e(Math.round(this.colWidth*i),Math.round(t[i])),o=t[i]+n.height,s=this.cols+1-t.length,r=0;r<s;r++)this.positions[i+r]=o;return f},r.prototype._getColumnSpan=function(n,t,i){var r=n/t;return Math.abs(Math.round(r)-r)<w&&(r=Math.round(r)),Math.min(Math.ceil(r),i)},r.prototype._getColumnSet=function(n,t){var u,r,i;if(n===1)return this.positions;for(u=t+1-n,r=[],i=0;i<u;i++)r[i]=d(this.positions.slice(i,i+n));return r},r.prototype._getShortColumn=function(n,t){for(var r=et(n),i=0,u=n.length;i<u;i++)if(n[i]>=r-t&&n[i]<=r+t)return i;return 0},r.prototype._shrink=function(t){var i=t||this._getConcealedItems();u(i,function(t){var i=n(t),r=i.data();r.scale!==v&&(r.scale=v,this.styleQueue.push({$item:i,point:r.point,scale:v,opacity:0,callback:function(){i.css("visibility","hidden")}}))},this)},r.prototype._onResize=function(){if(this.enabled&&!this.destroyed&&!this.isTransitioning){var n=r._getOuterWidth(this.element);n!==this.containerWidth&&this.update()}},r.prototype._getStylesForTransition=function(n){var t={opacity:n.opacity};return this.supported?t[b]=r._getItemTransformString(n.point,n.scale):(t.left=n.point.x,t.top=n.point.y),t},r.prototype._transition=function(t){var i=this._getStylesForTransition(t);this._startItemAnimation(t.$item,i,t.callfront||n.noop,t.callback||n.noop)},r.prototype._startItemAnimation=function(t,i,r,u){function f(t){t.target===t.currentTarget&&(n(t.target).off(l,f),u())}if(r(),!this.initialized){t.css(i),u();return}if(this.supported){t.css(i);t.on(l,f)}else{var e=t.stop(!0).animate(i,this.speed,"swing",u);this._animations.push(e.promise())}},r.prototype._processStyleQueue=function(t){var i=n();u(this.styleQueue,function(n){n.skipTransition?this._styleImmediately(n):(i=i.add(n.$item),this._transition(n))},this),i.length>0&&this.initialized?(this.isTransitioning=!0,this.supported?this._whenCollectionDone(i,l,this._movementFinished):this._whenAnimationsDone(this._movementFinished)):t||h(this._layoutEnd,this),this.styleQueue.length=0},r.prototype._styleImmediately=function(n){r._skipTransition(n.$item[0],function(){n.$item.css(this._getStylesForTransition(n))},this)},r.prototype._movementFinished=function(){this.isTransitioning=!1,this._layoutEnd()},r.prototype._layoutEnd=function(){this._fire(r.EventType.LAYOUT)},r.prototype._addItems=function(n,t,i){this._initItems(n),this._setTransitions(n),this.$items=this._getItems(),this._shrink(n),u(this.styleQueue,function(n){n.skipTransition=!0}),this._processStyleQueue(!0),t?this._addItemsToEnd(n,i):this.shuffle(this.lastFilter)},r.prototype._addItemsToEnd=function(n,t){var r=this._filter(null,n),i=r.get();this._updateItemCount(),this._layout(i,!0),t&&this.supported&&this._setSequentialDelay(i),this._revealAppended(i)},r.prototype._revealAppended=function(t){h(function(){u(t,function(t){var i=n(t);this._transition({$item:i,opacity:1,point:i.data("point"),scale:o})},this),this._whenCollectionDone(n(t),l,function(){n(t).css(k,"0ms"),this._movementFinished()})},this,this.revealAppendedDelay)},r.prototype._whenCollectionDone=function(t,i,r){function f(t){t.target===t.currentTarget&&(n(t.target).off(i,f),u++,u===e&&r.call(o))}var u=0,e=t.length,o=this;t.on(i,f)},r.prototype._whenAnimationsDone=function(t){n.when.apply(null,this._animations).always(n.proxy(function(){this._animations.length=0,t.call(this)},this))},r.prototype.shuffle=function(n,t){this.enabled&&!this.isTransitioning&&(n||(n=c),this._filter(n),this._updateItemCount(),this._shrink(),this.sort(t))},r.prototype.sort=function(n){if(this.enabled&&!this.isTransitioning){this._resetCols();var t=n||this.lastSort,i=this._getFilteredItems().sorted(t);this._layout(i),this.lastSort=t}},r.prototype.update=function(n){this.enabled&&!this.isTransitioning&&(n||this._setColumns(),this.sort())},r.prototype.layout=function(){this.update(!0)},r.prototype.appended=function(n,t,i){this._addItems(n,t===!0,i!==!1)},r.prototype.disable=function(){this.enabled=!1},r.prototype.enable=function(n){this.enabled=!0,n!==!1&&this.update()},r.prototype.remove=function(t){function i(){t.remove(),this.$items=this._getItems(),this._updateItemCount(),this._fire(r.EventType.REMOVED,[t,this]),t=null}if(t.length&&t.jquery){this._toggleFilterClasses(n(),t),this._shrink(t),this.sort();this.$el.one(r.EventType.LAYOUT+"."+f,n.proxy(i,this))}},r.prototype.destroy=function(){p.off("."+this.unique),this.$el.removeClass(f).removeAttr("style").removeData(f),this.$items.removeAttr("style").removeData("point").removeData("scale").removeClass([r.ClassName.CONCEALED,r.ClassName.FILTERED,r.ClassName.SHUFFLE_ITEM].join(" ")),this.$items=null,this.$el=null,this.sizer=null,this.element=null,this.destroyed=!0},n.fn.shuffle=function(t){var i=Array.prototype.slice.call(arguments,1);return this.each(function(){var e=n(this),u=e.data(f);u?typeof t=="string"&&u[t]&&u[t].apply(u,i):(u=new r(this,t),e.data(f,u))})},n.fn.sorted=function(t){var r=n.extend({},n.fn.sorted.defaults,t),u=this.get(),f=!1;return u.length?r.randomize?ot(u):(n.isFunction(r.by)&&u.sort(function(t,u){if(f)return 0;var e=r.by(n(t)),o=r.by(n(u));return e===i&&o===i?(f=!0,0):e<o||e==="sortFirst"||o==="sortLast"?-1:e>o||e==="sortLast"||o==="sortFirst"?1:0}),f)?this.get():(r.reverse&&u.reverse(),u):[]},n.fn.sorted.defaults={reverse:!1,by:null,randomize:!1},r});