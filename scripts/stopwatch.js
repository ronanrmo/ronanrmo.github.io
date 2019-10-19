'use-strict'
class stopwatch
{
    constructor() {
        this.startTime = performance.now();
    }

    start() {
        this.startTime = performance.now();
    }

    elapsed() {
        return performance.now() - this.startTime;
    }
}