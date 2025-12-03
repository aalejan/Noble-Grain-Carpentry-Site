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

        // Success message
        alert('Thank you! Your message has been sent successfully. We\'ll get back to you soon!');
        form.reset();

    } catch (error) {
        console.error('EmailJS Error:', error);
        console.error('Error details:', error.text || error.message);
        alert('Oops! There was an error sending your message. Please try calling us directly at 978-844-9872.');
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});