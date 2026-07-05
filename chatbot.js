const WORKER_URL = "https://jomel-ai.jomelnoriegaworks.workers.dev";

const chatbotButton = document.getElementById("chatbot-button");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotBody = document.getElementById("chatbot-body");
const chatbotInput = document.getElementById("chatbot-input");
const sendButton = document.getElementById("send-message");

chatbotButton.addEventListener("click", () => {
  chatbotWindow.style.display = "flex";
  chatbotButton.style.display = "none";
});

chatbotClose.addEventListener("click", () => {
  chatbotWindow.style.display = "none";
  chatbotButton.style.display = "block";
});

sendButton.addEventListener("click", sendMessage);

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = chatbotInput.value.trim();
  if (!message) return;

  chatbotBody.innerHTML += `<div class="user-message">${message}</div>`;
  chatbotInput.value = "";

  chatbotBody.innerHTML += `<div class="typing-message" id="typing">Jomel is typing...</div>`;
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    document.getElementById("typing")?.remove();

    chatbotBody.innerHTML += `
      <div class="bot-message">
        ${data.reply || "Sorry, I couldn't reply right now. Please try again in a few minutes."}
      </div>
    `;
  } catch (error) {
    document.getElementById("typing")?.remove();

    chatbotBody.innerHTML += `
      <div class="bot-message">
        Sorry, something went wrong. Please try again in a few minutes.
      </div>
    `;
  }

  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}