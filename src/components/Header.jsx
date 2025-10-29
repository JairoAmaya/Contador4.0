import React from 'react';
import { BarChart2 } from 'lucide-react'; // Mantenemos BarChart2 para el badge filtrado

/**
 * Componente Header
 * Muestra título, descripción y estadísticas de la app
 * * @param {number} totalPrompts - Total de prompts disponibles
 * @param {number} filteredCount - Prompts visibles después de filtrar (opcional)
 */
const Header = ({ totalPrompts = 105, filteredCount = null }) => {
  // Las categorías se asumen como 7 
  const numCategories = 7;
  const isFiltered = filteredCount !== null && filteredCount !== totalPrompts;

  return (
    // Contenedor principal: Fondo Índigo corporativo, padding amplio y esquinas redondeadas
    <header className="max-w-4xl mx-auto mb-8 p-6 sm:p-8 bg-indigo-700 text-white rounded-2xl shadow-xl">
      
      {/* TÍTULO IMPACTANTE (Más grande y en blanco) */}
      <div className="flex items-start justify-between">
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white"> 
          Contador 4.0 Express
        </h1>

        {/* Badge de versión */}
        <div className="inline-flex items-center px-3 py-1 bg-indigo-600 text-indigo-100 rounded-full shadow-sm">
          <span className="text-xs font-semibold">v2.0</span>
        </div>
      </div>

      {/* SUBTÍTULO / DESCRIPCIÓN (Texto actualizado) */}
      <p className="mt-3 text-indigo-100 text-base leading-relaxed max-w-3xl">
        Sistema de transformación con IA para contadores, que incluye más de **{totalPrompts} prompts especializados** listos para usar.
      </p>

      {/* SECCIÓN DE ESTADÍSTICAS */}
      <div className="mt-6 pt-4 border-t border-indigo-600 flex flex-wrap gap-3 text-sm font-medium">
        
        {/* Total de prompts */}
        <span className="inline-flex items-center px-4 py-1.5 bg-indigo-600 rounded-full shadow-md">
          <span className="text-indigo-100 mr-2">Total:</span> 
          <strong className="text-white">{totalPrompts} prompts</strong>
        </span>

        {/* Categorías */}
        <span className="inline-flex items-center px-4 py-1.5 bg-indigo-600 rounded-full shadow-md">
          <span className="text-indigo-100 mr-2">Áreas:</span> 
          <strong className="text-white">{numCategories} categorías</strong>
        </span>
        
        {/* Resultados filtrados (Fondo naranja para destacar) */}
        {isFiltered && (
          <span className="inline-flex items-center px-4 py-1.5 bg-orange-500 rounded-full shadow-md transition duration-300 animate-pulse">
            <BarChart2 className="w-4 h-4 mr-1 text-white" />
            <strong className="text-white">{filteredCount} resultados</strong>
          </span>
        )}
        
      </div>
    </header>
  );
};

export default Header;
