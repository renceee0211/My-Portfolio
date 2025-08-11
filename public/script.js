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
  
    gsap.from('#crafted-arrow', { 
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


    gsap.timeline({
      scrollTrigger: {
        trigger: '#crafted-arrow',
        start: 'top 80%',
        end: '60% 50%',
        scrub: 0.5,
      }
    }).to('#crafted-arrow', { 
      y: -100, 
      opacity: 0 
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

    // About Me
    gsap.timeline({
      scrollTrigger: {
        trigger: '#about-me',
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: true,
      }
    }).from('#about-me', { 
      x: 50, 
      opacity: 0 
    });
 
    // About Text
    gsap.timeline({
      scrollTrigger: {
        trigger: '#about-text',
        start: 'top 90%',
        end: 'bottom 50%',
        scrub: true,
      }
    }).from('#about-text', { 
      x: 100, 
      opacity: 0 
    });

    // Softwares
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: 'top 90%',
        end: '50% 20%',
        scrub: true,
      }
    }).from('#software', { 
      scale: 0,
    });


    // BSIT Grad
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: '80% 90%',
        end: '110% 60%',
        scrub: true,
        markers: true,
      }
    }).from('#info-1', { 
      y: 50, 
      rotation: -10,
      opacity: 0 
    });

    // BSIT Grad Arrow
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: '80% 90%',
        end: '125% 70%',
        scrub: true,
      }
    }).from('#arrow-1', { 
      y: 50,
      rotation: -35, 
      opacity: 0 
    });
  
    // Fave Supe
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: '50% 90%',
        end: '100% 70%',
        scrub: true,
      }
    }).from('#info-2', { 
      y:-50,
      rotation: -25, 
      opacity: 0 
    });

      // Spiderman
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: '40% 90%',
        end: '100% 70%',
        scrub: true,
      }
    }).from('#spiderman', { 
      y:-50,
      rotation: 35, 
      opacity: 0 
    });


    // BINI
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: '40% 90%',
        end: '100% 70%',
        scrub: true,
      }
    }).from('#bini', { 
      y:50,
      x:-80,
      rotation: 35, 
      opacity: 0 
    });

    // Aura
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: '30% 90%',
        end: '90% 70%',
        scrub: true,
      }
    }).from('#aura', { 
      y:20,
      x:-80,
      rotation: 35, 
      opacity: 0 
    });

    // XG
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: '20% 90%',
        end: '80% 70%',
        scrub: true,
      }
    }).from('#xg', { 
      x:-100,
      rotation: -35, 
      opacity: 0 
    });

    // AMPM
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: '10% 90%',
        end: '70% 70%',
        scrub: true,
      }
    }).from('#ampm', { 
      y:-20,
      x:-120,
      rotation: -35, 
      opacity: 0 
    });

    // Open-Genre
       gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: 'top 90%',
        end: '60% 70%',
        scrub: true,
      }
    }).from('#open-genre', { 
      scale: 0,
      x:-80,
      rotation: -35, 
      opacity: 0 
    });

  });
  

  gsap.utils.toArray(".particle").forEach((p) => {
  gsap.fromTo(p,
    { y: "100vh", opacity: 0 },
    {
      y: "-10vh",
      opacity: 1,
      repeat: -1,
      duration: gsap.utils.random(8, 15),
      ease: "none",
      delay: gsap.utils.random(0, 5)
    }
  );
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



 
 