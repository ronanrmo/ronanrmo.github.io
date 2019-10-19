'use strict';

class planet
{
    constructor(x, y, radius, mass, image, canvas, ctx) {
        this.x = x;
        this.y = y;
        this.vx = 0.0;
        this.vy = 0.0;
        this.radius = radius;
        this.mass = mass;
        this.G = 6.674e-11;
        this.image = image;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    move(control, amount) {
        this.vx -= control.leftPressed * amount;
        this.vx += control.rightPressed * amount;
        this.vy -= control.upPressed * amount;
        this.vy += control.downPressed * amount;
    }

    update(force, elapsed) {
        this.vx += force.x*elapsed*0.00001;
        this.vy += force.y*elapsed*0.00001;
        this.x += this.vx*elapsed;
        this.y += this.vy*elapsed;

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

    getGravity(ship) {
        return this.getGravityAt(ship.x, ship.y, ship.mass);
    }

    getGravityAt(x, y, mass) {
        let dx = (this.x - x);
        let dy = (this.y - y);
        let r2 = dx*dx + dy*dy;
        r2 = r2 != 0.0 ? r2 : 1.0;
        let d = Math.sqrt(r2);
        let g = this.G*((this.mass*mass) / r2);

        return new vec2D(dx * g / d, dy * g / d);
    }

    draw(ctx) {
        this.ctx.drawImage(this.image, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
    }
}