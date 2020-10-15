
/*
{
  "osc": 4000,
  IMPORTED: {
    "vid1": {
      "PATH": "./../../vjloops/020.mp4",
       "SPEED": "0.451"
    },
    "vid2": {
      "PATH": "./../../vjloops/006.mp4",
       "SPEED": "0.51"
    },
    "vid3": {
      "PATH": "./../../vjloops/009.mp4",
       "SPEED": "0.51"
    }
  }
}
*/

precision mediump float;
uniform float time;
uniform float volume;
uniform sampler2D spectrum;
uniform sampler2D samples;
uniform vec2 resolution;
uniform sampler2D vid1;
uniform sampler2D vid2;
uniform sampler2D vid3;
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

  vec4 v1 = texture2D(vid1, uv);
  vec4 v2 = texture2D(vid2, uv);
  vec4 v3 = texture2D(vid3, uv);


  float x = smoothstep(0.0, 0.9, sin(t*0.1)*0.5+0.5);

  vec4 color = v1;//*x+v3*((x)>0.3?0.:1.);//+v3*sin(t);


  float brightness = (0.2*color.r) + (0.7*color.g) + (0.1*color.b);

  vec4 color1 = vec4(sin(t)*0.3+0.5,sin(t2)*0.3+0.5,sin(t3)*0.3+0.5,0.5)*(f0-f1)*5.;;
  vec4 color2 = vec4(0.1, 0.1,0.2, 0.2)*(f1-f0*0.25)*2.;
  float v = smoothstep(0.4, 0.9, brightness);



  gl_FragColor = color1*v + (1.-v)*color2;


}
