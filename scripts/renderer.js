
import {
   glMatrix,
   mat2, mat2d, mat3, mat4,
   quat, quat2,
   vec2, vec3, vec4,
 } from './maths/index.js'

export default class Renderer{
    shader;
    projection;
   constructor(gl,shader){
      this.shader = shader;
      this.shader.mapUniform(gl,"transform");
      this.shader.mapUniform(gl,"projection");
      this.shader.mapUniform(gl,"albedo");
      this.shader.mapUniform(gl,"lightPos");
      this.shader.mapUniform(gl,"lightColor");
      
      let fov = 60.0 * Math.PI/180;
        let aspect = gl.canvas.width/gl.canvas.height;
        let near = 0.1;
        let far = 1000.0;
        this.projection = mat4.create();
        mat4.perspective(this.projection,fov,aspect,near,far);        
   }

   render(gl,object, lightPos, lightColor){

      this.shader.useProgram(gl);
      this.shader.setUniformMat4(gl, "projection", this.projection);
      this.shader.setUniform3f(gl,"lightPos", lightPos);
      this.shader.setUniform3f(gl,"lightColor", lightColor);
      this.shader.setUniform1i(gl,"albedo",0);

      ///////////////////////////////////////////////////////////       
      this.shader.setUniformMat4(gl, "transform", object.transform);
      object.mesh.bind(gl);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D,object.texture.textureId);
      gl.enableVertexAttribArray(0);
      gl.enableVertexAttribArray(1);
      gl.enableVertexAttribArray(2);
      gl.drawElements(gl.TRIANGLES, object.mesh.size, gl.UNSIGNED_BYTE, 0);
      gl.disableVertexAttribArray(2);
      gl.disableVertexAttribArray(1);
      gl.disableVertexAttribArray(0);
      object.mesh.unbind(gl);
      ///////////////////////////////////////////////////////////

      this.shader.unUseProgram(gl);
   }
}
