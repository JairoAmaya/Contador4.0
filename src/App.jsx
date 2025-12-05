import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';

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
 * Componente Principal - REDISEÑO DARK MODE
 * Se mantienen todas las funcionalidades, solo cambia la estética.
 */
const App = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [toastVisible, setToastVisible] = useState(false); 

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

  const handleCopySuccess = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  // Iconos ajustados para fondo oscuro
  const getIcon = (key) => {
    const isExpanded = collapsedState[key];
    
    if (searchText) {
      return <ChevronDown className="w-4 h-4 text-slate-500" />;
    }

    return isExpanded 
      ? <ChevronDown className="w-4 h-4 text-blue-400 transform transition-transform duration-300" /> 
      : <ChevronRight className="w-4 h-4 text-slate-500 transform transition-transform duration-300" />;
  };

  return (
    // CAMBIO 1: Fondo Global Oscuro (Slate 900)
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 sm:p-8 font-sans">
      
      {/* Header */}
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

      <main className="max-w-4xl mx-auto">
        
        {/* Mensaje: Sin resultados (Estilo Dark) */}
        {searchText.length > 0 && displayedPrompts.length === 0 && (
          <div className="text-center p-12 bg-[#1e293b] rounded-2xl shadow-xl mt-8 border border-red-900/50">
            <h2 className="text-2xl font-bold text-red-400">No se encontraron resultados</h2>
            <p className="text-slate-400 mt-3">
              Intenta con otras palabras clave o{' '}
              <button 
                onClick={handleClearSearch} 
                className="text-blue-400 hover:text-blue-300 font-medium underline"
              >
                limpia la búsqueda para ver todos los prompts
              </button>.
            </p>
          </div>
        )}

        {/* Lista de Categorías */}
        {displayedPrompts.length > 0 && (
          <div className="space-y-6">
            {displayedPrompts.map(category => {
              const categoryExpanded = collapsedState[category.title] === true || searchText; 
              
              return (
                <section 
                  key={category.title} 
                  // CAMBIO 2: Tarjetas oscuras (Slate 800) y bordes sutiles
                  className="bg-[#1e293b] rounded-2xl shadow-lg border border-slate-700 overflow-hidden"
                >
                  
                  {/* Header de Categoría */}
                  <button
                    className={`w-full text-left p-5 flex items-center justify-between transition duration-150 ${
                      categoryExpanded 
                        ? 'bg-blue-600 text-white' // Azul brillante activo
                        : 'bg-[#1e293b] hover:bg-[#334155] text-slate-100' // Oscuro inactivo
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
                    <div className="p-6 pt-4 space-y-5 border-t border-slate-700 bg-[#0f172a]/50">
                      
                      {category.subcategories.map(subcategory => {
                        const subcategoryExpanded = collapsedState[subcategory.title] === true || searchText; 
                        
                        return (
                          <div 
                            key={subcategory.title} 
                            // CAMBIO 3: Fondo muy oscuro para subcategorías
                            className="bg-[#0f172a] rounded-lg border border-slate-800 overflow-hidden"
                          >
                            
                            {/* Header de Subcategoría */}
                            <button
                              className={`w-full text-left py-3 px-4 flex items-center justify-between transition duration-150 ${
                                subcategoryExpanded 
                                  ? 'bg-[#1e293b] border-b border-slate-700' 
                                  : 'bg-[#0f172a] hover:bg-[#1e293b]'
                              }`}
                              onClick={() => toggleCollapse(subcategory.title)}
                            >
                              <h3 className="text-base font-semibold text-slate-300 flex items-center">
                                <span className="ml-2">
                                  {subcategory.title}{' '}
                                  <span className="font-normal text-sm text-slate-500">
                                    ({subcategory.prompts.length})
                                  </span>
                                </span>
                              </h3>
                              {getIcon(subcategory.title)}
                            </button>
                            
                            {/* Lista de Prompts */}
                            <div className={`collapse-content ${subcategoryExpanded ? 'expanded' : 'collapsed'}`}>
                              <div className="p-4 space-y-3 bg-[#0f172a]">
                                
                                {subcategory.prompts.map(promptItem => (
                                  <button
                                    key={promptItem.title}
                                    onClick={() => handlePromptClick(category.title, subcategory.title, promptItem)}
                                    // CAMBIO 4: Botones de Prompt oscuros con hover azul
                                    className="w-full text-left p-4 bg-[#1e293b] rounded-xl shadow-sm hover:shadow-md hover:bg-[#334155] hover:border-blue-500/50 transition duration-150 flex justify-between items-center border border-slate-700 group"
                                  >
                                    <span className="text-base font-medium text-slate-200 group-hover:text-white">
                                      {promptItem.title}
                                    </span>
                                    <span className="text-blue-400 text-sm font-semibold flex items-center group-hover:text-blue-300">
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

      {/* Footer (El que ya creamos en Footer.jsx) */}
      <Footer />

      {/* Modal de Detalles */}
      {selectedPrompt && (
        <PromptDetailModal 
          promptData={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
          onCopySuccess={handleCopySuccess}
        />
      )}

      {/* TOAST NOTIFICATION (Estilo Dark Neón) */}
      <div className={`fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-2xl shadow-blue-500/20 transition-all duration-300 z-50 flex items-center gap-2 border border-blue-400 ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <Check className="w-5 h-5 text-white" />
          <span className="font-bold">¡Prompt copiado!</span>
      </div>
      
    </div>
  );
};

export default App;
