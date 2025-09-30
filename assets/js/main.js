

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



document.querySelectorAll('.nav-item.dropdown').forEach(function(item) {
  item.addEventListener('click', function(event) {
     
      event.stopPropagation();

      const dropdownMenu = item.querySelector('.dropdown-menu');
      
     
      document.querySelectorAll('.nav-item.dropdown .dropdown-menu').forEach(function(menu) {
          if (menu !== dropdownMenu) {
              menu.style.display = 'none';
          }
      });

     
      dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
  });
});

document.addEventListener('click', function(event) {
  const dropdowns = document.querySelectorAll('.nav-item.dropdown .dropdown-menu');
  dropdowns.forEach(function(menu) {
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

window.addEventListener('load', function() {
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

window.addEventListener('load', function() {
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


// pointHiglight---------------
function pointHighlight() {
  const keyPhraseElements = document.querySelectorAll('.key-phrase');
  const containerr = document.querySelector('#key-phrase');
  function checkScrollPosition() {
    let closestElement = null;
    let minDistance = Infinity;

    keyPhraseElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const containerrRect = containerr.getBoundingClientRect();
      const centerOfContainerr = containerrRect.top + containerrRect.height / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(centerOfContainerr - elementCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestElement = element;
      }
    });


    keyPhraseElements.forEach((element) => {
      if (element === closestElement) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
  if (containerr) {
    containerr.addEventListener('scroll', checkScrollPosition);
  }
}
pointHighlight();


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


// form submission--------------
function formSubmition() {
  emailjs.init("s1VHHnFMgT3apugWc");
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();


    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;
    var templateParams = {
      from_name: name,
      from_email: email,
      phone: phone,
      message: message
    };

    emailjs.send('service_quknd56', 'template_o86xutm', templateParams)
      .then(function (response) {
        Toastify({
          text: "Your message has been sent successfully!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
          stopOnFocus: true
        }).showToast();


        document.getElementById('contactForm').reset();
      }, function (error) {

        Toastify({
          text: "There was an issue sending your message. Please try again later.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "red",
          stopOnFocus: true
        }).showToast();
      });
  });

}
formSubmition();


// Our-team----------
function teamAnimated() {
  const teamMember = document.querySelectorAll('.team-member');

  teamMember.forEach((member) => {
    const text = member.querySelector('h1');


    member.addEventListener('mouseenter', () => {
      gsap.to(text, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out'
      });
    });


    member.addEventListener('mouseleave', () => {
      gsap.to(text, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: 'power3.in'
      });
    });
  });

}
teamAnimated();


// strategy-dropdown-text------------------------
function navbarTextAnimate() {
  $(document).ready(function () {
    var content = {
      "Digital Implementation": [
        "Digital Implementation & Delivery",
        "Program Management",
        "Product Engineering",
        "DevOps & Sec",
        "Managed Services"
      ],
      "Data Analytics": [
        "Data & Analytics",
        "Data Strategy",
        "Analytics & Platform Implementation",
        "Data Science",
        "Data Engineering",
        "Data Visualization"
      ],
      "Strategic Expertise": [
        "Strategic Insights & Advisory Services",
        "Business Strategy Consulting",
        "Optimization Consulting",
        "Product Strategy",
        "Technology Strategy"
      ]
    };

    // hover event for "Digital Implementation---------------
    $('.col2s .list-group-item').eq(2).hover(
      function () {
        $('.col3s .list-group').empty();
        content["Digital Implementation"].forEach(function (item) {
          $('.col3s .list-group').append('<a class="list-group-item mt-3" href="#">' + item + '</a>');
        });
      }
    );

    // hover event for "Data Analytics---------------
    $('.col2s .list-group-item').eq(1).hover(
      function () {
        $('.col3s .list-group').empty();
        content["Data Analytics"].forEach(function (item) {
          $('.col3s .list-group').append('<a class="list-group-item mt-3" href="#">' + item + '</a>');
        });
      }
    );

    // Hover event for "Strategic Expertise-------------
    $('.col2s .list-group-item').eq(0).hover(
      function () {
        $('.col3s .list-group').empty();
        content["Strategic Expertise"].forEach(function (item) {
          $('.col3s .list-group').append('<a class="list-group-item mt-3" href="#">' + item + '</a>');
        });
      }
    );
  });

}
navbarTextAnimate();


// offfering-dropdown-text------------------
function offeringTextAnimates() {
  $(document).ready(function () {
      var content = {
          "Software Development": [
              "Software Discovery & Ideation",
              "Enterprises Implementation Services",
              "Web App Development",
              "Mobile App Development",
              "Custom Solutions"
          ],
          "Design Side": [
              "User Experience Design",
              "System Design",
              "Ux Audit",
              "User Research"
          ],
          "Cloud": [
              "Business Process Automation",
              "CloudOps",
              "Amazons Web Services",
              "Cloud Migration"
          ],
          "Artificial Intelligence": [
              "AI Consulting",
              "Social Media Management",
              "Brand & Creative Services",
              "Content Production"
          ],
          "Digital Marketing": [
              "Digital Strategy",
              "Social Media Management",
              "Brand & Creative Services",
              "Content Production"
          ]
      };

      // Hover event for "Software Development------------------------
      $('.offering-col1 .list-group-item').eq(0).hover(function () {
          $('.offering-col2 .list-group').empty();
          content["Software Development"].forEach(function (item) {
              $('.offering-col2 .list-group').append('<a class="list-group-item mt-3" href="#">' + item + '</a>');
          });
      });

      // Hover event for "Design Side-------------------------
      $('.offering-col1 .list-group-item').eq(1).hover(function () {
          $('.offering-col2 .list-group').empty();
          content["Design Side"].forEach(function (item) {
              $('.offering-col2 .list-group').append('<a class="list-group-item mt-3" href="#">' + item + '</a>');
          });
      });

      // Hover event for "Cloud-------------------------------
      $('.offering-col1 .list-group-item').eq(2).hover(function () {
          $('.offering-col2 .list-group').empty();
          content["Cloud"].forEach(function (item) {
              $('.offering-col2 .list-group').append('<a class="list-group-item mt-3" href="#">' + item + '</a>');
          });
      });

      // Hover event for "Artificial Intelligence---------------------------
      $('.offering-col1 .list-group-item').eq(3).hover(function () {
          $('.offering-col2 .list-group').empty();
          content["Artificial Intelligence"].forEach(function (item) {
              $('.offering-col2 .list-group').append('<a class="list-group-item mt-3" href="#">' + item + '</a>');
          });
      });

      // Hover event for "Digital Marketing-----------------------
      $('.offering-col1 .list-group-item').eq(4).hover(function () {
          $('.offering-col2 .list-group').empty();
          content["Digital Marketing"].forEach(function (item) {
              $('.offering-col2 .list-group').append('<a class="list-group-item mt-3" href="#">' + item + '</a>');
          });
      });
  });
}
offeringTextAnimates();


