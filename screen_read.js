// Function to start screen reader for the form page
function screenReadForm() {
    const welcomeMessage = "Welcome to the Resume Builder. Please fill in your details.";
    const formInstructions = "Please enter your image URL, name, email, phone number, skills, work experience, and education.";
    
    const speech = new SpeechSynthesisUtterance(welcomeMessage + " " + formInstructions);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// Function to start screen reader for the customization page
function screenReadCustomization() {
    const welcomeMessage = "Welcome to the Resume Customization page.";
    const functionalityInstructions = "You can select a template for your resume and customize the color and font of your resume.";
    
    const speech = new SpeechSynthesisUtterance(welcomeMessage + " " + functionalityInstructions);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// Function to start voice input for each field
function startVoiceInput(fieldId) {
    const inputField = document.getElementById(fieldId);
    const speechRecognition = new webkitSpeechRecognition();
    speechRecognition.lang = 'en-US';
    speechRecognition.start();
    
    speechRecognition.onresult = function(event) {
        inputField.value = event.results[0][0].transcript;
    }
}

// Function to generate resume content and navigate to the customization page
function generateResume() {
    // Collecting form values and displaying the result
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;

    const resumeContent = `
        <h2>${name}</h2>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
        <h3>Work Experience</h3>
        <p>${experience}</p>
        <h3>Education</h3>
        <p>${education}</p>
    `;

    document.getElementById('resume-content').innerHTML = resumeContent;

    // Hide form section and show customization section
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('template-section').style.display = 'block';
}

function applyTemplate(templateId) {
    console.log("Applying template: " + templateId); // Log the applied template

    const resumePreview = document.getElementById('resume-content');
    if (!resumePreview) {
        console.error("Resume content element not found!");
        return;
    }

    // Remove all existing template classes
    resumePreview.classList.remove('template1', 'template2', 'template3', 'template4', 'template5');

    // Add the new template class
    resumePreview.classList.add(templateId);

    console.log("Current classes after applying: ", resumePreview.className);
}


// Function to apply customization
function applyCustomization() {
    const color = document.getElementById('color-picker').value;
    const font = document.getElementById('font-picker').value;
    
    const resumeContent = document.getElementById('resume-content');
    resumeContent.style.backgroundColor = color;
    resumeContent.style.fontFamily = font;
}

// Function to navigate back to the form page
function goToFormPage() {
    document.getElementById('template-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
}

// Function to print the resume
function printContent() {
    const resumeContent = document.getElementById('resume-content');
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Resume</title></head><body>');
    printWindow.document.write(resumeContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// Initialize Speech Recognition API
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

// Function to handle speech recognition
function startVoiceCommand() {
    recognition.start();
}

// Recognize speech and execute command
recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("Command received: " + command);
    
    // Navigate to different sections based on the command
    if (command.includes("generate resume")) {
        generateResume(); // Trigger the resume generation function
    } else if (command.includes("customize resume")) {
        goToCustomizationPage(); // Trigger the navigation to the customization page
    } else if (command.includes("template1")) {
        applyTemplate('template1'); // Apply Template 1
    } else if (command.includes("template2")) {
        applyTemplate('template2'); // Apply Template 2
    } else if (command.includes("template3")) {
        applyTemplate('template3'); // Apply Template 3
    } else if (command.includes("template4")) {
        applyTemplate('template4'); // Apply Template 4
    } else if (command.includes("template5")) {
        applyTemplate('template5'); // Apply Template 5
    } else if (command.includes("edit")) {
        goToFormPage(); // Navigate back to the form page
    } else if (command.includes("print")) {
        printContent(); // Trigger printing
    }
}

// Function to go to the customization page
function goToCustomizationPage() {
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('template-section').style.display = 'block';
    // Optionally, you can alert or add custom behavior here
}
