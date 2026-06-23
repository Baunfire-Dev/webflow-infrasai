(function () {
    const templateURL = 'https://baunfire-dev.github.io/webflow-infrasai';

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

        importSplideScript(callback) {
            if (typeof Splide !== 'undefined') {
                callback?.();
                return;
            }

            if (this._splideLoading) {
                this._splideQueue = this._splideQueue || [];
                this._splideQueue.push(callback);
                return;
            }

            this._splideLoading = true;
            this._splideQueue = [];

            this.fancyLog('Loading Splide...');

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `${templateURL}/assets/css/external/splide.min.css`;
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = `${templateURL}/assets/js/external/splide.min.js`;
            script.defer = true;

            script.onload = () => {
                this.fancyLog('Splide loaded.');
                this._splideLoading = false;
                callback?.();
                this._splideQueue.forEach(cb => cb?.());
                this._splideQueue = [];
            };

            script.onerror = () => {
                this._splideLoading = false;
                console.error('Failed to load Splide script.');
            };

            document.body.appendChild(script);
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
            const counter = el.querySelector("[data-amount]");
            const rawAmount = counter.dataset.amount.toString();
            const clean = v => (v + "").replace(/[^\d\.-]/gi, "");
            const num = clean(rawAmount);
            const decimals = (num.split(".")[1] || "").length;

            const proxy = { val: parseFloat(clean(counter.textContent)) || 0 };

            const props = {
                val: +num,
                duration: duration,
                ease: "linear",
                once: true,
                onUpdate: () => {
                    counter.textContent = this.formatNumber(proxy.val, decimals);
                }
            };

            if (withTrigger && parent) {
                props.scrollTrigger = {
                    trigger: parent,
                    start: baunfire.anim.start
                };
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
