import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import Login from './components/Login';
import SettingsModal from './components/SettingsModal';
import { fetchAIResponse } from './services/api';
import { auth, onAuthStateChanged, fetchHistoryFromFirestore, saveHistoryToFirestore, logOut, deleteHistoryFromFirestore } from './services/firebase';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const [history, setHistory] = useState([
    { id: '1', title: 'Start Exploring', messages: [] }
  ]);
  const [activeChatId, setActiveChatId] = useState('1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Auth Listener
  useEffect(() => {
    if (!auth) {
      console.warn("Firebase auth is not initialized. Please configure your .env file.");
      setIsAuthLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const savedHistory = await fetchHistoryFromFirestore(currentUser.uid);
        if (savedHistory && savedHistory.length > 0) {
          setHistory(savedHistory);
          setActiveChatId(savedHistory[0].id);
        } else {
          setHistory([{ id: '1', title: 'Start Exploring', messages: [] }]);
          setActiveChatId('1');
        }
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Theme Listener
  useEffect(() => {
    if (!isDarkTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isDarkTheme]);

  // Save History to Firestore whenever it changes
  useEffect(() => {
    if (user && history && history.length > 0) {
       // Prevent saving just the initial empty state if we can avoid it, but save is fine over time.
       const timeoutId = setTimeout(() => {
          saveHistoryToFirestore(user.uid, history);
       }, 500); // debounce
       return () => clearTimeout(timeoutId);
    }
  }, [history, user]);

  const activeChat = history.find(c => c.id === activeChatId) || null;
  const messages = activeChat ? activeChat.messages : [];

  const handleSendMessage = async (content) => {
    let currentChatId = activeChatId;
    let currentHistory = [...history];

    if (!currentChatId || (activeChat && activeChat.messages.length === 0)) {
       const idx = currentHistory.findIndex(c => c.id === currentChatId);
       if (idx !== -1) {
          currentHistory[idx].title = content.substring(0, 30) + (content.length > 30 ? '...' : '');
       } else {
          currentChatId = Date.now().toString();
          const newFeature = {
            id: currentChatId,
            title: content.substring(0, 30) + (content.length > 30 ? '...' : ''),
            messages: []
          };
          currentHistory = [newFeature, ...currentHistory];
          setActiveChatId(currentChatId);
       }
    }

    const userMessage = { role: 'user', content };
    currentHistory = currentHistory.map(chat => {
      if (chat.id === currentChatId) return { ...chat, messages: [...chat.messages, userMessage] };
      return chat;
    });

    setHistory(currentHistory);
    setIsTyping(true);

    try {
      const chatContext = currentHistory.find(c => c.id === currentChatId).messages
          .slice(0, -1) 
          .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
          .join('\n');

      setHistory(prev => prev.map(chat => {
        if (chat.id === currentChatId) {
          return { ...chat, messages: [...chat.messages, { role: 'assistant', content: '' }] };
        }
        return chat;
      }));
      
      setIsTyping(false);

      await fetchAIResponse(content, chatContext, (chunkText) => {
        setHistory(prevHistory => prevHistory.map(chat => {
          if (chat.id === currentChatId) {
            const newMessages = [...chat.messages];
            const lastIdx = newMessages.length - 1;
            newMessages[lastIdx] = { ...newMessages[lastIdx], content: newMessages[lastIdx].content + chunkText };
            return { ...chat, messages: newMessages };
          }
          return chat;
        }));
      });
    } catch (error) {
       console.error(error);
    } finally {
       setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    const newId = Date.now().toString();
    setHistory(prev => [{ id: newId, title: 'New Conversation', messages: [] }, ...prev]);
    setActiveChatId(newId);
    if(window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    if(window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleDeleteHistory = async () => {
    if (user && window.confirm("Are you sure you want to delete all history?")) {
      await deleteHistoryFromFirestore(user.uid);
      setHistory([{ id: '1', title: 'Start Exploring', messages: [] }]);
      setActiveChatId('1');
    }
  };

  const handleDeleteChat = (id) => {
    setHistory(prev => {
      const newHistory = prev.filter(chat => chat.id !== id);
      if (newHistory.length === 0) {
        const newId = Date.now().toString();
        setActiveChatId(newId);
        return [{ id: newId, title: 'New Conversation', messages: [] }];
      }
      if (activeChatId === id) {
        setActiveChatId(newHistory[0].id);
      }
      return newHistory;
    });
  };

  const handlePinChat = (id) => {
    setHistory(prev => prev.map(chat => 
      chat.id === id ? { ...chat, isPinned: !chat.isPinned } : chat
    ));
  };

  if (isAuthLoading) {
     return <div className="min-h-[100dvh] flex items-center justify-center bg-[#050505] text-white">Loading...</div>;
  }

  // Removed login options so you can directly work on the app
  // if (!user) {
  //   return <Login />;
  // }

  return (
    <div className="flex h-[100dvh] relative z-0">
      <Sidebar 
        history={history}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        user={user}
        onLogout={logOut}
        onDeleteHistory={handleDeleteHistory}
        onDeleteChat={handleDeleteChat}
        onPinChat={handlePinChat}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <div className="flex-1 flex flex-col relative h-full w-full max-w-full">
        <header className="md:hidden flex items-center justify-between p-4 bg-white/[0.02] backdrop-blur-3xl border-b border-white/5 absolute top-0 left-0 right-0 z-10 shadow-sm">
           <button 
             onClick={() => setIsSidebarOpen(true)}
             className="text-white/70 hover:text-white transition-colors p-1"
           >
             <Menu size={24} />
           </button>
           <h1 className="font-medium text-[15px] tracking-wide text-white/90">Workspace</h1>
           <div className="w-8" />
        </header>

        <div className="md:hidden h-[64px] shrink-0"></div>

        <ChatArea messages={messages} isTyping={isTyping} />
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        user={user} 
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
      />
    </div>
  );
}

export default App;
