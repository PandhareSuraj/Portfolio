const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast", "React Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display='none', 500);
    mainPage.classList.add("visible");
  }, 4000);
});

// View Resume Button (Shows Resume Image in Modal)
document.addEventListener('DOMContentLoaded', () => {
  const downloadResumeBtn = document.getElementById('download-resume-btn');
  
  // Resume image path
  const resumeImagePath = "images/Resume.png";
  
  // Create modal for displaying resume image (only once)
  let modal = null;
  let resumeImage = null;
  
  function createResumeModal() {
    if (modal) return { modal, resumeImage };
    
    modal = document.createElement('div');
    modal.id = 'resume-modal';
    modal.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.95);
      z-index: 10000;
      overflow: auto;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
    `;
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 30px;
      color: #fff;
      font-size: 50px;
      font-weight: bold;
      cursor: pointer;
      z-index: 10001;
      line-height: 1;
    `;
    closeBtn.onmouseover = () => closeBtn.style.color = '#ff3333';
    closeBtn.onmouseout = () => closeBtn.style.color = '#fff';
    
    resumeImage = document.createElement('img');
    resumeImage.id = 'resume-image';
    resumeImage.style.cssText = `
      max-width: 100%;
      max-height: 95vh;
      width: auto;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
      display: block;
    `;
    
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(resumeImage);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    return { modal, resumeImage };
  }
  
  if (downloadResumeBtn) {
    const modalData = createResumeModal();
    modal = modalData.modal;
    resumeImage = modalData.resumeImage;
    
    downloadResumeBtn.addEventListener('click', () => {
      // Show loading state
      const originalText = downloadResumeBtn.innerHTML;
      downloadResumeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
      downloadResumeBtn.style.backgroundColor = '#474af0';
      downloadResumeBtn.style.color = '#fff';
      downloadResumeBtn.style.borderColor = '#474af0';
      downloadResumeBtn.disabled = true;
      
      // Set image source directly
      resumeImage.src = resumeImagePath;
      
      // When image loads, show modal
      resumeImage.onload = () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Reset button immediately
        downloadResumeBtn.innerHTML = originalText;
        downloadResumeBtn.style.backgroundColor = 'transparent';
        downloadResumeBtn.style.color = '#000';
        downloadResumeBtn.style.borderColor = '#000';
        downloadResumeBtn.disabled = false;
      };
      
      // Handle error
      resumeImage.onerror = () => {
        alert('Resume image not found. Please ensure "Resume.png" is in the images folder.');
        downloadResumeBtn.innerHTML = originalText;
        downloadResumeBtn.style.backgroundColor = 'transparent';
        downloadResumeBtn.style.color = '#000';
        downloadResumeBtn.style.borderColor = '#000';
        downloadResumeBtn.disabled = false;
      };
    });
  }
});

// Contact Form - WhatsApp Integration
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const whatsappNumber = '918275838256'; // Your WhatsApp number without + sign

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent default form submission

      // Get form values
      const name = contactForm.querySelector('input[name="user_name"]').value.trim();
      const email = contactForm.querySelector('input[name="user_email"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();

      // Validate form fields
      if (!name || !email || !message) {
        alert('Please fill in all fields!');
        return;
      }

      // Format the message for WhatsApp
      const whatsappMessage = `*New Message from your Portfolio Website*\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Create WhatsApp URL (number format: country code + number without spaces or +)
      // Note: WhatsApp requires user to click send button - auto-send is not possible for security
      const whatsappURL = `https://wa.me/918275838256?text=${encodedMessage}`;

      // Open WhatsApp Web/App with pre-filled message
      // User will need to click send button in WhatsApp
      window.open(whatsappURL, '_blank');

      // Optional: Show success message
      const submitButton = contactForm.querySelector('.btn-send');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Message Sent! ✓';
      submitButton.style.backgroundColor = '#25D366';
      
      // Reset form
      contactForm.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.backgroundColor = '#474af0';
      }, 3000);
    });
  }
});