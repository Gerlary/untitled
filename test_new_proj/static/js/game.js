
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = 900;
const HEIGHT = 600;
const HALF_WIDTH = WIDTH / 2
const HALF_HEIGHT = HEIGHT / 2
const FPS = 60
let TILE = 75


const FOV = Math.PI / 3
const HALF_FOV = FOV / 2
const NUM_RAYS = 120
const MAX_DEPTH = 800
const DELTA_ANGLE = FOV / NUM_RAYS
const DIST = NUM_RAYS / (2 * Math.tan(HALF_FOV))
const PRO_CAFF = 3 * DIST * TILE
const SCALE = WIDTH // NUM_RAYS


let player_pos = [HALF_WIDTH, HEIGHT-50 ]
let player_angle = -1.57
const player_speed = 5


let text_map = [
    'WWWWWWWWWWWW',
    'W......W...W',
    'W..WWW...W.W',
    'W....W..WW.W',
    'W..W....W..W',
    'W..W...WWW.W',
    'W....W.....W',
    'WWWWWWWWWWWW'
]

let world_map =new Set();
let open_map =[[75,75],[150,150]];
for (let i = 0; i<8;i++)
{
    for(let j = 0; j<12;j++)
    {
        if (text_map[i][j] === 'W')
            world_map.add([j*TILE,i*TILE])
        if(text_map[i][j] ==='.')
            open_map.push([j*TILE,i*TILE])
    }

}

let dir = '';
function direction(event)
{
    if (event.keyCode === 65)
        dir = 'A';
    else if (event.keyCode === 68)
        dir = 'D';
    else if (event.keyCode === 83)
        dir = 'S';
    else if (event.keyCode === 87)
        dir = 'W';
    else if (event.keyCode === 37)
        dir = 'left';
    else if (event.keyCode === 32)
        dir = 'space';
    else if (event.keyCode === 39)
        dir = 'right';

}
document.addEventListener("keydown",direction);

let x = player_pos[0];
let y = player_pos[1];
function rect(color,x1,y1,w,h) {
    ctx.fillStyle = color;
    ctx.fillRect(x1,y1,w,h);
}
function line(x1,y1,len,angle) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1+len*Math.cos(angle), y1+len*Math.sin(angle));
    ctx.stroke();

}
function random(max) {
    return Math.floor(Math.random()*max)
}
class asteroid{
    constructor(color,x,y,w,h) {
        this.color = color;
        this.x = x;
        this.y = y-50;
        this.w = w;
        this.h = h;
    }
    draw() {
        rect(this.color,this.x,this.y,this.w,this.h);
    }
    next(){
        this.y += 2;

    }
}
let asteroids = [];
let timer = 100;

class peew{
    constructor(color,x,y,w,h) {
        this.color = color;
        this.x = x+15;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 10;
    }
    draw()
    {
       rect(this.color,this.x,this.y,this.h,this.w);
    }
    update(asteroids)
    {
        this.y -= this.speed;

    }
}

function check(asteroids,peew_list)
{
    for (let i = 0; i<asteroids.length;i++) {
        if (asteroids[i].y > 600){
            asteroids.splice(i,1);
            life -=1;
            continue;
        }
        for (let j = 0; j < peew_list.length; j++) {
            if (peew_list[j].y <=0) {
                peew_list.splice(j, 1);
                break;
            }
            if ((0<=peew_list[j].x - asteroids[i].x && peew_list[j].x - asteroids[i].x   <= asteroids[i].w) || (0<=asteroids[i].x-peew_list[j].x && asteroids[i].x-peew_list[j].x<=peew_list[j].w))
            {
               if ((0<=peew_list[j].y - asteroids[i].y && peew_list[j].y - asteroids[i].y  <= asteroids[i].w) || (0<=asteroids[i].y-peew_list[j].y && asteroids[i].y-peew_list[j].y <=peew_list[j].w))
                {
                    asteroids.splice(i, 1);
                    peew_list.splice(j, 1);
                    score ++;
                    break;
                }
            }
        }
    }
}
let life = 20;
let score = 0;
peew_list = [];
ctx.font = "16px Verdana";

function draw(mask) {
    rect("black", 0, 0, WIDTH, HEIGHT);
    rect("green",x, y, 50, 50);
    line(x+25,y+25,50,player_angle);
    ctx.strokeStyle = "white";
    ctx.fillText(life,20,20)
    ctx.fillText(score,700,20);
    let j = 0;
    if (timer ===100){
        j = random(10);
        timer = 0;
    }
    timer ++;
    for (let i = 0; i<j;i++)
    {
        let wh = random(open_map.length);
        asteroids.push(new asteroid("blue",open_map[wh][0],open_map[wh][1],16,16));

    }
    j = 0;
    for(let i of asteroids)
    {
        i.next();
        i.draw();
    }
    for(let i of peew_list)
    {
        i.update(asteroids);
        i.draw();
    }
    check(asteroids,peew_list);
    if (dir ==='A') {
        x += -player_speed ;
    }

    if (dir ==='D') {
        x += player_speed ;
    }
    if(dir ==='space')
        peew_list.push(new peew('white',x,y,15,15));

    dir = '';
}


let game = setInterval(draw,60);

//rect(ctx,50,50,150,150);
//ctx.stroke();
