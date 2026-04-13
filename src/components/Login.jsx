import React from 'react';
import { motion } from 'framer-motion';
import { logInWithGoogle, logInAsGuest } from '../services/firebase';

const Login = () => {
  const handleLogin = async () => {
    try {
      await logInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await logInAsGuest();
    } catch (error) {
      console.error("Guest login failed:", error);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#050505] p-4 relative overflow-hidden z-0">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 glass-panel rounded-3xl border border-white/10 shadow-2xl relative z-10 flex flex-col items-center"
      >
        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-white/50 text-center mb-8">Sign in to sync your AI conversations</p>
        
        <div className="w-full space-y-3">
          <button 
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition-all active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <button 
            onClick={handleGuestLogin}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all active:scale-[0.98]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Continue as Guest
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
