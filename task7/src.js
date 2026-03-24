const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

function getTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMessage(text, type) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type);
  
    const messageText = document.createElement("div");
    messageText.textContent = text;
  
    const timestamp = document.createElement("div");
    timestamp.classList.add("timestamp");
    timestamp.textContent = getTime();
  
    messageDiv.appendChild(messageText);
    messageDiv.appendChild(timestamp);
  
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});


function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;
  
    addMessage(text, "sent");
    input.value = "";
  
    simulateReply();
}

const replies = [
    "Hello! ",
    "How are you?",
    "That's interesting!",
    "Tell me more ",
    "Nice ",
    "Got it!",
    "Okay!"
];

function simulateReply() {
    setTimeout(() => {
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      addMessage(randomReply, "received");
    }, 1000 + Math.random() * 2000);
}
  