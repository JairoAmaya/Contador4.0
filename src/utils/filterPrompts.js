/**
 * Filtra el array de prompts basado en texto de búsqueda
 * Busca en: título del prompt, contenido, categoría, subcategoría
 * 
 * @param {Array} data - Array de categorías con prompts
 * @param {string} searchText - Texto a buscar
 * @returns {Array} - Array filtrado con solo coincidencias
 */
export const filterPrompts = (data, searchText) => {
  // Si no hay búsqueda, retornar todo
  if (!searchText || searchText.trim() === '') {
    return data;
  }

  const lowerCaseSearchText = searchText.toLowerCase().trim();

  const filteredData = data.map(category => {
    // Filtrar subcategorías
    const filteredSubcategories = category.subcategories.map(subcategory => {
      // Filtrar prompts
      const filteredPrompts = subcategory.prompts.filter(promptItem => {
        // Buscar en múltiples campos
        const matchTitle = promptItem.title.toLowerCase().includes(lowerCaseSearchText);
        const matchPrompt = promptItem.prompt.toLowerCase().includes(lowerCaseSearchText);
        const matchCategory = category.title.toLowerCase().includes(lowerCaseSearchText);
        const matchSubcategory = subcategory.title.toLowerCase().includes(lowerCaseSearchText);
        
        return matchTitle || matchPrompt || matchCategory || matchSubcategory;
      });

      // Solo retornar subcategoría si tiene prompts coincidentes
      if (filteredPrompts.length > 0) {
        return {
          ...subcategory,
          prompts: filteredPrompts
        };
      }
      return null;
    }).filter(sub => sub !== null); // Eliminar subcategorías vacías

    // Solo retornar categoría si tiene subcategorías con prompts
    if (filteredSubcategories.length > 0) {
      return {
        ...category,
        subcategories: filteredSubcategories
      };
    }
    return null;
  }).filter(cat => cat !== null); // Eliminar categorías vacías

  return filteredData;
};

/**
 * Cuenta total de prompts en los datos filtrados
 * Útil para mostrar "X resultados encontrados"
 * 
 * @param {Array} data - Array de categorías (puede estar filtrado)
 * @returns {number} - Total de prompts
 */
export const countPrompts = (data) => {
  return data.reduce((count, category) => {
    return count + category.subcategories.reduce((subCount, sub) => {
      return subCount + sub.prompts.length;
    }, 0);
  }, 0);
};

/**
 * Aplana la estructura jerárquica en un array simple
 * Útil para búsquedas más avanzadas o exports
 * 
 * @param {Array} data - Array de categorías
 * @returns {Array} - Array plano de prompts con metadata
 */
export const flattenPrompts = (data) => {
  const flattened = [];
  
  data.forEach(category => {
    category.subcategories.forEach(subcategory => {
      subcategory.prompts.forEach((prompt, index) => {
        flattened.push({
          ...prompt,
          id: `${category.title}-${subcategory.title}-${index}`,
          categoryTitle: category.title,
          categoryIcon: category.icon,
          subcategoryTitle: subcategory.title
        });
      });
    });
  });
  
  return flattened;
};
