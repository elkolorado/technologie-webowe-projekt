function progressBars() {
    document.querySelectorAll(".progress-bar").forEach(bar => {
        bar.style.background = `linear-gradient(
            to right, 
            var(--primary-color),
            var(--primary-color) ${bar.dataset.value}%,
            var(--ternary-color) ${bar.dataset.value}%,
            var(--ternary-color)`
    })
}

function videoPlayButton() {
    const video = document.getElementById('video');
    const playIcon = document.createElement('img');
    playIcon.src = "/assets/icons/play.svg"
    playIcon.id = 'play-icon';

    video.parentElement.insertBefore(playIcon, video);

    const playVideo = () => {
        video.controls = true;
        playIcon.style.display = 'none';
    };
    const playVideoThumbnail = () => {
        video.play();
        video.controls = true;
        playIcon.style.display = 'none';
    }

    video.addEventListener('click', playVideo);
    playIcon.addEventListener('click', playVideoThumbnail);
};


const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselControls = document.querySelector('.carousel-controls');
let currentIndex = 1;
let intervalId;
const CAROUSEL_INTERVAL = 5000;


function showCarouselItem(index) {
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
}

function createCarouselControl(index) {
    const control = document.createElement('div');
    control.classList.add('carousel-control');
    if (index === currentIndex) {
        control.classList.add('active');
    }
    control.addEventListener('click', () => {
        showCarouselItem(index);
        updateActiveControl(index);
        startCarouselInterval();
    });
    return control;
}

function updateActiveControl(index) {
    const controls = carouselControls.querySelectorAll('.carousel-control');
    controls.forEach((control, i) => {
        control.classList.toggle('active', i === index);
    });
}

carouselItems.forEach((_, i) => {
    const control = createCarouselControl(i);
    carouselControls.appendChild(control);
})

function startCarouselInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextCarouselItem, CAROUSEL_INTERVAL);
}

function nextCarouselItem() {
    currentIndex++;
    if (currentIndex >= carouselItems.length) {
        currentIndex = 0;
    }
    showCarouselItem(currentIndex);
    updateActiveControl(currentIndex);
}

function inactiveTab() {
    document.hidden ? clearInterval(intervalId) : startCarouselInterval();
}
document.addEventListener('visibilitychange', inactiveTab);




const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        menuToggle.checked = false;
        menu.classList.remove('open');
    });
});



const fadeElements = document.querySelectorAll('.fade');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }, delay);
        }
    });
});

fadeElements.forEach((element) => {
    observer.observe(element);
});




showCarouselItem(currentIndex);
startCarouselInterval();
progressBars();
videoPlayButton();

