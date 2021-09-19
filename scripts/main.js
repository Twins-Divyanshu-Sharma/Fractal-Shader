import Engine from './engine.js'

var canvas = document.getElementById("glCanvas");

canvas.width = 512;
canvas.height = 512;

var gl = canvas.getContext("webgl2");

function start(){
    if(gl == null){
        alert("Unable to initialize webgl2. Your browser or machine may not support it");
        return;
    }

    let engine = new Engine();
    engine.init(gl);

    engine.loop();
}

window.onload = start;
