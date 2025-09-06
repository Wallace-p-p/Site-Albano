// Função para ajustar elementos baseados na proporção da tela
function adjustForAspectRatio() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const aspectRatio = viewportWidth / viewportHeight;
  
  // Ajustar elementos com base na proporção
  document.documentElement.style.setProperty('--viewport-width', `${viewportWidth}px`);
  document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
  document.documentElement.style.setProperty('--aspect-ratio', aspectRatio);
  
  // Ajustes específicos para telas muito largas ou muito altas
  if (aspectRatio > 2) {
    // Telas muito largas (ultrawide)
    document.documentElement.classList.add('ultrawide-screen');
    document.documentElement.classList.remove('narrow-screen');
  } else if (aspectRatio < 0.75) {
    // Telas muito altas (celular na horizontal)
    document.documentElement.classList.add('narrow-screen');
    document.documentElement.classList.remove('ultrawide-screen');
  } else {
    // Proporção padrão
    document.documentElement.classList.remove('ultrawide-screen', 'narrow-screen');
  }
}

// Função para carregar imagens responsivas
function loadResponsiveImages() {
  const images = document.querySelectorAll('img[data-srcset]');
  
  images.forEach(img => {
    const srcset = img.getAttribute('data-srcset');
    if (window.innerWidth < 768) {
      img.src = srcset.split(',')[0].split(' ')[0];
    } else if (window.innerWidth < 1200) {
      img.src = srcset.split(',')[1].split(' ')[0];
    } else {
      img.src = srcset.split(',')[2].split(' ')[0];
    }
  });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  adjustForAspectRatio();
  loadResponsiveImages();
  
  // Reajustar quando a janela for redimensionada
  window.addEventListener('resize', function() {
    adjustForAspectRatio();
    loadResponsiveImages();
  });
  
  // Menu mobile para telas pequenas
  const menuToggle = document.createElement('button');
  menuToggle.classList.add('menu-toggle');
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  
  const header = document.querySelector('.site-header');
  if (header && window.innerWidth < 992) {
    header.appendChild(menuToggle);
    
    const nav = document.querySelector('.main-nav ul');
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('show');
      menuToggle.classList.toggle('active');
    });
  }
});

// Animação ao scroll
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (!animatedElements.length) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Adiciona a classe de animação baseada no data-attribute
        const animationType = element.getAttribute('data-animation') || 'fadeInUp';
        element.classList.add(`animate-${animationType}`);
        
        // Para não observar novamente
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  // Observar todos os elementos com a classe animate-on-scroll
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
});

// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});