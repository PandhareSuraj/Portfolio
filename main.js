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

// Download Resume Button
document.addEventListener('DOMContentLoaded', () => {
  const downloadResumeBtn = document.getElementById('download-resume-btn');
  
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', async () => {
      // Try multiple possible paths for the resume
      const possiblePaths = [
        "resume/Suraj's Resume.pdf",
        "Suraj's Resume.pdf",
        "images/Suraj's Resume.pdf",
        "resume/Suraj_Resume.pdf",
        "Suraj_Resume.pdf"
      ];
      
      const resumePath = possiblePaths[0]; // Primary path
      const fileName = "Suraj's Resume.pdf";
      
      // Show loading state
      const originalText = downloadResumeBtn.innerHTML;
      downloadResumeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...';
      downloadResumeBtn.style.backgroundColor = '#474af0';
      downloadResumeBtn.style.color = '#fff';
      downloadResumeBtn.style.borderColor = '#474af0';
      downloadResumeBtn.disabled = true;
      
      try {
        // Method 1: Try fetch API for better download control
        const response = await fetch(resumePath);
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          link.style.display = 'none';
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the URL
          window.URL.revokeObjectURL(url);
          
          // Show success
          downloadResumeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded!';
          downloadResumeBtn.style.backgroundColor = '#25D366';
        } else {
          throw new Error('File not found');
        }
      } catch (error) {
        // Method 2: Fallback to direct link method
        console.log('Fetch failed, trying direct link method...');
        
        const link = document.createElement('a');
        link.href = resumePath;
        link.download = fileName;
        link.target = '_blank';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success (even if it opens in new tab)
        downloadResumeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Opening...';
        downloadResumeBtn.style.backgroundColor = '#25D366';
      }
      
      // Reset button after 2 seconds
      setTimeout(() => {
        downloadResumeBtn.innerHTML = originalText;
        downloadResumeBtn.style.backgroundColor = 'transparent';
        downloadResumeBtn.style.color = '#000';
        downloadResumeBtn.style.borderColor = '#000';
        downloadResumeBtn.disabled = false;
      }, 2000);
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