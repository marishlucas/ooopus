import { useEffect, useState } from "preact/hooks";

const ScrollableItems = () => {
  const speed = 0.5;
  const items = [
    { title: "DEDICATION. DEDICATION.", speed: speed, position: "bottom" },
    { title: "EXCELLENCE. EXCELLENCE.", speed: -speed, position: "left" },
    { title: "GROWTH. GROWTH. GROWTH.", speed: speed, position: "bottom" },
    { title: "INNOVATION. INNOVATION.", speed: -speed, position: "left" },
    { title: "CREATIVITY. CREATIVITY.", speed: speed, position: "bottom" },
  ];
  const desktopItems = items.slice(0, 3);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsToRender = isMobile ? items : desktopItems;

  useEffect(() => {
    if (isMobile) {
      const itemElements = document.querySelectorAll("[data-scroll-mobile]");

      const scrollListener = () => {
        const scrollPosition = window.scrollY;
        itemElements.forEach((item) => {
          const index = item.getAttribute("data-index");
          const speed = itemsToRender[index].speed;
          item.style.transform = `translateX(${scrollPosition * speed * 0.1}px)`;
        });
      };

      window.addEventListener("scroll", scrollListener);

      return () => {
        window.removeEventListener("scroll", scrollListener);
      };
    }
  }, [isMobile, itemsToRender]);

  return (
    <div class="bg-white w-screen overflow-hidden flex flex-col gap-8 p-4 sm:p-8 pt-16">
      <h4 class="text-2xl font-medium">Our Mission.</h4>
      <div
        class={`flex flex-col items-container ${isMobile ? "items-center pr-24" : "items-end"}`}
        id="itemsContainer"
      >
        {itemsToRender.map((item, index) => (
          <p
            key={item.title}
            data-scroll-mobile
            data-scroll
            data-scroll-offset="-20%"
            data-scroll-position={item.position}
            data-scroll-speed={item.speed}
            data-scroll-direction="horizontal"
            data-index={index}
            class="text-right text-stone-900 text-7xl leading-none pl-16 sm:text-[12rem] xl:text-[16rem] font-oswald font-bold text-nowrap"
          >
            {item.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ScrollableItems;
