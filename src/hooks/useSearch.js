import { useState, useMemo, useEffect } from 'react';
import { filterPrompts, countPrompts } from '../utils/filterPrompts';

/**
 * Custom Hook para manejar búsqueda de prompts
 * VERSIÓN MEJORADA: Acordeón colapsado por defecto, expandido solo en búsqueda
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

  // 🆕 MEJORA: Auto-expansión SOLO cuando hay búsqueda
  useEffect(() => {
    if (searchText && searchText.trim() !== '') {
      // CON búsqueda: expandir todo automáticamente
      const newCollapsedState = {};
      displayedPrompts.forEach(category => {
        newCollapsedState[category.title] = true;
        category.subcategories.forEach(subcategory => {
          newCollapsedState[subcategory.title] = true;
        });
      });
      setCollapsedState(newCollapsedState);
    } else {
      // SIN búsqueda: colapsar todo (acordeón cerrado)
      setCollapsedState({});
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

  // Limpiar búsqueda y resetear estado (todo colapsado)
  const handleClearSearch = () => {
    setSearchText('');
    setCollapsedState({}); // ← Esto colapsa todo
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
