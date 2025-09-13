async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  // Show typing indicator
  addMessage("...", "bot", true);

  const response = await fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  // Remove typing indicator
  document.querySelector(".bot.typing")?.remove();

  addMessage(data.reply, "bot");
}

function addMessage(text, sender, typing = false) {
  const chatBox = document.getElementById("chat-box");
  const messageEl = document.createElement("div");
  messageEl.className = `message ${sender}`;
  if (typing) messageEl.classList.add("typing");
  messageEl.innerText = text;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;
}
