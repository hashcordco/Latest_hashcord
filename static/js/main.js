document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect
    const words = ["SOFTWARE", "WEBSITES", "APPS", "STRATEGY", "GROWTH"];
    let i = 0, j = 0, isDeleting = false;
    const typeTarget = document.getElementById("typewriter");

    function type() {
        if (!typeTarget) return;
        const currentWord = words[i];
        
        typeTarget.textContent = isDeleting 
            ? currentWord.substring(0, j - 1) 
            : currentWord.substring(0, j + 1);
        
        j = isDeleting ? j - 1 : j + 1;

        if (!isDeleting && j === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }
    type();

    // 2. Entrance Animation
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({ delay: 0.5 });

        // Targeted the new .hero-description and removed .hero-btns
        tl.set(".hero-description, .mouse-parallax", { 
            visibility: "visible", 
            opacity: 0 
        })
        .to(".hero-description", { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out" 
        })
        .to(".mouse-parallax", { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "back.out(1.2)" 
        }, "-=0.4");
    }

    // 3. Mouse Parallax Effect (High Performance Fix)
    const targetCard = document.querySelector(".mouse-parallax");
    if (targetCard && typeof gsap !== 'undefined') {
        
        // Initialize quickTo setters for ultra-smooth 60fps movement
        const xTo = gsap.quickTo(targetCard, "rotationY", { duration: 0.8, ease: "power2.out" });
        const yTo = gsap.quickTo(targetCard, "rotationX", { duration: 0.8, ease: "power2.out" });

        document.addEventListener("mousemove", (e) => {
            // Calculate rotation values
            const xVal = (window.innerWidth / 2 - e.pageX) / 25;
            const yVal = (window.innerHeight / 2 - e.pageY) / 25;

            // Trigger the pre-initialized setters
            xTo(xVal);
            yTo(-yVal);
        });
    }

    // 4. Navbar Scroll
    const nav = document.querySelector('.nav-custom');
    window.addEventListener('scroll', () => {
        if (nav) {
            window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        }
    });
});