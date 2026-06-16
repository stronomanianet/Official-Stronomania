document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-animate').forEach(section => observer.observe(section));

    // Automatyczny wybór pakietu
    const selectButtons = document.querySelectorAll('.btn-select');
    const packageSelect = document.getElementById('package-select');

    selectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const val = button.getAttribute('data-package');
            const map = {
                'starter-20': 'Starter (20 zł)',
                'basic-30': 'Basic Plus (30 zł)',
                'standard-50': 'Standard JS (50 zł)',
                'premium-80': 'Premium Gaming (80 zł)',
                'custom-100': 'Dojebany Custom (100 zł)'
            };
            if (packageSelect) packageSelect.value = map[val];
        });
    });

    // Obsługa Web3Forms
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const originalBtnText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wysyłanie...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(form)
            })
            .then(async (response) => {
                if (response.status == 200) {
                    btn.innerHTML = '<i class="fas fa-check"></i> Wysłano!';
                    btn.style.backgroundColor = '#22c55e';
                    form.reset();
                } else {
                    btn.innerHTML = '<i class="fas fa-times"></i> Błąd';
                }
            })
            .finally(() => {
                setTimeout(() => {
                    btn.innerHTML = originalBtnText;
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    btn.style.backgroundColor = 'transparent';
                }, 3000);
            });
        });
    }
});
