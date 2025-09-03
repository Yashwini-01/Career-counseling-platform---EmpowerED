// Function to read the welcome message
function readWelcomeMessage() {
    const message = document.getElementById("welcomeMessage").textContent;
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}

// Function to read a question and its options
function readQuestion(questionId, selectId) {
    const question = document.getElementById(questionId).textContent;
    const options = Array.from(document.getElementById(selectId).options)
        .map(option => option.text)
        .join(", ");
    
    const message = `${question}. The options are: ${options}.`;
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}

// Function to start voice input and set the value of the select field
function startVoiceInput(selectId) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.toLowerCase();

        const options = document.getElementById(selectId).options;
        let found = false;

        for (let option of options) {
            if (transcript.includes(option.text.toLowerCase())) {
                document.getElementById(selectId).value = option.value;
                found = true;
                break;
            }
        }

        if (!found) {
            alert(`Sorry, we couldn't recognize your input. Please try again.`);
        }
    };

    recognition.onerror = function(event) {
        alert(`Voice input error: ${event.error}. Please try again.`);
    };
}

// Function to display job recommendations
function showRecommendations() {
    const jobList = document.getElementById("jobList");
    jobList.innerHTML = "";

    const jobs = [
        { title: "Software Developer", role: "Develop software solutions", salary: "$80,000 - $120,000", location: "Remote", company: "TechCorp" },
        { title: "Web Developer", role: "Build and maintain websites", salary: "$60,000 - $90,000", location: "Onsite", company: "WebWorks" },
        { title: "Data Analyst", role: "Analyze data for insights", salary: "$70,000 - $100,000", location: "Hybrid", company: "DataGen" },
        { title: "IT Support Specialist", role: "Provide IT support and troubleshooting", salary: "$50,000 - $75,000", location: "Onsite", company: "SupportCo" }
    ];

    jobs.forEach(job => {
        const li = document.createElement("li");
        li.textContent = job.title;
        li.onclick = () => showJobDetails(job);
        jobList.appendChild(li);
    });

    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
}

// Function to read the list of job recommendations
function readRecommendations() {
    const jobItems = document.querySelectorAll("#jobList li");

    if (jobItems.length === 0) {
        alert("No job recommendations available to read.");
        return;
    }

    const recommendations = Array.from(jobItems)
        .map(item => item.textContent)
        .join(", ");

    const message = `Here are the job recommendations: ${recommendations}.`;
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}

// Function to choose a recommended job via voice input
function startVoiceJobSelection() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.toLowerCase();

        const jobItems = document.querySelectorAll("#jobList li");
        let found = false;

        for (let job of jobItems) {
            if (transcript.includes(job.textContent.toLowerCase())) {
                job.click();
                found = true;
                break;
            }
        }

        if (!found) {
            alert(`Sorry, we couldn't recognize the job you mentioned. Please try again.`);
        }
    };

    recognition.onerror = function(event) {
        alert(`Voice input error: ${event.error}. Please try again.`);
    };
}

// Function to show job details
function showJobDetails(job) {
    const jobDetails = document.getElementById("jobDetails");
    jobDetails.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Role:</strong> ${job.role}</p>
        <p><strong>Salary:</strong> ${job.salary}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Company:</strong> ${job.company}</p>
    `;
    
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "block";
}

// Function to go back to the questions page
function goBackToQuestions() {
    document.getElementById("page2").style.display = "none";
    document.getElementById("page1").style.display = "block";
}

// Function to go back to the recommendations page
function goBackToRecommendations() {
    document.getElementById("page3").style.display = "none";
    document.getElementById("page2").style.display = "block";
}
