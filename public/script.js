document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
    // Intro Animations
    gsap.from("#rence", { 
      duration: 1, 
      y: '100%', 
      ease: 'power2.inOut' 
    });
    gsap.to("#rence", { 
      duration: 1.5, 
      opacity: 1, 
      ease: 'power2.inOut' 
    });
  
    gsap.from("#subtitle", { 
      duration: 1, 
      y: '150%', 
      opacity: 0, 
      ease: 'power2.inOut', 
      delay: 1 
    });
  
    gsap.from('#topnav', { 
      duration: 0.7, 
      opacity: 0, 
      ease: 'power1.inOut', 
      stagger: 0.3 
    });
  
    // Navbar Scroll Animation
    gsap.to('#navbar', {
      scrollTrigger: {
        trigger: '#navbar',
        start: 'top 0',
        end: 'top -30%',
        scrub: true,
      },
      backgroundColor: '#282828', // Navbar background color change
    });
  
    // Rence Picture Scroll Animation
    gsap.timeline({
      scrollTrigger: {
        trigger: '#rencePic',
        start: '-100% 75%',
        end: '60% 75%',
        scrub: true,
      }
    }).from('#rencePic', { 
      y: 200, 
      opacity: 0 
    });
  
    // About Section Scroll Animation
    gsap.from("#aboutContainer", { 
      scrollTrigger: { 
        trigger: "#aboutContainer", 
        start: "-100% center", 
        end: "60% 75%", 
        scrub: true, 
      }, 
      opacity: 0, 
      y: 200 
    });
  
    // Projects Section Scroll Animation
    gsap.from("#projects", { 
      scrollTrigger: { 
        trigger: "#projects", 
        start: "-500% 25%", 
        end: "400% 75%", 
        scrub: true, 
      },
      stagger: {
        from: "start",
        amount: 0.5    // Total time for stagger distribution
        }, 
      ease: 'power2.inOut',
      opacity: 0, 
      y: 250 
    });
  });
  


// document.addEventListener("DOMContentLoaded", (event) => {

//   gsap.registerPlugin(ScrollTrigger)
//   gsap.registerPlugin(ScrollToPlugin)

//   gsap.from("#rence",{duration: 1, y: '100%', ease: 'power2.inOut'})
//   gsap.to("#rence",{duration: 1.5, opacity: '100%', ease: 'power2.inOut'})

//   gsap.from("#subtitle",{duration: 1, y: '150%', ease: 'power2.inOut', delay: 1})
//   gsap.from("#subtitle",{duration: 1.5, opacity: 0, ease: 'power2.inOut', delay: 1})

//   gsap.from('#topnav',{duration: 0.7, opacity: 0, ease: 'power1.inOut', stagger: .3})

  
// gsap.to('#navbar', {
//     scrollTrigger: {
//         trigger: '#navbar',
//         start: 'top 0',
//         end: 'top -30%',
//         scrub: true,
//         lazy: true,
//     },
//     backgroundColor: '#282828', // Target color in RGBA format
// });

//     let tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: '#rencePic',
//             start: '-100% 75%',
//             end: '60% 75%',
//             scrub: true,
//             markers: false,
//         }
//     })

//     tl.from('#rencePic', {
//     y: 200,
//     opacity: 0
//     })

//     gsap.from("#aboutContainer", { 
//         scrollTrigger: { 
//             trigger: "#aboutContainer", 
//             start: "-100% center", 
//             end: "60% 75%", 
//             scrub: true, 
//             stagger: true,
//             markers: false
//         }, 
//         opacity: 0, 
//         y: 200 
//     });


//     gsap.from("#projects", { 
//         scrollTrigger: { 
//             trigger: "#projects", 
//             start: "-500% 25%", 
//             end: "400% 75%", 
//             scrub: true, 
//             markers: false
//         }, 
//         ease: 'power2.inOut',
//         stagger: {
//             from: "start",
//             amount: 0.5    // Total time for stagger distribution
//         },
//         opacity: 0, 
//         y: 250 
//     });

//  });


 



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



 
 