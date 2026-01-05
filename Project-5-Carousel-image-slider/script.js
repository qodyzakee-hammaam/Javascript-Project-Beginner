const carouselSlide = document.querySelector('.carousel-slide');

const carouselImage = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const indicators = document.querySelectorAll('.indicator');

let idx = 0;
const totalImage = carouselImage.length;

let autoSlide;

function updateCarousel(){
    carouselSlide.style.transform = `translateX(${-idx * 100}%)`

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === idx);
    });
}

function nextSlide(){
    idx = (idx + 1) % totalImage;
    updateCarousel();
    resetAutoSlide();
}

function prevSlide(){
    idx = (idx - 1 + totalImage) % totalImage;
    updateCarousel();
    resetAutoSlide();
}

function resetAutoSlide(){
    clearInterval(autoSlide);

    autoSlide = setInterval(nextSlide, 4000);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

autoSlide = setInterval(nextSlide, 4000);

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        idx = index;
        updateCarousel();
        resetAutoSlide();
    });
});
