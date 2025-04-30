// Initialize timers
let workHours = 0;
let bathroomMinutes = 0;
let angerLevel = 0;

// Update work timer every hour
setInterval(() => {
    workHours++;
    document.getElementById('workTimer').textContent = workHours;
}, 3600000); // 1 hour in milliseconds

// Update bathroom timer every minute
setInterval(() => {
    bathroomMinutes++;
    document.getElementById('bathroomTimer').textContent = bathroomMinutes;
}, 60000); // 1 minute in milliseconds

// Function to update mood and anger level
function updateMood(mood) {
    const angerMeter = document.querySelector('.anger-level');
    const buttons = document.querySelectorAll('.mood-options button');
    
    // Reset all buttons
    buttons.forEach(button => {
        button.style.transform = 'scale(1)';
    });

    // Update based on mood
    switch(mood) {
        case 'happy':
            angerLevel = 0;
            angerMeter.style.width = '0%';
            break;
        case 'neutral':
            angerLevel = 30;
            angerMeter.style.width = '30%';
            break;
        case 'angry':
            angerLevel = 60;
            angerMeter.style.width = '60%';
            break;
        case 'beast':
            angerLevel = 100;
            angerMeter.style.width = '100%';
            // Add some dramatic effect
            document.body.style.animation = 'shake 0.5s';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
            break;
    }

    // Highlight selected button
    event.target.style.transform = 'scale(1.1)';
}

// Add some random fun facts that appear occasionally
const funFacts = [
    "Did you know? He can type work emails while sleeping!",
    "Fun fact: His phone battery lasts longer than our conversations!",
    "Interesting: He can find his phone faster than he can find his keys!",
    "Did you know? His bathroom breaks are longer than most people's lunch breaks!",
    "Fun fact: He can ignore everything except work notifications!"
];

setInterval(() => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    const factElement = document.createElement('div');
    factElement.className = 'fun-fact-popup';
    factElement.textContent = randomFact;
    factElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        animation: slideIn 0.5s ease-out;
    `;
    document.body.appendChild(factElement);
    setTimeout(() => {
        factElement.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => factElement.remove(), 500);
    }, 3000);
}, 30000); // Show a new fact every 30 seconds

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
`;
document.head.appendChild(style); 