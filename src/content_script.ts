
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    debugger;
    if (msg.color) {
        console.log('Receive color = ' + msg.color);
        document.body.style.backgroundColor = msg.color;
        sendResponse('Change color to ' + msg.color);
    } else {
        sendResponse('Color message is none.');
    }

    if (msg.type && msg.type === '[StreamYard] Show Message') {
        // const messages: HTMLButtonElement[] = Array.from(document.querySelectorAll('button[aria-label="Show comment in broadcast"]'));
        const messages: HTMLDivElement[] = Array.from(document.querySelectorAll('div[class^=PlatformCommentShell__Wrap]'))
        //[6].querySelector('span[class^=Platform]')
        // messages.forEach(message => message.click());
        let message;
        const interval = setInterval(() => {
            const bp: HTMLButtonElement = document.querySelector('button[aria-label~="boilerplate"][aria-selected="true"]');
            if (!messages.length) {
                (document.querySelector('button[aria-label="Hide comment"]') as HTMLButtonElement).click();
                clearInterval(interval);
                if(bp) {
                    bp.click();
                }
            }

            if (messages.length > 0) {
                if (bp) {
                    bp.click();
                }

                message = messages.shift();
                message.querySelector('button').click();
                // const commentWrapper = (document.querySelector('div[class^=DefaultComment__Wrap]') as HTMLDivElement)

                // if (commentWrapper) {
                //     commentWrapper.setAttribute('style', 'transform: scale(0.35)');
                // }

                const text = message.querySelector('span[class^=Platform]');

                if (text.innerText.includes('boilerplate')) {
                    (document.querySelector('img[alt="boilerplate"]') as HTMLImageElement).click();
                }
            }
        }, 5000);

        sendResponse('clicked');
    }
});

