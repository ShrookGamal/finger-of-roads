const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.querySelector('.side-menu');
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-links li a');
const sections = document.querySelectorAll('section[id]');
let menuOpen = false;
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
            menuBtn.classList.add('open');
            sideMenu.classList.add('open');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            sideMenu.classList.remove('open');
            menuOpen = false;
        }
    });
}

document.querySelectorAll('.side-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        sideMenu.classList.remove('open');
        menuOpen = false;
    });
});


window.addEventListener('scroll', () => {
    let current = "";

    if (window.scrollY > 50) {
        header.style.background = '#121212';
        header.style.padding = '10px 0';
    } else {
        header.style.background = 'rgba(18, 18, 18, 0.9)';
        header.style.padding = '15px 0';
    }

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = { threshold: 0.3 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
        }
    });
}, observerOptions);

const imageBox = document.querySelector('.image-inner');
if (imageBox) observer.observe(imageBox);

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 100); 
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    serviceObserver.observe(card);
});

const galleryCards = document.querySelectorAll('.gallery-card');
galleryCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        let w = card.clientWidth;
        let h = card.clientHeight;
        let moveX = (x - w / 2) / (w / 2) * 5; 
        let moveY = (y - h / 2) / (h / 2) * 5;
        card.style.transform = `translateY(-10px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `translateY(0) rotateX(0) rotateY(0)`;
    });
});

window.addEventListener('scroll', () => {
    const spine = document.querySelector('.central-spine');
    const section = document.querySelector('.why-choose-us');
    if (spine && section) {
        const scrollPos = window.scrollY;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos > sectionTop - 400) {
            let height = ((scrollPos - (sectionTop - 400)) / sectionHeight) * 100;
            if(height > 100) height = 100;
            spine.style.setProperty('--line-height', height + '%');
        }
    }
});

const requestForm = document.getElementById('requestForm');
if (requestForm) {
    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.submit-btn');
        const originalContent = btn.innerHTML;
        
        btn.innerHTML = 'جاري الإرسال... <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        setTimeout(() => {
            alert('شكراً لتواصلك مع أنامل الطرق! سيقوم فريقنا بالتواصل معك فوراً.');
            btn.innerHTML = 'تم الإرسال بنجاح <i class="fas fa-check"></i>';
            this.reset();
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
            }, 3000);
        }, 2000);
    });
}