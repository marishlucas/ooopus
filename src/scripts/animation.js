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
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });

    scroll.on("call", (func, direction, obj) => {
      if (func === "animateHeader" && direction === "enter") {
        this.animateHeader();
        this.animateSubheader();
      }
      if (func === "animateServices" && direction === "enter") {
        this.animateServices();
      }
    });
  }

  initSplt() {
    Splitting();
    groupWordsByLineAndWrap(".subheader");
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
          translateY: [100, 0],
          duration: 600,
          delay: anime.stagger(8),
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
        "-=500",
      )
      .add(
        {
          targets: "hr",
          opacity: [0, 1],
          delay: anime.stagger(30),
          duration: 1000,
          easing: "easeOutQuad",
        },
        "-=500",
      );
  }

  animateSubheader() {
    this.timeline.add(
      {
        targets: ".subheader .line .word-wrapper .word",
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(8),
      },
      "-=500",
    );
  }

  animateHeader() {
    var logEl = document.querySelector(".percentage span");
    var perc = {
      charged: 0,
    };

    // Add battery charge animation to the timeline
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
        translateY: [0, -250],
        duration: 500,
      })
      .add({
        targets: ".hero .word .char",
        translateY: [350, 0],
        duration: 750,
        delay: anime.stagger(50),
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
