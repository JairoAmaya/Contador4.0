import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Componente SearchBar
 * Barra de búsqueda con funcionalidad de filtrado en tiempo real
 * 
 * @param {string} searchText - Texto actual de búsqueda
 * @param {function} onSearchChange - Callback cuando cambia el texto
 * @param {function} onClear - Callback para limpiar la búsqueda
 */
const SearchBar = ({ searchText, onSearchChange, onClear }) => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="relative flex items-center shadow-xl rounded-2xl overflow-hidden bg-white ring-2 ring-indigo-200 focus-within:ring-indigo-600 transition duration-300">
        {/* Ícono de búsqueda */}
        <div className="p-4 text-indigo-500">
          <Search className="w-5 h-5" />
        </div>

        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por categoría, subcategoría, título o contenido..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-4 pl-0 text-gray-800 text-lg outline-none border-none focus:ring-0 placeholder-gray-400"
          aria-label="Barra de búsqueda de prompts"
        />

        {/* Botón de limpiar (solo visible si hay texto) */}
        {searchText.length > 0 && (
          <button 
            onClick={onClear}
            className="p-4 text-gray-400 hover:text-red-500 transition duration-300 focus:outline-none"
            aria-label="Limpiar búsqueda"
            title="Limpiar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tips de búsqueda (opcional, mostrar solo si no hay búsqueda) */}
      {searchText.length === 0 && (
        <div className="mt-3 text-sm text-gray-500 text-center">
          💡 <strong>Tip:</strong> Intenta buscar por palabras como "análisis", "auditoría", "fiscal", "clientes" o "reportes"
        </div>
      )}

      {/* Contador de caracteres (opcional, útil para búsquedas largas) */}
      {searchText.length > 0 && (
        <div className="mt-2 text-xs text-gray-400 text-right">
          {searchText.length} caracteres
        </div>
      )}
    </div>
  );
};

export default SearchBar;
