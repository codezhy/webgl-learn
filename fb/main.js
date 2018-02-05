const canvas = document.querySelector("#glcanvas");
var fb = new FrameBuffer(canvas)

window.onload = function() {
    for(var i = 0; i < 1000; i++) {
        fb.putPixel(vec2( 0.0, i/1000 ), vec3(0.0,0.0,0))
    }
    fb.render();
}
