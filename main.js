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
let to = {};

function init() {
	points.push({
		x: 50, y: 50
	});
}

canvas.onclick = (ev) => {
	to.x = ev.pageX;
	to.y = ev.pageY;
	console.log(to);	
}

function raf() {
	time += 0.1;


	for (let point of points) {
		ctx.beginPath();
		ctx.arc(
			point.x, 
			point.y, 
			radius, 
			0, 
			2*Math.PI
		);

		if(to.x && to.y) {
			point.x += (to.x - point.x) * 0.09;
			point.y += (to.y - point.y) * 0.09;
		}


		ctx.stroke();
		ctx.closePath();
	}

	window.requestAnimationFrame(raf);
}

init();
raf();