
export const objectVertexShader =`#version 300 es

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

export const objectFragmentShader =`#version 300 es
precision highp float;
out vec4 outColor;

in vec2 outTex;
in vec3 outPos;
in vec3 outNorm;

uniform sampler2D albedo;
uniform vec3 lightPos;
uniform vec3 lightColor;

void main() {
    vec3 toLight = normalize(lightPos - outPos);
    float diffval = max(dot(outNorm,toLight), 0.1);

    vec3 diffuse = diffval*lightColor;
    vec4 albedoColor = texture(albedo, outTex);

    vec3 finalColor = diffuse*albedoColor.rgb;

    outColor = vec4(finalColor,albedoColor.a);
}

`;






