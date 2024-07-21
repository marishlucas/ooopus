import LocomotiveScroll from "locomotive-scroll";

class SmoothScroll {
  constructor() {
    this.scroll = null;
    this.init();
  }

  init() {
    this.scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });
  }
}

new SmoothScroll();
