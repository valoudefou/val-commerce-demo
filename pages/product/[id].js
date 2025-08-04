import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <Script
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                    var PARAMS = {
                        MIN_VISIBLE_MS: 2000, // at least 2 seconds
                        MAX_WAIT_MS: 8000, // hard cap to avoid infinite hang
                        TARGET_CAMPAIGN_KEY: '1482531' // the AB Tasty key we're waiting for
                    };
                    var startTime = Date.now();
                    var removed = false;
                    var maxTimeout;

                    function createAntiFlicker() {
                        return '<div class="abAntiFlicker" style="width:100vw; height:100vh; position:fixed; top:0; left:0; z-index:2147483647; pointer-events:none; background-color:rgba(255,255,255,1);"></div>';
                    }
                    function injectAntiFlicker() {
                        if (document.querySelector('.abAntiFlicker')) return;
                        document.querySelector('body')?.insertAdjacentHTML('beforeend', createAntiFlicker());
                    }
                    function removeAntiFlicker() {
                        if (removed) return;
                        removed = true;
                        var anti = document.querySelector('.abAntiFlicker');
                        if (anti) anti.parentNode.removeChild(anti);
                        clearInterval(pollInterval);
                        clearTimeout(maxTimeout);
                    }

                    function checkAndMaybeRemove() {
                        var elapsed = Date.now() - startTime;
                        var hasKey =
                            window.ABTasty &&
                            window.ABTasty.results &&
                            Object.prototype.hasOwnProperty.call(window.ABTasty.results, PARAMS.TARGET_CAMPAIGN_KEY);
                        if (elapsed >= PARAMS.MIN_VISIBLE_MS && hasKey) {
                            removeAntiFlicker();
                        }
                    }

                    injectAntiFlicker();

                    // Poll periodically for the target key, but after min visible and presence remove.
                    var pollInterval = setInterval(checkAndMaybeRemove, 100);

                    // Hard cap: remove no later than MAX_WAIT_MS after start (but still respect MIN_VISIBLE_MS)
                    maxTimeout = setTimeout(function() {
                        var elapsed = Date.now() - startTime;
                        if (elapsed >= PARAMS.MIN_VISIBLE_MS) {
                            removeAntiFlicker();
                        } else {
                            setTimeout(removeAntiFlicker, PARAMS.MIN_VISIBLE_MS - elapsed);
                        }
                    }, PARAMS.MAX_WAIT_MS);
                    `,
                        }}
                    />
                    <Script
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-TR4C6NR');`,
                        }}
                    />
                    <meta
                        name="description"
                        content="The premiere e-commerce product."
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TR4C6NR" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
                        }}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
