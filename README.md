Chatbot Anime
=============

Présentation du projet
----------------------

Ce projet est un **chatbot sur le thème des animés**.Vous pouvez choisir de discuter avec différents personnages, chacun ayant sa **propre personnalité** inspirée de son univers. L’objectif est de rendre les interactions plus immersives et divertissantes.

Lien du projet déployé : https://chat-bot-anime.vercel.app/

Fonctionnalités
---------------

*   Sélection de personnages animés (Goku, Luffy, Naruto, etc.)
    
*   Chaque personnage suit un **prompt personnalisé** pour répondre dans son style
    
*   Chat en temps réel avec l’IA via l’API OpenAI
    
*   Historique de conversation par personnage
    
*   Design responsive pour une utilisation sur desktop et mobile
    

Installation et configuration
-----------------------------

1.  **Cloner le projet**

`git clone   cd` 

1.  **Installer les dépendances**
    
  npm install   `

1.  **Configurer le fichier .env**
    

Créez un fichier .env à la racine du projet et ajoutez votre clé API OpenAI :

 OPENAI_API_KEY=VOTRE_CLE_API   `

⚠️ Assurez-vous que la clé est valide pour pouvoir lancer le projet en local.

1.  **Lancer le serveur**

 node server.mjs   `

Le projet devrait être accessible via le fichier HTML

Déploiement
-----------

Le projet peut être déployé sur **Vercel** ou tout autre service supportant Node.js.

*   Déposer le projet
    
*   Configurer la variable d’environnement OPENAI\_API\_KEY dans le dashboard Vercel
    
*   Le fichier server.mjs sera utilisé pour l’API, tandis que les fichiers HTML, CSS et JS restent statiques à la racine.
    

Structure du projet
-------------------

 / 
 ├─ ia-anime-chatbot.html   # Page principale  
 ├─ style.css               # Styles  
 ├─ script.js               # Logique du front-end  
 ├─ server.mjs              # Serveur Node.js pour l'API  
 ├─ favicon.png  
 ├─ assets/                 # Images et backgrounds des personnages  
 ├─ .env                    # Variables d’environnement (local uniquement)   `

Technologies utilisées
----------------------

*   **Node.js** pour le serveur backend
    
*   **OpenAI API** (GPT-3.5 Turbo) pour l’intelligence artificielle
    
*   **HTML / CSS / JavaScript** pour le front-end
    
*   **Vercel** pour le déploiement
    

Remarques
---------

*   Chaque personnage a un **prompt spécifique** qui définit son comportement et son style de réponse.
    
*   L’IA génère des réponses cohérentes avec l’univers du personnage choisi.
    
*   Assurez-vous d’avoir une connexion internet pour que l’API fonctionne.
