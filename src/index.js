// Smooth scroll navigation
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = item.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: "smooth"
        });
    });
});

// EmailJS initialization
emailjs.init("DaZnMybJA8Sxi2B53");

// Contact form submission
document.getElementById("quote-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        // Collect all form data
        const formData = new FormData(form);

        // Build services list
        const services = [];
        formData.getAll('services').forEach(service => {
            services.push(service);
        });

        // Create a formatted message with all fields
        const messageContent = `
NEW CONTACT FORM SUBMISSION

Contact Information:
Name: ${formData.get('user_name')}
Email: ${formData.get('user_email')}
Phone: ${formData.get('user_phone')}
Location: ${formData.get('project_location')}

Services Requested:
${services.length > 0 ? services.join(', ') : 'No services selected'}

Project Details:
${formData.get('project_details')}
        `.trim();

        // Create formatted fields display
        const allFieldsContent = `
Contact Information:
Name: ${formData.get('user_name')}
Email: ${formData.get('user_email')}
Phone: ${formData.get('user_phone')}
Location: ${formData.get('project_location')}

Services Requested:
${services.length > 0 ? services.join(', ') : 'No services selected'}

Project Details:
${formData.get('project_details')}
        `.trim();

        // Prepare template parameters
        const templateParams = {
            to_email: formData.get('to_email'),
            site_name: formData.get('site_name'),
            user_name: formData.get('user_name'),
            user_email: formData.get('user_email'),
            user_phone: formData.get('user_phone'),
            project_location: formData.get('project_location'),
            services: services.join(', '),
            project_details: formData.get('project_details'),
            message: messageContent,
            all_fields: allFieldsContent
        };

        // Send via EmailJS
        const response = await emailjs.send('service_dkq1ms1', 'template_emtp66c', templateParams);
        
        console.log('EmailJS Success:', response);

        // Success popup
        showSuccessPopup();
        form.reset();

    } catch (error) {
        console.error('EmailJS Error:', error);
        console.error('Error details:', error.text || error.message);
        showErrorPopup();
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Success popup
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    popup.innerHTML = `
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative z-10 transform transition-all">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <svg class="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p class="text-gray-600 mb-6">Thank you for reaching out! We'll get back to you soon.</p>
                <button onclick="this.closest('.fixed').remove()" 
                    class="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold transition">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 5000);
}

// Error popup
function showErrorPopup() {
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    popup.innerHTML = `
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative z-10 transform transition-all">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <svg class="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Oops!</h3>
                <p class="text-gray-600 mb-2">There was an error sending your message.</p>
                <p class="text-gray-600 mb-6">Please call us directly at <a href="tel:978-844-9872" class="text-amber-700 font-semibold hover:text-amber-800">978-844-9872</a></p>
                <button onclick="this.closest('.fixed').remove()" 
                    class="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold transition">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}