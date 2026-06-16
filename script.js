document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer - Płynne wjeżdżanie sekcji podczas skrolowania
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedSections = document.querySelectorAll('.section-animate');
    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // 2. Automatyczny wybór pakietu w formularzu po kliknięciu w cenniku
    const selectButtons = document.querySelectorAll('.btn-select');
    const packageSelect = document.getElementById('package-select');

    selectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const packageType = button.getAttribute('data-package');
            
            if (packageSelect) {
                if (packageType === 'starter-20') {
                    packageSelect.value = 'Starter (20 zł)';
                } else if (packageType === 'basic-30') {
                    packageSelect.value = 'Basic Plus (30 zł)';
                } else if (packageType === 'standard-50') {
                    packageSelect.value = 'Standard JS (50 zł)';
                } else if (packageType === 'premium-80') {
                    packageSelect.value = 'Premium Gaming (80 zł)';
                } else if (packageType === 'custom-100') {
                    packageSelect.value = 'Dojebany Custom (100 zł)';
                }
            }
        });
    });

    // 3. Obsługa wysyłania formularza
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('.btn-submit');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wysyłanie pakietu...';
                btn.style.opacity = '0.8';
                btn.style.pointerEvents = 'none';
            }
        });
    }
});