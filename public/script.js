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
  
    // Projects Section Scroll Animation for larger screens
    ScrollTrigger.matchMedia({
        // Default for larger screens
        "(min-width: 768px)": function () {
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

            const menuItems = document.querySelectorAll("#menu-item");
            const sections = document.querySelectorAll("section");

            // Loop through sections and create ScrollTriggers
            sections.forEach((section, idx) => {
              const targetMenuItem = menuItems[idx];
          
              ScrollTrigger.create({
                trigger: section,
                start: "top 50%", // When the section hits the middle of the viewport
                end: "bottom 50%", // When the section leaves the middle of the viewport
                onEnter: () => {
                    menuItems.forEach(item => {
                        item.classList.remove("text-white"); // Remove the text color from all items
                        item.classList.add("text-white"); // Set all items to inactive color
                      });
                      targetMenuItem.classList.remove("text-white"); // Remove inactive color
                      targetMenuItem.classList.add("text-accentColor"); // Set the active item to blue
                    },
                    onLeave: () => {
                      targetMenuItem.classList.remove("text-accentColor"); // Remove active color
                      targetMenuItem.classList.add("text-white"); // Set back to inactive color
                    },
                    onEnterBack: () => {
                      menuItems.forEach(item => {
                        item.classList.remove("text-white"); // Remove the text color from all items
                        item.classList.add("text-white"); // Set all items to inactive color
                      });
                      targetMenuItem.classList.remove("text-white"); // Remove inactive color
                      targetMenuItem.classList.add("text-accentColor"); // Set the active item to blue
                    },
                    onLeaveBack: () => {
                      targetMenuItem.classList.remove("text-accentColor"); // Remove active color
                      targetMenuItem.classList.add("text-white"); // Set back to inactive color
                    },
              });
            });

            // Scroll on navbar click
            menuItems.forEach((menuItem, idx) => {
                menuItem.addEventListener("click", (event) => {
                  event.preventDefault(); // Prevent the default anchor behavior if using <a> tags
              
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                      y: "#section-" + (idx + 1), // Dynamically target the section
                      offsetY: 100,
                      autoKill: true // Stops scrolling if the user interacts mid-scroll
                    },
                    ease: "power2.inOut"
                  });
                });
            });

        },
    

        "(max-width: 767px)": function () {
            gsap.from("#projects", { 
                scrollTrigger: { 
                    trigger: "#projects", 
                    start: "-800% 75%", 
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
        },
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



 
 