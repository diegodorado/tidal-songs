




p1 = new P5() // start again
k = 1
n = 24
ss = new Array(n).fill({c:0})
h = p1.height
w = p1.width
f = 0.94
f2 = 0.97
p1.noFill()
p1.draw = () => {
  p1.clear()
  ss.filter(s => s.c>0.001).forEach(s =>{
    s.c=f2*s.c
    s.v=f*(1-s.v)
    p1.stroke(s.c*255)
    p1.curve(s.x+s.v*s.d,-s.t*h,s.x,0,s.x,h,s.x+s.v*(1-s.d),h*(1+s.t))
  })
}
p1.hide()
pluck = (p) => {
  k = Math.pow(2,Math.round(p1.random()*6))
  ss[p] = {
    d: p1.random(),
    t: p1.random(),
    x: w/n*p,
    v: w,
    c: 1
  }
}
msg.setPort(9999)
msg.on('/play2', (args) => {
  o = {}
  for(let i =0;i<args.length/2;i++)
    o[args[i*2]] = args[i*2+1]
  if(o.s==="sn"){
    k = Math.pow(2,Math.round(p1.random()*6))
  }
  else if(o.s==="midi" && o.midichan===0){
    p = Math.min(24, Math.max(0,o.n+10))
    // setTimeout(()=>pluck(p),700)
    pluck(p)
  }
})
s0.init({src: p1.canvas})




p1.strokeWeight(200)

p1.strokeWeight(20)


src(s0)
  .add(o0, 0.95)
  .modulate(o0, 0.01)
  .mult(solid(0.75,0,0.5))
  // .kaleid(()=>k)
  .scale(1.01)
  .hue(({time})=> 0.25*Math.sin(time*0.05))
  // .pixelate(30)
  // .mask(voronoi(10, 2.4).brightness(0.5))
  .out()
