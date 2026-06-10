(function () {
    baunfire.Animation = {
        init() {
            this.handleNav();
        },

        handleNav() {
            const header = document.querySelector("header");
            if (!header) return;

            let lastScrollY = window.scrollY;

            const updateNavScroll = () => {
                const currentScrollY = window.scrollY;

                header.classList.toggle("nav-scrolled", currentScrollY > 20);

                if (currentScrollY > lastScrollY) {
                    header.classList.add("nav-hidden");
                    header.classList.remove("nav-hidden");
                } else if (currentScrollY < lastScrollY) {
                    header.classList.add("nav-hidden");
                    header.classList.remove("nav-hidden");
                }

                lastScrollY = currentScrollY;
            };

            document.addEventListener("scroll", updateNavScroll);
            window.addEventListener("load", updateNavScroll);
            updateNavScroll();
        }
    };

    baunfire.addModule(baunfire.Animation);
})();