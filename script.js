document.addEventListener('DOMContentLoaded', function() {
            // Initialize Particles.js
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#ffffff" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.7, "random": true },
                    "size": { "value": 3, "random": true },
                    "line_linked": { "enable": true, "distance": 150, "color": "#5e9fff", "opacity": 0.4, "width": 1 },
                    "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "out_mode": "out" }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": { "enable": true, "mode": "repulse" },
                        "onclick": { "enable": true, "mode": "push" }
                    }
                }
            });

            // Form Elements
            const form = document.getElementById('signup-form');
            const username = document.getElementById('username');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            const successOverlay = document.getElementById('success-overlay');
            const loginLink = document.getElementById('login-link');

            // Real-Time Validation
            username.addEventListener('input', validateUsername);
            email.addEventListener('input', validateEmail);
            password.addEventListener('input', validatePassword);
            confirmPassword.addEventListener('input', validateConfirmPassword);

            // Form Submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const isUsernameValid = validateUsername();
                const isEmailValid = validateEmail();
                const isPasswordValid = validatePassword();
                const isConfirmValid = validateConfirmPassword();
                
                if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid) {
                    // Trigger Warp Effect
                    triggerWarpEffect();
                    
                    // Show Success Overlay
                    setTimeout(() => {
                        successOverlay.classList.add('active');
                        
                        // Reset Form After 3 Seconds
                        setTimeout(() => {
                            form.reset();
                            successOverlay.classList.remove('active');
                            resetInputs();
                        }, 3000);
                    }, 1500);
                }
            });

            // Login Link Effect
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                createParticleBurst(loginLink, 15);
            });

            // Validation Functions
            function validateUsername() {
                const isValid = username.value.length >= 4 && username.value.length <= 20;
                toggleError(username.parentElement, isValid);
                return isValid;
            }

            function validateEmail() {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isValid = regex.test(email.value);
                toggleError(email.parentElement, isValid);
                return isValid;
            }

            function validatePassword() {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
                const isValid = regex.test(password.value);
                toggleError(password.parentElement, isValid);
                
                if (confirmPassword.value) {
                    validateConfirmPassword();
                }
                
                return isValid;
            }

            function validateConfirmPassword() {
                const isValid = confirmPassword.value === password.value;
                toggleError(confirmPassword.parentElement, isValid);
                return isValid;
            }

            function toggleError(element, isValid) {
                if (isValid) {
                    element.classList.remove('error');
                } else {
                    element.classList.add('error');
                }
            }

            function resetInputs() {
                document.querySelectorAll('.input-group').forEach(group => {
                    group.classList.remove('error');
                });
            }

            // Cosmic Effects
            function triggerWarpEffect() {
                const portal = document.querySelector('.cosmic-portal');
                portal.style.transform = 'scale(1.1) rotateX(10deg) rotateY(10deg)';
                portal.style.boxShadow = '0 0 80px var(--cosmic-blue)';
                
                // Create Shockwave
                const shockwave = document.createElement('div');
                shockwave.style.position = 'absolute';
                shockwave.style.width = '10px';
                shockwave.style.height = '10px';
                shockwave.style.borderRadius = '50%';
                shockwave.style.background = 'radial-gradient(circle, var(--cosmic-blue), transparent)';
                shockwave.style.top = '50%';
                shockwave.style.left = '50%';
                shockwave.style.transform = 'translate(-50%, -50%)';
                shockwave.style.boxShadow = '0 0 50px var(--cosmic-blue)';
                portal.appendChild(shockwave);
                
                shockwave.animate([
                    { width: '10px', height: '10px', opacity: 1 },
                    { width: '500px', height: '500px', opacity: 0 }
                ], { duration: 1000, easing: 'ease-out' }).onfinish = () => shockwave.remove();
                
                // Reset Portal
                setTimeout(() => {
                    portal.style.transform = '';
                    portal.style.boxShadow = '';
                }, 1500);
            }

            function createParticleBurst(element, count) {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                for (let i = 0; i < count; i++) {
                    const particle = document.createElement('div');
                    particle.style.position = 'fixed';
                    particle.style.width = `${Math.random() * 4 + 2}px`;
                    particle.style.height = particle.style.width;
                    particle.style.backgroundColor = 'white';
                    particle.style.borderRadius = '50%';
                    particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px var(--cosmic-blue)`;
                    particle.style.left = `${centerX}px`;
                    particle.style.top = `${centerY}px`;
                    document.body.appendChild(particle);
                    
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 100 + 50;
                    
                    particle.animate([
                        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                        { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
                    ], { duration: 1000, easing: 'ease-out' }).onfinish = () => particle.remove();
                }
            }

            // Parallax Effect for Cosmic Rings
            document.addEventListener('mousemove', (e) => {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                document.querySelectorAll('.cosmic-ring').forEach((ring, i) => {
                    const factor = (i + 1) * 0.5;
                    ring.style.transform = `translate(${x * 30 * factor}px, ${y * 30 * factor}px) rotate(${i * 120}deg)`;
                });
            });

            // Shooting Stars
            setInterval(() => {
                const star = document.createElement('div');
                star.style.position = 'fixed';
                star.style.width = '2px';
                star.style.height = '2px';
                star.style.backgroundColor = 'white';
                star.style.borderRadius = '50%';
                star.style.boxShadow = '0 0 5px 2px var(--cosmic-blue)';
                star.style.left = `${Math.random() * window.innerWidth}px`;
                star.style.top = '-10px';
                document.body.appendChild(star);
                
                star.animate([
                    { transform: 'translate(0, 0)', opacity: 1 },
                    { transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 10}px)`, opacity: 0 }
                ], { duration: 2000, easing: 'linear' }).onfinish = () => star.remove();
            }, 2000);
        });
