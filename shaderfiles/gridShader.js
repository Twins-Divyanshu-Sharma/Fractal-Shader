export const gridVertexShader =`#version 300 es

out vec2 outTex;
out vec3 outPos;
out vec3 outNorm;

layout (location=0) in vec3 pos;
layout (location=1) in vec2 tex;
layout (location=2) in vec3 norm;

uniform mat4 projection;
uniform mat4 transform;

void main() {
    outTex = tex;
    outNorm = ( transform * vec4(norm,0.0) ).xyz;
    outNorm = normalize(outNorm);
    vec4 worldPos = transform * vec4(pos,1.0);
    outPos = worldPos.xyz;
    gl_Position = projection * worldPos;
}

`;

export const gridFragmentShader =`#version 300 es
precision highp float;
out vec4 outColor;

in vec2 outTex;
in vec3 outPos;
in vec3 outNorm;

uniform sampler2D albedo;
uniform vec3 lightPos;
uniform vec3 lightColor;

uniform vec2 u_resolution;
uniform float uTime;

vec3 changeColor(float t) {
  vec3 a = vec3(1.0, 0.0, 0.0);
  vec3 b = vec3(1.0, 1.0, 0.5);
  vec3 c = vec3(0.0, 1.0, 1.0);
  vec3 d = vec3(0.59, 1.1, 2.5);

  return abs(a + b*cos(c+d + t));
 
}

void main() {
   vec2 uv = outPos.xy;
   vec2 uv0 = uv*16.0 - 1.0;
   vec3 finalColor = vec3(0.0);

   for(float i=0.0; i< 3.0; i++)
   {
   
       uv = fract(uv * 1.5 ) - 0.5;

       float d = length(uv) ;

       d = sin(d*16.0 + uTime)/16.0;
       d = abs(d);
       vec3 color = changeColor(length(uv) +i + uTime);

       d = pow(0.005/d, 1.2); 


       finalColor += color * d;

   }
   outColor = vec4(finalColor,1.0);
}

`;


