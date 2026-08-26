document.addEventListener("DOMContentLoaded", () => {

    const envelopeScreen = document.getElementById("envelopeScreen");
    const openLetter = document.getElementById("openLetter");
    const invitation = document.getElementById("invitation");
    const loader = document.querySelector(".loader");

    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
            }, 500);
        });
    }

    if (openLetter && envelopeScreen && invitation) {
        openLetter.addEventListener("click", () => {

            envelopeScreen.classList.add("opening");

            setTimeout(() => {
                invitation.classList.add("show");
                document.body.style.overflowY = "auto";
                document.documentElement.style.overflowY = "auto";

                if (typeof AOS !== "undefined") {
                    AOS.refresh();
                }

            }, 900);
        });
    }

    const music = document.getElementById("music");
    const musicBtn = document.querySelector(".music-btn");

    window.toggleMusic = function () {
        if (!music || !musicBtn) return;

        if (music.paused) {
            music.play()
                .then(() => {
                    musicBtn.classList.add("active");
                    musicBtn.classList.add("playing");
                })
                .catch(() => {});
        } else {
            music.pause();
            musicBtn.classList.remove("active");
            musicBtn.classList.remove("playing");
        }
    };

    const weddingDate = new Date("April 17, 2027 18:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const minutes = document.getElementById("minutes");
        const seconds = document.getElementById("seconds");

        if (!days || !hours || !minutes || !seconds) return;

        if (difference <= 0) {
            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";
            return;
        }

        days.textContent = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        ).toString().padStart(2, "0");

        hours.textContent = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        ).toString().padStart(2, "0");

        minutes.textContent = Math.floor(
            (difference / (1000 * 60)) % 60
        ).toString().padStart(2, "0");

        seconds.textContent = Math.floor(
            (difference / 1000) % 60
        ).toString().padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


   const swiperElement = document.querySelector(".gallery-slider");

if (swiperElement && typeof Swiper !== "undefined") {
    new Swiper(".gallery-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        initialSlide: 0,
        speed: 700,

        navigation: {
            nextEl: ".next",
            prevEl: ".prev"
        },

        breakpoints: {
            600: {
                slidesPerView: 2,
                spaceBetween: 20
            },

            900: {
                slidesPerView: 3,
                spaceBetween: 25
            }
        }
    });
}


    const rsvpForm = document.querySelector('form[name="rsvp"]');

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", () => {
            const button = rsvpForm.querySelector("button");

            if (button) {
                button.textContent = "Ուղարկվում է...";
                button.disabled = true;
            }
        });
    }


    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("click", function (event) {

            const ripple = document.createElement("span");
            ripple.classList.add("ripple");

            const rect = this.getBoundingClientRect();

            ripple.style.left = `${event.clientX - rect.left}px`;
            ripple.style.top = `${event.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

    });


    function createFloatingHeart() {

        const heart = document.createElement("div");

        heart.classList.add("floating-heart");

        const image = document.createElement("img");
        image.src = "miniheart.png";
        image.alt = "";

        heart.appendChild(image);

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.width = Math.random() * 15 + 15 + "px";
        heart.style.animationDuration = Math.random() * 3 + 5 + "s";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    setInterval(createFloatingHeart, 2500);


    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: "ease-out"
        });
    }

});
window.toggleMusic = function () {
    const music = document.getElementById("music");
    const musicBtn = document.querySelector(".music-btn");
    const musicIcon = document.getElementById("musicIcon");

    if (!music || !musicBtn) return;

    // Նոտայի SVG (անջատված վիճակ)
    const noteIcon = `<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>`;
    
    // Պաուզայի SVG (միացված վիճակ)
    const pauseIcon = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;

    if (music.paused) {
        music.play()
            .then(() => {
                musicBtn.classList.add("playing");
                if (musicIcon) musicIcon.innerHTML = pauseIcon; // Փոխում ենք պաուզայի նշանի
            })
            .catch((err) => console.log("Audio play error:", err));
    } else {
        music.pause();
        musicBtn.classList.remove("playing");
        if (musicIcon) musicIcon.innerHTML = noteIcon; // Հետ ենք բերում նոտան
    }
};