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

    // 2. Automatyczny wybór pakietu w formularzu po kliknięciu w cenniku (NAPRAWIONE WARTOŚCI)
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
                    packageSelect.value = 'Dedykowany Custom (100 zł)';
                }
            }
        });
    });

    // 3. Obsługa wysyłania formularza przez Web3Forms API (NAPRAWIONE)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Zatrzymujemy domyślne przeładowanie strony
            
            const btn = form.querySelector('.btn-submit');
            const originalBtnText = btn.innerHTML;
            
            // Stan ładowania
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wysyłanie...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            const formData = new FormData(form);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    // Sukces
                    btn.innerHTML = '<i class="fas fa-check"></i> Wysłano pomyślnie!';
                    btn.style.backgroundColor = '#22c55e';
                    btn.style.borderColor = '#22c55e';
                    btn.style.color = '#fff';
                    form.reset();
                } else {
                    // Log błędu z API dla dewelopera
                    console.log(json);
                    btn.innerHTML = '<i class="fas fa-times"></i> Błąd wysyłania';
                    btn.style.backgroundColor = '#ef4444';
                    btn.style.borderColor = '#ef4444';
                    btn.style.color = '#fff';
                }
            })
            .catch(error => {
                console.log(error);
                btn.innerHTML = '<i class="fas fa-times"></i> Błąd połączenia';
                btn.style.backgroundColor = '#ef4444';
                btn.style.borderColor = '#ef4444';
                btn.style.color = '#fff';
            })
            .finally(() => {
                // Przywrócenie przycisku do normy po 4 sekundach
                setTimeout(() => {
                    btn.innerHTML = originalBtnText;
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    btn.style.backgroundColor = 'transparent';
                    btn.style.borderColor = 'var(--accent-neon)';
                    btn.style.color = 'var(--accent-neon)';
                }, 4000);
            });
        });
    }
});
