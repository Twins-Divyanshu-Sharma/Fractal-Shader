export default class ShaderProgram{
    
    program;
    uniformMap;

    constructor(gl,vertexShaderRaw, fragmentShaderRaw) {
        this.uniformMap = new Map();
        let vertexShaderID = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderRaw);
        let fragmentShaderID = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderRaw);
        this.createProgram(gl,vertexShaderID,fragmentShaderID);
    }

    createShader(gl, type, source){

        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        let success = gl.getShaderParameter(shader,gl.COMPILE_STATUS);
        if(success){
            console.log(type+" is done");
            return shader;
        }
        else{
            console.log("failed to create Shader : " + type);
            alert(gl.getShaderInfoLog(shader));
        }
    }    


    createProgram(gl, vertexShader, fragmentShader){
       
        this.program = gl.createProgram();
        gl.attachShader(this.program,vertexShader);
        gl.attachShader(this.program,fragmentShader);
        gl.linkProgram(this.program);
        
        let success = gl.getProgramParameter(this.program,gl.LINK_STATUS);
        if(!success){
            alert(gl.getProgramInfoLog(this.program));
        }

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
    }

    useProgram(gl){
        gl.useProgram(this.program);
    }

    unUseProgram(gl){
        gl.useProgram(null);
    }

    mapUniform(gl,name){
        this.uniformMap.set(name,gl.getUniformLocation(this.program,name));
    }

    
    setUniform1i(gl,name,val){
        gl.uniform1i(this.uniformMap.get(name),val);
    }

    setUniform1f(gl,name,val){
        gl.uniform1f(this.uniformMap.get(name),val);
    }

    
    setUniform3f(gl,name,val){
        gl.uniform3f(this.uniformMap.get(name),val[0],val[1],val[2]);
    }


    setUniformMat4(gl, name, val){
        gl.uniformMatrix4fv(this.uniformMap.get(name), false, val);
    }

}
