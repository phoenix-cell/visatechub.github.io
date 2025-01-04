// JavaScript implementation of the website

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

    // Create Services Section
    const services = document.createElement("section");
    services.id = "services";
    services.innerHTML = `
        <div class="container">
            <h2>Our Services</h2>
            <div class="services-grid">
                <div class="service">
                    <h3>Overseas Education Consulting</h3>
                    <p>Guidance for choosing universities, applying for courses, and visa assistance.</p>
                </div>
                <div class="service">
                    <h3>Tourist Visa Assistance</h3>
                    <p>End-to-end support for planning your travel and securing tourist visas.</p>
                </div>
                <div class="service">
                    <h3>Post-Arrival Support</h3>
                    <p>Accommodation, local assistance, and cultural orientation in your destination.</p>
                </div>
            </div>
        </div>
    `;
    body.appendChild(services);

    // Create About Section
    const about = document.createElement("section");
    about.id = "about";
    about.innerHTML = `
        <div class="container">
            <h2>About Us</h2>
            <p>At Visa Technology Hub, we are committed to helping you achieve your goals of studying or traveling abroad. With a dedicated team of experts and personalized services, we make the process seamless and hassle-free.</p>
        </div>
    `;
    body.appendChild(about);

    // Create Contact Section
    const contact = document.createElement("section");
    contact.id = "contact";
    contact.innerHTML = `
        <div class="container">
            <h2>Contact Us</h2>
            <form action="/submit" method="post">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="5" required></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;
    body.appendChild(contact);

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

    // Add some basic styles
    const style = document.createElement("style");
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            background: #333;
            color: #fff;
            padding: 10px 0;
        }
        header ul {
            list-style: none;
            display: flex;
            gap: 15px;
        }
        header a {
            color: #fff;
            text-decoration: none;
        }
        section {
            padding: 20px 0;
        }
        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background: #007BFF;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
        #chatbot {
            position: fixed;
            bottom: 20px;
            right: 20px;
        }
        #chatbot-window {
            display: none;
            position: fixed;
            bottom: 60px;
            right: 20px;
            width: 300px;
            background: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        #chatbot-window.visible {
            display: block;
        }
        #chatbot-messages {
            height: 200px;
            overflow-y: auto;
            padding: 10px;
            background: #f9f9f9;
            border-bottom: 1px solid #ccc;
        }
        .chatbot-message {
            margin: 5px 0;
            padding: 8px 12px;
            border-radius: 8px;
            max-width: 80%;
        }
        .chatbot-message.user {
            background: #007BFF;
            color: #fff;
            align-self: flex-end;
        }
        .chatbot-message.bot {
            background: #e9ecef;
            color: #333;
            align-self: flex-start;
        }
    `;
    document.head.appendChild(style);

    // Chatbot functionality
    const toggleButton = document.getElementById("chatbot-toggle");
    const chatbotWindow = document.getElementById("chatbot-window");
    const closeButton = document.getElementById("chatbot-close");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotMessageInput = document.getElementById("chatbot-message");
    const chatbotSendButton = document.getElementById("chatbot-send");

    toggleButton.addEventListener("click", () => {
        chatbotWindow.classList.toggle("visible");
    });

    closeButton.addEventListener("click", () => {
        chatbotWindow.classList.remove("visible");
    });

    // Automated bot responses
    const botResponses = {
        "hello": "Hi there! How can I assist you today?",
        "visa application": "Which type of visa are you applying for: a tourist visa or a student visa?",
        "tourist visa": "Great! Please mention the country you'd like to visit.",
        "default": "I'm sorry, I didn't quite understand that. Can you rephrase?"
    };

    let conversationState = {};

    chatbotSendButton.addEventListener("click", () => {
        const userMessage = chatbotMessageInput.value.trim().toLowerCase();

        if (userMessage) {
            // Display user message
            const userBubble = document.createElement("div");
            userBubble.className = "chatbot-message user";
            userBubble.textContent = userMessage;
            chatbotMessages.appendChild(userBubble);

            let botResponse;

            // Handle conversation flow
            if (conversationState.expectingCountry && userMessage) {
                conversationState.country = userMessage;
                botResponse = "Thank you! Please provide your name, contact number, and email address so an agent can call you immediately.";
                delete conversationState.expectingCountry;
            } else if (userMessage.includes("visa application")) {
                botResponse = botResponses["visa application"];
            } else if (userMessage.includes("tourist visa")) {
                botResponse = botResponses["tourist visa"];
                conversationState.expectingCountry = true;
            } else if (botResponses[userMessage]) {
                botResponse = botResponses[userMessage];
            } else {
                botResponse = botResponses["default"];
            }

            // Generate bot response
            const botBubble = document.createElement("div");
            botBubble.className = "chatbot-message bot";
            botBubble.textContent = botResponse;

            // Add bot response after a short delay
            setTimeout(() => {
                chatbotMessages.appendChild(botBubble);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to the latest message
            }, 500);
        }

        chatbotMessageInput.value = ""; // Clear input field
    });
});
