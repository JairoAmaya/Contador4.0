import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Importar componentes
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PromptDetailModal from './components/PromptDetailModal';
import Footer from './components/Footer';

// Importar datos y hooks
import promptsData from './data/promptsData';
import useSearch from './hooks/useSearch';
import { countPrompts } from './utils/filterPrompts';

/**
 * Componente Principal - VERSIÓN CON ACORDEÓN MEJORADO
 */
const App = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  
  const {
    searchText,
    setSearchText,
    displayedPrompts,
    collapsedState,
    toggleCollapse,
    handleClearSearch,
    filteredCount
  } = useSearch(promptsData);

  const totalPrompts = countPrompts(promptsData);

  const handlePromptClick = (categoryTitle, subcategoryTitle, promptItem) => {
    setSelectedPrompt({ categoryTitle, subcategoryTitle, promptItem });
  };

  // 🆕 Función mejorada para ícono con tooltip
  const getIcon = (key) => {
    const isExpanded = collapsedState[key];
    
    if (searchText) {
      // Con búsqueda: siempre expandido (gris, sin hover)
      return (
        <ChevronDown 
          className="w-4 h-4 text-gray-400" 
          title="Auto-expandido por búsqueda"
        />
      );
    }

    // Sin búsqueda: toggle manual (con animación)
    return isExpanded 
      ? (
        <ChevronDown 
          className="w-4 h-4 text-indigo-400 transform transition-transform duration-300 hover:text-indigo-600" 
          title="Click para colapsar"
        />
      )
      : (
        <ChevronRight 
          className="w-4 h-4 text-gray-500 transform transition-transform duration-300 hover:text-gray-700" 
          title="Click para expandir"
        />
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      
      <Header 
        totalPrompts={totalPrompts} 
        filteredCount={searchText ? filteredCount : null}
      />

      <SearchBar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onClear={handleClearSearch}
      />

      {/* 🆕 Mensaje informativo cuando no hay búsqueda */}
      {!searchText && displayedPrompts.length > 0 && (
        <div className="max-w-4xl mx-auto mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            💡 <strong>Tip:</strong> Haz click en las categorías para explorar. O usa la búsqueda para encontrar prompts específicos.
          </p>
        </div>
      )}

      <main className="max-w-4xl mx-auto">
        
        {/* Sin resultados */}
        {searchText.length > 0 && displayedPrompts.length === 0 && (
          <div className="text-center p-12 bg-white rounded-2xl shadow-xl mt-8 border border-red-200">
            <h2 className="text-2xl font-bold text-red-600">No se encontraron resultados</h2>
            <p className="text-gray-500 mt-3">
              Intenta con otras palabras clave o{' '}
              <button 
                onClick={handleClearSearch} 
                className="text-indigo-600 hover:text-indigo-800 font-medium underline"
              >
                limpia la búsqueda para ver todos los prompts
              </button>.
            </p>
          </div>
        )}

        {/* Lista de Categorías (Acordeón) */}
        {displayedPrompts.length > 0 && (
          <div className="space-y-6">
            {displayedPrompts.map(category => {
              const categoryExpanded = collapsedState[category.title] || false;
              
              return (
                <section 
                  key={category.title} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
                >
                  
                  {/* Header de Categoría */}
                  <button
                    className={`w-full text-left p-5 flex items-center justify-between transition duration-150 rounded-t-2xl ${
                      categoryExpanded 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-white hover:bg-gray-50 text-gray-800'
                    } ${searchText ? 'cursor-default' : 'cursor-pointer'}`}
                    onClick={() => toggleCollapse(category.title)}
                    disabled={!!searchText}
                    title={searchText ? 'Expandido automáticamente por búsqueda' : 'Click para expandir/colapsar'}
                  >
                    <div className="text-xl font-bold flex items-center">
                      <span className="mr-3 text-2xl">{category.icon}</span> 
                      <h2>{category.title}</h2>
                    </div>
                    {getIcon(category.title)}
                  </button>
                  
                  {/* Contenido: Subcategorías */}
                  <div className={`collapse-content ${categoryExpanded ? 'expanded' : 'collapsed'}`}>
                    <div className="p-6 pt-4 space-y-5 border-t border-gray-100">
                      
                      {category.subcategories.map(subcategory => {
                        const subcategoryExpanded = collapsedState[subcategory.title] || false;
                        
                        return (
                          <div 
                            key={subcategory.title} 
                            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                          >
                            
                            {/* Header de Subcategoría */}
                            <button
                              className={`w-full text-left py-3 px-4 flex items-center justify-between transition duration-150 ${
                                subcategoryExpanded 
                                  ? 'bg-gray-100' 
                                  : 'bg-gray-50 hover:bg-gray-100'
                              } ${searchText ? 'cursor-default' : 'cursor-pointer'}`}
                              onClick={() => toggleCollapse(subcategory.title)}
                              disabled={!!searchText}
                            >
                              <h3 className="text-base font-semibold text-gray-700 flex items-center">
                                <span className="ml-2">
                                  {subcategory.title}{' '}
                                  <span className="font-normal text-sm text-indigo-500">
                                    ({subcategory.prompts.length})
                                  </span>
                                </span>
                              </h3>
                              {getIcon(subcategory.title)}
                            </button>
                            
                            {/* Lista de Prompts */}
                            <div className={`collapse-content ${subcategoryExpanded ? 'expanded' : 'collapsed'}`}>
                              <div className="p-4 space-y-3 border-t border-gray-200">
                                
                                {subcategory.prompts.map(promptItem => (
                                  <button
                                    key={promptItem.title}
                                    onClick={() => handlePromptClick(category.title, subcategory.title, promptItem)}
                                    className="w-full text-left p-3 bg-white border border-indigo-100 rounded-lg shadow-sm hover:shadow-md hover:border-indigo-300 transition duration-150 flex justify-between items-center"
                                  >
                                    <span className="text-sm font-semibold text-gray-900">
                                      {promptItem.title}
                                    </span>
                                    <span className="text-indigo-500 text-xs font-medium">
                                      Ver Detalle <ChevronRight className="w-4 h-4 inline ml-1" />
                                    </span>
                                  </button>
                                ))}
                                
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      {selectedPrompt && (
        <PromptDetailModal 
          promptData={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
        />
      )}
    </div>
  );
};

export default App;
