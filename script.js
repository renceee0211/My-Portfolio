import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Lenis from 'lenis';


document.querySelectorAll(".nav-btn .fill").forEach(el => {
      el.classList.add("bg-blue-500"); // Tailwind color
    });

    document.querySelectorAll(".nav-btn").forEach(btn => {
      const fill = btn.querySelector(".fill");
      btn.addEventListener("mouseenter", () => {
        gsap.to(fill, { y: 0, duration: 0.3, ease: "hop" });
        gsap.to(btn,  { scale: 1.1, duration: 0.2, ease: "hop" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(fill, { y: "100%", duration: 0.3, ease: "hop" });
        gsap.to(btn,  { scale: 1, duration: 0.2, ease: "hop" });
      });
    });

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, ScrambleTextPlugin, CustomEase);

    // Lenis
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });


    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // End of Lenis

    // ScrollTo
    document.querySelectorAll("#arrow-button, #aboutBtn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
          gsap.to(window, {duration: 1, scrollTo:"#about-section", ease:'hop'});
        });
      });

    document.querySelectorAll("#workBtn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
          gsap.to(window, {duration: 1, scrollTo:"#explore-section", ease:'hop'});
        });
      });

    document.querySelectorAll("#contactBtn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
          gsap.to(window, {duration: 1, scrollTo:"#cta-section", ease:'hop'});
        });
      });
    

    // SplitText
    document.fonts.ready.then(() => {
      // Hero Animations
      let split = new SplitText("#rence, #subtitle", {type: "words"});
    
      gsap.from(split.words, { 
        duration: 1, 
        opacity: 0,
        y: 100, 
        stagger: 0.2,
        ease: "hop", 
      });

      // CTA SplitText
      let ctasplit = new SplitText('#cta-header', {type: "chars"});

      gsap.timeline({
        scrollTrigger: {
          trigger: '#cta-section',
          start: 'top 60$'
        }
      }).from(ctasplit.chars, {
        x: 150,
        opacity: 0,
        duration: 0.7,
        ease: "power4",
        stagger: 0.04,
      });

    });


    // CustomEase
    CustomEase.create("hop", ".87, 0, .13, 1");

    
  
    gsap.from('#crafted-arrow', { 
      duration: 0.7, 
      opacity: 0, 
      ease: 'hop', 
      stagger: 0.3 
    });
    
    gsap.from('#topnav', { 
      duration: 0.7, 
      opacity: 0, 
      ease: 'hop', 
      stagger: 0.3 
    });

    gsap.to('#bg-glow', { 
      duration: 1, 
      opacity: 1, 
      ease: 'hop', 
    });

    


    gsap.timeline({
      scrollTrigger: {
        trigger: '#crafted-arrow',
        start: 'top 80%',
        end: '60% 50%',
        scrub: true,
      }
    }).to('#crafted-arrow', { 
      y: -100, 
      opacity: 0 
    });
  

    // First section scrolltrigger
    gsap.to("#hero-section", {
      scrollTrigger: {
        trigger: "#about-section",
        start: "top bottom", // when second section starts entering
        end: "top top",      // when it reaches the top
        scrub: true
      },
      opacity: 0,
      scale: 0.9
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


    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: '200% 50%',
        scrub: true,
      }
    }).to('#bg-glow-2', { 
      opacity: 1,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: '200% 50%',
        scrub: true,
      }
    }).to('#bg-glow', { 
      opacity: 0,
    });

    // explore section bg
    gsap.timeline({
      scrollTrigger: {
        trigger: '#explore-section',
        start: 'top 20%',
        ease: 'hop',
      }
    }).to('#explore-bg', { 
      backgroundColor: '#050505'
    });

    // explore text
    gsap.timeline({
      scrollTrigger: {
        trigger: '#explore-section',
        start: 'top 20%',
        delay: 0.5,
        ease: 'hop'
      }
    }).to('#explore', { 
      opacity: 1,
      color: '#F3F2FA'
    });

      // CTA
    gsap.timeline({
      scrollTrigger: {
        trigger: '#cta-section',
        start: 'top 20%',
        end: 'bottom 80%',
        scrub: true
      }
    }).from('#cta-bg', { 
      opacity: 0,
    });

    // CTA Glow
    gsap.timeline({
      scrollTrigger: {
        trigger: '#cta-section',
        start: 'top 50%',
        end: 'bottom 80%',
        scrub: true
      }
    }).from('#bg-gradient', { 
      opacity: 0,
    });

    


    // Poster Scramble Text
    let postertl = gsap.timeline ({
      scrollTrigger: {
        trigger: '#poster-design',
        start: 'top 50%',
        toggleActions: "play none none none"
      }
    });
      postertl.to('#poster-text', {
        duration: 1.8,
        scrambleText:{
          text: "Poster Designs",
          chars: "x0",
          revealDelay: 0.5,
          speed: 1,
        }
      })

      .from('#poster-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
    });

      // Logo Scramble Text
      let logotl = gsap.timeline ({
      scrollTrigger: {
        trigger: '#logo-design',
        start: 'top 50%',
        toggleActions: "play none none none"
      }
    });
      logotl.to('#logo-text', {
        duration: 1.8,
        scrambleText:{
          text: "Logo Designs",
          chars: "x0",
          revealDelay: 0.5,
          speed: 1,
        }
      })

      // .from('.card', {
      //   opacity: 0,
      //   y: -50,
      //   stagger: 0.2
      // })

      .from('#logo-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });


      let merchtl = gsap.timeline ({
      scrollTrigger: {
        trigger: '#merch-design',
        start: 'top 50%',
        toggleActions: "play none none none"
      }
    });
      merchtl.to('#merch-text', {
        duration: 1.8,
        scrambleText:{
          text: "Merch Designs",
          chars: "x0",
          revealDelay: 0.5,
          speed: 1,
        }
      })

      .from('#merch-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });

      let motiontl = gsap.timeline ({
      scrollTrigger: {
        trigger: '#motion-design',
        start: 'top 50%',
        toggleActions: "play none none none"
      }
    });
      motiontl.to('#motion-text', {
        duration: 1.8,
        scrambleText:{
          text: "Motion Design",
          chars: "x0",
          revealDelay: 0.5,
          speed: 1,
        }
      })

      .from('#motion-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });


      let magtl = gsap.timeline ({
      scrollTrigger: {
        trigger: '#magazine',
        start: 'top 50%',
        toggleActions: "play none none none"
      }
    });
      magtl.to('#magazine-text', {
        duration: 1.8,
        scrambleText:{
          text: "Magazines/Newsletters",
          chars: "x0",
          revealDelay: 0.5,
          speed: 1,
        }
      })

      .from('#magazine-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });


      let socmedtl = gsap.timeline ({
      scrollTrigger: {
        trigger: '#socmed',
        start: 'top 50%',
        toggleActions: "play none none none"
      }
    });
      socmedtl.to('#socmed-text', {
        duration: 1.8,
        scrambleText:{
          text: "Social Media Graphics",
          chars: "x0",
          revealDelay: 0.5,
          speed: 1,
        }
      })

      .from('#socmed-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });



    


});