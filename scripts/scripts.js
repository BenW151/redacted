//* Burger Menu
document.addEventListener("DOMContentLoaded", function () {
  function toggleMenu() {
    var navigationItems = document.querySelector(".navigation-items");
    var burgerIcon = document.querySelector(".burger-menu");
    navigationItems.classList.toggle("nav-open");
    burgerIcon.classList.toggle("active");
  }

  const burgerMenu = document.querySelector(".burger-menu");
  if (burgerMenu) {
    burgerMenu.addEventListener("click", toggleMenu);
  } else {
    console.error("Burger menu element not found.");
  }

  const navItems = document.querySelectorAll(".navigation-item");
  if (navItems.length > 0) {
    navItems.forEach((item) => {
      item.addEventListener("click", toggleMenu);
    });
  } else {
    console.error("Navigation items not found.");
  }
});

//* Scrolled
window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");

  //if (window.innerWidth <= 768) {
  if (window.scrollY > 0) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
  //}
});

//* Site loaded
window.onload = function () {
  document.body.className += " loaded";
};

//* Counter
document.addEventListener("DOMContentLoaded", (event) => {
  const counters = document.querySelectorAll(".counter");
  const animationDuration = 1500; // 5 seconds for the animation
  const updateInterval = 10; // Update every 50 milliseconds

  const startCount = (element) => {
    const target = +element.getAttribute("data-num");
    const isPercentage = element.hasAttribute("data-is-percentage");
    const steps = animationDuration / updateInterval;
    const increment = target / steps;
    let count = 0;

    const updateCount = () => {
      if (count < target) {
        count += increment;
        if (isPercentage) {
          element.innerText = `${Math.ceil(count)}%`;
        } else {
          element.innerText = Math.ceil(count);
        }

        if (count < target) {
          setTimeout(updateCount, updateInterval);
        } else {
          element.innerText = isPercentage ? `${target}%` : target;
        }
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

//*AOS
document.addEventListener("DOMContentLoaded", function () {
  var width = window.innerWidth;

  if (width <= 768) {
    AOS.init({
      offset: 200,
      duration: 1000,
    });
  } else if (width > 768 && width <= 1024) {
    AOS.init({
      offset: 200,
      duration: 1000,
    });
  } else {
    AOS.init();
  }
});

//* Rellax
document.addEventListener("DOMContentLoaded", function () {
  var rellax = new Rellax(".rellax", {
    speed: -1,
    center: false,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false,
  });
});

//* Scroll Load Bar
window.onscroll = function () {
  myFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

//* Text Scramble
document.addEventListener("DOMContentLoaded", function () {
  // Elements that should scramble on hover
  const hoverElements = document.querySelectorAll(".scramble");
  hoverElements.forEach((element) => {
    let originalText = element.textContent;
    setupHoverScramble(element, originalText, 500, 10); // Scramble time, time per character to reveal
  });

  // Elements that should scramble once on load
  const loadElements = document.querySelectorAll(".scramble-on-load");
  loadElements.forEach((element) => {
    scrambleOnceOnLoad(element, 2000, 10); // Scramble time, time per character to reveal
  });
});

function setupHoverScramble(
  element,
  originalText,
  totalDuration,
  charInterval
) {
  element.addEventListener("mouseenter", function () {
    let scrambleInterval = setInterval(() => {
      element.textContent = randomizeText(originalText.length);
    }, 50); // Update the scramble every 50ms

    setTimeout(() => {
      clearInterval(scrambleInterval); // Stop scrambling
      revealOriginalText(element, originalText, charInterval);
    }, totalDuration);
  });

  element.addEventListener("mouseleave", function () {
    this.textContent = originalText; // Revert to original text if mouse leaves early
  });
}

function scrambleOnceOnLoad(element, totalDuration, charInterval) {
  let originalText = element.textContent;
  let scrambleInterval = setInterval(() => {
    element.textContent = randomizeText(originalText.length);
  }, 50); // Continuously update the scramble

  setTimeout(() => {
    clearInterval(scrambleInterval); // Stop scrambling
    revealOriginalText(element, originalText, charInterval);
  }, totalDuration);
}

function revealOriginalText(element, originalText, charInterval) {
  for (let i = 0; i < originalText.length; i++) {
    setTimeout(() => {
      element.textContent =
        element.textContent.substring(0, i) +
        originalText.charAt(i) +
        element.textContent.substring(i + 1);
    }, i * charInterval);
  }
}

function randomizeText(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

//* Unredact on Scroll
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.8,
    }
  );

  const elements = document.querySelectorAll(
    ".redacted-reveal-onscroll, footer"
  );
  elements.forEach((el) => observer.observe(el));
});
