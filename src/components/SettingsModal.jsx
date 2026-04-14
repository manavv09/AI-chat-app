import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, User, Settings as SettingsIcon, Check } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, user, isDarkTheme, setIsDarkTheme }) => {
  const [activeTab, setActiveTab] = useState('upgrade');
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl shadow-[var(--shadow-color)] overflow-hidden flex flex-col md:flex-row h-[80vh] max-h-[600px]"
          >
           {/* Sidebar Tabs */}
           <div className="w-full md:w-64 bg-[var(--bg-surface)] border-b md:border-b-0 md:border-r border-[var(--border-color)] p-4 flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto custom-scrollbar">
             <h2 className="text-[var(--text-primary)] font-semibold px-2 mb-2 hidden md:block">Settings</h2>
             
             <button onClick={() => setActiveTab('general')} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'general' ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'}`}>
                <SettingsIcon size={16} /> General
             </button>
             <button onClick={() => setActiveTab('account')} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'account' ? 'bg-[var(--bg-surface-hover)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'}`}>
                <User size={16} /> Account
             </button>
             <button onClick={() => setActiveTab('upgrade')} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'upgrade' ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-[var(--text-primary)] border border-[var(--border-color)] shadow-inner' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'}`}>
                <Sparkles size={16} className={activeTab === 'upgrade' ? 'text-cyan-400' : ''} /> Upgrade to Pro
             </button>
           </div>

           {/* Content Area */}
           <div className="flex-1 p-6 overflow-y-auto custom-scrollbar relative">
              <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--bg-surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                 <X size={20} />
              </button>

              {activeTab === 'general' && (
                 <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">General Settings</h3>
                    <div className="space-y-6">
                       <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                          <div>
                             <p className="text-[var(--text-primary)] font-medium">Dark Theme</p>
                             <p className="text-[var(--text-muted)] text-sm">Always use dark theme across the workspace</p>
                          </div>
                          <div 
                             onClick={() => setIsDarkTheme(!isDarkTheme)}
                             className={`w-11 h-6 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-1 ${isDarkTheme ? 'bg-cyan-500' : 'bg-[var(--bg-surface)] border border-[var(--border-color)]'}`}
                             style={{ justifyContent: isDarkTheme ? 'flex-end' : 'flex-start' }}
                          >
                             <motion.div 
                                layout
                                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                                className="w-4 h-4 bg-white rounded-full shadow-sm"
                             />
                          </div>
                       </div>
                       <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                          <div>
                             <p className="text-[var(--text-primary)] font-medium">Auto-scroll to bottom</p>
                             <p className="text-[var(--text-muted)] text-sm">Automatically scroll to new messages as they arrive</p>
                          </div>
                          <div 
                             onClick={() => setIsAutoScroll(!isAutoScroll)}
                             className={`w-11 h-6 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-1 ${isAutoScroll ? 'bg-cyan-500' : 'bg-[var(--bg-surface)] border border-[var(--border-color)]'}`}
                             style={{ justifyContent: isAutoScroll ? 'flex-end' : 'flex-start' }}
                          >
                             <motion.div 
                                layout
                                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                                className="w-4 h-4 bg-white rounded-full shadow-sm"
                             />
                          </div>
                       </div>
                    </div>
                 </div>
              )}

              {activeTab === 'account' && (
                 <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Account</h3>
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 flex items-center gap-4 mb-6">
                       <img 
                          src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'Guest'}&background=random`} 
                          alt="avatar" 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-full border border-[var(--border-color)]" 
                       />
                       <div>
                          <p className="text-[var(--text-primary)] font-semibold text-lg">{user?.displayName || 'Guest User'}</p>
                          <p className="text-[var(--text-muted)]">{user?.email || 'Anonymous Session'}</p>
                       </div>
                    </div>
                    <button className="px-4 py-2 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] rounded-lg text-[var(--text-primary)] font-medium transition-colors text-sm border border-[var(--border-color)]">
                        Export Data
                    </button>
                 </div>
              )}

              {activeTab === 'upgrade' && (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-8 max-w-xl">
                       <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                          <Sparkles className="text-purple-400" /> Unlock Pro Models
                       </h3>
                       <p className="text-[var(--text-secondary)]">Upgrade your workspace to access advanced AI models, unlimited data analysis, and priority response times.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {/* Monthly */}
                       <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col hover:bg-[var(--bg-surface-hover)] transition-colors relative">
                          <h4 className="text-[var(--text-primary)] font-medium mb-1">Monthly</h4>
                          <div className="flex items-baseline gap-1 mb-4">
                             <span className="text-3xl font-bold text-[var(--text-primary)]">₹499</span>
                             <span className="text-[var(--text-muted)] text-sm">/mo</span>
                          </div>
                          <ul className="space-y-3 mb-6 flex-1">
                             <li className="flex gap-2 text-sm text-[var(--text-secondary)]"><Check size={16} className="text-cyan-400 shrink-0" /> Faster response speed</li>
                             <li className="flex gap-2 text-sm text-[var(--text-secondary)]"><Check size={16} className="text-cyan-400 shrink-0" /> Priority access during peak</li>
                          </ul>
                          <button className="w-full py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold hover:opacity-90 transition-all active:scale-95 shadow-md">Select Plan</button>
                       </div>

                       {/* Quarterly */}
                       <div className="bg-gradient-to-b from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-6 flex flex-col relative transform md:-translate-y-2 shadow-2xl shadow-[var(--shadow-color)]">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-cyan-500 px-3 py-0.5 rounded-full text-[10px] font-bold text-white tracking-widest uppercase shadow-lg">Popular</div>
                          <h4 className="text-[var(--text-primary)] font-medium mb-1">Quarterly</h4>
                          <div className="flex items-baseline gap-1 mb-1">
                             <span className="text-3xl font-bold text-[var(--text-primary)]">₹1,299</span>
                             <span className="text-[var(--text-muted)] text-sm">/3 mo</span>
                          </div>
                          <p className="text-cyan-400 text-xs font-medium mb-4">Save 15%</p>
                          <ul className="space-y-3 mb-6 flex-1">
                             <li className="flex gap-2 text-sm text-[var(--text-secondary)]"><Check size={16} className="text-purple-400 shrink-0" /> Everything in Monthly</li>
                             <li className="flex gap-2 text-sm text-[var(--text-secondary)]"><Check size={16} className="text-purple-400 shrink-0" /> Advanced data analysis</li>
                             <li className="flex gap-2 text-sm text-[var(--text-secondary)]"><Check size={16} className="text-purple-400 shrink-0" /> Custom instructions</li>
                          </ul>
                          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 active:scale-95">Select Plan</button>
                       </div>

                       {/* Yearly */}
                       <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col hover:bg-[var(--bg-surface-hover)] transition-colors relative">
                          <h4 className="text-[var(--text-primary)] font-medium mb-1">Yearly</h4>
                          <div className="flex items-baseline gap-1 mb-1">
                             <span className="text-3xl font-bold text-[var(--text-primary)]">₹3,999</span>
                             <span className="text-[var(--text-muted)] text-sm">/yr</span>
                          </div>
                          <p className="text-cyan-400 text-xs font-medium mb-4">Save 33%</p>
                          <ul className="space-y-3 mb-6 flex-1">
                             <li className="flex gap-2 text-sm text-[var(--text-secondary)]"><Check size={16} className="text-cyan-400 shrink-0" /> Everything in Quarterly</li>
                             <li className="flex gap-2 text-sm text-[var(--text-secondary)]"><Check size={16} className="text-cyan-400 shrink-0" /> Early access to new models</li>
                             <li className="flex gap-2 text-sm text-[var(--text-secondary)]"><Check size={16} className="text-cyan-400 shrink-0" /> API access credits</li>
                          </ul>
                          <button className="w-full py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold hover:opacity-90 transition-all active:scale-95 shadow-md">Select Plan</button>
                       </div>
                    </div>
                 </div>
              )}
           </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SettingsModal;
