import React from 'react';

/**
 * Analiza texto y resalta variables entre [corchetes]
 * Convierte [variable] en componentes React estilizados
 * 
 * @param {string} text - Texto del prompt con variables
 * @returns {Array<React.ReactNode>} - Array de elementos React
 * 
 * @example
 * highlightPlaceholders("Analiza [empresa] en [año]")
 * // Retorna: ["Analiza ", <span>variable</span>, " en ", <span>año</span>]
 */
export const highlightPlaceholders = (text) => {
  if (!text) return [];
  
  // Regex para encontrar [contenido] incluyendo los corchetes
  const regex = /(\[.*?\])/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.match(regex)) {
      // Es una variable: aplicar estilos de resaltado
      return (
        <span 
          key={index} 
          className="font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded-md transition duration-150 shadow-sm border border-orange-200"
          style={{ fontFamily: 'Lato, sans-serif' }}
          title="Variable que debes personalizar"
        >
          {part}
        </span>
      );
    }
    // Es texto normal
    return part;
  });
};

/**
 * Cuenta el número de variables en un prompt
 * Útil para mostrar estadísticas
 * 
 * @param {string} text - Texto del prompt
 * @returns {number} - Cantidad de variables encontradas
 */
export const countPlaceholders = (text) => {
  if (!text) return 0;
  const matches = text.match(/\[.*?\]/g);
  return matches ? matches.length : 0;
};

/**
 * Extrae todas las variables de un prompt
 * Útil para generar formularios dinámicos (futuro)
 * 
 * @param {string} text - Texto del prompt
 * @returns {Array<string>} - Array de variables sin corchetes
 */
export const extractPlaceholders = (text) => {
  if (!text) return [];
  const matches = text.match(/\[([^\]]+)\]/g);
  return matches ? matches.map(match => match.slice(1, -1)) : [];
};
