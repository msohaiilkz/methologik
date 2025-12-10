

// cursor--------
function cursor() {
  const crsr = document.querySelector("#cursor")
  const blur = document.querySelector("#cursor-blur")
  document.addEventListener("mousemove", function (dets) {
    crsr.style.left = dets.x + "px"
    crsr.style.top = dets.y + "px"

  })

}
cursor()


// navbar-------------
function navbar() {

  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("nav");

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}
navbar()



document.querySelectorAll('.nav-item.dropdown').forEach(function (item) {
  item.addEventListener('click', function (event) {

    event.stopPropagation();

    const dropdownMenu = item.querySelector('.dropdown-menu');


    document.querySelectorAll('.nav-item.dropdown .dropdown-menu').forEach(function (menu) {
      if (menu !== dropdownMenu) {
        menu.style.display = 'none';
      }
    });


    dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
  });
});

document.addEventListener('click', function (event) {
  const dropdowns = document.querySelectorAll('.nav-item.dropdown .dropdown-menu');
  dropdowns.forEach(function (menu) {
    if (!menu.contains(event.target) && !event.target.closest('.nav-item.dropdown')) {
      menu.style.display = 'none';
    }
  });
});



// strategySCroll...............
function strategiScroll() {
  document.addEventListener('DOMContentLoaded', function () {
    var section = document.querySelector('#strategic');

    if (section) {
      document.addEventListener('scroll', function () {
        var rect = section.getBoundingClientRect();

        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          section.style.overflowY = 'auto';
          section.style.scrollBehavior = 'smooth';
        } else {
          section.style.overflowY = 'hidden';
          section.style.scrollBehavior = 'auto';
        }
      });
    } else {
      console.error('Element with id "strategic" not found.');
    }
  });
}

window.addEventListener('load', function () {
  strategiScroll();
});





// goto Top Cta---------
function goTop() {
  window.onscroll = function () {
    const scrollToTopButton = document.getElementById("scrollToTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  };
}
goTop();

// data timeline
function dataTimeline() {
  document.getElementById("scrollToTop").onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let scrollCount = 0;

  // Animate the first vertical line
  function animateVerticalLine() {
    const verticalLine = document.getElementById("verticalLine");

    if (verticalLine) {
      gsap.to(verticalLine, {
        height: "400px",
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          animateHorizontalLine();
        }
      });

    }
  }

  function animateHorizontalLine() {
    const horizontalLine = document.getElementById("horizontalLine");

    if (horizontalLine) {
      horizontalLine.style.opacity = 1;
      gsap.to(horizontalLine, {
        width: "50%",
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          animateVerticalLine2();
        }
      });

    }
  }

  function animateVerticalLine2() {
    const verticalLine2 = document.getElementById("verticalLine2");

    if (verticalLine2) {
      verticalLine2.style.opacity = 1;
      gsap.to(verticalLine2, {
        height: "300px",
        duration: 1,
        ease: "power2.out"
      });
    } else {
      console.error('Element with id "verticalLine2" not found.');
    }
  }

  window.addEventListener('scroll', () => {
    scrollCount++;
    if (scrollCount === 1) {
      animateVerticalLine();
    } else if (scrollCount === 2) {
      animateHorizontalLine();
    } else if (scrollCount === 3) {
      scrollCount = 0;
    }
  });
}

window.addEventListener('load', function () {
  dataTimeline();
});



// MAP-LOCATION---------------
function mapLocation() {
  document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('mouseover', function () {
      const location = this.getAttribute('data-location');
      const locationFlag = this.getAttribute('data-locationFlag');

      const tooltip = document.querySelector('.location-tooltip');
      const tooltipText = tooltip.querySelector('.tooltip-text');
      const tooltipFlagImage = tooltip.querySelector('.tooltip-flag');

      tooltipText.textContent = location;
      tooltipFlagImage.src = locationFlag;
      tooltip.style.display = 'block';
      tooltip.style.top = this.offsetTop - 30 + 'px';
      tooltip.style.left = this.offsetLeft - (tooltip.offsetWidth / 3) + 'px';
    });

    dot.addEventListener('mouseout', function () {
      const tooltip = document.querySelector('.location-tooltip');
      tooltip.style.display = 'none';
    });
  });
}
mapLocation();


// line-Animation video---------------
function lineAnimation() {
  const video = document.getElementById('line-video');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });
}
lineAnimation();

// point-highlight with images-----------
function pointHighlight() {
  const container = document.querySelector('#key-phrase');
  if (!container) return;

  const keyPhraseElements = container.querySelectorAll('.key-phrase');
  const imageBox = document.querySelector('#process-image');
  if (keyPhraseElements.length === 0) return;

  keyPhraseElements[0].classList.add('active');
  if (imageBox) imageBox.src = keyPhraseElements[0].getAttribute('data-img');

  function updateActive(element) {
    keyPhraseElements.forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    if (!imageBox) return;

    const newImg = element.getAttribute('data-img');
    imageBox.style.opacity = 0;
    setTimeout(() => {
      imageBox.src = newImg;
      imageBox.style.opacity = 1;
    }, 250);
  }

  function checkScrollPosition() {
    let closest = null;
    let minDist = Infinity;

    keyPhraseElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const center = containerRect.top + containerRect.height / 2;
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.abs(center - elCenter);

      if (dist < minDist) {
        minDist = dist;
        closest = el;
      }
    });

    if (closest) updateActive(closest);
  }

  if (container.scrollHeight > container.clientHeight) {
    container.addEventListener('scroll', checkScrollPosition);
  } else {
    window.addEventListener('scroll', checkScrollPosition);
  }

  keyPhraseElements.forEach(el => {
    el.addEventListener('click', () => updateActive(el));
  });
}

document.addEventListener('DOMContentLoaded', pointHighlight);


// point highlight----------


//Aos ----------
AOS.init({
  duration: 1000,
  once: false,
});

// text-highlight anmate--------------
function textAnimate() {
  gsap.registerPlugin(ScrollTrigger)
  const splitTypes = document.querySelectorAll('.reveal-type')

  splitTypes.forEach((char, i) => {
    const text = new SplitType(char, { type: 'chars' })

    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: char,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
        markers: false
      },
      opacity: 0.2,
      stagger: 0.1,
    })

  })


  gsap.registerPlugin(ScrollTrigger);

  const splitTypess = document.querySelectorAll('.reveal-types');

  splitTypess.forEach((char, i) => {
    const text = new SplitType(char, { type: 'chars' });

    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: char,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 2,
        markers: false,
      },
      opacity: 0.2,
      stagger: 0.2,
      ease: 'power1.out',
    });
  });


}
textAnimate();




// -------- BLOG SEARCH ----------
function initBlogSearch() {
  const searchInput = document.getElementById("blogSearchInput");
  const searchForm = document.getElementById("blogSearchForm");

  // Search kin items pe chale:
  // featured cards (.blog-article) + case-study (.article-wrapper) + all articles (.all-article)
  const searchItems = document.querySelectorAll(
    ".blog-article, .article-wrapper, .all-article"
  );

  if (!searchInput || !searchForm || !searchItems.length) return;

  function filterArticles() {
    const query = searchInput.value.trim().toLowerCase();

    searchItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.classList.remove("search-hidden");
      } else {
        item.classList.add("search-hidden");
      }
    });

    // search ke baad pagination ko refresh karo
    if (typeof window.refreshArticlesPagination === "function") {
      window.refreshArticlesPagination();
    }
  }

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    filterArticles();
  });

  searchInput.addEventListener("input", filterArticles);
}
initBlogSearch();

// -------- ARTICLE TABS ----------
function initBlogTabs() {
  const tabButtons = document.querySelectorAll(".blog-tab-btn");
  const articles = document.querySelectorAll(".blog-article");
  const noArticlesMsg = document.getElementById("noArticlesMsg");

  if (!tabButtons.length || !articles.length) return;

  function applyFilter(category) {
    let visibleCount = 0;

    articles.forEach((card) => {
      const cats = (card.dataset.category || "")
        .split(" ")
        .map((c) => c.trim())
        .filter(Boolean);

      const shouldShow = category === "all" || cats.includes(category);

      if (shouldShow) {
        card.classList.remove("d-none");
        visibleCount++;
      } else {
        card.classList.add("d-none");
      }
    });

    if (noArticlesMsg) {
      if (visibleCount === 0) {
        noArticlesMsg.classList.remove("d-none");
      } else {
        noArticlesMsg.classList.add("d-none");
      }
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      applyFilter(category);
    });
  });

  // default: All
  applyFilter("all");
}
initBlogTabs();


// -------- ALL ARTICLES PAGINATION ----------
function initArticlePagination() {
  const PER_PAGE = 6; // ek page pe kitne articles dikhane hain
  const container = document.getElementById("allArticlesList");
  const allArticles = container
    ? Array.from(container.querySelectorAll(".all-article"))
    : [];
  const countText = document.getElementById("articlesCountText");
  const pagination = document.getElementById("articlesPagination");

  if (!container || !allArticles.length || !pagination || !countText) return;

  let currentPage = 1;

  function getFilteredArticles() {
    return allArticles.filter((a) => !a.classList.contains("search-hidden"));
  }

  function renderPagination() {
    const filtered = getFilteredArticles();
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

    if (currentPage > totalPages) currentPage = totalPages;

    // page visibility set karo
    filtered.forEach((article, index) => {
      const start = (currentPage - 1) * PER_PAGE;
      const end = start + PER_PAGE;

      if (index >= start && index < end) {
        article.classList.remove("page-hidden");
      } else {
        article.classList.add("page-hidden");
      }
    });

    // jo search se hide ho chuke hain
    allArticles
      .filter((a) => filtered.indexOf(a) === -1)
      .forEach((a) => a.classList.add("page-hidden"));

    // top-right text: "Showing x–y of total"
    if (total === 0) {
      countText.textContent = "Showing 0–0 of 0";
    } else {
      const startItem = (currentPage - 1) * PER_PAGE + 1;
      const endItem = Math.min(currentPage * PER_PAGE, total);
      countText.textContent = `Showing ${startItem}–${endItem} of ${total}`;
    }

    // pagination buttons
    pagination.innerHTML = "";
    if (totalPages <= 1) return;

    // helper: page change + smooth scroll
    function goToPage(page) {
      currentPage = page;
      renderPagination();
      const offsetTop =
        container.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }

    // ← PREV ARROW
    const prevLi = document.createElement("li");
    prevLi.className = "page-item";
    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "page-link page-arrow";
    prevBtn.innerHTML = "&lsaquo;"; // <
    if (currentPage === 1) {
      prevBtn.disabled = true;
      prevBtn.classList.add("disabled");
    } else {
      prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
    }
    prevLi.appendChild(prevBtn);
    pagination.appendChild(prevLi);

    // PAGE NUMBERS
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = "page-item";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "page-link" + (i === currentPage ? " active" : "");
      btn.textContent = i;

      btn.addEventListener("click", () => goToPage(i));

      li.appendChild(btn);
      pagination.appendChild(li);
    }

    // → NEXT ARROW
    const nextLi = document.createElement("li");
    nextLi.className = "page-item";
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "page-link page-arrow";
    nextBtn.innerHTML = "&rsaquo;"; // >
    if (currentPage === totalPages) {
      nextBtn.disabled = true;
      nextBtn.classList.add("disabled");
    } else {
      nextBtn.addEventListener("click", () => goToPage(currentPage + 1));
    }
    nextLi.appendChild(nextBtn);
    pagination.appendChild(nextLi);
  }

  // expose so search bhi trigger kar sake
  window.refreshArticlesPagination = renderPagination;

  // initial render
  renderPagination();
}

initArticlePagination();




