let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onPlayerReady(event) {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                event.target.playVideo();
            } else {
                event.target.pauseVideo();
            }
        });
    }, {threshold: 0.1});

    observer.observe(document.querySelector('#' + event.target.getIframe().id));
}

function onYouTubeIframeAPIReady() {
    new YT.Player('video1', {
        width: '700',
        videoId: 'J5r7GInOLNQ',
        playerVars: {
            'mute': 1,
            'controls': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });

    new YT.Player('video2', {
        width: '768',
        videoId: 'tjgnPGscfCk',
        playerVars: {
            'mute': 1,
            'controls': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}
