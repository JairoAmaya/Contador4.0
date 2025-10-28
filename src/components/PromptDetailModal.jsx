import React, { useState, useEffect } from 'react';
import { X, Copy, ExternalLink, Check } from 'lucide-react';
import { highlightPlaceholders, countPlaceholders } from '../utils/highlightPlaceholders';

/**
 * Modal de vista detallada de prompt
 * Muestra el prompt completo con opciones de copiar y usar en Claude/ChatGPT
 * 
 * @param {Object} promptData - Datos del prompt { categoryTitle, subcategoryTitle, promptItem }
 * @param {function} onClose - Callback para cerrar el modal
 */
const PromptDetailModal = ({ promptData, onClose }) => {
  const { categoryTitle, subcategoryTitle, promptItem } = promptData;
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animación de entrada
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // Determinar la ruta de navegación
  const navigationPath = `${categoryTitle} > ${subcategoryTitle}`;
  
  // Contar variables en el prompt
  const variableCount = countPlaceholders(promptItem.prompt);

  // Función para copiar al portapapeles
  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptItem.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback para navegadores antiguos
      const el = document.createElement('textarea');
      el.value = promptItem.prompt;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Función para cerrar con animación
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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

          {/* Contenido del Prompt */}
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contenido del Prompt:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner">
              <pre className="text-base text-gray-800 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
                {highlightPlaceholders(promptItem.prompt)}
              </pre>
            </div>
          </div>

          {/* Instrucciones rápidas */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-bold text-blue-800 mb-2">📝 Cómo usar este prompt:</h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Reemplaza las <strong className="text-orange-600">variables en naranja</strong> con tu información específica</li>
              <li>Copia el prompt completo o úsalo directamente en Claude/ChatGPT</li>
              <li>Ajusta el nivel de detalle según tus necesidades</li>
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
                  <Copy className="w-5 h-5 mr-2" /> Copiar Prompt
                </>
              )}
            </button>
            
            {/* Botón Claude */}
            <a 
              href={`https://claude.ai/new?q=${encodeURIComponent(promptItem.prompt)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition duration-300 shadow-lg"
            >
              <ExternalLink className="w-5 h-5 mr-2" /> Usar en Claude
            </a>

            {/* Botón ChatGPT */}
            <a 
              href={`https://chat.openai.com/?q=${encodeURIComponent(promptItem.prompt)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition duration-300 shadow-lg"
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
