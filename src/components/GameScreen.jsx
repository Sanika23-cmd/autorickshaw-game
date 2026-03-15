import { useEffect, useRef, useState } from "react";

import autoImg from "../assets/auto.png";
import carImg from "../assets/car.png";
import busImg from "../assets/bus.png";
import dogImg from "../assets/dog.png";
import coinImg from "../assets/coin.png";
import fuelImg from "../assets/fuel.png";

function GameScreen(){

const canvasRef = useRef(null);
const [gameStats,setGameStats] = useState(null);
const [restart,setRestart] = useState(0);

useEffect(()=>{

const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");

let auto = new Image();
auto.src = autoImg;

let car = new Image();
car.src = carImg;

let bus = new Image();
bus.src = busImg;

let dog = new Image();
dog.src = dogImg;

let coin = new Image();
coin.src = coinImg;

let fuelObj = new Image();
fuelObj.src = fuelImg;

let autoX = 180;
let autoY = 500;

let lanes=[120,180,240];

let roadOffset = 0;

let speed = 5;

let score=0;
let coinsCollected=0;
let fuel=100;

let gameOver=false;

let signalTimer=0;
let signalState="green";

let signalBaseY = 250;

let traffic=[
 {x:lanes[Math.floor(Math.random()*3)],y:-100,type:"car"},
 {x:lanes[Math.floor(Math.random()*3)],y:-300,type:"bus"}
];

let dogs=[{x:lanes[Math.floor(Math.random()*3)],y:-400}];
let coins=[{x:lanes[Math.floor(Math.random()*3)],y:-200}];
let fuels=[{x:lanes[Math.floor(Math.random()*3)],y:-500}];

let rainDrops = Array.from({length:100},()=>({
 x:Math.random()*400,
 y:Math.random()*600
}));

function drawGame(){

ctx.clearRect(0,0,400,600);

if(gameOver){

let highScore = localStorage.getItem("highScore") || 0;

if(score>highScore){
localStorage.setItem("highScore",score);
}

setGameStats({
score,
coinsCollected,
fuel,
highScore:localStorage.getItem("highScore")
});

return;
}

score++;
fuel-=0.03;

if(fuel<=0) gameOver=true;

roadOffset+=speed;

if(roadOffset>600) roadOffset=0;

//// SIGNAL TIMER
signalTimer++;

if(signalTimer>350){
signalState = signalState==="green" ? "red":"green";
signalTimer=0;
}

let signalY = (signalBaseY + roadOffset) % 600;

//// GRASS
ctx.fillStyle="#4CAF50";
ctx.fillRect(0,0,100,600);
ctx.fillRect(300,0,100,600);

//// TREES
for(let i=0;i<5;i++){

let y=(i*140+roadOffset)%600;

ctx.fillStyle="#6d4c41";
ctx.fillRect(60,y,6,20);

ctx.fillStyle="#2e7d32";
ctx.beginPath();
ctx.arc(63,y-5,16,0,Math.PI*2);
ctx.fill();

ctx.fillStyle="#6d4c41";
ctx.fillRect(335,y,6,20);

ctx.fillStyle="#2e7d32";
ctx.beginPath();
ctx.arc(338,y-5,16,0,Math.PI*2);
ctx.fill();
}

//// BUILDINGS
ctx.fillStyle="#616161";

for(let i=0;i<4;i++){

let y=(i*160+roadOffset)%600;

ctx.fillRect(10,y,30,80);
ctx.fillRect(360,y+20,30,80);

for(let w=0;w<3;w++){

ctx.fillStyle="#fff176";

ctx.fillRect(15,y+10+w*20,6,8);
ctx.fillRect(25,y+10+w*20,6,8);

ctx.fillRect(365,y+30+w*20,6,8);
ctx.fillRect(375,y+30+w*20,6,8);

}
}

//// ROAD
ctx.fillStyle="#616161";
ctx.fillRect(100,roadOffset,200,600);
ctx.fillRect(100,roadOffset-600,200,600);

//// ZEBRA CROSSING
ctx.fillStyle="white";

for(let i=0;i<8;i++){
ctx.fillRect(100 + i*25, signalY ,15,10);
}

//// TRAFFIC SIGNAL
ctx.fillStyle="black";
ctx.fillRect(80,signalY-30,10,40);

ctx.fillStyle = signalState==="red" ? "red":"#555";
ctx.beginPath();
ctx.arc(85,signalY-20,5,0,Math.PI*2);
ctx.fill();

ctx.fillStyle = signalState==="green" ? "lime":"#555";
ctx.beginPath();
ctx.arc(85,signalY-5,5,0,Math.PI*2);
ctx.fill();

//// RAIN
ctx.strokeStyle="lightblue";

rainDrops.forEach(drop=>{

ctx.beginPath();
ctx.moveTo(drop.x,drop.y);
ctx.lineTo(drop.x,drop.y+10);
ctx.stroke();

drop.y+=8;

if(drop.y>600){
drop.y=0;
drop.x=Math.random()*400;
}
});

//// TRAFFIC
traffic.forEach(v=>{

let img = v.type==="car"?car:bus;

let stopLine = signalY - 50;

if(!(signalState==="red" && v.y > stopLine && v.y < signalY)){
v.y += speed;
}

ctx.drawImage(img,v.x,v.y,40,60);

if(v.y>600){
v.y=-100;
v.x=lanes[Math.floor(Math.random()*3)];
}

if(
autoX < v.x+40 &&
autoX+40 > v.x &&
autoY < v.y+60 &&
autoY+60 > v.y
){
gameOver=true;
}

});

//// DOGS
dogs.forEach(d=>{

ctx.drawImage(dog,d.x,d.y,40,40);

d.y+=speed;

if(d.y>600){
d.y=-200;
d.x=lanes[Math.floor(Math.random()*3)];
}

if(
autoX < d.x+40 &&
autoX+40 > d.x &&
autoY < d.y+40 &&
autoY+60 > d.y
){
gameOver=true;
}

});

//// COINS
coins.forEach(c=>{

ctx.drawImage(coin,c.x,c.y,30,30);

c.y+=speed;

if(c.y>600){
c.y=-100;
c.x=lanes[Math.floor(Math.random()*3)];
}

if(
autoX < c.x+30 &&
autoX+40 > c.x &&
autoY < c.y+30 &&
autoY+60 > c.y
){
coinsCollected++;
score+=200;
c.y=-100;
}

});

//// FUEL
fuels.forEach(f=>{

ctx.drawImage(fuelObj,f.x,f.y,30,40);

f.y+=speed;

if(f.y>600){
f.y=-300;
f.x=lanes[Math.floor(Math.random()*3)];
}

if(
autoX < f.x+30 &&
autoX+40 > f.x &&
autoY < f.y+40 &&
autoY+60 > f.y
){
fuel=100;
f.y=-300;
}

});

//// PLAYER
ctx.drawImage(auto,autoX,autoY,40,60);

//// HUD
ctx.fillStyle="rgba(0,0,0,0.5)";
ctx.fillRect(0,0,120,70);

ctx.fillStyle="white";
ctx.font="16px Arial";

ctx.fillText("Score: "+score,10,20);
ctx.fillText("Fuel: "+Math.floor(fuel),10,40);
ctx.fillText("Coins: "+coinsCollected,10,60);

requestAnimationFrame(drawGame);

}

drawGame();

document.addEventListener("keydown",(e)=>{
if(e.key==="ArrowLeft") autoX-=20;
if(e.key==="ArrowRight") autoX+=20;
});

},[restart]);

if(gameStats){

return(

<div style={{
textAlign:"center",
marginTop:"50px",
background:"#1e1e2f",
color:"white",
padding:"40px",
borderRadius:"15px",
width:"400px",
margin:"50px auto",
boxShadow:"0px 10px 30px rgba(0,0,0,0.5)"
}}>

<h1 style={{color:"#ff5252"}}>🏁 GAME OVER</h1>

<h2>Final Score: {gameStats.score}</h2>
<h3>🪙 Coins Collected: {gameStats.coinsCollected}</h3>
<h3>⛽ Fuel Remaining: {Math.floor(gameStats.fuel)}</h3>

<h2 style={{color:"#ffd740"}}>
🏆 Highest Score: {gameStats.highScore}
</h2>

<button
style={{
padding:"12px 25px",
fontSize:"18px",
marginTop:"20px",
background:"#ff5252",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
onClick={()=>{
setGameStats(null);
setRestart(prev=>prev+1);
}}
>
Restart Game
</button>

</div>

);

}

return(

<div style={{textAlign:"center",marginTop:"20px"}}>

<h2>🚕 Autorickshaw Odyssey</h2>

<canvas
ref={canvasRef}
width="400"
height="600"
style={{
border:"3px solid black",
borderRadius:"12px",
boxShadow:"0px 10px 20px rgba(0,0,0,0.4)"
}}
/>

</div>

);

}

export default GameScreen;