
// a very litte app, nothing fancy here
class App {

    constructor() {
        this.dateEl = this.getEl('date');
        this.timeEl = this.getEl('time');
        this.secEl = this.getEl('sec');
        this.loadingEl = this.getEl('loading');
        this.imgEl = this.getEl('image');

        this.drawClock();
    }

    getEl(id){
        return document.getElementById(id);
    }

    drawClock() {
        var d = new Date();
        this.dateEl.innerHTML = d.toDateString();
        this.timeEl.innerHTML = d.toLocaleTimeString().substring(0, 5);
        this.secEl.style.width = (100/60)*d.getSeconds() + '%';
    }

    loadImage() {
        this.imgEl.src = 'images/image_1.jpg';
        this.loadingEl.style.display = 'none';
    }

}

// create new app
var app = new App();

// just redraw the clock every sec
window.setInterval(function() { app.drawClock() }, 1000);

// and download the iamge after 3 seconds
window.setTimeout(function() { app.loadImage() }, 3000);