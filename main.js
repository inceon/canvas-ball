let canvas = document.createElement('canvas');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');

let time = 0;
let points = [];
let radius = 20;
let gameRect = {
	x: 10, y: 10, w: 550, h: 650
}
let to = {};

function drawGameRect() {
	ctx.beginPath();
	ctx.rect(gameRect.x, gameRect.y, gameRect.w, gameRect.h);
	ctx.stroke();
	ctx.closePath();
}

function drawLine() {
	ctx.beginPath();
	ctx.moveTo(
		gameRect.x + gameRect.w/2,
		gameRect.y + gameRect.h
	);

	ctx.lineTo(
		Math.max(gameRect.x, Math.min(to.x, gameRect.x+gameRect.w)), 
		Math.max(gameRect.y, Math.min(to.y, gameRect.y+gameRect.h))
	);
	ctx.stroke();
	ctx.closePath();
}

function checkColision(point) {

	if(
		point.x + radius >= gameRect.x + gameRect.w ||
		point.x - radius < gameRect.x
	) {
		point.xn *= -1;
	}
	if(
		point.y + radius >= gameRect.y + gameRect.h ||
		point.y - radius < gameRect.y
	) {
		point.yn *= -1;
	}

}

function drawBalls() {
	for (let point of points) {
		ctx.beginPath();
		ctx.arc(
			point.x, 
			point.y, 
			radius, 
			0, 
			2*Math.PI
		);

		point.x += point.xn;
		point.y += point.yn;
		checkColision(point);

		ctx.strokeStyle = point.color;
		ctx.fillStyle = point.color;
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.closePath();
	}
}

function init() {
	for(let i = 0; i < 20; i++) {
		points.push({
			x: gameRect.x + radius + Math.floor(Math.random() * (gameRect.w - radius - gameRect.x)), 
			y: gameRect.y + radius + Math.floor(Math.random() * (gameRect.h - radius - gameRect.y)),
			xn: Math.random()*4 + 1.5, 
			yn: Math.random()*5 + 1.5,
			color: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
		});
	}
}

canvas.onmousemove = (ev) => {
	to.x = ev.pageX;
	to.y = ev.pageY;
}

canvas.onclick = (ev) => {
	for (let point of points) {
		point.toX = ev.pageX;
		point.toY = ev.pageY;
	}	
}

function raf() {
	time += 0.1;

	ctx.clearRect(0,0,width,height);

	drawGameRect();
	drawBalls();
	drawLine();

	window.requestAnimationFrame(raf);
}

init();
raf();