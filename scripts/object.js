import {
    glMatrix,
    mat2, mat2d, mat3, mat4,
    quat, quat2,
    vec2, vec3, vec4,
  } from './maths/index.js'

export default class Object{
    texture;
    mesh;
    pos;
    rot;
    scale;
    transform;

    constructor(mesh,texture){
        this.texture = texture;
        this.mesh = mesh;
        this.pos = vec3.create();
        this.rot = vec3.create();
        this.scale = vec3.create();
        this.transform = mat4.create();
    }

    updateTransform(){

        let toRadians = Math.PI/180;
        mat4.identity(this.transform);
        mat4.rotateZ(this.transform,this.transform,(this.rot[2]*toRadians));
        mat4.rotateY(this.transform,this.transform,(this.rot[1]*toRadians));
        mat4.rotateX(this.transform,this.transform,(this.rot[0]*toRadians)); 

        for(let i=0; i<3; i++)
            this.transform[12+i] = this.pos[i];
    
    }

    translate(x,y,z){
        this.pos[0] += x;
        this.pos[1] += y;
        this.pos[2] += z;

        for(let i=0; i<3; i++)
            this.transform[12+i] = this.pos[i];
    }

    rotate(x,y,z){
        this.rot[0] += x;
        this.rot[1] += y;
        this.rot[2] += z;

        if(this.rot[0] > 360)
            this.rot[0] = 360.0 - this.rot[0];
            
        if(this.rot[1] > 360)
        this.rot[1] = 360.0 - this.rot[1];
        
        if(this.rot[2] > 360)
            this.rot[2] = 360.0 - this.rot[2];

        this.updateTransform();
    }
}