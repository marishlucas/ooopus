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
    });
    new ResizeObserver(() => scroll.update()).observe(
      document.querySelector("[data-scroll-container]"),
    );

    const executedAnimations = new Set();

    scroll.on("call", (func, direction, obj) => {
      if (direction === "enter" && !executedAnimations.has(func)) {
        switch (func) {
          case "animateHeader":
            this.animateHeader();
            break;
          case "animateServices":
            this.animateServices();
            break;
          case "animateSubheader":
            this.animateSubheader();
            break;
          // case "animateBrand":
          //   this.animateBrand();
          //   break;
        }
        executedAnimations.add(func); // Mark this animation as executed
      }
    });
  }

  initSplt() {
    Splitting();
    groupWordsByLineAndWrap(".subheader");
    groupWordsByLineAndWrap(".brand");
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
          targets: "hr",
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

    this.timeline
      .add({
        targets: perc,
        charged: 100,
        round: 1,
        duration: 1800,
        update: function () {
          logEl.innerHTML = perc.charged + "%";
        },
      })
      .add({
        targets: ".percentage span",
        translateY: [0, -450],
        duration: 800,
        easing: "easeInCubic",
      })
      .add({
        targets: ".hero .word .char",
        translateY: [400, 0],
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
}

new Animation();
