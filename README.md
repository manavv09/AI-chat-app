# 🌌 Premium AI Workspace

A next-generation, deeply interactive AI chatting interface powered by the **Google Gemini API** and **Firebase**. Built with a major focus on fluid UI/UX, this platform provides a premium "SaaS-level" aesthetic, complete with multi-theme support, persistent chat history, and fluid glassmorphism animations.

---

## ✨ Key Features

- **🧠 Google Gemini Integration**: Lightning-fast, intelligent conversations with native Markdown rendering and syntax highlighting.
- **🔐 Firebase Authentication**: Seamless Google Sign-In and Anonymous Guest access.
- **💾 Persistent History**: Conversations are automatically synced to Firebase Firestore per user session.
- **📌 Chat Management**: Pin your favourite conversations to the top or securely delete individual chats independently.
- **🌓 True Dynamic Theming**: Swap between an immersive Dark Mode (with animated Aurora backgrounds) and a crisp Light Mode effortlessly using our Smart Invert engine.
- **🎙️ Voice Input**: Fully integrated Web Speech API for hands-free prompting with active microphone pulse animations.
- **🎯 Premium UI/UX**: Built with Framer Motion and Tailwind CSS, featuring staggered sidebars, responsive right/left messaging layouts, starter prompt cards, and hover micro-interactions.
- **⚙️ Settings & Upgrades**: A fully designed Settings Modal featuring a mock Pro subscription layout with Indian Rupee (INR) tier packages.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend & Database**: Firebase (Auth & Firestore)
- **AI Brain**: Google Gemini API

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/premium-ai-chat.git
cd premium-ai-chat
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and securely add your API keys:

```env
VITE_GEMINI_API_KEY="your_gemini_api_key_here"

# Your Firebase Console Configuration Keys
VITE_FIREBASE_API_KEY="..."
VITE_FIREBASE_AUTH_DOMAIN="..."
VITE_FIREBASE_PROJECT_ID="..."
VITE_FIREBASE_STORAGE_BUCKET="..."
VITE_FIREBASE_MESSAGING_SENDER_ID="..."
VITE_FIREBASE_APP_ID="..."
```

### 4. Run the Application

```bash
npm run dev
```

The app will instantly boot up at `http://localhost:5173`.

---

## ☁️ Deployment

This Vite-based React application is highly optimised for zero-config deployments. The recommended free host is **Vercel**.

1. Push your code to a GitHub repository.
2. Import the repository into your Vercel dashboard as a new project.
3. **CRITICAL:** When you reach the "Configure Project" screen, open the **Environment Variables** tab.
4. Simply highlight and copy all the text from your local `.env` file, click on the first **Key** input box on Vercel, and paste (`Ctrl+V`). Vercel will automatically separate all your keys for you!
5. Click **Deploy** — your site will magically be live on the internet in less than 60 seconds.

🚀 **Live Deployment URL:** [Live Link]([https://ai-chat-app-ochre.vercel.app/](https://ai-chat-app-two-henna.vercel.app/)
