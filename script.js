import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Lenis from 'lenis';

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


      // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
      lenis.on('scroll', ScrollTrigger.update);

      // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
      // This ensures Lenis's smooth scroll animation updates on each GSAP tick
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time from seconds to milliseconds
      });

      // Disable lag smoothing in GSAP to prevent any delay in scroll animations
      gsap.ticker.lagSmoothing(0);


    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // End of Lenis

// Preloader
class PortfolioPreloader {
            constructor() {
                this.assets = {
                    fonts: [
                        'https://fonts.cdnfonts.com/css/general-sans',
                        'https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@100..800&display=swap',
                        'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap',
                        // Icon Libraries
                        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
                        'https://kit.fontawesome.com/6372763a06.js'
                    ],
                    images: [
                        '/assets/gwen.jpg',
                        '/assets/maloi.jpg',
                        '/assets/yulo.jpg',
                        '/assets/bianca.jpg',
                        '/assets/michelle.jpg',
                        '/assets/wakanda.jpg'
                    ],
                    // videos: [
                    //     'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    //     'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    //     'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    //     'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                    //     'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
                    // ]
                };
                
                // Add GSAP and Tailwind to the assets
                this.assets.scripts = [
                    'https://cdn.tailwindcss.com',
                    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js'
                ];
                
                this.loadedCount = 0;
                this.totalAssets = this.assets.fonts.length + this.assets.images.length + this.assets.scripts.length;
                
                this.elements = {
                    preloader: document.getElementById('preloader'),
                    mainContent: document.getElementById('mainContent'),
                    progressBar: document.getElementById('progressBar'),
                    percentage: document.getElementById('percentage'),
                    loadingText: document.getElementById('loadingText'),
                    currentAsset: document.getElementById('currentAsset'),
                    totalAssets: document.getElementById('totalAssets'),
                    loadingContainer: document.getElementById('loadingContainer'),
                    logoContainer: document.getElementById('logoContainer')
                };
                
                this.loadingMessages = [
                    'Loading fonts...',
                    'Preparing images...',
                    'Loading videos...',
                    'Initializing scripts...',
                    'Almost ready...',
                    'Finalizing...'
                ];
                
                this.init();
            }

            init() {
                // Set total assets count
                this.elements.totalAssets.textContent = this.totalAssets;
                
                // Initialize GSAP animations
                this.initAnimations();
                
                // Start loading assets
                this.loadAssets();
            }

            initAnimations() {
                // Entrance animation for loading container
                gsap.fromTo(this.elements.loadingContainer, 
                    { y: 50, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
                );

                // Continuous rotation for loader
                gsap.to('.loader-ring', {
                    rotation: 360,
                    duration: 1,
                    repeat: -1,
                    ease: "none"
                });

                // Floating particles animation
                gsap.utils.toArray('.particle').forEach((particle, i) => {
                    gsap.set(particle, {
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                    });
                    
                    gsap.to(particle, {
                        y: "-=100",
                        x: "+=50",
                        duration: 3 + Math.random() * 4,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: Math.random() * 2
                    });
                });
            }

            updateProgress() {
                this.loadedCount++;
                const progress = Math.round((this.loadedCount / this.totalAssets) * 100);
                
                // Animate progress bar
                gsap.to(this.elements.progressBar, {
                    width: progress + '%',
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // Update text with animation
                gsap.to(this.elements.percentage, {
                    innerHTML: progress + '%',
                    duration: 0.2,
                    ease: "none"
                });
                
                // Update current asset count
                this.elements.currentAsset.textContent = this.loadedCount;
                
                // Update loading message
                const messageIndex = Math.min(Math.floor((progress / 100) * this.loadingMessages.length), this.loadingMessages.length - 1);
                if (this.elements.loadingText.textContent !== this.loadingMessages[messageIndex]) {
                    gsap.to(this.elements.loadingText, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            this.elements.loadingText.textContent = this.loadingMessages[messageIndex];
                            gsap.to(this.elements.loadingText, {
                                opacity: 0.9,
                                duration: 0.2
                            });
                        }
                    });
                }
                
                if (this.loadedCount === this.totalAssets) {
                    setTimeout(() => this.hidePreloader(), 800);
                }
            }

            loadFonts() {
                this.assets.fonts.forEach(fontUrl => {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = fontUrl;
                    link.onload = () => this.updateProgress();
                    link.onerror = () => this.updateProgress();
                    document.head.appendChild(link);
                });
            }

            loadImages() {
                this.assets.images.forEach(imageSrc => {
                    const img = new Image();
                    img.onload = () => this.updateProgress();
                    img.onerror = () => this.updateProgress();
                    img.src = imageSrc;
                });
            }

            // loadVideos() {
            //     this.assets.videos.forEach(videoSrc => {
            //         const video = document.createElement('video');
            //         video.preload = 'metadata';
            //         video.onloadedmetadata = () => this.updateProgress();
            //         video.onerror = () => this.updateProgress();
            //         video.src = videoSrc;
            //     });
            // }

            loadScripts() {
                // For demonstration - these are already loaded, so we'll simulate
                this.assets.scripts.forEach(() => {
                    setTimeout(() => this.updateProgress(), Math.random() * 1000);
                });
            }

            loadAssets() {
                this.loadFonts();
                this.loadImages();
                // this.loadVideos();
                this.loadScripts();
            }

            hidePreloader() {
                // Success animation sequence
                const tl = gsap.timeline({
                    onComplete: () => {
                        this.showMainContent();
                    }
                });

                // Scale and fade out the loading container
                tl.to(this.elements.loadingContainer, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in"
                })
                // Slide preloader up and fade out
                .to(this.elements.preloader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut"
                }, "-=0.2");
            }

            showMainContent() {
                // Show main content with staggered animation
                gsap.fromTo(this.elements.mainContent, 
                  { opacity: 0, visibility: 'hidden' },
                  { duration: 0.5, opacity: 1, visibility: 'visible' }
                );

                // gsap.set("#rence, #subtitle", {
                //   opacity: 0,
                //   y: 60,
                // });

                let split = new SplitText("#rence, #subtitle", {type: "chars"});
    
                
                
                const tl = gsap.timeline();
                
                tl.from(split.chars, 
                  { opacity: 0, y: 60, duration: 0.7, ease: "power4", stagger: 0.04, }
                );
                // tl.fromTo(this.elements.mainContent.querySelector('h1'),
                //     { y: 100, opacity: 0 },
                //     { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
                // )
                tl.fromTo(this.elements.mainContent.querySelector('p'),
                    { y: 30, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
                    "-=0.3"
                )
                .fromTo(this.elements.mainContent.querySelector('button'),
                    { y: 30, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
                    "-=0.3"
                );

                // Add debugging
                  console.log('Main content should now be visible');
                  
                  // Small delay to ensure visibility is set, then call animations
                  setTimeout(() => {
                      // Call your existing initGSAP function if it exists
                      if (typeof window.initGSAP === 'function') {
                          console.log('Calling initGSAP function');
                          window.initGSAP();
                      } else if (typeof initGSAP === 'function') {
                          console.log('Calling global initGSAP function');
                          initGSAP();
                      } else {
                          console.log('initGSAP function not found, using fallback animations');
                          // Fallback animations if initGSAP doesn't exist
                          this.fallbackAnimations();
                      }
                  }, 100);
                  
                  // Remove preloader from DOM after animation
                  setTimeout(() => {
                      if (this.elements.preloader) {
                          this.elements.preloader.style.display = 'none';
                      }
                  }, 2000);


            }
        }
        
        





// Hero section
    
// Parallax
    function initPosterGallery() {
        const heroSection = document.querySelector('#hero-section');
        
        // Single layer with your poster designs (6 posters)
        const posterConfig = {
            images: [
                '/assets/gwen.jpg',
                '/assets/maloi.jpg',
                '/assets/yulo.jpg',
                '/assets/bianca.jpg',
                '/assets/michelle.jpg',
                '/assets/wakanda.jpg'
            ],
            className: 'opacity-15 hover:opacity-30 transition-opacity duration-300',
            // Custom sizes for different breakpoints
            sizes: {
                mobile: { width: '64px', height: 'auto' },    // 16 * 4px
                tablet: { width: '96px', height: 'auto' },    // 24 * 4px  
                desktop: { width: '240px', height: 'auto' }  // 32 * 4px
            },
            speed: 0.6,
            zIndex: 0
        };
        
        // Optimized positions for 6 posters with depth layers
        const positions = [
            { left: '8%', top: '15%', layer: 'far' },      // Top left - far layer
            { left: '80%', top: '20%', layer: 'close' },   // Top right - close layer
            { left: '5%', top: '65%', layer: 'mid' },      // Bottom left - mid layer
            { left: '76%', top: '65%', layer: 'far' },     // Bottom right - far layer
            { left: '15%', top: '75%', layer: 'close' },   // Bottom center-left - close layer
            { left: '63%', top: '45%', layer: 'mid' }      // Middle right - mid layer
        ];

        // Define depth layers with different movement intensities
        const depthLayers = {
            far: {
                intensity: 40,        // Subtle movement
                speed: 0.8,
                scale: 0.85,         // Slightly smaller
                opacity: 1,
                blur: '1px'
            },
            mid: {
                intensity: 60,       // Medium movement
                speed: 0.6,
                scale: 1.0,          // Normal size
                opacity: 1,
                blur: '0.5px'
            },
            close: {
                intensity: 80,      // Strong movement
                speed: 0.4,
                scale: 1.15,         // Slightly larger
                opacity: 1,
                blur: '0px'
            }
        };
        
        // Create poster elements with layered effects
        posterConfig.images.forEach((imageSrc, i) => {
            const container = document.createElement('div');
            container.className = 'poster-element absolute pointer-events-none will-change-transform';
            container.style.zIndex = posterConfig.zIndex;
            
            // Get position and layer info
            const posData = positions[i % positions.length];
            const layerData = depthLayers[posData.layer];
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.className = 'object-contain';
            img.alt = `Poster design ${i + 1}`;
            img.loading = 'lazy';
            
            // Apply layer-specific styling
            container.style.opacity = layerData.opacity;
            container.style.transform = `scale(${layerData.scale})`;
            container.style.filter = `blur(${layerData.blur}) drop-shadow(0 4px 8px rgba(0,0,0,0.1))`;
            
            // Store layer data for movement calculations
            container.dataset.layer = posData.layer;
            
            // Apply sizes directly to image
            const applySize = () => {
                const screenWidth = window.innerWidth;
                let size;
                
                if (screenWidth >= 1024) {
                    size = posterConfig.sizes.desktop;
                } else if (screenWidth >= 768) {
                    size = posterConfig.sizes.tablet;
                } else {
                    size = posterConfig.sizes.mobile;
                }
                
                img.style.width = size.width;
                img.style.height = size.height;
            };
            
            // Apply initial size
            applySize();
            
            // Update size on window resize
            window.addEventListener('resize', applySize);
            
            container.appendChild(img);
            
            // Apply positioning (excluding layer property)
            const { layer, ...pos } = posData;
            Object.assign(container.style, pos);
            
            heroSection.appendChild(container);
            
            // Initial state - hide poster
            gsap.set(container, { 
              opacity: 0,
              scale: 0.5
            });



            // Fade in animation with stagger
            gsap.to(container, {
                opacity: layerData.opacity, // Use the layer's target opacity
                duration: 1.5,
                scale: 1,
                delay: i * 0.2, // Stagger each poster by 0.2 seconds
                ease: "power2.out"
            });

            console.log(`Created poster ${i + 1} with layer: ${posData.layer}`); // Debug log

            // Create subtle black overlay for better text contrast
            const overlay = document.createElement('div');
            overlay.className = 'poster-overlay absolute inset-0 pointer-events-none';
            overlay.style.cssText = `
                background: linear-gradient(135deg, 
                    rgba(0, 0, 0, 0.3) 0%, 
                    rgba(0, 0, 0, 0.1) 50%, 
                    rgba(0, 0, 0, 0.2) 100%
                );
                z-index: 5;
                backdrop-filter: blur(0.5px);
            `;
            
            heroSection.appendChild(overlay);
            
            // Fade in the overlay
            gsap.set(overlay, { opacity: 0 });
            gsap.to(overlay, {
                opacity: 1,
                duration: 2,
                delay: 1,
                ease: "power2.out"
            });
        });
        
            // Create individual quickTo functions for each layer
            const layerQuickTos = {};
            
            Object.keys(depthLayers).forEach(layerName => {
                const layerData = depthLayers[layerName];
                layerQuickTos[layerName] = {
                    x: gsap.quickTo(`.poster-element[data-layer="${layerName}"]`, "x", { 
                        duration: layerData.speed, 
                        ease: "power3.out" 
                    }),
                    y: gsap.quickTo(`.poster-element[data-layer="${layerName}"]`, "y", { 
                        duration: layerData.speed, 
                        ease: "power3.out" 
                    }),
                    rotation: gsap.quickTo(`.poster-element[data-layer="${layerName}"]`, "rotation", { 
                        duration: layerData.speed * 1.2, 
                        ease: "power2.out" 
                    })
                };
            });
          
        
            // Layered mouse parallax with different intensities per depth
            window.addEventListener("mousemove", (e) => {
                const { clientX, clientY } = e;
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                // Normalized mouse position (-1 to 1)
                const mouseX = (clientX - centerX) / centerX;
                const mouseY = (clientY - centerY) / centerY;
                
                // Apply different parallax intensity to each layer
                Object.keys(depthLayers).forEach(layerName => {
                    const layerData = depthLayers[layerName];
                    
                    layerQuickTos[layerName].x(mouseX * layerData.intensity);
                    layerQuickTos[layerName].y(mouseY * layerData.intensity);
                    // layerQuickTos[layerName].rotation(mouseX * layerData.rotationIntensity);
                });
            });
    }
    
    // Hero elements - no animations, just ensure visibility
    // function initHeroElements() {
    //     // Make sure all elements are visible without animations
    //     gsap.set(['#rence', '#subtitle', '#crafted-arrow', '#bg-glow'], { 
    //         opacity: 1,
    //         y: 0,
    //         scale: 1
    //     });


    // }
    
    // Arrow interactions
    function initArrowInteraction() {
        const arrowButton = document.querySelector('#arrow-button');
        
        // Continuous pulse
        gsap.to(arrowButton, {
            scale: 1.2,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power4"
        });
        
        // Hover effects
        arrowButton.addEventListener('mouseenter', () => {
            gsap.to(arrowButton, {
                scale: 1.3,
                rotation: 10,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        arrowButton.addEventListener('mouseleave', () => {
            gsap.to(arrowButton, {
                scale: 1.1,
                rotation: 0,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        arrowButton.addEventListener('click', () => {
            gsap.to(arrowButton, {
                scale: 0.9,
                duration: 0.1,
                ease: "power2.inOut",
                yoyo: true,
                repeat: 1
            });
        });
    }







function initGSAP() {
  let mm = gsap.matchMedia();
  
  // CustomEase
  CustomEase.create("hop", ".87, 0, .13, 1");

  // Use ResizeObserver to detect layout changes
  const resizeObserver = new ResizeObserver(() => {
    ScrollTrigger.refresh();
  });

  // Observe elements that might change size
  resizeObserver.observe(document.body);

  mm.add({
    isDesktop: "(min-width: 1024px)",
    isMobile: "(max-width: 767px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  }, (context) => {
    let { isDesktop, isMobile } = context.conditions;



    // Animations for all Devices
    // Hero Animations
    // CTA SplitText
    let ctasplit = new SplitText('#cta-header', {type: "chars"});
    let cta = gsap.timeline ({
      scrollTrigger: {
        trigger: '#cta-section',
        start: 'top 40%'
      },
      toggleActions: "play none none none"
    });
    cta.from(ctasplit.chars, {
        y: -80,
        opacity: 0,
        duration: 0.7,
        ease: "power4",
        stagger: 0.04,
    });


    // Explore SplitText
    let exploresplit = new SplitText('#explore', {type: "chars"});
    let explore = new gsap.timeline({
      scrollTrigger: {
        trigger: '#explore',
        start: 'top 80%',
      }
    });
        
    explore.from(exploresplit.chars, {
      y: 150,
      opacity: 0,
      duration: 0.7,
      ease: "power4",
      stagger: 0.04,
    })

    .from('#explore-arrow',{
        opacity: 0,
    });

    // gsap.from('#crafted-arrow', { 
    //   duration: 0.7, 
    //   y: 80,
    //   opacity: 0, 
    //   stagger: 0.7,
    //   ease: 'hop', 
    // });
    
    // gsap.from('#topnav', { 
    //   duration: 0.7, 
    //   opacity: 0, 
    //   ease: 'hop', 
    //   stagger: 0.3 
    // });

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

    // Poster Scramble Text
    gsap.set('#poster-text', { 
        scrambleText: { text: "#######" }
      });
      let postertl = gsap.timeline({
        scrollTrigger: {
          trigger: '#poster-text',
          start: 'top 50%',
          toggleActions: "play none none none"
        }
      });
        postertl.to('#poster-text', {
          duration: 1.8,
          scrambleText:{
            text: "Poster Design",
            chars: "x0",
            revealDelay: 0.5,
            speed: 1,
          },
          ease: "power4"
        })
      // 👇 next animations run AFTER scramble finishes
      .from('#poster-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });


      // Logo Scramble Text
      gsap.set('#logo-text', { 
        scrambleText: { text: "#######" }
      });
      let logotl = gsap.timeline({
        scrollTrigger: {
          trigger: '#logo-text',
          start: 'top 50%',
          toggleActions: "play none none none"
        }
      });

      logotl.to('#logo-text', {
        duration: 1.8,
        scrambleText:{
          text: "Logo Design",
          chars: "x0",
          revealDelay: 0.5,
          speed: 1,
        },
        ease: "power4"
      })
      // 👇 next animations run AFTER scramble finishes
      .from('#logo-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });




      // Merch Scramble Text
      gsap.set('#merch-text', { 
        scrambleText: { text: "#######" }
      });
      let merchtl = gsap.timeline({
        scrollTrigger: {
          trigger: '#merch-text',
          start: 'top 50%',
          toggleActions: "play none none none"
        }
      });

      merchtl.to('#merch-text', {
        duration: 1.8,
        scrambleText:{
          text: "Merch Design",
          chars: "x0",
          revealDelay: 0.5,
          speed: 1,
        },
        ease: "power4"
      })

      .from('#merch-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });
      
      // Motion Scramble Text
      gsap.set('#motion-text', { 
        scrambleText: { text: "#######" }
      });
      let motiontl = gsap.timeline({
        scrollTrigger: {
          trigger: '#motion-text',
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
        },
        ease: "power4"
      })
      // 👇 next animations run AFTER scramble finishes
      .from('#motion-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });


      // Magazine Scramble Text
      gsap.set('#magazine-text', { 
        scrambleText: { text: "#######" }
      });
      let magtl = gsap.timeline({
        scrollTrigger: {
          trigger: '#magazine-text',
          start: 'top 50%',
          toggleActions: "play none none none"
        }
      });

      magtl.to('#magazine-text', {
        duration: 1.8,
        scrambleText:{
          text: "Magazine/Newsletters",
          chars: "x0",
          revealDelay: 0.5,
          speed: 1,
        },
        ease: "power4"
      })
      // 👇 next animations run AFTER scramble finishes
      .from('#magazine-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });


     // SocMed Scramble Text
      gsap.set('#socmed-text', { 
        scrambleText: { text: "#######" }
      });
      let socmedtl = gsap.timeline({
        scrollTrigger: {
          trigger: '#socmed-text',
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
        },
        ease: "power4"
      })
      // 👇 next animations run AFTER scramble finishes
      .from('#socmed-arrow', {
          opacity: 0,
          x: -50,
          stagger: 0.3,
      });




    // Desktop animations
    if (isDesktop) {
            initPosterGallery();
            // initHeroElements();
            initArrowInteraction();


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
                end: '150% 50%',
                scrub: true,
              }
            }).to('#bg-glow-2', { 
              opacity: 1,
            });

            gsap.timeline({
              scrollTrigger: {
                trigger: '#hero-section',
                start: 'top top',
                end: '150% 50%',
                scrub: true,
              }
            }).to('#bg-glow', { 
              opacity: 0,
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

          let worktogether = new SplitText('#cta-subtext', {type: "chars"});
            let subtext = gsap.timeline ({
                scrollTrigger: {
                  trigger: '#cta-subtext',
                  start: 'top 65%'
                },
                toggleActions: "play none none none"
            });
              subtext.from(worktogether.chars, {
                opacity: 0,
                duration: 0.4,
                ease: "power4",
                stagger: 0.04,
            });
    } else if (isMobile) {
            // Simple animations for mobile (no poster gallery to avoid clutter)
            // initHeroElements();
            initArrowInteraction();
    }
            
  });

          
} 











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
    


document.querySelectorAll('#cta-button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      scale: 1.1,
      rotation: 2,
      duration: 0.3,
      color: "white",
      backgroundColor: "#4891CE",
      ease: "back.out(1.7)"
    });
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      color: "black",
      backgroundColor: "white",
      ease: "back.out(1.7)"
    });
  });
  
  // Magnetic follow effect
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(button, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3
    });
  });
});


const ctaTl = gsap.timeline({ 
  scrollTrigger: {
    trigger: '#cta-button',
    start: 'top 70%'
  }
});

ctaTl
  .set('#cta-button', { 
    transformPerspective: 1000,
    transformStyle: "preserve-3d" 
  })
  .from('#cta-button', {
    rotationY: -90,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)"
  })
  .to('#cta-button', {
    scrambleText: {
      text: "Let's Talk!",
      chars: "lowerCase",
      revealDelay: 0.3
    },
    duration: 1.5
  }, "-=0.5");



// Make it available globally for the preloader
window.initGSAP = initGSAP;





 // Initialize preloader when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new PortfolioPreloader();
        });

        // Fallback: Hide preloader after 15 seconds
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            const mainContent = document.getElementById('mainContent');
            if (preloader && !preloader.classList.contains('hidden')) {
                gsap.to(preloader, { opacity: 0, duration: 0.5 });
                // gsap.set(mainContent, { duration: 0.5, opacity: 1, visibility: 'visible' });
            }
        }, 15000);



        // Only run automatically if there's no preloader
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!document.getElementById('preloader')) {
            initGSAP();
        }
    });
} else {
    if (!document.getElementById('preloader')) {
        initGSAP();
    }
}

  