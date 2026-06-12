(function () {
    baunfire.Blocks = {
        init() {
            this.heroHomepage();
            this.socialProof();
            this.typeTextReveal();
            this.accordionTextmedia();
        },

        heroHomepage() {
            const script = () => {
                const els = document.querySelectorAll("section.hero-homepage");
                if (!els.length) return;

                els.forEach(self => {
                    handleVideo(self);
                    handleEntrance(self);
                });
            }

            const handleEntrance = (self) => {
                const headTexts = self.querySelector(".hh-head");
                const certificateLogo = self.querySelector(".hh-logo");
                const featuredArticle = self.querySelector(".hh-feature");

                const tl = gsap.timeline({
                    paused: true,
                    scrollTrigger: {
                        trigger: self,
                        start: baunfire.anim.start,
                        onEnter: () => tl.delay(0.5).play()
                    }
                });

                if (headTexts) {
                    SplitText.create(headTexts, {
                        type: "words",
                        mask: "words",
                        onSplit(split) {
                            headTexts.style.opacity = "1";

                            tl.fromTo(split.words,
                                { y: "100%" },
                                { y: "-5%", duration: 0.6, ease: "power2.out", stagger: 0.03 }
                            );
                        },
                    });
                }

                if (certificateLogo) {
                    tl.fromTo(certificateLogo,
                        { autoAlpha: 0 },
                        { autoAlpha: 1, duration: 0.6, ease: "power2.out" },
                        "-=0.6"
                    );
                }

                if (featuredArticle) {
                    tl.fromTo(featuredArticle,
                        { autoAlpha: 0 },
                        { autoAlpha: 1, duration: 0.6, ease: "power2.out" },
                        "-=0.3"
                    );
                }
            };

            const handleVideo = (self) => {
                const video = self.querySelector("video");
                if (!video) return;

                ScrollTrigger.create({
                    trigger: self,
                    start: "top center",
                    end: "bottom 30%",
                    onEnter: () => video.play(),
                    onEnterBack: () => video.play(),
                    onLeave: () => video.pause(),
                    onLeaveBack: () => video.pause(),
                });
            }

            script();
        },

        typeTextReveal() {
            const script = () => {
                const els = document.querySelectorAll("section.type-text-reveal");
                if (!els.length) return;

                els.forEach(self => {
                    splitWords(self);
                });
            }

            const splitWords = (self) => {
                const paragraph = self.querySelector(".ttr-text");
                if (!paragraph) return;

                paragraph.style.opacity = "0";

                SplitText.create(paragraph, {
                    type: "words",
                    mask: "words",
                    autoSplit: true,
                    wordsClass: "word",
                    onSplit(split) {
                        paragraph.style.opacity = "1";
                        return handleTextHighlight(paragraph, split.words);
                    }
                });
            }

            const handleTextHighlight = (el, words) => {
                if (!words.length) return;

                const isDesktop = window.matchMedia("(min-width: 992px)").matches;

                return gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        scrub: isDesktop ? 2 : true,
                        start: isDesktop ? "top 80%" : "top 70%",
                        end: "bottom 70%",
                    },
                }).to(words, {
                    backgroundPositionX: 0,
                    ease: "none",
                });
            }

            script();
        },

        accordionTextmedia() {
            const script = () => {
                const els = document.querySelectorAll("section.accordion-text-media");
                if (!els.length) return;

                els.forEach(self => {
                    setupLayout(self);
                    handleAccordion(self);
                    self.classList.add("active");
                });

                baunfire.Global.screenSizeChange();
            }

            const setupLayout = (self) => {
                const items = self.querySelectorAll(".atm-item");
                if (!items.length) return;

                const accsContainer = self.querySelector(".atm-accs");
                const imagesContainer = self.querySelector(".atm-images");

                items.forEach((item, index) => {
                    const acc = item.querySelector(".atm-acc");
                    const image = item.querySelector(".atm-image");

                    acc.prepend(image.cloneNode(true));

                    if (index == 0) {
                        acc.classList.add("active");
                        image.classList.add("active");
                    }

                    accsContainer.appendChild(acc);
                    imagesContainer.appendChild(image);
                });
            };

            const handleAccordion = (self) => {
                const accs = self.querySelectorAll(".atm-items-wrapper .atm-acc");
                const images = self.querySelectorAll(".atm-items-wrapper .atm-images .atm-image");
                if (!accs.length) return;

                accs.forEach((acc, i) => {
                    acc.addEventListener("click", (e) => {
                        if (e.target.closest("a, button")) return;
                        if (acc.classList.contains("active")) return;

                        accs.forEach(a => a.classList.remove("active"));
                        images.forEach(img => img.classList.remove("active"));
                        acc.classList.add("active");
                        images[i]?.classList.add("active");

                        if (window.matchMedia("(max-width: 1200px)").matches) {
                            scrollToSection(acc);
                        }

                        baunfire.Global.screenSizeChange();
                    });
                });
            }

            const scrollToSection = (el) => {
                baunfire.lenis?.stop();
                baunfire.lenis?.start();
                baunfire.lenis?.scrollTo(el, {
                    duration: 1,
                    offset: -100,
                });
            };

            script();
        },

        socialProof() {
            const script = () => {
                const els = document.querySelectorAll("section.social-proof");
                if (!els.length) return;

                els.forEach(self => {
                    handleStats(self);
                });
            }

            const handleStats = (self) => {
                const items = self.querySelectorAll(".sp-stat");
                if (!items.length) return;

                items.forEach(subSelf => {
                    baunfire.Global.handleTextCount(subSelf, 1, true, self);
                });
            }

            script();
        },
    };

    baunfire.addModule(baunfire.Blocks);
})();
