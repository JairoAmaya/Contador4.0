import React from 'react';
import { Zap, Layers, Database } from 'lucide-react';

// AÑADIMOS 'categoryCount' A LAS PROPS RECIBIDAS 👇
const Header = ({ totalPrompts, filteredCount, categoryCount }) => {
  return (
    <header className="mb-10 relative">
      
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl border border-slate-700 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 px-6 py-10 sm:p-12 text-center">
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Contador 4.0 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Express</span>
            </h1>
            <span className="px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              v2.0
            </span>
          </div>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Sistema de transformación con IA para contadores. Accede a una librería de <strong className="text-slate-200">prompts de alta ingeniería</strong> diseñados para automatizar tu día a día.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            
            {/* Pill 1: Total Prompts */}
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#020617] border border-slate-700/50 text-slate-300 shadow-inner">
              <Database size={18} className="text-blue-500" />
              <span className="font-medium">
                {filteredCount !== null 
                  ? <span className="text-white">{filteredCount} resultados</span>
                  : <>Total: <span className="text-white font-bold">{totalPrompts}</span> prompts</>
                }
              </span>
            </div>

            {/* Pill 2: Categorías (AHORA DINÁMICO) */}
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#020617] border border-slate-700/50 text-slate-300 shadow-inner">
              <Layers size={18} className="text-yellow-500" />
              <span className="font-medium">Áreas: <span className="text-white font-bold">{categoryCount || 8} categorías</span></span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#020617] border border-slate-700/50 text-slate-300 shadow-inner">
              <Zap size={18} className="text-orange-500" />
              <span className="font-medium">Powered by <span className="text-white font-bold">AI</span></span>
            </div>

          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-blue-500/20 blur-xl rounded-[100%] pointer-events-none"></div>
    </header>
  );
};

export default Header;
