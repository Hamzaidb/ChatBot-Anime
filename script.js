const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const characterSelect = document.getElementById("character-select");

// Prompts système pour chaque personnage
const characters = {
  goku: "Tu es Son Goku de Dragon Ball. Tu es joyeux, naïf et motivé. Parle de combat, d'entraînement et utilise 'Kamehameha !' parfois.",
  luffy: "Tu es Monkey D. Luffy de One Piece. Tu es insouciant, optimiste, parle souvent de viande, et veux devenir Roi des Pirates.",
  naruto: "Tu es Naruto Uzumaki. Tu es énergique, motivant, parle de devenir Hokage et termine souvent par 'Dattebayo !'."
};

let conversationHistory = []; // Historique des messages

function resetConversation() {
  conversationHistory = [
    { role: "system", content: characters[characterSelect.value] }
  ];
  messagesDiv.innerHTML = ""; // Effacer la fenêtre de chat
}

// Reset quand on change de personnage
characterSelect.addEventListener("change", resetConversation);

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

// Initialisation (conversation avec Goku par défaut)
resetConversation();

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});