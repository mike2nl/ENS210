// Compressed v1.33 Smoothie Charts (http://smoothiecharts.org/) using https://jscompress.com by Maarten Pennings
// Smoothiecharts: MIT License, Copyright (c) 2010-2013 Joe Walnes, 2013-2017 Drew Noakes
!function(t){function e(t){this.options=s.extend({},e.defaultOptions,t),this.disabled=!1,this.clear()}function i(t){this.options=s.extend({},i.defaultChartOptions,t),this.seriesSet=[],this.currentValueRange=1,this.currentVisMinValue=0,this.lastRenderTimeMillis=0,this.lastChartTimestamp=0,this.mousemove=this.mousemove.bind(this),this.mouseout=this.mouseout.bind(this)}Date.now=Date.now||function(){return(new Date).getTime()};var s={extend:function(){arguments[0]=arguments[0]||{};for(var t=1;t<arguments.length;t++)for(var e in arguments[t])arguments[t].hasOwnProperty(e)&&("object"==typeof arguments[t][e]?arguments[t][e]instanceof Array?arguments[0][e]=arguments[t][e]:arguments[0][e]=s.extend(arguments[0][e],arguments[t][e]):arguments[0][e]=arguments[t][e]);return arguments[0]},binarySearch:function(t,e){for(var i=0,s=t.length;i<s;){var a=i+s>>1;e<t[a][0]?s=a:i=a+1}return i}};e.defaultOptions={resetBoundsInterval:3e3,resetBounds:!0},e.prototype.clear=function(){this.data=[],this.maxValue=Number.NaN,this.minValue=Number.NaN},e.prototype.resetBounds=function(){if(this.data.length){this.maxValue=this.data[0][1],this.minValue=this.data[0][1];for(var t=1;t<this.data.length;t++){var e=this.data[t][1];e>this.maxValue&&(this.maxValue=e),e<this.minValue&&(this.minValue=e)}}else this.maxValue=Number.NaN,this.minValue=Number.NaN},e.prototype.append=function(t,e,i){for(var s=this.data.length-1;s>=0&&this.data[s][0]>t;)s--;-1===s?this.data.splice(0,0,[t,e]):this.data.length>0&&this.data[s][0]===t?i?(this.data[s][1]+=e,e=this.data[s][1]):this.data[s][1]=e:s<this.data.length-1?this.data.splice(s+1,0,[t,e]):this.data.push([t,e]),this.maxValue=isNaN(this.maxValue)?e:Math.max(this.maxValue,e),this.minValue=isNaN(this.minValue)?e:Math.min(this.minValue,e)},e.prototype.dropOldData=function(t,e){for(var i=0;this.data.length-i>=e&&this.data[i+1][0]<t;)i++;0!==i&&this.data.splice(0,i)},i.tooltipFormatter=function(t,e){for(var s=[(this.options.timestampFormatter||i.timeFormatter)(new Date(t))],a=0;a<e.length;++a)s.push('<span style="color:'+e[a].series.options.strokeStyle+'">'+this.options.yMaxFormatter(e[a].value,this.options.labels.precision)+"</span>");return s.join("<br>")},i.defaultChartOptions={millisPerPixel:20,enableDpiScaling:!0,yMinFormatter:function(t,e){return parseFloat(t).toFixed(e)},yMaxFormatter:function(t,e){return parseFloat(t).toFixed(e)},maxValueScale:1,minValueScale:1,interpolation:"bezier",scaleSmoothing:.125,maxDataSetLength:2,scrollBackwards:!1,displayDataFromPercentile:1,grid:{fillStyle:"#000000",strokeStyle:"#777777",lineWidth:1,sharpLines:!1,millisPerLine:1e3,verticalSections:2,borderVisible:!0},labels:{fillStyle:"#ffffff",disabled:!1,fontSize:10,fontFamily:"monospace",precision:2,showIntermediateLabels:!1},horizontalLines:[],tooltip:!1,tooltipLine:{lineWidth:1,strokeStyle:"#BBBBBB"},tooltipFormatter:i.tooltipFormatter,nonRealtimeData:!1,responsive:!1,limitFPS:0},i.AnimateCompatibility={requestAnimationFrame:function(t,e){return(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(function(){t(Date.now())},16)}).call(window,t,e)},cancelAnimationFrame:function(t){return(window.cancelAnimationFrame||function(t){clearTimeout(t)}).call(window,t)}},i.defaultSeriesPresentationOptions={lineWidth:1,strokeStyle:"#ffffff"},i.prototype.addTimeSeries=function(t,e){this.seriesSet.push({timeSeries:t,options:s.extend({},i.defaultSeriesPresentationOptions,e)}),t.options.resetBounds&&t.options.resetBoundsInterval>0&&(t.resetBoundsTimerId=setInterval(function(){t.resetBounds()},t.options.resetBoundsInterval))},i.prototype.removeTimeSeries=function(t){for(var e=this.seriesSet.length,i=0;i<e;i++)if(this.seriesSet[i].timeSeries===t){this.seriesSet.splice(i,1);break}t.resetBoundsTimerId&&clearInterval(t.resetBoundsTimerId)},i.prototype.getTimeSeriesOptions=function(t){for(var e=this.seriesSet.length,i=0;i<e;i++)if(this.seriesSet[i].timeSeries===t)return this.seriesSet[i].options},i.prototype.bringToFront=function(t){for(var e=this.seriesSet.length,i=0;i<e;i++)if(this.seriesSet[i].timeSeries===t){var s=this.seriesSet.splice(i,1);this.seriesSet.push(s[0]);break}},i.prototype.streamTo=function(t,e){this.canvas=t,this.delay=e,this.start()},i.prototype.getTooltipEl=function(){return this.tooltipEl||(this.tooltipEl=document.createElement("div"),this.tooltipEl.className="smoothie-chart-tooltip",this.tooltipEl.style.position="absolute",this.tooltipEl.style.display="none",document.body.appendChild(this.tooltipEl)),this.tooltipEl},i.prototype.updateTooltip=function(){var t=this.getTooltipEl();if(this.mouseover&&this.options.tooltip){for(var e=this.lastChartTimestamp,i=this.options.scrollBackwards?e-this.mouseX*this.options.millisPerPixel:e-(this.canvas.offsetWidth-this.mouseX)*this.options.millisPerPixel,a=[],o=0;o<this.seriesSet.length;o++){var n=this.seriesSet[o].timeSeries;if(!n.disabled){var r=s.binarySearch(n.data,i);r>0&&r<n.data.length&&a.push({series:this.seriesSet[o],index:r,value:n.data[r][1]})}}a.length?(t.innerHTML=this.options.tooltipFormatter.call(this,i,a),t.style.display="block"):t.style.display="none"}else t.style.display="none"},i.prototype.mousemove=function(t){this.mouseover=!0,this.mouseX=t.offsetX,this.mouseY=t.offsetY,this.mousePageX=t.pageX,this.mousePageY=t.pageY;var e=this.getTooltipEl();e.style.top=Math.round(this.mousePageY)+"px",e.style.left=Math.round(this.mousePageX)+"px",this.updateTooltip()},i.prototype.mouseout=function(){this.mouseover=!1,this.mouseX=this.mouseY=-1,i.tooltipEl&&(i.tooltipEl.style.display="none")},i.prototype.resize=function(){var t,e,i=this.options.enableDpiScaling&&window?window.devicePixelRatio:1;this.options.responsive?(t=this.canvas.offsetWidth,e=this.canvas.offsetHeight,t!==this.lastWidth&&(this.lastWidth=t,this.canvas.setAttribute("width",Math.floor(t*i).toString())),e!==this.lastHeight&&(this.lastHeight=e,this.canvas.setAttribute("height",Math.floor(e*i).toString()))):1!==i&&(t=parseInt(this.canvas.getAttribute("width")),e=parseInt(this.canvas.getAttribute("height")),this.originalWidth&&Math.floor(this.originalWidth*i)===t||(this.originalWidth=t,this.canvas.setAttribute("width",Math.floor(t*i).toString()),this.canvas.style.width=t+"px",this.canvas.getContext("2d").scale(i,i)),this.originalHeight&&Math.floor(this.originalHeight*i)===e||(this.originalHeight=e,this.canvas.setAttribute("height",Math.floor(e*i).toString()),this.canvas.style.height=e+"px",this.canvas.getContext("2d").scale(i,i)))},i.prototype.start=function(){if(!this.frame){this.canvas.addEventListener("mousemove",this.mousemove),this.canvas.addEventListener("mouseout",this.mouseout);var t=function(){this.frame=i.AnimateCompatibility.requestAnimationFrame(function(){if(this.options.nonRealtimeData){var e=new Date(0),i=this.seriesSet.reduce(function(t,e){var i=e.timeSeries.data,s=Math.round(this.options.displayDataFromPercentile*i.length)-1;if(s=s>=0?s:0,s=s<=i.length-1?s:i.length-1,i&&i.length>0){var a=i[s][0];t=t>a?t:a}return t}.bind(this),e);this.render(this.canvas,i>e?i:null)}else this.render();t()}.bind(this))}.bind(this);t()}},i.prototype.stop=function(){this.frame&&(i.AnimateCompatibility.cancelAnimationFrame(this.frame),delete this.frame,this.canvas.removeEventListener("mousemove",this.mousemove),this.canvas.removeEventListener("mouseout",this.mouseout))},i.prototype.updateValueRange=function(){for(var t=this.options,e=Number.NaN,i=Number.NaN,s=0;s<this.seriesSet.length;s++){var a=this.seriesSet[s].timeSeries;a.disabled||(isNaN(a.maxValue)||(e=isNaN(e)?a.maxValue:Math.max(e,a.maxValue)),isNaN(a.minValue)||(i=isNaN(i)?a.minValue:Math.min(i,a.minValue)))}if(null!=t.maxValue?e=t.maxValue:e*=t.maxValueScale,null!=t.minValue?i=t.minValue:i-=Math.abs(i*t.minValueScale-i),this.options.yRangeFunction){var o=this.options.yRangeFunction({min:i,max:e});i=o.min,e=o.max}if(!isNaN(e)&&!isNaN(i)){var n=e-i-this.currentValueRange,r=i-this.currentVisMinValue;this.isAnimatingScale=Math.abs(n)>.1||Math.abs(r)>.1,this.currentValueRange+=t.scaleSmoothing*n,this.currentVisMinValue+=t.scaleSmoothing*r}this.valueRange={min:i,max:e}},i.prototype.render=function(t,e){var i=Date.now();if(!(this.options.limitFPS>0&&i-this.lastRenderTimeMillis<1e3/this.options.limitFPS)){if(!this.isAnimatingScale){var s=Math.min(1e3/6,this.options.millisPerPixel);if(i-this.lastRenderTimeMillis<s)return}this.resize(),this.updateTooltip(),this.lastRenderTimeMillis=i,t=t||this.canvas,e=e||i-(this.delay||0),e-=e%this.options.millisPerPixel,this.lastChartTimestamp=e;var a=t.getContext("2d"),o=this.options,n={top:0,left:0,width:t.clientWidth,height:t.clientHeight},r=e-n.width*o.millisPerPixel,l=function(t){var e=t-this.currentVisMinValue;return 0===this.currentValueRange?n.height:n.height-Math.round(e/this.currentValueRange*n.height)}.bind(this),h=function(t){return o.scrollBackwards?Math.round((e-t)/o.millisPerPixel):Math.round(n.width-(e-t)/o.millisPerPixel)};if(this.updateValueRange(),a.font=o.labels.fontSize+"px "+o.labels.fontFamily,a.save(),a.translate(n.left,n.top),a.beginPath(),a.rect(0,0,n.width,n.height),a.clip(),a.save(),a.fillStyle=o.grid.fillStyle,a.clearRect(0,0,n.width,n.height),a.fillRect(0,0,n.width,n.height),a.restore(),a.save(),a.lineWidth=o.grid.lineWidth,a.strokeStyle=o.grid.strokeStyle,o.grid.millisPerLine>0){a.beginPath();for(W=e-e%o.grid.millisPerLine;W>=r;W-=o.grid.millisPerLine){A=h(W);o.grid.sharpLines&&(A-=.5),a.moveTo(A,0),a.lineTo(A,n.height)}a.stroke(),a.closePath()}for(k=1;k<o.grid.verticalSections;k++){R=Math.round(k*n.height/o.grid.verticalSections);o.grid.sharpLines&&(R-=.5),a.beginPath(),a.moveTo(0,R),a.lineTo(n.width,R),a.stroke(),a.closePath()}if(o.grid.borderVisible&&(a.beginPath(),a.strokeRect(0,0,n.width,n.height),a.closePath()),a.restore(),o.horizontalLines&&o.horizontalLines.length)for(var u=0;u<o.horizontalLines.length;u++){var m=o.horizontalLines[u],d=Math.round(l(m.value))-.5;a.strokeStyle=m.color||"#ffffff",a.lineWidth=m.lineWidth||1,a.beginPath(),a.moveTo(0,d),a.lineTo(n.width,d),a.stroke(),a.closePath()}for(var c=0;c<this.seriesSet.length;c++){a.save();var p=this.seriesSet[c].timeSeries;if(!p.disabled){var f=p.data,g=this.seriesSet[c].options;p.dropOldData(r,o.maxDataSetLength),a.lineWidth=g.lineWidth,a.strokeStyle=g.strokeStyle,a.beginPath();for(var v=0,S=0,y=0,b=0;b<f.length&&1!==f.length;b++){var w=h(f[b][0]),x=l(f[b][1]);if(0===b)v=w,a.moveTo(w,x);else switch(o.interpolation){case"linear":case"line":a.lineTo(w,x);break;case"bezier":default:a.bezierCurveTo(Math.round((S+w)/2),y,Math.round(S+w)/2,x,w,x);break;case"step":a.lineTo(w,y),a.lineTo(w,x)}S=w,y=x}f.length>1&&(g.fillStyle&&(a.lineTo(n.width+g.lineWidth+1,y),a.lineTo(n.width+g.lineWidth+1,n.height+g.lineWidth+1),a.lineTo(v,n.height+g.lineWidth),a.fillStyle=g.fillStyle,a.fill()),g.strokeStyle&&"none"!==g.strokeStyle&&a.stroke(),a.closePath()),a.restore()}}if(o.tooltip&&this.mouseX>=0&&(a.lineWidth=o.tooltipLine.lineWidth,a.strokeStyle=o.tooltipLine.strokeStyle,a.beginPath(),a.moveTo(this.mouseX,0),a.lineTo(this.mouseX,n.height),a.closePath(),a.stroke(),this.updateTooltip()),!o.labels.disabled&&!isNaN(this.valueRange.min)&&!isNaN(this.valueRange.max)){var T=o.yMaxFormatter(this.valueRange.max,o.labels.precision),P=o.yMinFormatter(this.valueRange.min,o.labels.precision),V=o.scrollBackwards?0:n.width-a.measureText(T).width-2,N=o.scrollBackwards?0:n.width-a.measureText(P).width-2;a.fillStyle=o.labels.fillStyle,a.fillText(T,V,o.labels.fontSize),a.fillText(P,N,n.height-2)}if(o.labels.showIntermediateLabels&&!isNaN(this.valueRange.min)&&!isNaN(this.valueRange.max)&&o.grid.verticalSections>0)for(var M=(this.valueRange.max-this.valueRange.min)/o.grid.verticalSections,F=n.height/o.grid.verticalSections,k=0;k<o.grid.verticalSections;k++){var R=n.height-Math.round(k*F);o.grid.sharpLines&&(R-=.5);var L=(this.valueRange.min+k*M).toPrecision(o.labels.precision);a.fillStyle=o.labels.fillStyle,a.fillText(L,0,R-o.grid.lineWidth)}if(o.timestampFormatter&&o.grid.millisPerLine>0)for(var B=o.scrollBackwards?a.measureText(P).width:n.width-a.measureText(P).width+4,W=e-e%o.grid.millisPerLine;W>=r;W-=o.grid.millisPerLine){var A=h(W);if(!o.scrollBackwards&&A<B||o.scrollBackwards&&A>B){var D=new Date(W),E=o.timestampFormatter(D),z=a.measureText(E).width;B=o.scrollBackwards?A+z+2:A-z-2,a.fillStyle=o.labels.fillStyle,o.scrollBackwards?a.fillText(E,A,n.height-2):a.fillText(E,A-z,n.height-2)}}a.restore()}},i.timeFormatter=function(t){function e(t){return(t<10?"0":"")+t}return e(t.getHours())+":"+e(t.getMinutes())+":"+e(t.getSeconds())},t.TimeSeries=e,t.SmoothieChart=i}("undefined"==typeof exports?this:exports);