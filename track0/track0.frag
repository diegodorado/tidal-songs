precision mediump float;
uniform float time;
uniform float volume;
uniform vec2 resolution;
uniform sampler2D camera;
uniform sampler2D spectrum;
uniform sampler2D samples;
uniform sampler2D cats1;
uniform sampler2D cats2;
uniform sampler2D cats3;
uniform sampler2D cats4;
uniform sampler2D cats5;
uniform sampler2D cats6;
uniform sampler2D backbuffer;

uniform sampler2D midi;
uniform sampler2D note;

float random(in vec2 p) {
    return fract(sin(dot(p, vec2(5395.3242, 38249.2348))) * 248.24);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {

    vec2 uv = gl_FragCoord.xy / resolution;
    vec2 uv0 = (.5 - uv) * .9 + .5;
    vec2 disp = vec2(cos(time / 5.0),sin(time / 2.0)  ) / 10.0;

    float z = 20.;
    float z2 = 15.;
    float t = time * .2;
    vec2 uv2 = uv + vec2(noise(uv0 * z - t), noise(uv0 * z + t)) * .03 ;
    vec2 uv3 = uv + vec2(noise(uv0 * z2 - t), noise(uv0 * z2 + t)) * .04 ;

    vec2 p = gl_FragCoord.xy / resolution.xy + vec2(-1.,-1.);
    float freq = texture2D(spectrum, p).x;
    float wave = texture2D(samples, p).x;
    vec3 col = vec3(volume*0.008,freq,wave)*vec3(0.3,0.1,0.1);

    float r = 0.3+ 0.1*sin(t*4.)*cos( atan(p.y,p.x)*20. + 10.0*p.y*p.x*(volume*0.08));
    col *= smoothstep( r, r+0.01, length( p ) );


    gl_FragColor = vec4(col,0.05) + (texture2D(camera,uv3*vec2(2,2)+vec2(-1.5,-1.1)) *  vec4(.1, .4, .5, 1)
    +(
      texture2D(cats1, uv2+disp)*(texture2D(note, vec2(60. / 128., 0))).x
      + texture2D(cats2, uv2+disp)*(texture2D(note, vec2(61. / 128., 0))).x
      + texture2D(cats3, uv2+disp)*(texture2D(note, vec2(62. / 128., 0))).x
      + texture2D(cats4, uv2+disp)*(texture2D(note, vec2(63. / 128., 0))).x
      + texture2D(cats5, uv2+disp)*(texture2D(note, vec2(64. / 128., 0))).x
      + texture2D(cats6, uv2+disp)*(texture2D(note, vec2(65. / 128., 0))).x
    ))*0.018*volume;



}
