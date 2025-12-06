import React, { useState, useEffect, useMemo } from 'react';
import { X, Copy, Check, Clock, Info, ExternalLink } from 'lucide-react';

const PromptDetailModal = ({ promptData, onClose, onCopySuccess }) => {
  const [variables, setVariables] = useState({});
  const [isCopied, setIsCopied] = useState(false);

  // 1. DETECCIÓN INTELIGENTE DE VARIABLES
  // Busca todo lo que esté entre corchetes [...] y crea un campo para ello
  useEffect(() => {
    const regex = /\[(.*?)\]/g;
    const found = promptData.prompt.match(regex);
    if (found) {
      const initialVars = {};
      // Eliminamos corchetes y duplicados para crear el estado inicial
      [...new Set(found)].forEach(v => {
        const key = v.replace('[', '').replace(']', '');
        initialVars[key] = '';
      });
      setVariables(initialVars);
    } else {
      setVariables({});
    }
  }, [promptData]);

  // 2. GENERADOR DE PROMPT FINAL
  // Reemplaza los placeholders con lo que escribe el usuario
  const finalPrompt = useMemo(() => {
    let text = promptData.prompt;
    Object.keys(variables).forEach(key => {
      const value = variables[key];
      // Si el usuario escribió algo, úsalo. Si no, deja el placeholder original para que sepa qué falta.
      if (value && value.trim() !== '') {
        // Reemplaza todas las ocurrencias de esa variable
        text = text.split(`[${key}]`).join(value);
      }
    });
    return text;
  }, [promptData, variables]);

  // Manejador de inputs
  const handleInputChange = (key, value) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  };

  // Copiar al portapapeles
  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt);
    setIsCopied(true);
    if (onCopySuccess) onCopySuccess();
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    // OVERLAY (Fondo oscuro con desenfoque)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* CARD DEL MODAL */}
      <div className="relative w-full max-w-3xl bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-700 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* --- HEADER --- */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-[#1e293b]">
          <div>
            <div className="flex items-center gap-2 mb-2">
               {/* Badge de Categoría */}
               <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-900/30 text-blue-400 border border-blue-500/20">
                 {promptData.categoryTitle || "Prompt"}
               </span>
               {/* Tiempo Estimado */}
               {promptData.tiempoEstimado && (
                 <span className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                   <Clock size={12} /> {promptData.tiempoEstimado}
                 </span>
               )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {promptData.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* --- BODY (Scrollable) --- */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          
          {/* SECCIÓN 1: VARIABLES (Si existen) */}
          {Object.keys(variables).length > 0 && (
            <div className="mb-8 p-5 rounded-xl bg-blue-900/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-4 text-blue-400">
                <Info size={18} />
                <h3 className="font-bold text-sm uppercase tracking-wide">Personaliza tu Prompt</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(variables).map(key => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                      {key}
                    </label>
                    <input
                      type="text"
                      placeholder={`Ej: ${key}...`}
                      value={variables[key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN 2: EL PROMPT FINAL */}
          <div>
            <div className="flex justify-between items-end mb-3">
              <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Resultado Final
              </h3>
              <span className="text-xs text-slate-500">Listo para copiar</span>
            </div>
            
            <div className="relative group">
              <textarea
                readOnly
                value={finalPrompt}
                className="w-full h-64 bg-[#020617] border border-slate-800 rounded-xl p-5 text-slate-300 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:border-slate-600 custom-scrollbar"
              />
              {/* Botón flotante de copiar (Visible en Desktop) */}
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-slate-800/80 backdrop-blur hover:bg-blue-600 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hidden sm:block"
                title="Copiar texto"
              >
                {isCopied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

        </div>

        {/* --- FOOTER DEL MODAL --- */}
        <div className="p-6 border-t border-slate-800 bg-[#1e293b] flex flex-col sm:flex-row gap-4 justify-between items-center">
          
          {/* Enlaces a IAs */}
          <div className="flex gap-3 w-full sm:w-auto order-2 sm:order-1">
            <a href="https://chat.openai.com" target="_blank" rel="noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700">
              ChatGPT <ExternalLink size={12} />
            </a>
            <a href="https://claude.ai" target="_blank" rel="noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700">
              Claude <ExternalLink size={12} />
            </a>
          </div>

          {/* Botón Principal de Copiar */}
          <button
            onClick={handleCopy}
            className={`w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
              isCopied 
                ? 'bg-green-600 hover:bg-green-700 ring-2 ring-green-500/50' 
                : 'bg-blue-600 hover:bg-blue-500 ring-2 ring-blue-500/30 hover:ring-blue-400/50'
            }`}
          >
            {isCopied ? (
              <> <Check size={20} /> ¡Copiado! </>
            ) : (
              <> <Copy size={20} /> Copiar Prompt </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
};

export default PromptDetailModal;
