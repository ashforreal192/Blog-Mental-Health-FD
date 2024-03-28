function loco(){
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    }
loco()


gsap.from("#page1 #segment1", {
  x: -600,
  y: -600,
  duration: 1.5,
  // delay: 0,
  // backgroundColor: "#c8b6ff",
  // rotate: 360,
  scale: 0,
  opacity: 0,
  scrub: 2,
  // stagger: 3
})

gsap.from("#page1 #segment2", {
  x: 600,
  y: 600,
  duration: 1.5,
  // delay: 0,
  // backgroundColor: "#c8b6ff",
  // rotate: 360,
  scale: 0,
  opacity: 0,
  scrub: 2,
  // stagger: 3
})


gsap.to("#nav", {
    backgroundColor: "#343a40",
    duration: 1.5,
    // delay: 0.5,
    height: "12vh",
    scrollTrigger: {
        trigger: "#nav",
        scroller: "#main",
        // markers: true,
        start: "top -10%",
        end: "top -30%",
        scrub: 1
    }
})

gsap.from("#page2 #para1", {
    backgroundColor: "#343a40",
    duration: 1,
    // scale: 0,
    opacity: 0,
    x: -500,
    stagger: 2.5,
    // delay: 0.5,
    // height: "12vh",
    scrollTrigger: {
        trigger: "#page2 h1",
        scroller: "#main",
        // markers: true,
        // start: "top -10%",
        // end: "top -30%",
        scrub: 1.5
    }
})

gsap.from("#page2 #para2", {
    backgroundColor: "#343a40",
    duration: 1,
    opacity: 0,
    // scale: 0,
    x: 500,
    stagger: 2.5,
    // delay: 0.5,
    // height: "12vh",
    scrollTrigger: {
        trigger: "#page2 h1",
        scroller: "#main",
        // markers: true,
        // start: "top -10%",
        // end: "top -30%",
        scrub: 1.5
    }
})