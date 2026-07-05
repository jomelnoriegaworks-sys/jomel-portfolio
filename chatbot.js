const WORKER_URL = "https://jomel-ai.jomelnoriegaworks.workers.dev";

const chatbotButton = document.getElementById("chatbot-button");
const chatbotGreeting = document.getElementById("chatbot-greeting");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotBody = document.getElementById("chatbot-body");
const chatbotInput = document.getElementById("chatbot-input");
const sendButton = document.getElementById("send-message");

// Recent turns sent to the Worker so replies have conversation context
// (also what stops the bot from greeting on every message).
const chatHistory = [];

function openChat() {
  chatbotWindow.style.display = "flex";
  chatbotButton.style.display = "none";
  if (chatbotGreeting) chatbotGreeting.style.display = "none";
  chatbotInput.focus();
}

chatbotButton.addEventListener("click", openChat);
if (chatbotGreeting) chatbotGreeting.addEventListener("click", openChat);

chatbotClose.addEventListener("click", () => {
  chatbotWindow.style.display = "none";
  chatbotButton.style.display = "flex";
});

sendButton.addEventListener("click", sendMessage);

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Bot replies may only contain these tags; everything else — scripts, event
// handlers, javascript: links — is stripped before the reply touches the DOM.
const ALLOWED_REPLY_TAGS = ["P", "UL", "OL", "LI", "BR", "STRONG", "EM", "B", "I", "A"];

function sanitizeReply(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.body.querySelectorAll("script, style, iframe, object, embed, link, meta, form").forEach((el) => el.remove());

  doc.body.querySelectorAll("*").forEach((el) => {
    if (!ALLOWED_REPLY_TAGS.includes(el.tagName)) {
      el.replaceWith(...el.childNodes);
      return;
    }

    const isLink = el.tagName === "A";
    const href = isLink ? el.getAttribute("href") || "" : "";
    const cls = isLink ? el.getAttribute("class") || "" : "";

    [...el.attributes].forEach((attr) => el.removeAttribute(attr.name));

    if (isLink) {
      if (/^https:\/\//i.test(href)) el.setAttribute("href", href);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
      if (cls === "chat-booking-button") el.className = cls;
    }
  });

  return [...doc.body.childNodes];
}

function appendChatMessage(className) {
  const el = document.createElement("div");
  el.className = className;
  chatbotBody.appendChild(el);
  return el;
}

async function sendMessage() {
  const message = chatbotInput.value.trim();
  if (!message) return;

  appendChatMessage("user-message").textContent = message;
  chatbotInput.value = "";

  const typingEl = appendChatMessage("typing-message");
  typingEl.textContent = "Jomel is typing...";
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: chatHistory.slice(-10) })
    });

    const data = await response.json();

    typingEl.remove();

    const botEl = appendChatMessage("bot-message");
    if (data.reply) {
      botEl.append(...sanitizeReply(data.reply));
    } else {
      botEl.textContent = "Sorry, I couldn't reply right now. Please try again in a few minutes.";
    }

    chatHistory.push({ role: "user", text: message });
    chatHistory.push({ role: "model", text: botEl.textContent });
  } catch (error) {
    typingEl.remove();

    appendChatMessage("bot-message").textContent = "Sorry, something went wrong. Please try again in a few minutes.";
  }

  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}