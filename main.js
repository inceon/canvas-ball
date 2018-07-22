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
let scoreRect = {
	x: 5, y: 5, w: 550, h: 45
};
let gameRect = {
	x: scoreRect.x, y: scoreRect.y + scoreRect.h + 3, 
	w: scoreRect.w, h: 600
};
let endRect = {
	x: gameRect.x, y: gameRect.y + gameRect.h + 3,
	w: gameRect.w, h: 45
};
let to = {};

function drawGameRect() {
	ctx.beginPath();
	ctx.rect(scoreRect.x, scoreRect.y, scoreRect.w, scoreRect.h);
	ctx.rect(gameRect.x, gameRect.y, gameRect.w, gameRect.h);
	ctx.rect(endRect.x, endRect.y, endRect.w, endRect.h);
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
		point.x + radius > gameRect.x + gameRect.w ||
		point.x - radius < gameRect.x
	) {
		point.xn *= -1;
	}
	if(
		point.y - radius < gameRect.y
	) {
		point.yn *= -1;
	}

	if(point.y - radius > gameRect.y + gameRect.h) {
		point.yn = point.xn = 0;
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
	for(let i = 0; i < 60; i++) {
		points.push({
			x: gameRect.x + radius + Math.floor(Math.random() * (gameRect.w - radius - gameRect.x)), 
			y: gameRect.y + radius + Math.floor(Math.random() * (gameRect.h - radius - gameRect.y)),
			xn: 0, 
			yn: 0,
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
		let xdiff = ev.pageX - point.x;
		let ydiff = ev.pageY - point.y
		point.xn = xdiff/Math.sqrt(xdiff**2 + ydiff**2) * 3;
		point.yn = ydiff/Math.sqrt(xdiff**2 + ydiff**2) * 3;
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