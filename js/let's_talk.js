$(function(){
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function rand(min, max) {
		return min + Math.random() * (max - min);
}

function HSLA() {
	this.get_random_hsla_color();
}
HSLA.prototype.get_random_hsla_color = function() {
		this.h = rand(1, 360);
		this.s = rand(0, 100);
		this.l = rand(70, 90);
		this.a = (Math.random() * (0.9 - 0.4) + 0.4).toFixed(2);
}
HSLA.prototype.alpha = function(alpha) {
	this.a = alpha;
	return this;
}
HSLA.prototype.toString = function() {
	return 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
}

function Layer() {
		this.incrementY = -(Math.random() * (0.8 - 0.2) + 0.2).toFixed(2);
		this.radius = Math.floor(Math.random() * 25) + 10;
}

function Bubble() {
		this.init();
		// put randomly on screen only the first time 
		this.y = Math.floor(Math.random() * ((canvas.height / 2) - this.layer.radius) + this.layer.radius);
}
Bubble.prototype.init = function() {
		this.layer = new Layer();
		this.y = canvas.height + this.layer.radius;
		this.x = Math.floor(Math.random() * ((canvas.width / 2) - this.layer.radius) + this.layer.radius);
		this.color = new HSLA();
};
Bubble.prototype.draw = function(context) {
		context.beginPath();

		var radgrad = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.layer.radius);
		radgrad.addColorStop(0.1, this.color.alpha(1).toString());
		radgrad.addColorStop(0.6, this.color.alpha(.8).toString());
		radgrad.addColorStop(1, this.color.alpha(0).toString());

		// draw shape
		context.fillStyle = radgrad;
		context.arc(this.x, this.y, this.layer.radius, 0, 2 * Math.PI, false);
		context.fill();
};

function drawFps(context, fps) {
		context.fillStyle = "#EEE";
		context.font = "10px Georgia";
		context.textAlign = "right";
		context.fillText("current fps: " + fps.toFixed(2), canvas.width - 15, canvas.height - 15);
}

function animate(context) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i <= bubbles.length - 1; i++) {
				var b = bubbles[i];
				if (b.y + b.layer.radius < 0)
						b.init();

				b.y = (b.y + b.layer.incrementY) % canvas.width;
				b.draw(context);
		};

		frameCounter++;
		fps = (Date.now() - startTime) / frameCounter;

		requestAnimationFrame(function() {
				animate(context);
				// drawFps(context, fps);
		});
}

if (canvas.getContext) {

		var myRequestAnimationFrame = window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback) {
						window.setTimeout(callback, 10);
				};
		window.requestAnimationFrame = myRequestAnimationFrame;

		var context = canvas.getContext('2d');
		context.globalCompositeOperation = 'normal';

		var frameCounter = 0;
		var fps = 0;
		var startTime = -1;

		// color, layer, x, y, radius
		var bubbles = [];
		var i = 0;
		while (i++ < 20)
				bubbles.push(new Bubble());

		window.onload = function() {
				startTime = Date.now();
				animate(context);
		};
}

window.addEventListener('resize', function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
}, false);

 // Floating Contact Widget Trigger
 $(".amg-floating-icon").on("mouseenter", function(){
    $(this).closest(".amg-floating-contact-wrap").addClass("hover")
  });
  $(".amg-floating-contact-wrap").on("mouseleave", function(){
    $(this).removeClass("hover");
  });

  $(".logo").click(function(){
    if ($(".nav-top").hasClass("open")) {
      $(".nav-top").removeClass("open");
    } else {
      $(".nav-top").addClass("open");
    }
  });

})
