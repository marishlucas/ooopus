import anime from "animejs/lib/anime.es.js";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import groupWordsByLineAndWrap from "./utils";

class Animation {
  constructor() {
    this.initSplt();
    this.animateHeader();
  }

  initSplt() {
    Splitting();
    groupWordsByLineAndWrap(".subheader");
  }

  animateHeader() {
    var tl = anime.timeline({
      easing: "easeInOutQuint",
    });

    // Define the log element and battery object
    var logEl = document.querySelector(".percentage span");
    var perc = {
      charged: 0,
    };

    // Add battery charge animation to the timeline
    tl.add({
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

    tl.add(
      {
        targets: ".subheader .line .word-wrapper .word",
        translateY: [30, 0],
        duration: 500,
        delay: anime.stagger(10),
      },
      "-=500",
    );
  }
}

new Animation();
