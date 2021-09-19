import Renderer from './renderer.js'
import Mesh from './mesh.js'
import ShaderProgram from './shaderProgram.js'
import Object from './object.js'
import { objectFragmentShader, objectVertexShader } from '../shaderfiles/objectShader.js';
import Texture from './texture.js';

export default class engine{

    gl;
    canvas;
    renderer;
    shader;
    cube;
    square;

    ticks;

    lightPos;   lightColor;

    init(gl){
        this.gl = gl;
        this.ticks = 1000/60;
        this.shader = new ShaderProgram(this.gl, objectVertexShader,objectFragmentShader);
        this.renderer = new Renderer(this.gl,this.shader);
        let squaremesh = new Mesh(this.gl);
        let squaretex = new Texture(this.gl,"brick");
        this.square = new Object(squaremesh, squaretex);
        this.square.pos[2] = -5;       
        this.lightPos = [-4,4,0];
        this.lightColor = [1,1,1];

        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this.gl.enable(gl.DEPTH_TEST);
    }

    loop(){
        var self = this;
        setInterval(function(){
            self.input();
            self.update();
            self.render();
        },self.ticks);
    }

    input(){
        
    }

    update(){
        this.square.rotate(2,1,0.5);
    }

    render(){
        this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);
        this.renderer.render(this.gl,this.square,this.lightPos,this.lightColor);
    }

}