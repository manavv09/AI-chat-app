import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, Sparkles, Code, Image as ImageIcon, FileText, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatArea = ({ messages, isTyping }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto w-full">
        <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
          <motion.div 
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
            className="w-20 h-20 bg-gradient-to-tr from-purple-600/20 to-blue-500/20 backdrop-blur-xl border border-[var(--border-color)] rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_80px_rgba(168,85,247,0.15)] relative group"
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-3xl border border-[var(--border-color)] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
            />
            <Sparkles size={40} className="text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.5)]" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)]/90 to-[var(--text-primary)]/50 mb-4 tracking-tight"
          >
            Limitless Intelligence.
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[var(--text-secondary)] max-w-lg text-[15px] md:text-lg font-light leading-relaxed tracking-wide mb-12"
          >
            Type a message below or explore some of these ideas to get started.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4"
          >
            {[
               { icon: <Code size={18} className="text-blue-400" />, title: "Code", desc: "Build a React component" },
               { icon: <ImageIcon size={18} className="text-pink-400" />, title: "Design", desc: "Suggest aesthetic color palettes" },
               { icon: <FileText size={18} className="text-emerald-400" />, title: "Write", desc: "Draft a professional email" },
               { icon: <Lightbulb size={18} className="text-yellow-400" />, title: "Brainstorm", desc: "Plan a weekend itinerary" }
            ].map((item, i) => (
               <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:bg-[var(--bg-surface-hover)] transition-all cursor-pointer shadow-lg hover:shadow-xl group">
                 <div className="p-2 rounded-xl bg-[var(--bg-surface)] group-hover:scale-110 transition-transform">
                   {item.icon}
                 </div>
                 <div className="text-left">
                   <h3 className="text-[var(--text-primary)]/90 font-medium text-sm mb-1">{item.title}</h3>
                   <p className="text-[var(--text-muted)] text-xs">{item.desc}</p>
                 </div>
               </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth px-3 md:px-0">
      <div className="max-w-4xl mx-auto w-full pb-48 pt-8">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`flex gap-3 md:gap-4 w-full mb-8 will-change-gpu ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center shadow-lg bg-[var(--bg-surface)] ring-1 ring-[var(--border-color)] backdrop-blur-md self-end mb-2">
                  <Bot size={20} className="text-[rgb(var(--accent-purple))]" />
                </div>
              )}
              
              <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1.5 ml-1">
                    <span className="font-medium text-[var(--text-muted)] text-xs tracking-wider uppercase">Gemini AI</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-[var(--border-color)] px-1.5 py-0 rounded-full text-[var(--text-secondary)] shadow-sm">Pro</span>
                  </div>
                )}
                
                <div className={`p-4 md:p-5 rounded-3xl transition-all duration-300 shadow-xl ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-indigo-600 to-cyan-600 text-white rounded-br-sm border border-[var(--border-color)]' 
                      : 'glass-panel rounded-bl-sm border border-[var(--border-color)] w-full hover:shadow-[0_8px_32px_0_var(--shadow-color)]'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="markdown-body">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="text-white/95 whitespace-pre-wrap leading-relaxed text-[16px] md:text-[17px] font-light">{msg.content}</div>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-cyan-500/20 self-end mb-2 border border-white/20">
                  <User size={18} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex gap-3 md:gap-4 w-full mb-8 justify-start"
          >
            <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center shadow-lg bg-[var(--bg-surface)] ring-1 ring-[var(--border-color)] backdrop-blur-md self-end mb-2">
               <Bot size={20} className="text-[rgb(var(--accent-purple))]" />
            </div>
            <div className="flex flex-col items-start max-w-[85%] md:max-w-[75%]">
               <div className="flex items-center gap-2 mb-1.5 ml-1">
                 <span className="font-medium text-[var(--text-muted)] text-xs tracking-wider uppercase">Gemini AI</span>
                 <span className="text-[8px] font-bold uppercase tracking-widest bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-[var(--border-color)] px-1.5 py-0 rounded-full text-[var(--text-secondary)] shadow-sm">Pro</span>
               </div>
               <div className="p-5 rounded-3xl rounded-bl-sm glass-panel border border-[var(--border-color)] w-fit">
                 <div className="flex items-center gap-1.5 h-4">
                    <motion.span 
                      animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                      className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                    />
                    <motion.span 
                      animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }}
                      className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                    />
                    <motion.span 
                      animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }}
                      className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                    />
                 </div>
               </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};

export default ChatArea;
