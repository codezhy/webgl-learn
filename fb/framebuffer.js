class FrameBuffer {
    constructor(canvas) {
        this.gl = WebGLUtils.setupWebGL(canvas);
        this.gl.viewport( 0, 0, canvas.width, canvas.height );
        this.gl.clearColor( 1.0,1.0, 1.0, 1.0 );
        
        var that = this;
        getAjaxProgram(this.gl, "/fb/shaders/v.glsl", "fb/shaders/f.glsl", function(p) {
            that.gl.useProgram(p)
            that.program = p;
        })
        this.points = [];
        this.colors = [];
    }

    initPostionBuffer(gl) {
        gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );    
        var vPosition = gl.getAttribLocation(this.program, "vPosition" );
        console.log(vPosition);
        gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
    }

    initColorBuffer(gl) {
        gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData( gl.ARRAY_BUFFER, flatten(this.colors), gl.STATIC_DRAW );    
        var vColor = gl.getAttribLocation(this.program, "vColor" );
        gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vColor );
    }

    putPixel(v, color) {
        this.points.push(v);
        this.colors.push(color);
    }

    clear() {
        this.points = [];
        this.buffer = [];
    }

    render() {
        var gl = this.gl
        this.initPostionBuffer(gl)
        this.initColorBuffer(gl)
        this.gl.clear(gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(gl.POINTS, 0, this.points.length);
    }
}