/* Carousel Slider */
const carouselSlider = element => {
    let carousel = document.getElementById("carousel"),
      carouselSlides = Array.from(carousel.querySelectorAll(".carousel__item"));
    controls(carousel, carouselSlides, element.keyboard, Math.max(1000,element.delay));
  };
  
  const controls = (carousel, carouselSlides, keyboard, delay) => {
    let prevControl = carousel.querySelector(".carousel__control--prev"),
      nextControl = carousel.querySelector(".carousel__control--next"),
      indicators = carousel.querySelector(".carousel__indicators"),
      lastIndex = 0,
      currentIndex = 0,
      mouseEnter = false,
      direction,
      direction2,
      interval;
  
    const autoSlide = () => {
      interval = setInterval(() => {
        lastIndex = currentIndex;
        currentIndex = ++currentIndex % carouselSlides.length;
        translate(
          carousel,
          currentIndex,
          lastIndex,
          carouselSlides,
          "next",
          "left"
        );
      }, delay);
    };
  
    autoSlide();
  
    const clearInterv = () => {
      clearInterval(interval);
    };
  
    const arrowKeys = () => {
      window.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") {
          prevControl.click();
        } else if (e.key === "ArrowRight") {
          nextControl.click();
        }
      });
  
      window.addEventListener("keyup", e => {
        clearInterv();
        autoSlide(); 
        if (mouseEnter) {
          console.log(mouseEnter);   
          clearInterv();
        }
      });
    };
  
    if (JSON.parse(keyboard)) {
      arrowKeys();
    }
  
    carousel.addEventListener("mouseenter", (e) => {     
      mouseEnter = true;
      clearInterv();
    });
  
    carousel.addEventListener("mouseleave", () => {
      mouseEnter = false;
      autoSlide();
    });
  
    prevControl.addEventListener("click", () => {
      if (carousel.dataset.flag === "true") return;
      direction = "prev";
      direction2 = "right";
      lastIndex = currentIndex;
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = carouselSlides.length - 1;
      }
  
      translate(
        carousel,
        currentIndex,
        lastIndex,
        carouselSlides,
        direction,
        direction2
      );
    });
  
    nextControl.addEventListener("click", () => {
      if (carousel.dataset.flag === "true") return;
      direction = "next";
      direction2 = "left";
      lastIndex = currentIndex;
      currentIndex = ++currentIndex % carouselSlides.length;
  
      translate(
        carousel,
        currentIndex,
        lastIndex,
        carouselSlides,
        direction,
        direction2
      );
    });
  
    indicators.addEventListener("click", e => {
      let target = e.target;
  
      if (target.tagName === "LI") {
        if (
          carousel.dataset.flag === "true" ||
          target.classList.contains("active")
        ) {
          return;
        }
        lastIndex = currentIndex;
        currentIndex = target.dataset.slideTo;
  
        if (lastIndex > currentIndex) {
          direction = "prev";
          direction2 = "right";
        } else if (lastIndex < currentIndex) {
          direction = "next";
          direction2 = "left";
        }
  
        translate(
          carousel,
          currentIndex,
          lastIndex,
          carouselSlides,
          direction,
          direction2,
          target
        );
      }
    });
  };
  
  const translate = (
    carousel,
    currentIndex,
    lastIndex,
    carouselSlides,
    direction,
    direction2,
    delay
  ) => {
    carousel.dataset.flag = true;
  
    carouselSlides[currentIndex].classList.add(
      "active",
      `carousel__item--${direction}`
    );
  
    const animDirection = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          carouselSlides[lastIndex].classList.add(
            `carousel__item--${direction2}`
          );
          carouselSlides[currentIndex].classList.add(
            "active",
            `carousel__item--${direction}`,
            `carousel__item--${direction2}`
          );
          resolve();
        }, 100);
      });
    };
  
    animDirection().then(() => {
      setTimeout(() => {
        carouselSlides[lastIndex].classList.remove(
          "active",
          `carousel__item--${direction}`,
          `carousel__item--${direction2}`
        );
        carouselSlides[currentIndex].classList.remove(
          `carousel__item--${direction}`,
          `carousel__item--${direction2}`
        );
        carousel.dataset.flag = false;
      }, 700);
    });
  
    activeIndicators(carousel, currentIndex);
  };
  
  const activeIndicators = (carousel, currentIndex) => {
    let indicators = Array.from(
      carousel.querySelectorAll(".carousel__indicators li")
    );
    indicators.filter(
      indicator =>
        indicator === indicators[currentIndex]
          ? indicator.classList.add("active")
          : indicator.classList.remove("active")
    );
  };
  
  carouselSlider({
    keyboard: "true", 
    delay: 5000 
  });
