
dir = 'file:///home/diegodorado/Code/shaders/'
try{p.remove()}catch{}
p = new P5({mode:'WEBGL'})
blurHsh = p.loadShader(`${dir}base.vert`,`${dir}blur.frag`)
blurVsh = p.loadShader(`${dir}base.vert`,`${dir}blur.frag`)
blurHsh2 = p.loadShader(`${dir}base.vert`,`${dir}blur.frag`)
blurVsh2 = p.loadShader(`${dir}base.vert`,`${dir}blur.frag`)
bloomSh = p.loadShader(`${dir}base.vert`,`${dir}bloom.frag`)
//p.ortho(-p.width / 2, p.width / 2, p.height / 2, -p.height / 2, 0, 1000);
try{pg.remove();pg=null}catch{}
try{blurH.remove();blurH=null}catch{}
try{blurV.remove();blurV=null}catch{}
try{blurH2.remove();blurH2=null}catch{}
try{blurV2.remove();blurV2=null}catch{}
pg = p.createGraphics(p.width, p.height, p.WEBGL)
blurH = p.createGraphics(p.width, p.height, p.WEBGL)
blurV = p.createGraphics(p.width, p.height, p.WEBGL)
blurH2 = p.createGraphics(p.width, p.height, p.WEBGL)
blurV2 = p.createGraphics(p.width, p.height, p.WEBGL)
pg.noStroke()
blurH.noStroke()
blurV.noStroke()
blurH2.noStroke()
blurV2.noStroke()

shapes = []
n = 8
r = 500
s = r/2
zzz = 30
zzzz = 0
a = p.TWO_PI / n
rot = p.TWO_PI / 100
// pg.perspective(p.PI/3)
p.draw = () => {
  let t = p.millis()/1000
  pg.reset()
  pg.background(0)
  pg.strokeWeight(6)
  pg.stroke(255,0,255)
  // zzzz += 50
  pg.translate(0,0, 10*s)
  pg.push()
  pg.fill(90)
  pg.translate(0,0,-zzz*s)
  pg.circle(0,0,r*2)
  pg.pop()
  pg.translate(0,0, zzzz)
  pg.noFill()
  // pg.fill(30,30,30,0)
  pg.rotateZ(-p.PI/2)
  for(let zz=0;zz<zzz;zz++){
    for(let i=0;i<n;i++){
      pg.beginShape()
      x = p.cos(a*i) * r
      y = p.sin(a*i) * r
      z = 0
      pg.vertex(x,y,z)
      z += s
      pg.vertex(x,y,z)
      pg.endShape()
    }
    pg.beginShape()
    for(let i=0;i<n;i++){
      x = p.cos(a*i) * r
      y = p.sin(a*i) * r
      z = -zz*s
      pg.vertex(x,y)
    }
    pg.endShape(p.CLOSE)
    pg.rotateZ(rot)
    pg.translate(0,0, -s)
  }
  //done drawing 3d, now do some post processing
  blurHsh.setUniform('tex0', pg);
  blurHsh.setUniform('texelSize', [1/p.width, 1/p.height]);
  blurHsh.setUniform('direction', [1, 0]);
  blurH.shader(blurHsh)
  blurH.rect(0,0,p.width, p.height);
  blurVsh.setUniform('tex0', blurH);
  blurVsh.setUniform('texelSize', [1/p.width, 1/p.height]);
  blurVsh.setUniform('direction', [0, 1]);
  blurV.shader(blurVsh)
  blurV.rect(0,0,p.width, p.height);
  blurHsh2.setUniform('tex0', blurV);
  blurHsh2.setUniform('texelSize', [1/p.width, 1/p.height]);
  blurHsh2.setUniform('direction', [-0.3, -0.3]);
  blurH2.shader(blurHsh2)
  blurH2.rect(0,0,p.width, p.height);
  blurVsh2.setUniform('tex0', blurH2);
  blurVsh2.setUniform('texelSize', [1/p.width, 1/p.height]);
  blurVsh2.setUniform('direction', [0.3, 0.3]);
  blurV2.shader(blurVsh2)
  blurV2.rect(0,0,p.width, p.height);
  bloomSh.setUniform('tex0', pg)
  bloomSh.setUniform('tex1', blurV2)
  bloomSh.setUniform('ammount', 10)
  p.shader(bloomSh)
  p.rect(0,0,p.width, p.height)
}
