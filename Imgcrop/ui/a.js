var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var canvas1=document.getElementById("canvas1");
var ctx1=canvas1.getContext("2d");
var anchors={
  TL:{x:88,y:277},      
  TR:{x:800,y:272},     
  BR:{x:812,y:989},    
  BL:{x:96,y:998},     
}
var unwarped={
  TL:{x:0,y:0},       
  TR:{x:900,y:0},     
  BR:{x:900,y:900},   
  BL:{x:0,y:900},     
}

var cfg = {
  position: 'start',
    draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
};

//var board = ChessBoard('board', cfg);
var img=new Image();
img.onload=start;
img.src="./A.jpeg";
function start(){
  cw=canvas.width=img.width;
  ch=canvas.height=img.height;
  ctx.drawImage(img,0,0,img.width,img.height);
 
}

function go(){
    
    setanchors();
    unwarp(anchors,unwarped,ctx1);
    
}

function setanchors(){
     
    anchors.TL.x = document.getElementById("TL_x").value;
    anchors.TL.y = document.getElementById("TL_y").value;
    anchors.TR.x = document.getElementById("TR_x").value;
    anchors.TR.y = document.getElementById("TR_y").value;
    anchors.BR.x = document.getElementById("BR_x").value;
    anchors.BR.y = document.getElementById("BR_y").value;
    anchors.BL.x = document.getElementById("BL_x").value;
    anchors.BL.y = document.getElementById("BL_y").value;
    console.log(anchors);
 
}

function posttoapi(){
    
console.log("In development")}

function unwarp(anchors,unwarped,context){
    console.log(anchors);

  context.clearRect(0,0,context.canvas.width,context.canvas.height);
  mapTriangle(context,
              anchors.TL,  anchors.BR,  anchors.BL,
              unwarped.TL, unwarped.BR, unwarped.BL
             );

  ctx1.translate(-1,1);

  mapTriangle(context,
              anchors.TL,  anchors.TR,  anchors.BR,
              unwarped.TL, unwarped.TR, unwarped.BR
             );

}
function mapTriangle(ctx,p0, p1, p2, p_0, p_1, p_2) {
  var x0=p_0.x, y0=p_0.y;
  var x1=p_1.x, y1=p_1.y;
  var x2=p_2.x, y2=p_2.y;
  var u0=p0.x,  v0=p0.y;
  var u1=p1.x,  v1=p1.y;
  var u2=p2.x,  v2=p2.y;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.clip();
  var delta   = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2;
  var delta_a = x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2;
  var delta_b = u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2;
  var delta_c = u0 * v1 * x2 + v0 * x1 * u2 + x0 * u1 * v2 - x0 * v1 * u2 - v0 * u1 * x2 - u0 * x1 * v2;
  var delta_d = y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2;
  var delta_e = u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2;
  var delta_f = u0 * v1 * y2 + v0 * y1 * u2 + y0 * u1 * v2 - y0 * v1 * u2 - v0 * u1 * y2 - u0 * y1 * v2;
  ctx.transform(
    delta_a / delta, delta_d / delta,
    delta_b / delta, delta_e / delta,
    delta_c / delta, delta_f / delta
  );
  ctx.drawImage(img,0,0);
  ctx.restore();
}

