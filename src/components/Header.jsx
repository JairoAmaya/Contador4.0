import React from 'react';

/**
 * Componente Header
 * Muestra título, descripción y estadísticas de la app
 * 
 * @param {number} totalPrompts - Total de prompts disponibles
 * @param {number} filteredCount - Prompts visibles después de filtrar (opcional)
 */
const Header = ({ totalPrompts = 105, filteredCount = null }) => {
  return (
    <header className="max-w-4xl mx-auto mb-10">
      {/* Título principal */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
        Contador 4.0 Express
      </h1>

      {/* Descripción */}
      <p className="text-gray-600 mb-4 text-lg">
        Sistema de transformación con IA para contadores
      </p>

      {/* Estadísticas */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Total de prompts */}
        <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg shadow-sm">
          <span className="font-bold mr-2">{totalPrompts}</span>
          <span className="text-sm">prompts especializados</span>
        </div>

        {/* Resultados filtrados (solo si hay búsqueda activa) */}
        {filteredCount !== null && filteredCount !== totalPrompts && (
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg shadow-sm animate-pulse">
            <span className="font-bold mr-2">{filteredCount}</span>
            <span className="text-sm">resultados encontrados</span>
          </div>
        )}

        {/* Categorías */}
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg shadow-sm">
          <span className="font-bold mr-2">7</span>
          <span className="text-sm">categorías</span>
        </div>

        {/* Badge de versión */}
        <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg shadow-sm">
          <span className="text-sm font-semibold">v2.0</span>
        </div>
      </div>

      {/* Descripción extendida */}
      <p className="text-gray-600 text-base leading-relaxed">
        Explora nuestra colección de prompts profesionales organizados por categorías.
        Usa la búsqueda para encontrar rápidamente lo que necesitas, o navega por las
        categorías para descubrir nuevas herramientas para tu práctica contable.
      </p>
    </header>
  );
};

export default Header;
