import LocomotiveScroll from "locomotive-scroll";
import anime from "animejs/lib/anime.es.js";
import Splitting from "splitting";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import { groupWordsByLineAndWrap } from "./utils";

class Animation {
  constructor() {
    this.timeline = anime.timeline({
      easing: "easeInOutQuint",
    });

    this.initSplt();
    this.initLocomotive();
  }

  initLocomotive() {
    let scroll;
    scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      multiplier: 2,
    });
    new ResizeObserver(() => scroll.update()).observe(
      document.querySelector("[data-scroll-container]"),
    );

    const executedAnimations = new Set();

    scroll.on("scroll", (args) => {
      const scrollY = args.scroll.y;
      if (scrollY > 1000) {
        this.animateFooter();
      } else this.resetFooter();
    });

    scroll.on("call", (func, direction, obj) => {
      if (direction === "enter" && !executedAnimations.has(func)) {
        switch (true) {
          case func.startsWith("animateProcess"):
            const index = func.replace("animateProcess", "");
            this.animateProcess(index);
            break;
          case func === "animateHeader":
            this.animateHeader();
            break;
          case func === "animateServices":
            this.animateServices();
            break;
          case func === "animateSubheader":
            this.animateSubheader();
            break;
          case func === "animateInterested":
            this.animateInterested();
            break;
          case func === "animateBrand":
            this.animateBrand();
            break;
          default:
            console.warn(`Unknown animation function: ${func}`);
        }
        executedAnimations.add(func); // Mark this animation as executed
      }
    });
  }

  initSplt() {
    Splitting();
    groupWordsByLineAndWrap(".subheader");
    groupWordsByLineAndWrap(".brand");
    groupWordsByLineAndWrap(".process-split");
  }

  animateFooter() {
    const tl = anime.timeline({
      easing: "easeInOutQuint",
    });

    tl.add({
      targets: "footer",
      begin: function (anim) {
        document.querySelector("footer").classList.remove("opacity-0");
      },
    });
  }

  resetFooter() {
    document.querySelector("footer").classList.add("opacity-0");
  }

  animateProcess(index) {
    const tl = anime.timeline({
      easing: "easeInOutQuint",
    });

    tl.add({
      targets: `[data-scroll-call="animateProcess${index}"] .process-index .word .char`,
      translateY: [200, 0],
      duration: 1000,
      easing: "easeOutQuint",
      delay: anime.stagger(50),
      begin: function (anim) {
        document
          .querySelector(`[data-scroll-call="animateProcess${index}"]`)
          .classList.remove("opacity-0");
      },
    });

    tl.add(
      {
        targets: `[data-scroll-call="animateProcess${index}"] .process-header .word .char`,
        translateY: [100, 0],
        duration: 1000,
        easing: "easeOutQuint",
        delay: anime.stagger(10),
      },
      "-=900",
    );

    tl.add(
      {
        targets: `[data-scroll-call="animateProcess${index}"] .process-desc .word`,
        translateY: [100, 0],
        duration: 1000,
        easing: "easeOutQuint",
        delay: anime.stagger(4),
      },
      "-=1000",
    );

    tl.add(
      {
        targets: ` [data-scroll-call="animateProcess${index}"] .process-hr`,
        width: ["0%", "100%"],
        delay: anime.stagger(150),
        duration: 2000,
        easing: "easeOutQuint",
      },
      "-=500",
    );
  }

  animateInterested() {
    const tl = anime.timeline({
      easing: "easeInOutQuint",
    });

    tl.add({
      targets: ".interested .word .char",
      translateY: [300, 0],
      duration: 800,
      delay: anime.stagger(8),
      easing: "easeOutQuint",
      begin: function (anim) {
        document.querySelector(".interested").classList.remove("opacity-0");
      },
    });
  }

  animateBrand() {
    const tl = anime.timeline({
      easing: "easeInOutQuint",
    });

    tl.add({
      targets: ".brand .line .word-wrapper .word",
      translateY: [300, 0],
      duration: 800,
      delay: anime.stagger(8),
      easing: "easeOutQuint",
      begin: function (anim) {
        document.querySelector(".brand-wrapper").classList.remove("opacity-0");
      },
    });
  }

  animateServices() {
    const tl = anime.timeline({
      easing: "easeInOutQuint",
    });

    tl.add({
      targets: ".services .header",
      opacity: [0, 1],
      duration: 500,
      begin: function (anim) {
        document.querySelector(".services").classList.remove("opacity-0");
      },
    })
      .add(
        {
          targets: ".services .char",
          translateY: [250, 0],
          duration: 800,
          delay: anime.stagger(8),
          easing: "easeOutQuint",
        },
        "-=300",
      )
      .add(
        {
          targets: ".services .service",
          opacity: [0, 1],
          delay: anime.stagger(30),
          duration: 500,
        },
        "-=900",
      )
      .add(
        {
          targets: ".services hr",
          width: ["0", "100%"],
          delay: anime.stagger(150),
          duration: 2000,
          easing: "easeOutQuint",
        },
        "-=500",
      );
  }

  animateSubheader() {
    const tl = anime.timeline({
      easing: "easeInOutQuint",
    });

    tl.add({
      targets: ".subheader .line .word-wrapper .word",
      translateY: [300, 0],
      duration: 800,
      delay: anime.stagger(12),
      easing: "easeOutQuint",
      begin: function (anim) {
        document.querySelector(".subheader").classList.remove("opacity-0");
      },
    });
  }

  animateHeader() {
    var logEl = document.querySelector(".percentage span");
    var perc = {
      charged: 0,
    };

    this.animateLoading();

    this.timeline
      .add(
        {
          targets: perc,
          charged: 100,
          round: 1,
          duration: 1800,
          update: function () {
            logEl.innerHTML = perc.charged + "%";
          },
        },
        "-=800",
      )
      .add({
        targets: ".percentage span",
        translateY: [0, -450],
        duration: 800,
        easing: "easeInCubic",
      })
      .add({
        targets: ".hero .word .char",
        translateY: [500, 0],
        duration: 750,
        delay: anime.stagger(50),
        easing: "easeOutQuint",
      })
      .add(
        {
          targets: ".who-we-are .line",
          translateY: [60, 0],
          duration: 750,
          delay: anime.stagger(50, { easing: "easeOutQuad" }),
        },
        "-=500",
      );
  }

  animateLoading() {
    this.timeline.add({
      targets: ".loading",
      height: ["100%", 0],
      easing: "easeInOutQuint",
      duration: 1800,
    });
  }
}

new Animation();
