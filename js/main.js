document.addEventListener('DOMContentLoaded', function() {
  // Language Selector
  const languageSelect = document.getElementById('language-select');
  if(languageSelect) {
    languageSelect.addEventListener('change', function() {
      changeLanguage(this.value);
    });
  }
  
  // Initialize language from URL or defaults to Chinese
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'zh';
  changeLanguage(lang);
  
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navItems = document.querySelector('.nav-items');
  
  if(mobileMenuBtn && navItems) {
    mobileMenuBtn.addEventListener('click', function() {
      navItems.classList.toggle('show');
      this.classList.toggle('active');
    });
  }
  
  // FAQ Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
  
  // Countdown Timer
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 3);
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
    document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.querySelector('.pricing-countdown').innerHTML = '<p>优惠已结束</p>';
    }
  }
  
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if(this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Navbar scroll effects
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Placeholder for hero video
  const heroVideo = document.querySelector('.hero-video');
  if(heroVideo) {
    // In a real implementation, this would be replaced with an actual video URL
    heroVideo.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #4a90e2, #50e3c2);">
        <div style="text-align: center; padding: 20px; color: white;">
          <i class="fas fa-play-circle" style="font-size: 48px; margin-bottom: 10px;"></i>
          <p>视角演示视频</p>
        </div>
      </div>
    `;
  }
  
  // Placeholder for QR code
  const qrCode = document.querySelector('.qr-code');
  if(qrCode) {
    qrCode.src = generateQRCodeSVG();
  }
  
  // Navigation between app pages
  function navigateToAppPage(pageName) {
    switch(pageName) {
      case 'home':
        window.location.href = 'apps/base/app/home.html';
        break;
      case 'explore':
        window.location.href = 'apps/base/app/explore.html';
        break;
      case 'record':
        window.location.href = 'apps/base/app/record.html';
        break;
      case 'community':
        window.location.href = 'apps/base/app/community.html';
        break;
      case 'profile':
        window.location.href = 'apps/base/app/profile.html';
        break;
      case 'settings':
        window.location.href = 'apps/base/app/settings.html';
        break;
      case 'tutorial':
        window.location.href = 'apps/base/app/tutorial.html';
        break;
    }
  }

  // Handle app demo button click
  const appDemoButton = document.querySelector('.app-demo-button .btn');
  if(appDemoButton) {
    appDemoButton.addEventListener('click', function(e) {
      e.preventDefault();
      navigateToAppPage('home');
    });
  }
});

// Generate a placeholder QR code SVG
function generateQRCodeSVG() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "150");
  svg.setAttribute("height", "150");
  svg.setAttribute("viewBox", "0 0 150 150");
  
  // Background
  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("width", "150");
  rect.setAttribute("height", "150");
  rect.setAttribute("fill", "white");
  svg.appendChild(rect);
  
  // QR code frame
  const frame = document.createElementNS(svgNS, "rect");
  frame.setAttribute("x", "10");
  frame.setAttribute("y", "10");
  frame.setAttribute("width", "130");
  frame.setAttribute("height", "130");
  frame.setAttribute("fill", "none");
  frame.setAttribute("stroke", "#333");
  frame.setAttribute("stroke-width", "5");
  svg.appendChild(frame);
  
  // QR code pattern (simplified)
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if(Math.random() > 0.5) {
        const cell = document.createElementNS(svgNS, "rect");
        cell.setAttribute("x", 30 + i * 20);
        cell.setAttribute("y", 30 + j * 20);
        cell.setAttribute("width", "15");
        cell.setAttribute("height", "15");
        cell.setAttribute("fill", "#333");
        svg.appendChild(cell);
      }
    }
  }
  
  // QR code position markers
  const positions = [[20, 20], [110, 20], [20, 110]];
  positions.forEach(pos => {
    const outer = document.createElementNS(svgNS, "rect");
    outer.setAttribute("x", pos[0]);
    outer.setAttribute("y", pos[1]);
    outer.setAttribute("width", "20");
    outer.setAttribute("height", "20");
    outer.setAttribute("fill", "#333");
    svg.appendChild(outer);
    
    const inner = document.createElementNS(svgNS, "rect");
    inner.setAttribute("x", pos[0] + 5);
    inner.setAttribute("y", pos[1] + 5);
    inner.setAttribute("width", "10");
    inner.setAttribute("height", "10");
    inner.setAttribute("fill", "white");
    svg.appendChild(inner);
  });
  
  // Convert SVG to data URL
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  return "data:image/svg+xml;base64," + btoa(svgStr);
}