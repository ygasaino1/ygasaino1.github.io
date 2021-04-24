let bg, bday;
let globalScale = 1;
let cnv;
let loc_x, loc_y;
let ploc_x, ploc_y;
let vel_x, vel_y;

let bday_w, bday_h;

function preload() {
    bg = loadImage('bg.png');
    bday = loadImage('bday.png');
}

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);

    globalScale = height / bg.height;
    bg.resize(bg.width * globalScale, bg.height * globalScale);
    cnv.parent('bg');
    cnv.style('z-index', '9999');

    loc_x = width / 2;
    loc_y = height / 2;
    vel_x = 3;
    vel_y = 5;
    ploc_x = loc_x;
    ploc_y = loc_y;

    bday_w = bday.width;
    bday_h = bday.height;
}

function draw() {
    if (loc_x + 20 > width || loc_x - 20 < 0) {
        vel_x = vel_x * -1;
    }
    if (loc_y + 20 > height || loc_y - 20 < 0) {
        vel_y = vel_y * -1;
    }
    ploc_x = loc_x;
    ploc_y = loc_y;

    loc_x += vel_x;
    loc_y += vel_y;
    clear();
    imageMode(CENTER);
    image(bg, width / 2, height / 2);

    let flip = false;
    push()
    if (loc_x >= ploc_x) {
        loc_x *= -1;
        scale(-1, 1);
        image(bday, loc_x, loc_y);
        loc_x *= -1;
    } else {
        image(bday, loc_x, loc_y);
    }

    pop();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    globalScale = height / bg.height;
    bg.resize(bg.width * globalScale, bg.height * globalScale);
}