// IIFE (Immediately  invoked function Expresstion)

(function(){
    const AUTOPLAY_MS = 5600;
    
    function initSlider(root){
        const slides = Array.from(root.querySelectorAll(".slide"));
        const dotsWrap = root.querySelector(".slider-dots");
        const prevBtn = root.querySelector("[data-slide-prev]");
        const nextBtn = root.querySelector("[data-slide-next]");

        if(!slides.length) return;

        let current = 0;
        let timer = null;
        let touchStartX = null;

        slides.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = "slider-dot" + (i === 0 ? " is-active" : "");
            dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
            dot.addEventListener("click", () => goTo(i, true));
            dotsWrap.appendChild(dot);
        });
        const dots = Array.from(dotsWrap.children);

        function goTo(index, userTriggered){
            slides[current].classList.remove("is-active");
            dots[current].classList.remove("is-active");
            current = (index + slides.length) % slides.length;
            slides[current].classList.add("is-active");
            dots[current].classList.add("is-active");
            if (userTriggered) restartAutoplay();

        }

        function next(){goTo(current + 1);}
        function prev(){goTo(current - 1);}
       
        function startAutoplay(){
            timer = setInterval(next, AUTOPLAY_MS)
        }

        function stopAutoplay(){
            if(timer) clearInterval(timer);
            timer = null;
        }

        function restartAutoplay(){
           stopAutoplay(); 
           startAutoplay();
        }

        prevBtn.addEventListener("click", ()=> goTo(current - 1 ,true));
        nextBtn.addEventListener("click", ()=> goTo(current + 1 ,true));

        root.addEventListener("mouseenter", stopAutoplay);
        root.addEventListener("mouseleave", startAutoplay);
        root.addEventListener("focusin", stopAutoplay);
        root.addEventListener("focusout", startAutoplay);

        // Touch / swipe

        root.addEventListener("touchstart", e=>{
            touchStartX = e.touches[0].clientX;
            stopAutoplay();
        }, {passive: true});

        root.addEventListener("touchend", e=>{
            if(touchStartX === null) return;
            const deltaX = e.changedToucheds[0].clientX - touchStartX;
            if(Math.abs(deltaX)>40){
                deltaX < 0 ? goTo(current+1) : goTo (current -1);
             }
             touchStartX = null;
             startAutoplay();
        });

        root.setAttribute("tabindex", "0");
        root.addEventListener("keydown", e =>{
            if(e.key === "ArrowRight") goTo(current + 1) ;
            if(e.key === "ArrowLeft") goTo(current - 1) ;
        });
        startAutoplay();
    }

    document.addEventListener("DOMContentLoaded",()=>{
        document.querySelectorAll("[data-hero-slider]").forEach(initSlider)
    });
})();