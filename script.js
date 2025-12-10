// Инициализация переменных
const navbar = document.getElementById('navbar');
const heroImage = document.getElementById('heroImage');
const ipAddress = document.getElementById('ipAddress');
const copyNotification = document.getElementById('copyNotification');
const scrollIndicator = document.getElementById('scrollIndicator');
const floatingElements = document.getElementById('floatingElements');

// Создание плавающих элементов (пчел, сот)
function createFloatingElements() {
    const colors = ['#FFE55C', '#FFD6E7', '#FFF4A3'];
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // Случайный размер
        const size = Math.random() * 40 + 20;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Случайная позиция
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        
        // Случайный цвет
        element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        element.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Случайная анимация
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        // Добавление стилей анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translate(0, 0) rotate(0deg); }
                33% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg); }
                66% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg); }
                100% { transform: translate(0, 0) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        floatingElements.appendChild(element);
    }
}

// Анимация навигации при скролле
window.addEventListener('scroll', () => {
    // Показ/скрытие навигации
    if (window.scrollY > 100) {
        navbar.style.padding = '0.8rem 5%';
        navbar.style.boxShadow = '0 5px 20px rgba(139, 115, 85, 0.15)';
    } else {
        navbar.style.padding = '1.2rem 5%';
        navbar.style.boxShadow = '0 5px 20px rgba(139, 115, 85, 0.1)';
    }
    
    // Показ/скрытие индикатора скролла
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY > scrollableHeight - 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '0.7';
    }
    
    // Анимация появления элементов при скролле
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
    
    // Параллакс эффект для hero изображения
    if (heroImage) {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
});





// Динамический фон для блоков с изображениями
const gradientBGs = [
    'linear-gradient(45deg, #FFD6E7, #FFE55C)',
    'linear-gradient(45deg, #FFE55C, #FFD6E7)',
    'linear-gradient(45deg, #FFF4A3, #FFB8D9)',
    'linear-gradient(45deg, #FFB8D9, #FFF4A3)',
    'linear-gradient(45deg, #FFE55C, #FFB8D9)'
];

document.querySelectorAll('.image-block').forEach((block, index) => {
    block.style.background = gradientBGs[index % gradientBGs.length];
    
    // Добавляем анимированные элементы внутрь блоков
    for (let i = 0; i < 5; i++) {
        const dot = document.createElement('div');
        dot.classList.add('floating-element');
        dot.style.width = `${Math.random() * 30 + 10}px`;
        dot.style.height = dot.style.width;
        dot.style.backgroundColor = i % 2 === 0 ? '#FFE55C' : '#FFD6E7';
        dot.style.opacity = Math.random() * 0.4 + 0.1;
        dot.style.borderRadius = '50%';
        dot.style.position = 'absolute';
        dot.style.left = `${Math.random() * 80 + 10}%`;
        dot.style.top = `${Math.random() * 80 + 10}%`;
        
        // Анимация
        const duration = Math.random() * 10 + 5;
        dot.style.animation = `float ${duration}s ease-in-out infinite alternate`;
        
        block.appendChild(dot);
    }
});

// Плавная прокрутка для якорных ссылок
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

// Интерактивный индикатор скролла
scrollIndicator.addEventListener('click', () => {
    window.scrollTo({
        top: window.scrollY + window.innerHeight * 0.8,
        behavior: 'smooth'
    });
});

function animateHeroTitle() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    // Сохраняем HTML структуру
    const originalHTML = heroTitle.innerHTML;
    
    // Очищаем заголовок
    heroTitle.innerHTML = '';
    
    // Разбиваем HTML на узлы
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    
    // Обрабатываем каждый текстовый узел
    function processNode(node, container) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ') {
                    // Для пробелов используем обычный текст или &nbsp;
                    const space = document.createTextNode(' ');
                    container.appendChild(space);
                } else {
                    // Для букв создаем span с анимацией
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0';
                    span.style.display = 'inline-block';
                    span.style.transform = 'translateY(20px)';
                    
                    // Анимация появления каждой буквы
                    setTimeout(() => {
                        span.style.transition = 'opacity 0.5s, transform 0.5s';
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, 100 + i * 30); // Уменьшил задержку для более плавной анимации
                    
                    container.appendChild(span);
                }
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Для элементов копируем их и обрабатываем содержимое
            const element = node.cloneNode(false); // Без содержимого
            Array.from(node.childNodes).forEach(child => {
                processNode(child, element);
            });
            container.appendChild(element);
        }
    }
    
    // Обрабатываем все узлы
    Array.from(tempDiv.childNodes).forEach(child => {
        processNode(child, heroTitle);
    });
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    animateHeroTitle();
    
    // Инициализация анимации для видимых элементов
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
    
    // Случайная анимация для логотипа
    const logo = document.querySelector('.logo i');
    if (logo) {
        setInterval(() => {
            logo.style.transform = 'rotate(20deg)';
            setTimeout(() => {
                logo.style.transform = 'rotate(0deg)';
            }, 300);
        }, 5000);
    }
});

// Динамическое изменение фона в зависимости от времени суток
//function updateBackgroundByTime() {
 //   const hour = new Date().getHours();
   // const hero = document.querySelector('.hero');
    
    //if (hour >= 18 || hour <= 6) {
        // Ночной режим
      //  hero.style.background = 'linear-gradient(135deg, #4a2c6d 0%, #8B7355 100%)';
    //} else if (hour >= 6 && hour < 12) {
        // Утренний режим
      //  hero.style.background = 'linear-gradient(135deg, #4a2c6d 0%, #8B7355 100%)';
   // }
    // Днем оставляем стандартный градиент
//}

// Запускаем обновление фона
//updateBackgroundByTime();