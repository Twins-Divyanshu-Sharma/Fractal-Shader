export default class Mesh{
    vao;
    size;
    vertexData;
    indices;
    constructor(gl){

        this.cube();
        this.generate(gl, this.vertexData, this.indices);

        this.size = this.indices.length;

    }
    
    square(){
        this.vertexData = [
            0.5,  0.5, 0.0,	    1.0, 1.0,   0.0, 0.0, 1.0,
            0.5, -0.5, 0.0,	    1.0, 0.0,   0.0, 0.0, 1.0,
           -0.5,  0.5, 0.0,	    0.0, 1.0,   0.0, 0.0, 1.0,
           -0.5, -0.5, 0.0,     0.0, 0.0,   0.0, 0.0, 1.0,
        ];
    
        this.indices = [
            0,	1,	3,
            0,	3,	2
        ];
    }

    cube(){ 

        this.vertexData = [ -1, 1, -1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, -1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, -1, -1, 1, 0, 0, 0, 0, 1, 1, -1, 1, 1, 0, 0, 0, 1, -1, 1, 1, 0, 1, -1, 0, 0, -1, -1, -1, 1, 0, -1, 0, 0, -1, -1, 1, 0, 0, -1, 0, 0, 1, -1, -1, 1, 1, 0, -1, 0, -1, -1, 1, 0, 0, 0, -1, 0, -1, -1, -1, 0, 1, 0, -1, 0, 1, 1, -1, 1, 1, 1, 0, 0, 1, -1, 1, 0, 0, 1, 0, 0, 1, -1, -1, 1, 0, 1, 0, 0, -1, 1, -1, 0, 1, 0, 0, -1, 1, -1, -1, 1, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0, 1, 0, -1, 1, 1, 0, 1, 0, 0, 1, -1, 1, -1, 1, 1, -1, 0, 0, 1, -1, 1, 1, 0, 0, -1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, -1, 1, 1, 0, 0, -1,  ];
        this.indices = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 18, 1, 3, 19, 4, 6, 20, 7, 9, 21, 10, 12, 22, 13, 15, 23, 16,  ];

   }

    generate(gl, vertices, indices){
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        let vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); 
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 8*4, 0*4);
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 8*4, 3*4);
        gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 8*4, 5*4);
        
        let ebo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    } 

    bind(gl){
        gl.bindVertexArray(this.vao);
    }

    unbind(gl){
        gl.bindVertexArray(null);
    }


}
