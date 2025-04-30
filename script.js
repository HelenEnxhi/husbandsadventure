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

// Function to create explosion particles
function createExplosion(x, y) {
    const colors = ['#ff0000', '#ff4400', '#ff8800', '#ffaa00'];
    const particles = 50; // Number of particles

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties for each particle
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        const lifetime = Math.random() * 1000 + 500;

        // Style the particle
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: particle-explode ${lifetime}ms ease-out forwards;
        `;

        // Add particle to the page
        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, lifetime);
    }
}

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
            // Create multiple explosions
            const button = event.target;
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Create multiple explosions in a pattern
            createExplosion(centerX, centerY);
            setTimeout(() => createExplosion(centerX - 50, centerY), 100);
            setTimeout(() => createExplosion(centerX + 50, centerY), 200);
            setTimeout(() => createExplosion(centerX, centerY - 50), 300);
            setTimeout(() => createExplosion(centerX, centerY + 50), 400);
            
            // Add dramatic effect
            document.body.classList.add('beast-mode');
            setTimeout(() => {
                document.body.classList.remove('beast-mode');
            }, 1000);
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
    @keyframes particle-explode {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                ${Math.random() * 200 - 100}px,
                ${Math.random() * 200 - 100}px
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 