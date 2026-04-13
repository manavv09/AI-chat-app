import React from 'react';
import { Plus, MessageSquare, Settings, LogOut, Trash2, Pin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ history, activeChatId, onNewChat, onSelectChat, isOpen, toggleSidebar, user, onLogout, onDeleteHistory, onDeleteChat, onPinChat, onOpenSettings }) => {
  const sortedHistory = [...history].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden" 
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.div 
        className={`
          fixed md:static inset-y-0 left-0 z-30 w-[280px] h-full shrink-0
          glass-panel border-l-0 border-y-0 !rounded-none flex flex-col
          md:translate-x-0 will-change-gpu
        `}
        initial={false}
        animate={{ x: isOpen || window.innerWidth >= 768 ? 0 : '-100%' }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        <div className="p-4 pt-6">
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 
                     bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-white/10 rounded-2xl text-[15px] font-medium
                     text-white shadow-lg backdrop-blur-md transition-all duration-300"
          >
            <Plus size={18} className="text-cyan-400" />
            New Workspace
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2 mt-2">
          {history.length > 0 && (
            <div className="px-2 mb-4">
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
                Recent Conversations
              </span>
            </div>
          )}
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
              hidden: { opacity: 0 }
            }}
            className="space-y-1"
          >
            {sortedHistory.map((chat) => (
              <motion.div 
                key={chat.id} 
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -20 }
                }}
                className="relative group"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-light
                    whitespace-nowrap overflow-hidden text-left transition-colors duration-200 pr-14
                    ${activeChatId === chat.id 
                      ? 'bg-white/10 text-white shadow-inner border border-white/5' 
                      : 'text-white/60 hover:text-white border border-transparent'}`}
                >
                  <MessageSquare size={16} className={activeChatId === chat.id ? "text-cyan-400" : "text-white/40"} />
                  <span className="truncate flex-1">{chat.title}</span>
                </motion.button>
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onPinChat(chat.id); }}
                    className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${chat.isPinned ? 'text-cyan-400' : 'text-white/40 hover:text-white'}`}
                  >
                    <Pin size={14} className={chat.isPinned ? "fill-current" : ""} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id); }}
                    className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                {chat.isPinned && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 group-hover:hidden transition-opacity">
                     <Pin size={12} className="text-cyan-400 fill-current opacity-80" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="p-4 border-t border-white/5 bg-white/[0.01]">

           {user && (
             <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-white/[0.02]">
                <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} alt="avatar" className="w-8 h-8 rounded-full border border-white/10" />
                <div className="flex-1 overflow-hidden">
                   <p className="text-sm text-white/90 truncate">{user.displayName || 'Guest User'}</p>
                </div>
             </div>
           )}
           <button 
             onClick={onOpenSettings}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
           >
              <Settings size={18} className="text-white/50" />
              Settings
           </button>
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-1"
           >
              <LogOut size={18} />
              Logout
           </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
