// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true, // Enable infinite loop
});

// Accordion functionality (double-click on the whole card)
const accordionCards = document.querySelectorAll(".accordion-card");
accordionCards.forEach((card) => {
    card.addEventListener("dblclick", () => {
        toggleAccordion(card);
    });
});

function toggleAccordion(currentCard) {
    const panel = currentCard.querySelector(".panel"); // Get the panel inside the card

    // Close other accordion panels
    accordionCards.forEach((card) => {
        const otherPanel = card.querySelector(".panel");
        if (card !== currentCard) {
            card.classList.remove("active");
            if (otherPanel) otherPanel.style.display = "none";
        }
    });

    // Toggle the current card's accordion
    currentCard.classList.toggle("active");
    if (panel) {
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";

            // Example: Get IDs of the first two children in the panel
            const firstChildID = panel.children[0]?.id;
            const secondChildID = panel.children[1]?.id;

            if (firstChildID && secondChildID) {
                printStringByLetter(secondChildID, firstChildID);
            }
        }
    }
}

// Change FAQ icon (if necessary) on double-click
const icons = document.querySelectorAll(".faq-icon");
icons.forEach((icon) => {
    icon.addEventListener("dblclick", toggleFAQIcon); // Double-click for icon toggle
});

function toggleFAQIcon() {
    const isChevronDown = this.src.includes("chevron-down");
    this.src = isChevronDown
        ? "https://cdn.jsdelivr.net/gh/linuxguist/faqa@main/chevron-up.svg"
        : "https://cdn.jsdelivr.net/gh/linuxguist/faqa@main/chevron-down.svg";
}

// Clear a specific element's content (utility function)
function clearBox(elementID) {
    const element = document.getElementById(elementID);
    if (element) element.innerHTML = "";
}

// Example: Utility function to print a string letter by letter
function printStringByLetter(sourceID, targetID) {
    const sourceElement = document.getElementById(sourceID);
    const targetElement = document.getElementById(targetID);

    if (sourceElement && targetElement) {
        const text = sourceElement.textContent || sourceElement.innerText;
        targetElement.innerHTML = ""; // Clear target element content

        // Display text letter by letter
        let index = 0;
        const interval = setInterval(() => {
            targetElement.innerHTML += text[index];
            index++;
            if (index >= text.length) clearInterval(interval);
        }, 100); // Adjust speed as needed
    }
}
