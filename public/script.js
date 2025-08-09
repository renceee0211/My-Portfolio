document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
    // Intro Animations
    gsap.from("#rence", { 
      duration: 1.5, 
      opacity: 0,
      y: 100, 
      ease: 'power2.inOut' 
    });
  
    gsap.from("#subtitle", { 
      duration: 1.5, 
      y: '120%', 
      opacity: 0, 
      ease: 'power2.inOut', 
      delay: 0.5, 
      stagger: 0.3
    });
  
    gsap.from('#crafted', { 
      duration: 0.7, 
      opacity: 0, 
      ease: 'power1.inOut', 
      stagger: 0.3 
    });
    
    gsap.from('#topnav', { 
      duration: 0.7, 
      opacity: 0, 
      ease: 'power1.inOut', 
      stagger: 0.3 
    });
  
    
  
    // Rence Picture Scroll Animation
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: '-50% 75%',
        end: '60% 50%',
        scrub: true,
      }
    }).from('#rencePic', { 
      x: -200, 
      opacity: 0 
    });


    gsap.timeline({
      scrollTrigger: {
        trigger: '#crafted-arrow',
        start: 'top 80%',
        end: '60% 50%',
        scrub: 0.5,
        stagger: true,
       
      }
    }).to('#crafted-arrow', { 
      y: -100, 
      opacity: 0 
    });
  
    gsap.timeline({
      scrollTrigger: {
        trigger: '#about-me',
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: true,
      }
    }).from('#about-me', { 
      x: -50, 
      opacity: 0 
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '#about-text',
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: true,
        markers: true,
      }
    }).from('#about-text', { 
      x: -100, 
      opacity: 0 
    });
   
  });
  



 const lenis = new Lenis({
 duration: 1.2,
 easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
 direction: 'vertical', // vertical, horizontal
 gestureDirection: 'vertical', // vertical, horizontal, both
 smooth: true,
 mouseMultiplier: 1,
 smoothTouch: false,
 touchMultiplier: 2,
 infinite: false,
 })


 function raf(time) {
 lenis.raf(time)
 requestAnimationFrame(raf)
 }

 requestAnimationFrame(raf)



 
 