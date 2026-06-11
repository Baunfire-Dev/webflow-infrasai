(function () {
    baunfire.Animation = {
        init() {
            this.handleNav();
            this.handleTransitions();
        },

        handleNav() {
            const nav = document.querySelector("header");
            if (!nav) return;

            let lastScrollY = window.scrollY;
            let isScrolled = false;
            let scrollDirection = null;

            const updateNavScroll = () => {
                const currentScrollY = window.scrollY;
                const direction = currentScrollY > lastScrollY ? "down" : currentScrollY < lastScrollY ? "up" : null;
                const scrolled = currentScrollY > 20;

                if (scrolled !== isScrolled) {
                    nav.classList.toggle("nav-scrolled", scrolled);
                    isScrolled = scrolled;
                }

                if (direction && direction !== scrollDirection) {
                    nav.classList.toggle("nav-scrolling-down", direction === "down");
                    nav.classList.toggle("nav-scrolling-up", direction === "up");
                    scrollDirection = direction;
                }

                lastScrollY = currentScrollY;
            };

            document.addEventListener("scroll", updateNavScroll);
            window.addEventListener("load", updateNavScroll);
            updateNavScroll();
        },

        handleTransitions() {
            const textReveal = () => {
                const els = document.querySelectorAll("[data-split-words]");

                els.forEach(el => {
                    const hasTrigger = el.hasAttribute("data-split-trigger");
                    const triggerSelector = el.dataset.splitTrigger;
                    const triggerEl = hasTrigger
                        ? (triggerSelector ? el.closest(triggerSelector) || el : el)
                        : null;

                    SplitText.create(el, {
                        type: "words",
                        mask: "words",
                        autoSplit: true,
                        onSplit(self) {
                            const props = {
                                y: "100%",
                                duration: 0.6,
                                ease: "power2.out",
                                stagger: 0.08,
                            };

                            if (hasTrigger && triggerEl) {
                                props.scrollTrigger = {
                                    trigger: triggerEl,
                                    start: baunfire.anim.start
                                };
                            }

                            return gsap.from(self.words, props);
                        }
                    });
                });
            }

            textReveal();
        }
    };

    baunfire.addModule(baunfire.Animation);
})();