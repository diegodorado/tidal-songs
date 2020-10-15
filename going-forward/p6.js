
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
n = 16
r = 500
r2 = p.PI * r/n/p.sin(p.PI/3)
n2 = 6
zzz = 40
a = p.TWO_PI / n2
q = Array.from({length: n*zzz}, () => Math.random())
zzzz = 100
p.draw = () => {
  let t = p.millis()/1000
  pg.reset()
  pg.background(0)
  pg.fill(20,20,20,0)
  pg.strokeWeight(6)
  pg.stroke(255,0,255)
  zzzz += 50
  pg.translate(0,0,zzzz)
  pg.push()
  pg.fill(90)
  pg.translate(0,0,-zzz*r2*1.5)
  pg.circle(0,0,r*2)
  pg.pop()
  // console.log(t)
  for(let zz=0;zz<zzz;zz++){
    for(let i=0;i<n;i++){
      if(q[zz*n+i]>0.9){
        pg.fill(100)
      }
      else {
        pg.fill(20,20,20,0)
      }
      pg.beginShape()
      for(let j=0;j<n2;j++){
        x = r * p.cos ((j%3)===0 ? 0 : p.TWO_PI/n/2)
        y = p.sin(a*j) * r2
        z = p.cos(a*j) * r2
        pg.vertex(x,y,z)
      }
      pg.endShape(p.CLOSE)
      pg.rotateZ(p.TWO_PI/n)
    }
    pg.rotateZ(p.TWO_PI/n/2)
    pg.translate(0,0,-r2*1.5)
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
