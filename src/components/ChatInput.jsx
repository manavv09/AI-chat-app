import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowUp, Mic, MicOff, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef(null);
  
  // SpeechRecognition placeholder
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
             currentTranscript += event.results[i][0].transcript;
          }
        }
        if (currentTranscript) {
           setInput(prev => prev + (prev ? ' ' : '') + currentTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
       console.warn("Your browser does not support the Web Speech API. Please try Google Chrome.");
       return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch(e) {
        console.error("error starting recognition", e);
      }
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      if (isListening) {
         toggleListening(); // stop listening on submit
      }
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
         textareaRef.current.style.height = '60px'; // Reset to min-height
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 pt-16 pb-8 px-4 md:px-8 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/95 to-transparent z-10 pointer-events-none">
      <div className="max-w-4xl mx-auto relative pointer-events-auto group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-end glass-panel rounded-3xl border border-[var(--border-color)] shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="w-full max-h-[250px] bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] py-5 pl-[5.5rem] pr-16 focus:outline-none resize-none custom-scrollbar text-[17px] font-light leading-relaxed"
            style={{ minHeight: '68px' }}
          />

          {/* Action Buttons (Left) */}
          <div className="absolute left-2 bottom-3 flex items-center gap-0.5">
             <button
               type="button"
               onClick={() => alert("Attachment prototype: Would open file picker")}
               className="p-2.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-all duration-300 active:scale-90"
             >
                <Plus size={22} className="stroke-[2.5]" />
             </button>
             <button
               type="button"
               onClick={toggleListening}
               className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90
                 ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'}`}
             >
                {isListening ? <Mic size={22} className="stroke-[2.5]" /> : <MicOff size={22} />}
             </button>
          </div>

          {/* Submit Button */}
          <div className="absolute right-3 bottom-3">
            <motion.button
              type="submit"
              disabled={!input.trim() || disabled}
              whileHover={input.trim() && !disabled ? { scale: 1.05 } : {}}
              whileTap={input.trim() && !disabled ? { scale: 0.95 } : {}}
              className={`p-3 rounded-xl flex items-center justify-center transition-all duration-300
                ${input.trim() && !disabled 
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-[0_4px_15px_rgba(6,182,212,0.4)]' 
                  : 'bg-[var(--bg-surface)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-color)]'}`}
            >
              <ArrowUp size={22} className={input.trim() && !disabled ? "stroke-[2.5]" : "stroke-[2]"} />
            </motion.button>
          </div>
        </form>
        <div className="text-center text-[11px] text-[var(--text-muted)] mt-4 tracking-wide">
          Gemini may display inaccurate info, so double-check its responses.
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
