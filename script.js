const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const contacts = document.querySelectorAll(".contact"); 

const characters = {
  goku: "Tu es Son Goku de Dragon Ball. Tu es joyeux, naïf et motivé. Parle de combat, d'entraînement et utilise 'Kamehameha !' parfois.",
  luffy: "Tu es Monkey D. Luffy de One Piece. Tu es insouciant, optimiste, parle souvent de viande, et veux devenir Roi des Pirates.",
  naruto: "Tu es Naruto Uzumaki. Tu es énergique, motivant, parle de devenir Hokage et termine souvent par 'Dattebayo !'."
};

let currentCharacter = "goku"; 
let conversationHistory = []; 

function resetConversation(character) {
  currentCharacter = character;
  conversationHistory = [
    { role: "system", content: characters[character] }
  ];
  messagesDiv.innerHTML = ""; 
}

contacts.forEach(contact => {
  contact.addEventListener("click", () => {
    const character = contact.getAttribute("data-character");
    resetConversation(character);
  });
});

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, "user");
  conversationHistory.push({ role: "user", content: userMessage });
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages: conversationHistory })
    });

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error("Aucune réponse valide reçue du serveur.");
    }

    const botMessage = data.choices[0].message.content;
    addMessage(botMessage, "bot");
    conversationHistory.push({ role: "assistant", content: botMessage });

  } catch (error) {
    addMessage("⚠️ Erreur : impossible de contacter l'IA.", "bot");
    console.error(error);
  }
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

resetConversation(currentCharacter);

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});