
--hydra

src(o1)
.scale(()=>d0*0.15+1)
.mult(solid(0,0,1), ()=> d0*3)
.out()

noise(5)
.thresh(0.8)
.scale(()=>d2*0.05+0.1)
.rotate(()=>d1*0.5)
.out(o1)
