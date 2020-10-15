
/*
{
  "osc": 4000,
  IMPORTED: {
    "vid": {
      "PATH": "./../korova/baile.mp4",
       "SPEED": "0.353"
    }
  }
}
*/

precision mediump float;
uniform float time;
uniform float volume;
uniform sampler2D spectrum;
uniform vec2 resolution;
uniform sampler2D vid;
//uniform sampler2D backbuffer;


float bandLevel(int index){
  float r=0.0;
  for(int i=0;i<20;i++)
  {
    float x = exp2(float(index)+float(i)/20.0)/exp2(10.);
    r += texture2D(spectrum, vec2(x, .0)).x;
  }
  return r/20.0;
}


void main() {
  float t = time * .3;
  float t2 = time * .5;
  float t3 = time * .8;

  vec2 p = gl_FragCoord.xy / resolution.xy;
  float f0 = bandLevel(1);
  float f1 = bandLevel(7);

  vec2 uv = gl_FragCoord.xy / resolution;

  vec4 color = texture2D(vid, uv);

  float brightness = (0.2*color.r) + (0.7*color.g) + (0.1*color.b);

  vec4 color1 = vec4(sin(t)*0.3+0.5,sin(t2)*0.3+0.5,sin(t3)*0.3+0.5,0.5)*(f0-f1)*5.;;
  vec4 color2 = vec4(0.1, 0.1,0.2, 0.2)*(f1-f0*0.25)*2.;
  float v = smoothstep(0.7, 0.9, brightness);

  gl_FragColor = color1*v + (1.-v)*color2;

}
