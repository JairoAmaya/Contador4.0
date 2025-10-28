import React from 'react';

const Header = ({ totalPrompts = 105, filteredCount = null }) => {
  return (
    <header className="max-w-4xl mx-auto mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
        Contador 4.0 Express
      </h1>
      <p className="text-gray-600 mb-4 text-lg">
        Sistema de transformación con IA para contadores
      </p>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg shadow-sm">
          <span className="font-bold mr-2">{totalPrompts}</span>
          <span className="text-sm">prompts especializados</span>
        </div>
        {filteredCount !== null && filteredCount !== totalPrompts && (
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg shadow-sm animate-pulse">
            <span className="font-bold mr-2">{filteredCount}</span>
            <span className="text-sm">resultados encontrados</span>
          </div>
        )}
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg shadow-sm">
          <span className="font-bold mr-2">7</span>
          <span className="text-sm">categorías</span>
        </div>
        <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg shadow-sm">
          <span className="text-sm font-semibold">v2.0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
