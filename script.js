// Function to start voice input for each field
function startVoiceInput(field) {
    const inputElement = document.getElementById(field);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.onresult = function(event) {
        inputElement.value = event.results[0][0].transcript;
    };
    
    recognition.start();
}

// Function to generate the resume
function generateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;

    const resumeContent = `
        <div class="resume-header">
            <h1>${name}</h1>
            <p>${email} | ${phone}</p>
        </div>
        <div class="resume-section">
            <h3>Skills</h3>
            <p>${skills}</p>
        </div>
        <div class="resume-section">
            <h3>Work Experience</h3>
            <p>${experience}</p>
        </div>
        <div class="resume-section">
            <h3>Education</h3>
            <p>${education}</p>
        </div>
    `;

    document.getElementById('resume-content').innerHTML = resumeContent;
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('template-section').style.display = 'block';
}

// Function to apply selected template to resume
function selectTemplate(templateId) {
    document.querySelectorAll('.template-button').forEach(button => {
        button.classList.remove('selected');
    });
    const selectedButton = document.querySelector(`[data-template="${templateId}"]`);
    selectedButton.classList.add('selected');
    const resumePreview = document.getElementById('resume-content');
    resumePreview.className = `resume-preview ${templateId}`;
}

// Event listeners for template buttons
document.querySelectorAll('.template-button').forEach(button => {
    button.addEventListener('click', () => {
        const templateId = button.getAttribute('data-template');
        selectTemplate(templateId);
    });
});

// Function to apply customization
function applyCustomization() {
    const color = document.getElementById('color-picker').value;
    const font = document.getElementById('font-picker').value;
    const padding = document.getElementById('padding-picker').value;
    const margin = document.getElementById('margin-picker').value;

    const resumeContent = document.getElementById('resume-content');
    resumeContent.style.backgroundColor = color;
    resumeContent.style.fontFamily = font;
    resumeContent.style.padding = `${padding}px`;
    resumeContent.style.margin = `${margin}px`;
}

// Function to print the resume content
function printContent() {
    const resumeContent = document.getElementById('resume-content').outerHTML;
    const newWindow = window.open();
    newWindow.document.write('<html><head><title>Print Resume</title><link rel="stylesheet" href="resume.css"></head><body>');
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
}
