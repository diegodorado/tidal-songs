
p1 = new P5()

p1.remove() // remove canvas
p1 = new P5() // start again

class Particle {
  constructor(){
    this.x = p1.random(0,p1.width);
    this.y = p1.random(0,p1.height);
    this.r = p1.random(1,8);
    this.xSpeed = p1.random(-2,2);
    this.ySpeed = p1.random(-1,1.5);
  }
  draw() {
    //p1.noStroke();
    p1.stroke('rgba(255,255,255,0.04)');
    // p1.fill('rgba(200,169,169,0.5)');
    //p1.ellipse(this.x,this.y,this.r*2,this.r*2);
  }
  move() {
    if(this.x < 0 || this.x > p1.width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > p1.height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }
  join(p) {
    p.forEach(element =>{
      let dis = p1.dist(this.x,this.y,element.x,element.y);
      if(dis<185) {
        p1.stroke('rgba(255,255,255,0.04)');
        p1.line(this.x,this.y,element.x,element.y);
      }
    });
  }
}
let particles = [];
for(let i = 0;i<p1.width/50;i++){
  particles.push(new Particle());
}
p1.draw = () => {
  p1.clear()
  for(let i = 0;i<particles.length;i++) {
    particles[i].draw();
    particles[i].move();
    particles[i].join(particles.slice(i));
  }
}
s0.init({src: p1.canvas})
src(s0)
  .add(o0, 0.9)
  .modulate(o0, 0.01)
  .scale(1.01)
  .mult(osc(5, 0.2, 2))
  .hue(0.04)
  .out()
