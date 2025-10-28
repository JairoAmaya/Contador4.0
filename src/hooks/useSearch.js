import { useState, useMemo, useEffect } from 'react';
import { filterPrompts, countPrompts } from '../utils/filterPrompts';

/**
 * Custom Hook para manejar búsqueda de prompts
 * Encapsula la lógica de búsqueda, filtrado y estado de colapsado
 * 
 * @param {Array} data - Array de categorías con prompts
 * @returns {Object} - { searchText, setSearchText, displayedPrompts, collapsedState, toggleCollapse, handleClearSearch, filteredCount }
 */
const useSearch = (data) => {
  const [searchText, setSearchText] = useState('');
  const [collapsedState, setCollapsedState] = useState({});

  // Filtrar prompts usando useMemo para optimización
  const displayedPrompts = useMemo(() => {
    return filterPrompts(data, searchText);
  }, [data, searchText]);

  // Contar prompts filtrados
  const filteredCount = useMemo(() => {
    return countPrompts(displayedPrompts);
  }, [displayedPrompts]);

  // Expandir automáticamente todo cuando hay búsqueda
  useEffect(() => {
    if (searchText) {
      const newCollapsedState = {};
      displayedPrompts.forEach(category => {
        newCollapsedState[category.title] = true;
        category.subcategories.forEach(subcategory => {
          newCollapsedState[subcategory.title] = true;
        });
      });
      setCollapsedState(newCollapsedState);
    }
  }, [searchText, displayedPrompts]);

  // Toggle de colapsado (solo funciona sin búsqueda activa)
  const toggleCollapse = (key) => {
    if (!searchText) {
      setCollapsedState(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  // Limpiar búsqueda y resetear estado
  const handleClearSearch = () => {
    setSearchText('');
    setCollapsedState({});
  };

  return {
    searchText,
    setSearchText,
    displayedPrompts,
    collapsedState,
    toggleCollapse,
    handleClearSearch,
    filteredCount
  };
};

export default useSearch;
