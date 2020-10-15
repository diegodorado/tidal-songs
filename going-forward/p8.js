p = (() =>{
  dir = 'file:///home/diegodorado/Code/shaders/'
  try{p5.remove()}catch{}
  p5 = new P5({mode:'WEBGL'})
  furl = "file:///usr/share/fonts/liberation/LiberationMono-Bold.ttf"
  loaded =  false
  shadersLoaded = 0
  onShadersLoaded = () =>{
    loaded = (++shadersLoaded===6)
    if(loaded){
      console.log('shaders loaded')
      blurHsh.setUniform('texelSize', [1/p5.width, 1/p5.height]);
      blurHsh.setUniform('direction', [1, 0]);
      blurH.shader(blurHsh)
      blurVsh.setUniform('texelSize', [1/p5.width, 1/p5.height]);
      blurVsh.setUniform('direction', [0, 1]);
      blurV.shader(blurVsh)
      blurHsh2.setUniform('texelSize', [1/p5.width, 1/p5.height]);
      blurHsh2.setUniform('direction', [-0.3, -0.3]);
      blurH2.shader(blurHsh2)
      blurVsh2.setUniform('texelSize', [1/p5.width, 1/p5.height]);
      blurVsh2.setUniform('direction', [0.3, 0.3]);
      blurV2.shader(blurVsh2)
      bloomSh.setUniform('ammount', 20)
      bloom.shader(bloomSh)
      fbSh.setUniform('ammount', 0.8)
      p5.shader(fbSh)
    }
  }
  blurHsh = p5.loadShader(`${dir}base.vert`,`${dir}blur.frag`,onShadersLoaded)
  blurVsh = p5.loadShader(`${dir}base.vert`,`${dir}blur.frag`,onShadersLoaded)
  blurHsh2 = p5.loadShader(`${dir}base.vert`,`${dir}blur.frag`,onShadersLoaded)
  blurVsh2 = p5.loadShader(`${dir}base.vert`,`${dir}blur.frag`,onShadersLoaded)
  bloomSh = p5.loadShader(`${dir}base.vert`,`${dir}bloom.frag`,onShadersLoaded)
  fbSh = p5.loadShader(`${dir}base.vert`,`${dir}fb.frag`,onShadersLoaded)
  //p.ortho(-p.width / 2, p.width / 2, p.height / 2, -p.height / 2, 0, 1000);
  try{pg.remove();pg=null}catch{}
  try{blurH.remove();blurH=null}catch{}
  try{blurV.remove();blurV=null}catch{}
  try{blurH2.remove();blurH2=null}catch{}
  try{blurV2.remove();blurV2=null}catch{}
  try{bloom.remove();bloom=null}catch{}
  try{copy.remove();copy=null}catch{}
  pg = p5.createGraphics(p5.width, p5.height, p5.WEBGL)
  blurH = p5.createGraphics(p5.width, p5.height, p5.WEBGL)
  blurV = p5.createGraphics(p5.width, p5.height, p5.WEBGL)
  blurH2 = p5.createGraphics(p5.width, p5.height, p5.WEBGL)
  blurV2 = p5.createGraphics(p5.width, p5.height, p5.WEBGL)
  bloom = p5.createGraphics(p5.width, p5.height, p5.WEBGL)
  copy = p5.createGraphics(p5.width, p5.height, p5.WEBGL)
  pg.noStroke()
  blurH.noStroke()
  blurV.noStroke()
  blurH2.noStroke()
  blurV2.noStroke()
  bloom.noStroke()
  p5.loadFont(furl,(f)=> {
    pg.textFont(f,76)
    pg.textAlign(p.CENTER, p.CENTER);
  })
  p5.frameRate(43)
  pg.draw = () => {
    pg.reset()
    pg.background(0)
    pg.fill(255)
    pg.text(p5.frameRate().toFixed(0), 0,0)
    pg.fill(20)
    pg.stroke(25,0,0)
    pg.strokeWeight(10)
    pg.translate(200,0,0)
    pg.rotateX(0.2)
    pg.rotateY(p5.millis()/1000)
    pg.box(100)
  }
  p5.draw = () => {
    if(!loaded)
      return
    pg.draw()
    //done drawing 3d, now do some post processing
    blurHsh.setUniform('tex0', pg);
    blurH.quad(-1, -1, 1, -1, 1, 1, -1, 1)
    blurVsh.setUniform('tex0', blurH);
    blurV.quad(-1, -1, 1, -1, 1, 1, -1, 1)
    blurHsh2.setUniform('tex0', blurV);
    blurH2.quad(-1, -1, 1, -1, 1, 1, -1, 1)
    blurVsh2.setUniform('tex0', blurH2);
    blurV2.quad(-1, -1, 1, -1, 1, 1, -1, 1)
    bloomSh.setUniform('tex0', pg)
    bloomSh.setUniform('tex1', blurV2)
    bloom.quad(-1, -1, 1, -1, 1, 1, -1, 1)
    fbSh.setUniform('tex0', bloom)
    fbSh.setUniform('ammount', 1)
    fbSh.setUniform('tex1', blurH)
    p5.quad(-1, -1, 1, -1, 1, 1, -1, 1)
  }
  return pg
})()

class Shape{
  constructor(v,z){
    this.z = z
    this.fill = Math.random()>0.95
    this.vertexes = v
  }
  draw(){
    p.beginShape()
    this.vertexes.forEach(v => p.vertex(v.x,v.y,v.z))
    p.endShape(p.CLOSE)
  }
}
class Segment{
  constructor(z){
    this.lastZ = z
    this.shapes = []
    this.lengthZ = 8000
    this.lastVertices = null
    this.randomize()
  }
  randomColor(){
    p.colorMode(p.HSB, 100)
    let index=  Math.round(Math.random()*10)
    return p.color(index*10,100,100)
  }
  verticesAt(z){
    let v = []
    let a = p.TWO_PI / this.sides
    let ao = this.twist*z
    for(let i=0;i<this.sides;i++){
      let x = p.cos(a*i+ao) * this.radius
      let y = p.sin(a*i+ao) * this.radius
      v.push([x,y])
    }
    return v
  }
  addShapes(z){
    if(this.lastVertices===null)
      this.lastVertices = this.verticesAt(z-this.spacingZ)
    let curr = this.verticesAt(z)
    for(let i=0;i<this.sides;i++){
      let j = (i+1)%this.sides
      let a = this.lastVertices[i]
      let b = this.lastVertices[j]
      let c = curr[j]
      let d = curr[i]
      let dx0 = (b[0]-a[0])/this.subdivisions
      let dy0 = (b[1]-a[1])/this.subdivisions
      let dx1 = (c[0]-d[0])/this.subdivisions
      let dy1 = (c[1]-d[1])/this.subdivisions
      for(let j = 0;j<this.subdivisions;j++){
        let v = []
        v.push(p.createVector(a[0]+dx0*j    , a[1]+dy0*j    , -z))
        v.push(p.createVector(a[0]+dx0*(j+1), a[1]+dy0*(j+1), -z))
        v.push(p.createVector(d[0]+dx1*(j+1), d[1]+dy1*(j+1), -z-this.spacingZ))
        v.push(p.createVector(d[0]+dx1*j    , d[1]+dy1*j    , -z-this.spacingZ))
        this.shapes.push(new Shape(v,z))
      }
    }
    this.lastVertices = curr
    return z + this.spacingZ
  }
  randomize(){
    this.spacingZ = 500
    this.color = this.randomColor()
    this.sides = Math.round(3+Math.random()*6)
    this.subdivisions = Math.round(1+Math.random()*6)
    this.twist = 0.0002 * Math.random()
    this.radius = 1000
  }
  draw(){
    p.stroke(this.color)
    this.shapes.forEach(s=>{
      if(s.fill)
        p.fill(this.color)
      else
        p.noFill()
      s.draw()
    })
  }
}
class Tunnel{
  constructor(){
    this.z = 0
    this.lastZ = 0
    this.speed = 50
    this.twist = 0
    this.segments = []
    this.add()
  }
  add(){
    this.segments.push(new Segment(this.z))
  }
  beat(){
    this.segments.forEach(seg => {
      seg.shapes.forEach(s => s.fill = Math.random()>0.95)
    })
  }
  draw(){
    this.z += this.speed
    p.translate(0,0,this.z)
    p.rotateZ(-this.z*this.twist)
    this.segments.forEach((s,i) => {
      let active = i === this.segments.length-1
      s.draw()
      if(this.lastZ-this.z<s.lengthZ){
        if(active){
          this.lastZ = s.addShapes(this.lastZ)
          this.twist = s.twist
        }
        s.shapes = s.shapes.filter(s => s.z>this.z-1000)
        s.dead = s.shapes.length===0
      }
    })
    if(this.segments.some(s=>s.dead))
      this.segments = this.segments.filter(s=>!s.dead)
  }
}
t = new Tunnel()
p.draw = () => {
  p.reset()
  p.background(0)
  p.fill(30);
  p.text(p5.frameRate().toFixed(0), 0,0)
  t.draw()
  bloomSh.setUniform('ammount', 2 * a. bins[0])
}

t.add()

t.speed = 20

a.onBeat = ()=>t.add()

try{clearInterval(i)}catch{}
i = setInterval(() => s.beat(), 800)

s.randomize()

t.speed *= 1.1

t.speed *= 0.9

s.radius *= 1.2

s.twist *= 1.1

s.twist *= 0.9

tss = 2
p.strokeWeight(4)
ts = [tss/p5.width,tss/p5.height]
blurHsh.setUniform('texelSize', ts)
blurHsh.setUniform('direction', [1, 0])
blurVsh.setUniform('texelSize', ts)
blurVsh.setUniform('direction', [0, 1])
blurHsh2.setUniform('texelSize', ts)
blurHsh2.setUniform('direction', [-0.3, -0.3])
blurVsh2.setUniform('texelSize', ts)
blurVsh2.setUniform('direction', [0.3, 0.3])
bloomSh.setUniform('ammount', 10)
