import gsap from 'gsap/dist/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
var cascadingTimeline = new gsap.timeline({
    scrollTrigger: {
      trigger: "#cascading-cards",
      // pin: "#hero-grill-content",
      start: "top center",
      end: "bottom bottom",
      scrub: 0.5,
      markers: true
    }
  }
);

cascadingTimeline
  .addLabel('entry')
  .from('#card-1', {
    yPercent: 20,
    opacity: 0
  }, 'card1')
  .from('#card-2', {
    yPercent: 20,
    opacity: 0
  })
  .from('#card-3', {
    yPercent: 20,
    opacity: 0
  })






