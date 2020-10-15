msg.setPort(6666)
for(let i= 0;i<8;i++)
  window['d'+i] = 0
msg.on('/rms', (args) => {
  // ["/rms", synthID, orbitIndex, peak1, …]
  const b = Buffer.from(args[0].data);
  const i = b.readInt32BE(20)
  window['d'+i] = b.readFloatBE(24)
})
s0.initCam()


// hydra, cam only
src(s0).thresh(0.28)
.out()


// hydra, kaleid and scale
src(s0).thresh(0.28)
.scrollY(0.3)
.kaleid(8)
.out()

src(s0).thresh(0.28)
.scrollY(0.3)
.kaleid(8)
.scale(()=>1+d0*0.3)
// .out()
.out(o1)

// hydra: go for those stars

src(o1)
.mult(solid(0,0,1),()=>d0*3)
.out()

src(o1)
.blend(noise(5).thresh(0.8).scale(0.1),0.75)
.mult(solid(0,0,1),()=>d0*3)
.out()

noise(5).thresh(0.8).scale(0.1)
.mult(solid(0,0,1),()=>d0*3)
.out()

noise(5).thresh(0.8)
.scale(()=>d0*0.05+0.1)
.mult(solid(0,0,1),()=>d0*3)
.out()

//hydra: affect rotation to snare

noise(5).thresh(0.8)
.scale(()=>d0*0.05+0.1)
.rotate(()=>d1*0.51)
.mult(solid(0,0,1).color(0,0,1),()=>d0*3)
.out()

//hydra: affect scale to hh a bit
noise(5).thresh(0.8)
.scale(()=>d2*0.05+0.1)
.rotate(()=>d1*0.51)
.add(src(o2))
.mult(solid(0,0,1).color(0,0,1),()=>d0*3)
.out()


//hydra: add second layer
noise(50)
  .scrollY(1,0.1)
  .thresh(()=>0.9-d0*0.5)
  .modulateScale(noise(2),()=>d1)
   .out(o2)









src(s0).thresh(0.28)
.scrollY(0.3)
.kaleid(8)
// .scale(()=>1+d2*0.3)
.blend(o1,1)
.add(o2,0.5)
.mult(solid(0,0,1),()=>d0*3)
.out()

noise(5)
.thresh(0.8)
.scale(()=>d2*0.05+0.1)
.rotate(()=>d1*0.51)
.out(o1)

noise(50)
.scrollY(1,0.1)
.thresh(()=>0.9-d0*0.5)
.modulateScale(noise(2), ()=> d1)
.out(o2)










