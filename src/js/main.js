"use strict";

const _ = require('lodash');
// const Processing = require('processing-js'); // resolve this dependency later

let centerX, centerY,
    pHeight, pWidth,
    mouse_x, mouse_y,
    frameRate = 60,
    walker;

let getRandomInt = (max) => {
    return 0 | Math.random() * max + 1;
};

class Walker {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
        var x = this.x;
        var y = this.y;
        p5.stroke(255, 255);
        p5.strokeWeight(5);

        p5.point(x, y);
        if (this.x % 2 === 0 || this.y % 2 === 0) {
            p5.stroke(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255));
            p5.noFill();
            p5.ellipse(x, y, p5.noise(5) * 50, p5.noise(5) * 50);
            //p5.bezier(x, y, x - 10, y + 10, x + 10, y + 50, x + 10, y);
        }
        p5.point(x + 10, y);
    }

    walk(dir) {
        let cx = getRandomInt(4);
        let cy = getRandomInt(4);
        if (dir === "right") {
            if (cy === 1) {
                this.y--;
            } else if (cx === 2) {
                this.x--;
            } else if (cy === 3) {
                this.y++;
            } else {
                this.x++;
            }
        } else {
            if (cy === 3) {
                this.y++;
            } else if (cx === 2) {
                this.x++;
            } else if (cy === 1) {
                this.y--;
            } else {
                this.x--;
            }
        }
    }

    tick(opts) {
        this.walk(opts.direction);
        this.display(opts.inf);
    }

    stop() {
        this.x = 0;
        this.y = 0;
    }
}

class LFO {
    constructor(max) {
        this.max = max;
    }

    tick() {
        return this.max * Math.sin(p5.radians(Math.PI * p5.frameCount));
    }
}

let lfo1 = new LFO(200);
let lfo2 = new LFO(200);

let drawShape = (x, y) => {
    let n = parseInt(lfo1.tick(), 10);
    let m = parseInt(lfo2.tick(), 10);
    for (let i = 1; i < 10; i++) {
        p5.pushMatrix();
        p5.translate(centerX, 250);
        p5.rotate(10);
        p5.fill(n, 20, i, 77);
        p5.strokeWeight(0.5);
        p5.stroke(120.0);
        p5.bezier(i, i, n, y, i, i * m, x, i);
        p5.popMatrix();
    }
};

let sketchProc = (p5) => {

    const rColor = [p5.random(120, 255), p5.random(120, 255), p5.random(120, 255)];
    //const verde = [220, 247, 238];
    //const azul = [206, 245, 252];
    const fontA = p5.loadFont("/fonts/glyphicons-halfings-regular.tff");

    let rightWalkers = [],
        leftWalkers = [];

    document.body.style.background = `rgb(${rColor.toString()})`;

    _.times(3, i => rightWalkers.push(new Walker(0, -100 * i)));

    _.times(3, i => leftWalkers.push(new Walker(0, -100 * i)));

    p5.setup = () => {
        p5.size(window.innerWidth, window.innerHeight);
        centerX = p5.width / 2;
        centerY = p5.height / 2;
        pWidth = p5.width;
        pHeight = p5.height;
        p5.textFont(fontA, 34);
        p5.frameRate(frameRate);
        p5.smooth();
        p5.background.apply(this, rColor);
        p5.strokeWeight(0.55);
        p5.stroke(120);
        p5.noFill();
        p5.ellipse(pWidth - 60, pHeight - 60, 100, 100);
        p5.fill(0);
        p5.textSize(14);
        p5.text("˚", pWidth - 64, pHeight - 55);
    };

    p5.draw = () => {
        p5.fill.apply(this, rColor);
        p5.pushMatrix();
        p5.translate(centerX, centerY);

        rightWalkers.forEach(w => w.tick({direction: "left", inf: mouse_x * mouse_y}));
        leftWalkers.forEach(w => w.tick({direction: "right"}));

        p5.popMatrix();
        p5.pushMatrix();
        p5.textAlign(100, 400);
        p5.textSize(64);
        p5.stroke(0, 0);
        p5.fill.apply(this, rColor);
        _.times(50, i => p5.text("imm.aterial", 50, i * 28));
        p5.popMatrix();

        // bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
        //p5.bezier(0, centerY, lfo1.tick(), lfo1.tick(), lfo1.tick(), lfo1.tick(), pWidth, centerY);
    };
};

let canvas = document.getElementById("canvas1");
let p5 = new Processing(canvas, sketchProc);
