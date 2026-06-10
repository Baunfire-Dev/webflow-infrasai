(function () {
    baunfire.Animation = {
        init() {
            this.handleNav();
        },

        handleNav() {
            const nav = document.querySelector("nav");
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
        }
    };

    baunfire.addModule(baunfire.Animation);
})();