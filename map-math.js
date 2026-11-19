export const MIN_ZOOM=1;
export const MAX_ZOOM=4.5;
export const PEOPLE_ZOOM=1.8;
export function clampView(view,width,height){const zoom=Math.min(MAX_ZOOM,Math.max(MIN_ZOOM,view.zoom));const maxX=(zoom-1)*width/2+width*.3,maxY=(zoom-1)*height/2+height*.3;return {zoom,panX:Math.min(maxX,Math.max(-maxX,view.panX))||0,panY:Math.min(maxY,Math.max(-maxY,view.panY))||0};}
export function zoomAtPoint(view,nextZoom,anchor,width,height){const zoom=Math.min(MAX_ZOOM,Math.max(MIN_ZOOM,nextZoom));const ratio=zoom/view.zoom;return clampView({zoom,panX:anchor.x-width/2-(anchor.x-width/2-view.panX)*ratio,panY:anchor.y-height/2-(anchor.y-height/2-view.panY)*ratio},width,height);}
export function pinchView(start,from,to,scale,width,height){const zoomed=zoomAtPoint(start,start.zoom*scale,from,width,height);return clampView({...zoomed,panX:zoomed.panX+to.x-from.x,panY:zoomed.panY+to.y-from.y},width,height);}
export function focusPoint(x,y,zoom,width,height){return clampView({zoom,panX:(.5-x/100)*width*zoom,panY:(.5-y/100)*height*zoom},width,height);}
