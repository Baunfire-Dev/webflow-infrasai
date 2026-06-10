(function () {
    baunfire.Blocks = {
        init() {
            this.accordionTextmedia();
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

                    if (index == 0) {
                        acc.classList.add("active");
                        image.classList.add("active");
                    }

                    acc.prepend(image.cloneNode(true));

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

                        if (acc.classList.contains("active")) {
                            acc.classList.remove("active");
                            images[i]?.classList.remove("active");
                        } else {
                            accs.forEach(a => a.classList.remove("active"));
                            images.forEach(img => img.classList.remove("active"));
                            acc.classList.add("active");
                            images[i]?.classList.add("active");

                            if (window.matchMedia("(max-width: 1200px)").matches) {
                                scrollToSection(acc);
                            }
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
    };

    baunfire.addModule(baunfire.Blocks);
})();
