(function () {
    baunfire.Blocks = {
        init() {
            this.heroHomepage();
            this.heroTitle();
            this.heroTitleImage();

            this.socialProof();
            this.typeTextReveal();
            this.accordionTextmedia();
            this.testimonialCarousel();
            this.faqs();

            this.richTextTOC();
            this.blocksWithTOC();
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

        heroTitleImage() {
            const script = () => {
                const els = document.querySelectorAll("section.hero-title-image");
                if (!els.length) return;

                els.forEach(self => {
                    handleEntrance(self);
                });
            }

            const handleEntrance = (self) => {
                const headTexts = self.querySelector(".hti-head");

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
            };

            script();
        },

        heroTitle() {
            const script = () => {
                const els = document.querySelectorAll("section.hero-title");
                if (!els.length) return;

                els.forEach(self => {
                    handleEntrance(self);
                });
            }

            const handleEntrance = (self) => {
                const headTexts = self.querySelector(".ht-text");

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
            };

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

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        scrub: isDesktop ? 2 : true,
                        start: isDesktop ? "top 80%" : "top 70%",
                        end: "bottom 60%",
                    },
                });

                words.forEach(word => {
                    tl.to(word, {
                        backgroundPositionX: 0,
                        ease: "none",
                    });
                });

                return tl;
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
            };

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

        testimonialCarousel() {
            const script = () => {
                const els = document.querySelectorAll("section.testimonial-carousel");
                if (!els.length) return;

                els.forEach(self => {
                    handleCarousel(self);
                });
            }

            const handleCarousel = (self) => {
                const splide = self.querySelector(".splide");
                const prevBtn = self.querySelector(".tc-arrow.prev");
                const nextBtn = self.querySelector(".tc-arrow.next");
                if (!splide) return;

                baunfire.Global.importSplideScript(() => {
                    const slider = new Splide(splide, {
                        type: 'loop',
                        perPage: 1,
                        gap: '1rem',
                        arrows: false,
                        autoHeight: true,
                        speed: 600,
                        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                        reducedMotion: {
                            speed: 600,
                        },
                        autoplay: true,
                        interval: 6000,
                    });

                    slider.on('ready', () => {
                        baunfire.Global.screenSizeChange();
                        prevBtn?.addEventListener('click', () => slider.go('<'));
                        nextBtn?.addEventListener('click', () => slider.go('>'));
                    });

                    slider.mount();
                });
            }

            script();
        },

        richTextTOC() {
            const script = () => {
                const els = document.querySelectorAll("section.rich-text-toc");
                if (!els.length) return;

                els.forEach(self => {
                    handleTOC(self);
                });
            }

            const handleTOC = (self) => {
                const mm = gsap.matchMedia();

                const links = self.querySelectorAll(".rtt-anchor");
                const targets = self.querySelectorAll(".rtt-text-block-anchor");

                if (!links || !targets) return;

                links[0].classList.add("active");

                links.forEach(link => link.addEventListener("click", () => {
                    baunfire.lenis?.stop();

                    const target = document.getElementById(link.getAttribute('anchor'));
                    if (!target) return;

                    baunfire.lenis?.start();
                    baunfire.lenis?.scrollTo(target, {
                        duration: 1,
                    });
                }));

                targets.forEach(target => {
                    const id = target.id;
                    const targetLink = self.querySelector(`.rtt-anchor[anchor='${id}']`);
                    if (!targetLink) return;

                    ScrollTrigger.create({
                        trigger: target,
                        start: "top 20%",
                        end: "bottom 20%",
                        onEnter: () => activateLink(links, targetLink),
                        onEnterBack: () => activateLink(links, targetLink),
                    });
                });
            }

            const activateLink = (links, targetLink) => {
                if (!targetLink) return;
                links.forEach(link => link.classList.remove("active"));
                targetLink.classList.add("active");
            };

            script();
        },

        blocksWithTOC() {
            const script = () => {
                const els = document.querySelectorAll("section.blocks-with-toc");
                if (!els.length) return;

                els.forEach(self => {
                    handleTOC(self);
                });
            }

            const handleTOC = (self) => {
                const mm = gsap.matchMedia();

                const links = self.querySelectorAll(".bwt-anchor");
                const targets = self.querySelectorAll(".bwt-target");

                if (!links || !targets) return;

                links[0].classList.add("active");

                links.forEach(link => link.addEventListener("click", () => {
                    baunfire.lenis?.stop();

                    const target = document.getElementById(link.getAttribute('anchor'));
                    if (!target) return;

                    baunfire.lenis?.start();
                    baunfire.lenis?.scrollTo(target, {
                        duration: 1,
                    });
                }));

                targets.forEach(target => {
                    const id = target.id;
                    const targetLink = self.querySelector(`.bwt-anchor[anchor='${id}']`);
                    if (!targetLink) return;

                    ScrollTrigger.create({
                        trigger: target,
                        start: "top 20%",
                        end: "bottom 20%",
                        onEnter: () => activateLink(links, targetLink),
                        onEnterBack: () => activateLink(links, targetLink),
                    });
                });
            }

            const activateLink = (links, targetLink) => {
                if (!targetLink) return;
                links.forEach(link => link.classList.remove("active"));
                targetLink.classList.add("active");
            };

            script();
        },

        faqs() {
            const script = () => {
                const els = document.querySelectorAll("section.faqs");
                if (!els.length) return;

                els.forEach(self => {
                    handleFAQ(self);
                });
            };

            const handleFAQ = (self) => {
                const accs = self.querySelectorAll(".acc");
                if (!accs.length) return;

                accs.forEach((acc) => {
                    const body = acc.querySelector(".acc-body");

                    acc.addEventListener("click", (e) => {
                        if (e.target.closest("a, button")) return;
                        if (acc.classList.contains("active")) return;

                        accs.forEach(a => a.classList.remove("active"));
                        acc.classList.add("active");

                        if (window.matchMedia("(max-width: 1200px)").matches) {
                            scrollToSection(acc);
                        }

                        const otherBodies = [...self.querySelectorAll(".acc-body")].filter(el => el !== body);

                        gsap.timeline()
                            .to(otherBodies,
                                {
                                    height: 0,
                                    duration: 0.5,
                                    overwrite: true,
                                    ease: "power2.out",
                                }, 
                                0
                            )
                            .fromTo(
                                body,
                                {
                                    height: 0,
                                },
                                {
                                    height: "auto",
                                    duration: 0.5,
                                    overwrite: true,
                                    ease: "power2.out",
                                },
                                0
                            );

                        baunfire.Global.screenSizeChange();
                    });
                });
            };

            const scrollToSection = (el) => {
                baunfire.lenis?.stop();
                baunfire.lenis?.start();
                baunfire.lenis?.scrollTo(el, {
                    duration: 1,
                    offset: -100,
                });
            };

            script();
        }
    };

    baunfire.addModule(baunfire.Blocks);
})();
