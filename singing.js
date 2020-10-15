
a.setSmooth(0.2)

voronoi().kaleid([8,100].fast(0.5)).scale(()=>a.fft[0]*0.4+1).rotate(1,1).mult(shape([1,5,6,7]).scale(()=>a.fft[0]*0.8+1.4).color([1,0.5],0,1),[4,1,0.4,0.1].fast(2)).colorama(4).saturate(({time})=> Math.sin(time*0.1)*5).scrollX(1,1000).add(osc(10,1,4).pixelate(30,30).scrollY(1,2 )).out()
