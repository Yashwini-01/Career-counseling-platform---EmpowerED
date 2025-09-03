// Function to start screen reader for resume content
function startScreenReader() {
    const resumeContent = document.getElementById('resume-content');
    if (!resumeContent) {
        alert('Resume content not found!');
        return;
    }

    const resumeText = resumeContent.textContent || resumeContent.innerText;
    const speech = new SpeechSynthesisUtterance(resumeText);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}

// Function to start voice input for each field
function startVoiceInput(field) {
    const inputElement = document.getElementById(field);
    if (!inputElement) {
        alert(`Field with ID "${field}" not found.`);
        return;
    }

    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert('Speech recognition is not supported in this browser.');
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onresult = function (event) {
        inputElement.value = event.results[0][0].transcript;
    };

    recognition.start();
}

// Function to generate the resume
function generateResume() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const skills = document.getElementById('skills');
    const experience = document.getElementById('experience');
    const education = document.getElementById('education');
    const imageUrl = document.getElementById('image-url');

    // Debugging logs to check if any element is null
    console.log({ name, email, phone, skills, experience, education, imageUrl });

    if (!name || !email || !phone || !skills || !experience || !education || !imageUrl) {
        alert('One or more fields are missing. Please check the HTML IDs.');
        return;
    }

    const nameValue = name.value;
    const emailValue = email.value;
    const phoneValue = phone.value;
    const skillsValue = skills.value;
    const experienceValue = experience.value;
    const educationValue = education.value;
    const imageUrlValue = imageUrl.value;

    const resumeContent = `
        <h2>${nameValue}</h2>
        <p>Email: ${emailValue}</p>
        <p>Phone: ${phoneValue}</p>
        <h3>Skills</h3>
        <p>${skillsValue}</p>
        <h3>Work Experience</h3>
        <p>${experienceValue}</p>
        <h3>Education</h3>
        <p>${educationValue}</p>
        ${imageUrlValue ? `<img src="${imageUrlValue}" alt="Profile Image" style="width: 100px; height: 100px; object-fit: cover;">` : ''}
    `;

    document.getElementById('resume-content').innerHTML = resumeContent;

    // Show the template section and hide the form section
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('template-section').style.display = 'block';
}

// Function to apply selected template to resume
function applyTemplate(templateId) {
    document.querySelectorAll('.template').forEach(button => {
        button.classList.remove('selected');
    });

    const selectedButton = document.querySelector(`[data-template="${templateId}"]`);

    if (selectedButton) {
        selectedButton.classList.add('selected');
    } else {
        console.error(`No button found with data-template="${templateId}"`);
        return;
    }

    const resumePreview = document.getElementById('resume-content');

    if (templateId === 'template5' && resumePreview.dataset.template5Content) {
        resumePreview.innerHTML = resumePreview.dataset.template5Content;
    }

    resumePreview.className = `resume-preview ${templateId}`;
}

// Function to apply customization
function applyCustomization() {
    const colorPicker = document.getElementById('color-picker');
    const fontPicker = document.getElementById('font-picker');
    const paddingPicker = document.getElementById('padding-picker');
    const marginPicker = document.getElementById('margin-picker');
    const resumeContent = document.getElementById('resume-content');

    if (!resumeContent) {
        alert('Resume content not found.');
        return;
    }

    resumeContent.style.backgroundColor = colorPicker.value;
    resumeContent.style.fontFamily = fontPicker.value;
    resumeContent.style.padding = `${paddingPicker.value}px`;
    resumeContent.style.margin = `${marginPicker.value}px`;
}

// Function to print the resume content
function printContent() {
    const resumeContent = document.getElementById('resume-content').outerHTML;
    const newWindow = window.open();
    newWindow.document.write('<html><head><title>Print Resume</title><link rel="stylesheet" href="style.css"></head><body>');
    newWindow.document.write(resumeContent);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
}

// Function to allow editing the form again
function editResume() {
    document.getElementById('form-section').style.display = 'block';
    document.getElementById('template-section').style.display = 'none';
    document.getElementById('resume-content').style.display = 'none';
    document.getElementById('resume-content').innerHTML = '';
}
