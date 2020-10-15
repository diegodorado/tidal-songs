msg.setPort(6666)
peaks1 = new Array(8).fill(0)
powers1 = new Array(8).fill(0)
peaks2 = new Array(8).fill(0)
powers2 = new Array(8).fill(0)
msg.on('/rms', (args) => {
  // ["/rms", synthID, orbitIndex, peak1, power1, peak2, power2, …]
  let buffer = Buffer.from(args[0].data);
  let index = buffer.readInt32BE(20)
  peaks1[index] = buffer.readFloatBE(24)
  powers1[index] = buffer.readFloatBE(28)
  peaks2[index] = buffer.readFloatBE(32)
  powers2[index] = buffer.readFloatBE(36)
})


shape(5).rotate({time}=>time*0.5).out()

s0.initCam()

shape(()=>Math.round(4-peaks1[1]*2))
.colorama(()=>2+powers1[1]*100)
.scale(()=>peaks1[0]*4)
.out(o1)
src(s0).scale(()=>1+peaks1[0]*1).kaleid(8).out(o2)


osc().out()

src(osc())
  // .blend(o2,0.5)
  // .saturate(()=>1+peaks1[0]*1)
  // .colorama(145)
  // .pixelate(100)
  // .modulate(o2,10)
  .pixelate(10)
  // .rotate(({time}) => Math.cos(time*20)*9)
  // .rotate(({time}) => (time*0.5))
  // .scrollX(({time}) => time*0.510)
  // .scale(({time}) => time)
  .saturate(20)
  .out()


voronoi(1,0.51, 0.8)
  .color(0, 0.8, 1.0)
  .saturate(()=>powers1[1]*0.1)
  .colorama(({time})=> 0.2+peaks1[2]*0.2*time)
  .luma( ()=>powers1[0]*2)
  .kaleid(()=>Math.round(powers1[1]*10))
  .blend(o3,0.7)
  .out(o1)




s0.initCam()


src(s0)
  .scrollY(0.5)
  .kaleid(4)
  .scale(()=>0.5+peaks1[0]*2)
  .rotate(({time})=>time)
  .saturate(3)
  .modulate(osc(50),0.75)
  .out()
