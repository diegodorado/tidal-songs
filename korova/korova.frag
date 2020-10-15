
/*
{
  "osc": 4000,
  IMPORTED: {
    "vid1": {
      "PATH": "./drive.mp4",
       "SPEED": "1"
    }
  }
}
*/

uniform sampler2D osc_beat;

precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D vid1;

vec2 rotate(in vec2 p, in float t) {
    return mat2(
        sin(t), cos(t),
        cos(t), -sin(t)
    ) * p;
}

void main() {

  const vec4  kRGBToYPrime = vec4 (0.299, 0.587, 0.114, 0.0);
  const vec4  kRGBToI     = vec4 (0.596, -0.275, -0.321, 0.0);
  const vec4  kRGBToQ     = vec4 (0.212, -0.523, 0.311, 0.0);
  const vec4  kYIQToR   = vec4 (1.0, 0.956, 0.621, 0.0);
  const vec4  kYIQToG   = vec4 (1.0, -0.272, -0.647, 0.0);
  const vec4  kYIQToB   = vec4 (1.0, -1.107, 1.704, 0.0);

  float beat = texture2D(osc_beat,vec2(0,0)).r;

  // Sample the input pixel
  vec2 uv = gl_FragCoord.xy / resolution;

  float t = time * .3;

  vec4 color = texture2D(vid1, uv);

  // Convert to YIQ
  float   YPrime  = dot (color, kRGBToYPrime);
  float   I      = dot (color, kRGBToI);
  float   Q      = dot (color, kRGBToQ);

  // Calculate the hue and chroma
  float   hue     = atan (Q, I);
  float   chroma  = sqrt (I * I + Q * Q) +0.3;

  // Make the user's adjustments
  hue += beat*4.*sin(t);

  // Convert back to YIQ
  Q = chroma * sin (hue);
  I = chroma * cos (hue);

  // Convert back to RGB
  vec4    yIQ   = vec4 (YPrime, I, Q, 0.0);
  color.r = dot (yIQ, kYIQToR);
  color.g = dot (yIQ, kYIQToG);
  color.b = dot (yIQ, kYIQToB);

  float brightness = (0.2*color.r) + (0.7*color.g) + (0.1*color.b);
  float v = smoothstep(0.2, 0.6, brightness);
  gl_FragColor = color*v;


}
