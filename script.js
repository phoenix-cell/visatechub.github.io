// Frontend JavaScript for Visa Consultancy Website with AI Chatbot

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Create Header Section
    const header = document.createElement("header");
    header.innerHTML = `
        <div class="container">
            <h1>Visa Technology Hub</h1>
            <nav>
                <ul>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    `;
    body.appendChild(header);

    // Create Hero Section
    const hero = document.createElement("section");
    hero.id = "hero";
    hero.innerHTML = `
        <div class="container">
            <h2>Your Gateway to Global Opportunities</h2>
            <p>Study, Explore, and Achieve your Dreams with Expert Guidance.</p>
            <a href="#services" class="cta-button">Learn More</a>
        </div>
    `;
    body.appendChild(hero);

    // Create Chatbot Section
    const chatbot = document.createElement("div");
    chatbot.id = "chatbot";
    chatbot.innerHTML = `
        <button id="chatbot-toggle">Chat with Us</button>
        <div id="chatbot-window" class="hidden">
            <div id="chatbot-header">
                <h3>Live Chat</h3>
                <button id="chatbot-close">X</button>
            </div>
            <div id="chatbot-messages"></div>
            <div id="chatbot-input">
                <input type="text" id="chatbot-message" placeholder="Type your message here...">
                <button id="chatbot-send">Send</button>
            </div>
        </div>
    `;
    body.appendChild(chatbot);

    // Chatbot functionality with AI API
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotMessageInput = document.getElementById("chatbot-message");
    const chatbotSendButton = document.getElementById("chatbot-send");
    document.getElementById("chatbot-toggle").addEventListener("click", () => chatbotWindow.classList.toggle("visible"));
    document.getElementById("chatbot-close").addEventListener("click", () => chatbotWindow.classList.remove("visible"));

    chatbotSendButton.addEventListener("click", async () => {
        const userMessage = chatbotMessageInput.value.trim();
        if (!userMessage) return;

        appendMessage("user", userMessage);
        chatbotMessageInput.value = "";

        const botResponse = await fetchChatbotResponse(userMessage);
        appendMessage("bot", botResponse);
    });

    function appendMessage(sender, text) {
        const messageElement = document.createElement("div");
        messageElement.className = `chatbot-message ${sender}`;
        messageElement.textContent = text;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    async function fetchChatbotResponse(message) {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        return data.message || "Sorry, I didn't understand that.";
    }
});
