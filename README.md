
# 🌌 AI Workspace: The Future of Intelligence

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-9.0-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

A high-performance, SaaS-grade AI chatting interface designed for speed, beauty, and intelligence. Powered by **Google Gemini Pro** and **Firebase**, this workspace offers a seamless experience with instant responsiveness and premium aesthetics.

🚀 **Live Demo**: [ai-chat-app-two-henna.vercel.app](https://ai-chat-app-two-henna.vercel.app/)

---

## ✨ Key Features

### 🧠 Advanced AI Capabilities
- **Google Gemini Pro Integration**: Real-time, intelligent responses with deep context awareness.
- **Markdown & Syntax Highlighting**: Beautifully rendered code blocks, tables, and formatted text.
- **Voice Intelligence**: Hands-free prompting using integrated Web Speech API with dynamic pulse animations.

### 🔐 Secure & Social
- **Multi-Auth System**: Sign in securely with Google or explore instantly as a Guest.
- **Persistent Memory**: Your chat history is encrypted and synced to Firebase Firestore, accessible from any device.
- **Smart History**: Pin your most important conversations or securely wipe history when needed.

### 🎨 Premium Design System
- **Glassmorphism UI**: A gorgeous, translucent interface built with Framer Motion and Tailwind CSS.
- **Fluid Animations**: Staggered sidebars, smooth transitions, and hover micro-interactions.
- **Dynamic Themes**: Instant toggle between a deep "Aurora" Dark Mode and a crisp, professional Light Mode.

### ⚡ Optimized for Performance
- **Code Splitting**: Heavy components like Settings and Login are lazy-loaded to ensure an instant First Meaningful Paint.
- **CSS-Driven Theming**: Zero-lag theme switching using high-performance CSS variables.
- **Lightweight Assets**: Optimized SVGs and font pre-fetching for lightning-fast delivery.

---

## 🛠️ Tech Stack

- **Core**: React 18 (Hooks, Context, Lazy/Suspense)
- **Bundler**: Vite (Optimized for production)
- **Styling**: Tailwind CSS & Pure CSS (Hybrid approach for maximum performance)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Firebase (Authentication & Firestore)
- **AI Integration**: Google Generative AI SDK

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v16.0 or higher recommended).

### 2. Installation
```bash
git clone https://github.com/manavv09/ai-chat-app.git
cd ai-chat-app
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your credentials:
```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_KEY

# Firebase Config
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 4. Launch Development Server
```bash
npm run dev
```

---

## 📂 Project Structure

```text
ai-chat-app/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI Components
│   ├── services/        # API and Firebase logic
│   ├── App.jsx          # Main application logic
│   ├── index.css        # Global styles & Theme tokens
│   └── main.jsx         # Entry point
├── index.html           # HTML5 Template with Splash Screen
├── tailwind.config.js   # Style configurations
└── vite.config.js       # Bundler optimizations
```

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ❤️ by [Manav Bharti](https://github.com/manavv09)
