document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    const modalButtons = document.querySelectorAll('[data-modal]');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal__close');

    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            modalOverlay.style.display = 'block';
            modal.style.display = 'block';
            
            setTimeout(() => {
                modalOverlay.style.opacity = '1';
                modal.style.opacity = '1';
                modal.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
            
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modals.forEach(modal => {
            modal.style.opacity = '0';
            modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
        
        modalOverlay.style.opacity = '0';
        
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    const portfolioBtns = document.querySelectorAll('.portfolio-item__btn');
    const photoModal = document.getElementById('photo-modal');
    const photoViewerImg = document.querySelector('.photo-viewer__image');
    const photoViewerTitle = document.querySelector('.photo-viewer__title');
    
    portfolioBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            const title = this.parentElement.querySelector('.portfolio-item__title').textContent;
            
            photoViewerImg.src = imgSrc;
            photoViewerImg.alt = title;
            photoViewerTitle.textContent = title;
        });
    });

    const prevBtn = document.getElementById('prev-photo');
    const nextBtn = document.getElementById('next-photo');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('Previous photo');
        });
        
        nextBtn.addEventListener('click', function() {
            console.log('Next photo');
        });
    }

    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showNextTestimonial() {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }
    
    if (testimonials.length > 0) {
        testimonials[0].classList.add('active');
        setInterval(showNextTestimonial, 5000);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.feature-card, .service-card, .portfolio-item, .team-card, .equipment-card');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.feature-card, .service-card, .portfolio-item, .team-card, .equipment-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
            this.reset();
            closeModal();
        });
    });
});