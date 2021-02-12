import gsap from 'gsap/dist/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
var heroGrillTimeline = new gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-grill",
      // pin: "#hero-grill-content",
      start: "top center",
      end: "bottom center",
      scrub: 0.5,
      // markers: true
    }
  }
);


heroGrillTimeline
  .addLabel('start')
  .from('#hero-grill-content', {
    translateY: 50,
    opacity: 0,
    duration: 1
  })
  .delay(4)
  .addLabel('smoke')
  .from('#hero-smoke-1', {
    bottom: '-80%',
    duration: 3,
    right: '-10%',
  }, 'smoke')
  .from('#hero-smoke-2', {
    bottom: '-100%',
    left: '-10%',
    scaleY: .5,
    duration: 3
  }, 'smoke')
  .to('#hero-grill-content', {
    opacity: 0,
    scale: 1.2,
    duration: 1,
    delay: 2
  },
    'smoke');






