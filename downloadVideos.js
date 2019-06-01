var els = document.getElementsByTagName('a')

var urls = []

var sourceVideoUrl = []

for (var i = 0; i < els.length; i++) {
    var currentHref = els[i].href
    if (currentHref.includes('https://gopro.com/v/')) {
        urls.push(currentHref.substring(currentHref.lastIndexOf('/') + 1))
    }
    if (!currentHref.includes('https://gopro.com')) {
        console.error('This extension works only GoPro Plus domain: https://gopro.com/v/')
    }
}

var numberOfDone = 0;

urls.forEach((url, indx) => {

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var videoJson = JSON.parse(this.responseText)
            if (videoJson._embedded.variations[0].label !== 'source') console.error('Index 0 was not the source!!!! :/')
            sourceVideoUrl.push(videoJson._embedded.files[0].url);
            numberOfDone++;
            if(numberOfDone == urls.length)downloading();
        }
    });

    xhr.open("GET", `https://api.gopro.com/media/${url}/download`);

    xhr.send(data);

})

function downloading (){
    sourceVideoUrl.forEach(url => {
        window.open(url, '_blank');
    })
}