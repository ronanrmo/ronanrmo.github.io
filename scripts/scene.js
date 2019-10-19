'use strict';

class scene
{
    constructor(ships, planets, control, ctx) {
        this.ships = ships;
        this.planets = planets;
        this.ctx = ctx;
        this.control = control;
        this.score = this.ships.length;
        this.stopwatch = new stopwatch();
        this.finished = false;
        this.gameOver = false;
        this.stopwatch.start();
        this.fpsWatch = new stopwatch();
        this.fpsWatch.start();
    }

    update(elapsedtime) {
        const elapsed = 16.66666666666;

        for(let ship of this.ships) {
            if (ship.alive == false)
                continue;

            let g = new vec2D(0, 0);
            for(let i=0; i<this.planets.length; i++) {
                let planet = this.planets[i];
                if(ship.tryCollision(planet)) {
                    this.score--;
                    if(i == 0)
                        this.gameOver = true;
                    if (this.score <= 0)
                        this.finished = true;
                }

                g = g.add(planet.getGravity(ship));
            }

            ship.update(g, elapsed);
        }

        // updating planet to planet force
        let g = new vec2D(0, 0);
        for(let i = 1; i<this.planets.length; i++) {
            if(planets[0].tryCollision(planets[i])) {
                this.gameOver = true;
            }
            g = g.add(planets[i].getGravity(planets[0]));
        }

        this.planets[0].move(this.control, 0.01);
        planets[0].update(g, elapsed);
    }
 
    draw() {
        let fps = 1000.0/this.fpsWatch.elapsed();
        this.fpsWatch.start();
        //this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(universeImage, 0, 0, canvas.width, canvas.height);

        for(let ship of this.ships) {
            if(ship.alive)
                ship.draw(this.ctx);
        }

        for(let planet of this.planets) {
            planet.draw(this.ctx);
        }

        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "left";
        this.ctx.fillText("Time: " + (this.stopwatch.elapsed() / 1000.0).toFixed(2) + "s", 40, 35);
        this.ctx.textAlign = "left";
        this.ctx.fillText("Score: " + this.score, 500, 35);

        this.ctx.textAlign = "left";
        this.ctx.fillText("FPS: " + fps.toFixed(0), 800, 35);

        if (this.finished) {
            this.ctx.textAlign = "center";
            this.ctx.fillText("Success!   " + (this.stopwatch.elapsed() / 1000.0).toFixed(2) + "s", canvas.width/2.0, canvas.height/2.0);
            this.ctx.fillText("<Press Space to Restart>", canvas.width/2.0, canvas.height/2.0 + 40);
        }
        else if(this.gameOver) {
            this.ctx.textAlign = "center";
            this.ctx.fillText("Game Over!!", canvas.width/2.0, canvas.height/2.0);
            this.ctx.fillText("<Press Space to Restart>", canvas.width/2.0, canvas.height/2.0 + 40);
        }
        else {
            this.ctx.font = "30px Comic Sans MS";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "left";
            this.ctx.fillText("Time: " + (this.stopwatch.elapsed() / 1000.0).toFixed(2) + "s", 40, 35);
            this.ctx.textAlign = "left";
            this.ctx.fillText("Score: " + this.score, 500, 35);
        }

    }
}