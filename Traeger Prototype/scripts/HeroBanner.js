export default function heroBanner() {
  if (document.readyState === 'loading') {  // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', doSomething);
  } else {  // `DOMContentLoaded` has already fired
    setTimeout(function(){
      document.getElementById('hero-banner').classList.add('active');
    },300);

  }
}
