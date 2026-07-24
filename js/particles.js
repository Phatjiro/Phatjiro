/* ==========================================================================
   PARTICLES CANVAS BACKGROUND
   ========================================================================== */
function initParticlesBackground() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Set Canvas Size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle Constructor
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1; // particle size (1px to 3px)
            this.speedX = Math.random() * 0.4 - 0.2; // movement speed X
            this.speedY = Math.random() * -0.6 - 0.1; // rise upwards
            this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 255, 170, 0.2)';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Loop particles back when they go off screen
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX = -this.speedX;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    // Populate Particle List
    const numberOfParticles = Math.min(Math.floor(window.innerWidth / 15), 100);
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
    
    // Animation Loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Auto-run if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticlesBackground);
} else {
    initParticlesBackground();
}
