//TODO
//for further UI
// https://github.com/loneboarder/p5.experience.js
//https://github.com/bitcraftlab/p5.gui
//https://github.com/generative-light/p5.scribble.js

//TOUCH GUI
//https://github.com/L05/p5.touchgui
// early work but good to look at for touch interactions on mobile
//it works great actually
//https://editor.p5js.org/L05/sketches/LWfA8lGwe

'use strict';
let hasBegun = false;

let isPressed = false;

var startTime = new Date();
var lastTouched = getElapsed();
var normMouseX;
var normMouseY;
// var drawScale = 0.2;
var offset = [ 0, 0 ];
let isLoading = true;
let loadStartTime;
let splashHue;

function windowResized() {
	// if (instrumentImage.isLoaded && maskImage.isLoaded) {
	let uiOffset = 35;

	// drawScale = windowWidth / instrumentImage.width;
	// if (windowWidth > windowHeight) {
	// drawScale = windowHeight / instrumentImage.height;
	// }

	// let xOffset = windowWidth / 2;
	// xOffset -= instrumentImage.width * drawScale / 2;
	// let yOffset = windowHeight / 2;
	// yOffset -= instrumentImage.height * drawScale / 2 + uiOffset;

	// offset = {
	// x: xOffset,
	// y: yOffset
	// };

	if (!isLoading) {
		canvas.style('z-index', -1);
		isLoading = false;
	}

	resizeCanvas(windowWidth, windowHeight);
	// }
}

//INSTRUMENT LOADING
// function loadInstrument() {
// instrumentImage = loadImage('instruments/' + instruments[currentInstrument].id + '.png', () => {
// instrumentImage.isLoaded = true;
// windowResized();
// });
// maskImage = loadImage('instruments/' + instruments[currentInstrument].id + '_mask.png', () => {
// maskImage.resize(maskImage.width / maskImageScale, maskImage.height / maskImageScale);
// maskImage.loadPixels();
// maskImage.isLoaded = true;
// windowResized();
// });
// document.getElementById('info').innerHTML =
// instruments[currentInstrument].title + '\nby\n' + instruments[currentInstrument].name;
// }

///SETUP
function setup() {
	console.log('hi');
	pixelDensity(1);
	isLoading = true;
	loadStartTime = millis();
	splashHue = random(360);

	// Create the canvas
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);

	//resize window to init
	windowResized();
}

//SPLASH SCREEN
function drawSplash() {
	// console.log('splash');
	canvas.style('z-index', 10);
	colorMode(HSB);
	background(splashHue, 50, 100, 1);
	colorMode(RGB);

	fill(255);
	strokeWeight(0);
	textAlign(CENTER, CENTER);
	textSize(40);

	if (isLoading) {
		text('loading...', windowWidth / 2, windowHeight / 2);
	}
	else if (!hasBegun) {
		splashHue += deltaTime * 0.1;
		splashHue %= 360;
		text("🤘\nTouch to rock", windowWidth / 2, windowHeight / 2);
	}
}

///DRAW
function draw() {
	update();

	if (isLoading || !hasBegun) {
		drawSplash();
	}
	else {
		clear();
		// fill(255);

		if (mouseX > 10 && mouseX < width - 10 && (mouseY > 10 && mouseY < height - 10)) {
			let ellipseWidth = mouseIsPressed ? 70 : 0;
			stroke(240, 100);
			strokeWeight(5);
			// fill(currentColor);
			ellipse(mouseX, mouseY, ellipseWidth);
		}
	}
}

///UPDATE
function update() {
	// if (Tone.context.state != 'running') {
	// 	console.log('starting tone.js');
	// 	Tone.start();
	// }
	// if (isPressed) {
	// }
	if (millis() - loadStartTime > 1700) {
		isLoading = false;
	}
}

///ONTOUCH
function go() {
	if(!hasBegun){
		hasBegun = true;
	}
	else{
		canvas.style('z-index', -1);
		colorMode(HSB);
		background(splashHue, 50, 100, 1);
		colorMode(RGB);

		isPressed = true;
		lastTouched = getElapsed();
		console.log('go at ' + lastTouched + 'ms');
	}
}

///ON RELEASE
function stop() {
	isPressed = false;
	// console.log('stop after ' + (getElapsed() - lastTouched) + 'ms');
}

//fuse touches and mouse clicks
function mousePressed() {
	go();
}

function touchStarted() {
	go();
}
function mouseReleased() {
	stop();
}

function touchEnded() {
	stop();
}

// document.getElementById('button-next').onclick = loadNext;
// document.getElementById('button-prev').onclick = loadPrev;

// Listen for orientation changes
window.addEventListener(
	'orientationchange',
	function() {
		// Announce the new orientation number
		// alert(window.orientation);
		console.log('orientation change');
		windowResized();
	},
	false
);
