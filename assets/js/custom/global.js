(function () {
    baunfire.Global = {
        init() {
            this.generateGlass();
        },

        debounce(func, delay = 300) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(null, args), delay);
            };
        },

        screenSizeChange() {
            ScrollTrigger.refresh();
            baunfire.lenis?.resize();
        },

        siteScrolling(enabled = true) {
            if (enabled) {
                document.documentElement.classList.remove('disable-scrolling');
                baunfire.lenis?.start();
            } else {
                document.documentElement.classList.add('disable-scrolling');
                baunfire.lenis?.stop();
            }
        },

        callAfterResize(func, delay = 0.2) {
            const dc = gsap.delayedCall(delay, func).pause();
            const handler = () => dc.restart(true);
            window.addEventListener("resize", handler);
            return handler;
        },

        refreshScrollTriggers() {
            const triggers = ScrollTrigger.getAll();

            triggers.forEach((trigger) => {
                trigger.refresh(true);
            });
        },

        fancyLog(message, type = "info") {
            const styles = {
                info: {
                    label: 'ℹ️ INFO:',
                    style1: 'color: white; background-color: #2196F3; padding: 2px 6px; border-radius: 4px;',
                    style2: 'color: #FFF;'
                },
                warn: {
                    label: '⚠️ WARNING:',
                    style1: 'color: black; background-color: #FFEB3B; padding: 2px 6px; border-radius: 4px;',
                    style2: 'color: #000;'
                },
                error: {
                    label: '⛔ ERROR:',
                    style1: 'color: white; background-color: #F44336; padding: 2px 6px; border-radius: 4px;',
                    style2: 'color: #FFF;'
                }
            };

            const { label, style1, style2 } = styles[type] || styles.info;

            if (typeof message === 'object') {
                console.log(`%c${label}`, style1);
                console.log(message);
            } else {
                console.log(`%c${label} %c ${message}`, style1, style2);
            }
        },

        generateGlass() {
            document.querySelectorAll('.glass-card').forEach(card => {
                card.insertAdjacentHTML('afterbegin', `
                    <div class="rim"></div>
                    <div class="inner-glow"></div>
                    <div class="top-gloss"></div>
                    <div class="left-edge"></div>
                    <div class="right-edge"></div>
                    <div class="scanline"></div>
                `);
                card.classList.add('active');
            });
        },

        handleTextCount(el, duration = 0.8, withTrigger = false, parent) {
            const counter = el.find("[data-amount]");
            const rawAmount = counter.data("amount").toString();
            let clean = v => (v + "").replace(/[^\d\.-]/gi, "");
            let num = clean(rawAmount);
            let decimals = (num.split(".")[1] || "").length;

            let proxy = { val: parseFloat(clean(counter.text())) || 0 };

            const props = {
                val: +num,
                duration: duration,
                ease: "linear",
                onUpdate: () => {
                    counter.text(this.formatNumber(proxy.val, decimals));
                }
            }

            if (withTrigger && parent) {
                props.scrollTrigger = {
                    trigger: parent,
                    start: baunfire.anim.start
                }
            }

            gsap.to(proxy, props);
        },

        formatNumber(value, decimals) {
            let s = (+value).toLocaleString("en-US").split(".");
            return decimals ? s[0] + "." + ((s[1] || "") + "00000000").substr(0, decimals) : s[0];
        },
    };

    baunfire.addModule(baunfire.Global);
})();
