const BUBBLE_DENSITY = 50; 

const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];

function generateDecimalBetween(left, right) {
  return (Math.random() * (left - right) + right).toFixed(2);
}

class Bubble {
    constructor(canvas) {
        this.canvas = canvas;
        this.init();
    }

    init() {
        this.color = this.getRandomColor();
        this.alpha = generateDecimalBetween(0.3, 0.8);
        this.size = Math.random() * 20 + 10;
        this.x = Math.random() * (this.canvas.width - 2 * this.size) + this.size;
        this.y = this.canvas.height + this.size;
        this.velocity = generateDecimalBetween(20, 40);
        this.movementX = generateDecimalBetween(-2, 2) / this.velocity;
        this.movementY = generateDecimalBetween(1, 20) / this.velocity;
        this.translateX = this.x;
        this.translateY = this.y;
    }

    getRandomColor() {
        const randomIndex = Math.floor(Math.random() * COLORS.length);
        return COLORS[randomIndex];
    }

    move() {
        this.translateX -= this.movementX;
        this.translateY -= this.movementY;

    if (this.translateY < -this.size || this.translateX < -this.size || this.translateX > this.canvas.width + this.size) {
        this.init();
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.translateX, this.translateY, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
    }
}

class CanvasBackground {
    constructor(id) {
        this.canvas = document.getElementById(id);
        if (!this.canvas) {
        console.error(`Canvas with ID "${id}" not found.`);
        return;
    }
    this.ctx = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio;
    this.resize();
    }

    resize() {
        const width = this.canvas.offsetWidth * this.dpr;
        const height = this.canvas.offsetHeight * this.dpr;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.scale(this.dpr, this.dpr);
    }

    generateBubbles() {
        this.bubblesList = [];
        for (let i = 0; i < BUBBLE_DENSITY; i++) {
        this.bubblesList.push(new Bubble(this.canvas));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bubblesList.forEach(bubble => {
        bubble.move();
        bubble.draw(this.ctx);
        });
        requestAnimationFrame(this.animate.bind(this));
    }

    start() {
        this.generateBubbles();
        this.animate();
    }
}

const canvasBackground = new CanvasBackground('orb-canvas');
canvasBackground.start(); 