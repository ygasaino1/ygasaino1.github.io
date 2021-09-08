let bg, bday;
let globalScale = 1;
let cnv;

let balloons = [];
let count = 100;
let imgList = [];

function preload() {
    bg = loadImage('bg.png');
    for (let i = 0; i < count; i++) {
        imgList.push(createImg('balloon.png', "bday"));
    }
}

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);

    globalScale = height / bg.height;
    bg.resize(bg.width * globalScale, bg.height * globalScale);
    cnv.parent('bg');
    cnv.style('z-index', '9999');

    textSize(15);
    textStyle(BOLD);
    for (let i = 0; i < count; i++) {
        balloons.push(new Balloon(imgList[i]));
    }
    balloons.forEach(raptor => {
        print(raptor.objScale);
    });
}

function draw() {
    clear();
    imageMode(CENTER);
    // image(bg, width / 2, height / 2);
    balloons.forEach(balloon => {
        balloon.update();
        balloon.display();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    globalScale = height / bg.height;
    bg.resize(bg.width * globalScale, bg.height * globalScale);
}

function Balloon(imgEle) {
    this.loca = createVector(width / 2, height / 2);
    this.vel = p5.Vector.random2D().mult(5);
    this.size = 30;
    this.objScale = random(0.2, 1);
    this.vel = this.vel.mult(1 - this.objScale);
    this.flip = false;
    this.ploc = this.loca;
    this.img = imgEle;
}
Balloon.prototype.update = function() {
    if (this.loca.x > width - this.size * this.objScale || this.loca.x < this.size * this.objScale) {
        this.vel.x *= -1;
    }
    if (this.loca.y > height - this.size * this.objScale || this.loca.y < this.size * this.objScale) {
        this.vel.y *= -1;
    }
    this.ploc = this.loca.copy();
    this.loca.add(this.vel);
    if (this.loca.x >= this.ploc.x) { this.flip = true; } else { this.flip = false; }
}
Balloon.prototype.display = function() {
    let style;
    if (this.flip) {
        style = "transform: scale(" + this.objScale * -1 + "," + this.objScale + ")";
    } else {
        style = "transform: scale(" + this.objScale + "," + this.objScale + ")";
    }
    this.img.style(style);
    this.img.position(this.loca.x - this.img.width / 2, this.loca.y - this.img.height / 2);
}