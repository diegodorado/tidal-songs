/*{ "midi": true }*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D backbuffer;
uniform sampler2D note;

void main() {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec4 variation = vec4(0.9+0.1*sin(time * 1.23),0.1,0.1,1.);
    vec2 uv = gl_FragCoord.xy / resolution;
    vec4 mask = texture2D(note, vec2(0.5,0.)+uv/8.)*2.+ texture2D(backbuffer, (uv - .5-vec2(0.8,0.2)) * 1.005 +.25 ) * .958;
    mask = mask*variation;
    gl_FragColor = mask;
}
