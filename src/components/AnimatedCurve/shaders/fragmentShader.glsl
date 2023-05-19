precision mediump float;

uniform float uTime;
uniform float uDelay;
uniform float uDuration;
uniform float uResolution;
uniform float uLength;
uniform vec3 uColor;

varying float vIndex;

void main() {
  float loopTime = uDelay + uDuration;
  float current = mod(uTime, loopTime) / loopTime;
  float delay = uDelay / loopTime; 
  float isAnimating = step(delay, current);
  float progress = ((current - delay) * isAnimating) / (1.0 - delay);

  float position = vIndex / uResolution;
  float scaledPosition = position * (1.0 - uLength);

  float tip = 1.0 - step(progress, scaledPosition);
  float trail = 1.0 - smoothstep(scaledPosition, scaledPosition + uLength, progress);

  float alpha = tip * trail;

  gl_FragColor = vec4(uColor, alpha);
}