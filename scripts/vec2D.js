'use strict';

class vec2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new vec2D(this.x, this.y);
    }

    add(vec) {
        var result = this.clone();
        result.x += vec.x;
        result.y += vec.y;
        return result;
    }
}