import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react'; // <-- Sparkles y BarChart2 eliminados

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
 * Componente Principal de la Aplicación
 * Contador 4.0 Express v2
 */
const App = () => {
  // Estado del modal
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [toastVisible, setToastVisible] = useState(false); 

  // Hook personalizado de búsqueda
  const {
    searchText,
    setSearchText,
    displayedPrompts,
    collapsedState,
    toggleCollapse,
    handleClearSearch,
    filteredCount
  } = useSearch(promptsData);

  // Total de prompts
  const totalPrompts = countPrompts(promptsData);

  // Maneja apertura del modal
  const handlePromptClick = (categoryTitle, subcategoryTitle, promptItem) => {
    setSelectedPrompt({ categoryTitle, subcategoryTitle, promptItem });
  };

  // FUNCIÓN NUEVA: Muestra la notificación flotante
  const handleCopySuccess = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  // Función para obtener ícono de colapsado
  const getIcon = (key) => {
    const isExpanded = collapsedState[key];
    
    if (searchText) {
      return <ChevronDown className="w-4 h-4 text-gray-400" />;
    }

    return isExpanded 
      ? <ChevronDown className="w-4 h-4 text-indigo-200 transform transition-transform duration-300" /> 
      : <ChevronRight className="w-4 h-4 text-gray-500 transform transition-transform duration-300" />;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      
      {/* Header con estadísticas */}
      <Header 
        totalPrompts={totalPrompts} 
        filteredCount={searchText ? filteredCount : null}
      />

      {/* Barra de búsqueda */}
      <SearchBar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onClear={handleClearSearch}
      />

      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto">
        
        {/* Mensaje: Sin resultados */}
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

        {/* Lista de Categorías y Prompts */}
        {displayedPrompts.length > 0 && (
          <div className="space-y-6">
            {displayedPrompts.map(category => {
              // CORRECCIÓN 1: Solo expandir si es TRUE (o hay búsqueda)
              const categoryExpanded = collapsedState[category.title] === true || searchText; 
              
              return (
                <section 
                  key={category.title} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
                >
                  
                  {/* Header de Categoría (Nivel 1) */}
                  <button
                    className={`w-full text-left p-5 flex items-center justify-between transition duration-150 rounded-t-2xl ${
                      categoryExpanded 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-white hover:bg-gray-50 text-gray-800'
                    }`}
                    onClick={() => toggleCollapse(category.title)}
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
                        // CORRECCIÓN 2: Solo expandir si es TRUE (o hay búsqueda)
                        const subcategoryExpanded = collapsedState[subcategory.title] === true || searchText; 
                        
                        return (
                          <div 
                            key={subcategory.title} 
                            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                          >
                            
                            {/* Header de Subcategoría (Nivel 2) */}
                            <button
                              className={`w-full text-left py-3 px-4 flex items-center justify-between transition duration-150 ${
                                subcategoryExpanded 
                                  ? 'bg-gray-100' 
                                  : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                              onClick={() => toggleCollapse(subcategory.title)}
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
                            
                            {/* Lista de Prompts (Nivel 3) */}
                            <div className={`collapse-content ${subcategoryExpanded ? 'expanded' : 'collapsed'}`}>
                              <div className="p-4 space-y-3 border-t border-gray-200">
                                
                                {subcategory.prompts.map(promptItem => (
                                  <button
                                    key={promptItem.title}
                                    onClick={() => handlePromptClick(category.title, subcategory.title, promptItem)}
                                    // Estilos de Tarjeta
                                    className="w-full text-left p-4 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-indigo-50 transition duration-150 flex justify-between items-center border border-gray-200"
                                  >
                                    <span className="text-base font-medium text-gray-900">
                                      {promptItem.title}
                                    </span>
                                    <span className="text-indigo-600 text-sm font-semibold flex items-center">
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

      {/* Footer */}
      <Footer />

      {/* Modal de Detalles */}
      {selectedPrompt && (
        <PromptDetailModal 
          promptData={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
          onCopySuccess={handleCopySuccess}
        />
      )}

      {/* TOAST NOTIFICATION */}
      <div className={`fixed bottom-5 right-5 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-xl transition-opacity duration-300 z-50 flex items-center gap-2 ${toastVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Check className="w-5 h-5 text-green-400" />
          <span>¡Prompt copiado al portapapeles!</span>
      </div>
      
    </div>
  );
};

export default App;
