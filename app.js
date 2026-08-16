document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    
    if (mobileMenuBtn && mobileDropdown) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDropdown.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                const isOpened = mobileDropdown.classList.contains('open');
                icon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
                lucide.createIcons();
            }
        });
        
        // Close menu on nav link clicks
        const mobileLinks = mobileDropdown.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDropdown.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // 3. Theme Toggle Code Removed (Fixed Lighter Theme)

    // 4. Header Scroll Blur Effect
    const mainHeader = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 5. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Initialize default pricing selector card
    selectPackage(2);
});

/* ==========================================================================
   DYNAMIC PRICING SELECTOR LOGIC
   ========================================================================== */

let selectedPageCount = 2;

const packagesData = {
    2: {
        title: "Starter Presentation Site",
        price: "$500",
        time: "5 Days Delivery",
        desc: "Ideal for basic business landing cards, portfolios, or single-product launches.",
        includes: [
            "Homepage Creative Layout",
            "Contact & Lead Capture Page",
            "Fully Responsive Mobile Layout",
            "1 Revision Iteration Cycle",
            "Basic On-Page SEO Setup",
            "Secure Server Deployment Support"
        ]
    },
    4: {
        title: "Professional Business Suite",
        price: "$700",
        time: "10 Days Delivery",
        desc: "Great for established corporate offices, retail outlets, or service agencies.",
        includes: [
            "Homepage Creative Design",
            "About & History Page",
            "Product / Service Catalog Grid",
            "Detailed Custom Lead Forms",
            "3 Revision Iteration Cycles",
            "Full Schema & Keyword Optimization",
            "Speed Tuning (96+ Desktop Score)",
            "Domain & Email Server Integration"
        ]
    },
    5: {
        title: "Corporate Showcase Platform",
        price: "$900+",
        time: "14 Days Delivery",
        desc: "Comprehensive corporate representation featuring micro-interactions and blog layouts.",
        includes: [
            "Homepage Custom Theme Layout",
            "About & Mission Timeline Page",
            "Service Catalog Detailed layouts",
            "Case Studies / Blog Feed Grid",
            "Contact Portal & Appointment Forms",
            "4 Revision Iteration Cycles",
            "Rich Scroll & Micro-Animations",
            "Full Performance Optimization",
            "Deployment & 30 Days Launch Support"
        ]
    }
};

function selectPackage(pagesCount) {
    selectedPageCount = pagesCount;
    
    // 1. Update Tab buttons UI state
    const tabs = document.querySelectorAll('.package-tab');
    const pageValues = [2, 4, 5];
    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', pageValues[index] === pagesCount);
    });
    
    // 2. Fetch target package data
    const pkg = packagesData[pagesCount];
    if (!pkg) return;
    
    // 3. Update details card DOM elements
    document.getElementById('package-title').textContent = pkg.title;
    document.getElementById('package-desc').textContent = pkg.desc;
    document.getElementById('package-price').textContent = pkg.price;
    document.getElementById('package-time').textContent = pkg.time;
    
    // 4. Update features checklist
    const includesList = document.getElementById('package-includes');
    includesList.innerHTML = '';
    
    pkg.includes.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<i data-lucide="check" class="icon-sm"></i> <span>${item}</span>`;
        includesList.appendChild(li);
    });
    
    // Re-initialize Lucide Icons on newly created checklist items
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Prepopulate selection into form & scroll
function applyPackageToForm() {
    const pkg = packagesData[selectedPageCount];
    if (!pkg) return;
    
    const dropdown = document.getElementById('contact-package');
    const detailsText = document.getElementById('contact-details');
    
    // Select package in dropdown select input
    dropdown.value = selectedPageCount;
    validateInput(dropdown);
    
    // Set message textarea
    detailsText.value = `Hi A Dynamic Web, I want to move forward with the ${selectedPageCount} Page Package (${pkg.price} - ${pkg.title}).\n\nLooking forward to scheduling a scoping call!`;
    validateInput(detailsText);
    
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ==========================================================================
   FORM VALIDATION & SUBMISSION
   ========================================================================== */

function validateInput(inputElement) {
    const wrapper = inputElement.parentElement;
    if (!wrapper) return true;
    
    let isValid = true;
    
    // Email Check
    if (inputElement.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(inputElement.value.trim());
    } 
    // Select Check
    else if (inputElement.tagName === 'SELECT') {
        isValid = inputElement.value !== '';
    } 
    // Text Input Check
    else if (inputElement.hasAttribute('required')) {
        isValid = inputElement.value.trim() !== '';
    }
    
    // Toggle CSS invalid wrapper class
    wrapper.classList.toggle('invalid', !isValid);
    return isValid;
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('project-contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') || input.tagName === 'SELECT') {
            const isFieldValid = validateInput(input);
            if (!isFieldValid) isFormValid = false;
        }
    });
    
    if (isFormValid) {
        // Toggle button loader state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Scheduling Session...</span>`;
        
        // Mock network latency
        setTimeout(() => {
            // Open Success Overlay Panel
            const overlay = document.getElementById('form-success-overlay');
            overlay.classList.add('open');
            
            // Reset loader, button, and fields
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            form.reset();
        }, 1000);
    }
}

function closeSuccessOverlay() {
    const overlay = document.getElementById('form-success-overlay');
    if (overlay) {
        overlay.classList.remove('open');
    }
}
