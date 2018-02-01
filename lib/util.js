function getGL(id) {
    const canvas = document.querySelector(id);
    const gl = canvas.getContext("webgl");
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        throw new Exception("Unable to initialize WebGL. Your browser or machine may not support it.");
    }

    return gl;
}

function getProgram(gl, vs, fs) {
    const vertexShader   = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      throw 'Unable to initialize WebGL. Your browser or machine may not support it.';
    }
  
    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
  
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw 'Unable to initialize WebGL. Your browser or machine may not support it.';
    }
  
    return shader;
}

function getAttrib(gl, program, name) {
    var v = gl.getAttribLocation(program, name);
    if (v < 0) {
        throw `get attribute location of {$name}`;
    }
    return v;
}

function getXY(ev) {
    var rect   = ev.target.getBoundingClientRect();
    var target = ev.target;
    var _x = (ev.clientX - rect.left);
    var _y = (ev.clientY - rect.top);

    console.log(_x, _y);
    var x = (_x - target.height/2) / (target.height/2);
    var y = (target.width/2 - _y) / (target.width/2);
    console.log(x,y)
    return [x, y];
}