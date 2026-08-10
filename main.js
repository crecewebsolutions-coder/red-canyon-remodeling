/* =========================================================
   RED CANYON REMODELING
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileToggle =
    document.getElementById("mobileToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


if (mobileToggle && mobileMenu) {

    mobileToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        mobileToggle.classList.toggle("active");

    });


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                mobileToggle.classList.remove("active");

            });

        });

}



/* =========================================================
   HEADER SCROLL
========================================================= */

const siteHeader =
    document.getElementById("siteHeader");


window.addEventListener("scroll", () => {

    if (!siteHeader) return;


    if (window.scrollY > 40) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

});



/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", function(event) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });



/* =========================================================
   HERO PARALLAX
========================================================= */

const heroBackground =
    document.querySelector(".hero-background");


window.addEventListener("scroll", () => {

    if (!heroBackground) return;


    const scroll =
        window.scrollY;


    if (scroll < window.innerHeight) {

        heroBackground.style.transform =
            `scale(1.03) translateY(${scroll * .12}px)`;

    }

});



/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".why-card, .service-preview-card, .project-large, .project-small, .number, " +
        ".content-section, .value-card, .approach-card, .team-card, .timeline-item, " +
        ".city-card, .gallery-card, .service-card, .about-content, .about-title, " +
        ".contractor-copy, .story-content, .story-image"
    );


function animateCount(element) {

    const target =
        parseInt(element.getAttribute("data-count"), 10);

    const suffix =
        element.getAttribute("data-suffix") || "";

    if (isNaN(target)) return;

    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {

        const progress =
            Math.min((now - startTime) / duration, 1);

        const eased =
            1 - Math.pow(1 - progress, 3);

        const value =
            Math.round(target * eased);

        element.textContent = value + suffix;

        if (progress < 1) {
            requestAnimationFrame(tick);
        }

    }

    requestAnimationFrame(tick);

}


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    const counter =
                        entry.target.querySelector(
                            "[data-count]"
                        );

                    if (counter) {
                        animateCount(counter);
                    }

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   PREVENT EMPTY HASH
========================================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });