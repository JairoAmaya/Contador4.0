import React, { useState, useEffect, useCallback } from 'react';
import { X, Copy, ExternalLink, Check, RotateCcw } from 'lucide-react'; 
// Importamos las utilidades necesarias
import { highlightPlaceholders, countPlaceholders, extractPlaceholders } from '../utils/highlightPlaceholders'; 

/**
 * Modal de vista detallada de prompt
 * @param {function} onCopySuccess - Callback para notificar que el copiado fue exitoso.
 * @param {function} onClose - Callback para cerrar el modal
 * @param {Object} promptData - Datos del prompt
 */
const PromptDetailModal = ({ promptData, onClose, onCopySuccess }) => {
  const { categoryTitle, subcategoryTitle, promptItem } = promptData;
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Lógica de Variables: Extraer variables y crear estado de reemplazo
  const initialPlaceholders = extractPlaceholders(promptItem.prompt);
  const [replacements, setReplacements] = useState(() => {
    const initialState = {};
    initialPlaceholders.forEach(ph => {
      initialState[ph] = `[${ph}]`;
    });
    return initialState;
  });
  
  const hasPlaceholders = initialPlaceholders.length > 0;

  // Animación de entrada
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // Función para obtener el prompt final con las sustituciones del usuario
  const getFinalPrompt = () => {
    let finalPrompt = promptItem.prompt;
    if (hasPlaceholders) {
      initialPlaceholders.forEach(ph => {
        const value = replacements[ph] || `[${ph}]`;
        finalPrompt = finalPrompt.replace(new RegExp(`\\[${ph}\\]`, 'g'), value);
      });
    }
    return finalPrompt;
  };
  
  // Manejador de cambio en los campos de reemplazo
  const handleReplacementChange = (placeholder, value) => {
    setReplacements(prev => ({
      ...prev,
      [placeholder]: value
    }));
  };

  // Restablecer todos los campos a los valores iniciales [VARIABLE]
  const handleResetReplacements = () => {
    const initialState = {};
    initialPlaceholders.forEach(ph => {
      initialState[ph] = `[${ph}]`;
    });
    setReplacements(initialState);
  };

  // Función para copiar al portapapeles
  const handleCopyPrompt = async () => {
    const finalPrompt = getFinalPrompt(); // Obtener el prompt con las sustituciones
    
    try {
      await navigator.clipboard.writeText(finalPrompt);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      if (onCopySuccess) {
          onCopySuccess();
      }

    } catch (err) {
      // Fallback
      const el = document.createElement('textarea');
      el.value = finalPrompt;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      if (onCopySuccess) {
          onCopySuccess();
      }
    }
  };

  // FUNCIÓN NUEVA: Maneja la acción de abrir la plataforma (Copia y Abre)
  const handleExecutePrompt = async (platformBaseUrl, event) => {
      // 1. Evitar que el navegador abra el enlace inmediatamente (para forzar la copia)
      event.preventDefault(); 
      
      // 2. Obtener el prompt final del estado actual
      const finalPrompt = getFinalPrompt();
      
      // 3. COPIAR EL PROMPT (Llama a la función que ya funciona, pero sin mostrar el Toast por duplicado)
      await handleCopyPrompt(); 
      
      // 4. Abrir la URL con el prompt final codificado
      const finalUrl = `${platformBaseUrl}${encodeURIComponent(finalPrompt)}`;
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };


  // Función para cerrar con animación
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose]);

  // Resto de datos
  const navigationPath = `${categoryTitle} > ${subcategoryTitle}`;
  const variableCount = countPlaceholders(promptItem.prompt);

  return (
    <div 
      className={`fixed inset-0 bg-gray-900 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isVisible ? 'bg-opacity-75' : 'bg-opacity-0'}`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          
          {/* Header con navegación y botón cerrar */}
          <div className="flex justify-between items-start mb-6 border-b pb-4 border-gray-100">
            <div className="flex-1">
              <p className="text-sm font-light text-gray-500 mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                {navigationPath}
              </p>
              <h2 className="text-3xl font-extrabold text-gray-800" style={{ color: '#E45826' }}>
                {promptItem.title}
              </h2>
              
              {/* Badge con contador de variables */}
              {variableCount > 0 && (
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                  {variableCount} {variableCount === 1 ? 'variable' : 'variables'} para personalizar
                </div>
              )}
            </div>
            
            <button 
              onClick={handleClose} 
              className="text-gray-400 hover:text-gray-700 transition duration-150 p-2 focus:outline-none ml-4"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* NUEVA SECCIÓN: FORMULARIO DE REEMPLAZO DE VARIABLES */}
          {hasPlaceholders && (
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-center mb-4 border-b pb-3 border-blue-200">
                    <h3 className="text-lg font-bold text-blue-800">✍️ Personalizar Variables ({initialPlaceholders.length})</h3>
                    <button 
                        onClick={handleResetReplacements}
                        className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition duration-150"
                        title="Restablecer valores originales"
                    >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Reset
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {initialPlaceholders.map(ph => (
                          <div key={ph} className="flex flex-col">
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                  {ph.toUpperCase()}
                              </label>
                              <input
                                  type="text"
                                  value={replacements[ph] || ''}
                                  onChange={(e) => handleReplacementChange(ph, e.target.value)}
                                  placeholder={`Ingresa el valor para [${ph}]`}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              />
                          </div>
                      ))}
                  </div>
              </div>
          )}
          {/* FIN: FORMULARIO DE REEMPLAZO DE VARIABLES */}


          {/* Contenido del Prompt (Ahora muestra el prompt original sin sustituir) */}
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contenido del Prompt Original:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner">
              <pre className="text-base text-gray-800 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
                {highlightPlaceholders(promptItem.prompt)} 
              </pre>
            </div>
          </div>

          {/* Instrucciones rápidas */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-bold text-blue-800 mb-2">📝 Instrucciones de Copiado:</h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              {hasPlaceholders ? (
                <>
                  <li>Completa los campos de **"Personalizar Variables"** arriba.</li>
                  <li>Al copiar, el prompt incluirá automáticamente tus sustituciones.</li>
                </>
              ) : (
                <li>Este prompt es de uso inmediato. Cópialo directamente.</li>
              )}
              
              <li>Copia el prompt completo o úsalo directamente en Claude/ChatGPT.</li>
            </ul>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            
            {/* Botón Copiar */}
            <button 
              onClick={handleCopyPrompt}
              className={`flex items-center justify-center px-6 py-3 text-white font-bold rounded-xl transition-all duration-300 shadow-lg ${
                copied 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" /> ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" /> Copiar Prompt Final
                </>
              )}
            </button>
            
            {/* Botones de Ejecución (CORREGIDOS) */}
            <a 
              href="#" // Usamos un placeholder
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition duration-300 shadow-lg"
              onClick={(e) => handleExecutePrompt('https://claude.ai/new?q=', e)} // Llama a la nueva función
            >
              <ExternalLink className="w-5 h-5 mr-2" /> Usar en Claude
            </a>

            <a 
              href="#" // Usamos un placeholder
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition duration-300 shadow-lg"
              onClick={(e) => handleExecutePrompt('https://chat.openai.com/?q=', e)} // Llama a la nueva función
            >
              <ExternalLink className="w-5 h-5 mr-2" /> Usar en ChatGPT
            </a>
          </div>

          {/* Footer del modal con tips */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              💡 <strong>Tip Pro:</strong> Puedes combinar múltiples prompts para análisis más complejos
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PromptDetailModal;
