'use strict';

class asteroid
        {
            constructor(x, y, vx, vy, mass, radius, image, canvas, ctx) {
                this.alive = true;
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.mass = mass;
                this.radius = radius;
                this.image = image;
                this.canvas = canvas;
                this.ctx = ctx;
                this.angle = 0.0;
                this.angularSpeed = Math.random()/10.0;
                this.maxSpeed = 0.5;
                this.maxSpeed2 = this.maxSpeed*this.maxSpeed;
                this.applyForce(new vec2D(0,0), 0);
            }

            tryCollision(planet) {
                let dx = (planet.x - this.x);
                let dy = (planet.y - this.y);
                let r2 = dx*dx + dy*dy;
                if(planet.radius*planet.radius >= r2) {
                    this.alive = false;
                    return true;
                }

                return false;
            }

            update(force, duration) {
                this.applyForce(force, duration);
                this.angle = (this.angle + this.angularSpeed);
                if(this.angle > 2.0*Math.PI)
                    this.angle -= 2.0*Math.PI;

                this.fly(duration);
            }

            applyForce(force, duration) {
                let nx = this.vx + force.x * duration;
                let ny = this.vy + force.y * duration;
                this.vx = nx;
                this.vy = ny;
            }

            fly(duration) {
                //console.log("velocity " + Math.sqrt(this.vx*this.vx + this.vy*this.vy));
                this.x += this.vx*duration;
                this.y += this.vy*duration;
                if(this.x > this.canvas.width){
                    this.x -= this.canvas.width;
                    // this.vx *= -1;
                    // this.x = 2*this.canvas.width - this.x;
                }

                if(this.x < 0){
                    this.x += this.canvas.width;
                    //this.vx *= -1;
                    //this.x = -this.x;
                }

                if(this.y > this.canvas.height){
                    this.y -= this.canvas.height;
                    //this.vy *= -1;
                    //this.y = 2*this.canvas.height - this.y;
                }

                if(this.y < 0){
                    this.y += this.canvas.height;
                    // this.vy *= -1;
                    // this.y = -this.y;
                }
            }

            draw(ctx) {
                ctx.save();                
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.drawImage(this.image, -this.radius, -this.radius, this.radius*2, this.radius*2);
                ctx.restore();
                // ctx.beginPath();
                // ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
                // ctx.stroke();
                // ctx.closePath();
                // ctx.fill();
            }
        }