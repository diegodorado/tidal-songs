
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

d = 10
w =130
d2 = d*d
q = Array.from({length: d2}, () => Math.random())
l = Array.from({length: d}, () => Math.round(Math.random()*d2))
l2 = Array.from({length: d}, () => Math.round(Math.random()*d2))
try{clearInterval(i)}catch{}
i = setInterval(() => l2 = Array.from({length: d}, () => Math.round(Math.random()*d2)), 580)
p.draw = () => {
  let t = p.millis()/1000
  t *=2
  // t=0
  pg.reset()
  pg.background(0)
  pg.rotateX(-0.25);
  pg.fill(0)
  for(let i=0;i<=d;i++){
    pg.push();
    pg.translate((i-(d/2))*w, 30 , 0);
    for(let j=0;j<=d;j++){
      z = (j+5-d+(t+j)%1)
      index = (i*10-z+t)%d2
      s = q[index]
      pg.push()
      pg.translate(0, 0 ,w*z)
      pg.push()
      pg.strokeWeight(2)
      if(l.includes(index) ){
        if(l2.includes(index) )
          pg.fill(90, 0 , 90)
        else
          pg.stroke(255,0,255)
      }
      else{
        if(l2.includes(index) )
          pg.fill(0,90,90)
        else
          pg.stroke(0,255,255)
      }
      pg.box(w*0.12+(s*w*0.5))
      if(l2.includes(index) ){
        pg.translate(0,-200,0)
        if(l2.includes(i) )
          pg.torus(w*0.1+(s*w*0.3))
        else
          pg.sphere(w*0.1+(s*w*0.3))
      }
      pg.pop()
      pg.pop()
    }
    pg.pop()
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


msg.setPort(9999)
msg.on('/play2', (args) => {
})
