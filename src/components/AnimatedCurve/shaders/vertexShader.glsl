uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute float index;

varying float vIndex;

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  vIndex = index;
}