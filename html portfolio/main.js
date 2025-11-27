document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.main-page');
    const topPanel = document.getElementById('topPanel');
    const leftSection = document.getElementById('leftSection');
    const rightSectionLinks = document.querySelectorAll('.right-section > ul > li > a');
    const logo = document.getElementById('logo');

    function handleScroll() {
        console.log('handleScroll function called.');
        // Calculate the percentage of scroll position
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight - 1000)) * 100;
    
        // Calculate the transitioned color based on the percentage
        const initialColor = [251, 247, 245]; // RGB values for the initial bright color (white)
        const targetColor = [28, 28, 28]; // RGB values for the target color (#1C1C1C)
    
        const currentColor = initialColor.map((value, index) => {
            const targetValue = targetColor[index];
            let transitionedValue = value + (targetValue - value) * (scrollPercentage / 100);
    
            // Ensure the value doesn't go below a threshold (e.g., 28)
            transitionedValue = Math.max(Math.round(transitionedValue), 28);
    
            return Math.round(transitionedValue);
        });
    
        // Apply the background color to the top panel
        topPanel.style.backgroundColor = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
    
        // Check if the background color has reached the targetColor
        if (currentColor.every((value, index) => value === targetColor[index])) {
            logo.src = 'logo_inv.jpg';
            topPanel.style.background = 'rgba(28, 28, 28, 0.8)';
            // Apply the text color to the left section
            leftSection.style.color = `rgb(251, 247, 245)`; // Set the desired text color
    
            // Apply the text color to each link in the right section
            rightSectionLinks.forEach(link => {
                link.style.color = `rgb(251, 247, 245)`;
                //link.background.color = `rgb(28, 28, 28)`;
            });
        } else {
            logo.src = 'logo.jpg';
            // If not reached, reset the text color for the left section
            leftSection.style.color = ''; // Reset to default text color
    
            // Reset the text color for each link in the right section
            rightSectionLinks.forEach(link => {
                link.style.color = '';
            });
        }
    }
    
   
    // Initial check on page load
    handleScroll();
    
    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);
    

    // Create a div element to hold the animated background
    const backgroundContainer = document.createElement('div');
    backgroundContainer.classList.add('background-container');

    // Append the background container to the body
    document.body.appendChild(backgroundContainer);

    // Add a click event listener to handle section changes
    document.querySelector('.top-panel').addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            const targetSectionId = e.target.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSectionId).classList.add('active');
        }
    });
    leftSection.addEventListener('click', function () {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById('homepage').classList.add('active');
    });
});