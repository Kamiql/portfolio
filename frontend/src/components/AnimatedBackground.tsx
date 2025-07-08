import { useRef, useEffect } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Canvas context not available");
      return;
    }

    let animationFrameId: number;
    let isActive = true;

    class Star {
      x: number;
      y: number;
      size: number;
      brightness: number;
      speed: number;
      phase: number;
      private canvasWidth: number;
      private canvasHeight: number;

      constructor(width: number, height: number) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.brightness = 0;
        this.speed = 0;
        this.phase = 0;
        this.reset();
      }

      reset() {
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = Math.random() * 1.5 + 0.5;
        this.brightness = Math.random() * 0.5 + 0.1;
        this.speed = Math.random() * 0.005 + 0.001;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.phase += this.speed;
        this.brightness = Math.sin(this.phase) * 0.5 + 0.5;

        if (
          this.x < 0 ||
          this.x > this.canvasWidth ||
          this.y < 0 ||
          this.y > this.canvasHeight
        ) {
          this.reset();
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fill();
      }
    }

    let stars: Star[] = [];
    let starCount = 0;

    const calculateStarCount = () => {
      return Math.min(500, Math.floor((canvas.width * canvas.height) / 500));
    };

    const createStars = () => {
      starCount = calculateStarCount();
      return Array.from(
        { length: starCount }, 
        () => new Star(canvas.width, canvas.height)
      );
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = createStars();
    };

    const animate = () => {
      if (!isActive) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const star of stars) {
        star.update();
        star.draw(ctx);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    const handleVisibilityChange = () => {
      isActive = !document.hidden;
      if (isActive) {
        animate();
      }
    };

    resizeCanvas();
    animate();
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isActive = false;
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
}