/*
{
  "audio": true, // Enable audio input
  IMPORTED: { // "" is not necessary
    "vid": {
      "PATH": "./tokio.mp4",
    },
  },  // trailing-comma is OK
}
*/

precision mediump float;
uniform float time;
uniform sampler2D spectrum;
uniform vec2 resolution;
uniform sampler2D vid;
uniform sampler2D backbuffer;


float bandLevel(int index){
  float r=0.0;
  for(int i=0;i<8;i++)
  {
    float x = exp2(float(index)+float(i)/8.0)/exp2(10.);
    r += texture2D(spectrum, vec2(x, .0)).x;
  }
  return r/8.0;
}


void main() {
  vec2 p = gl_FragCoord.xy / resolution.xy;
  float f0 = bandLevel(1);
  float f1 = bandLevel(3);

  vec2 uv = gl_FragCoord.xy / resolution;
  vec4 color = texture2D(vid, uv);

  vec4 a = (vec4(0.,0.6,0.6,1.)*color)*f0*3.;
  vec4 b = texture2D(backbuffer, (uv-vec2(0.5,0.5))*0.97+vec2(0.5,0.5))*(f1)*1.;
  gl_FragColor =  a + b;
}
