import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check, Zap } from 'lucide-react';

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
 * Componente Principal - DISEÑO TIPO TARJETAS (GRID)
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

  // Iconos ajustados
  const getIcon = (key) => {
    const isExpanded = collapsedState[key];
    if (searchText) return <ChevronDown className="w-4 h-4 text-slate-500" />;
    return isExpanded 
      ? <ChevronDown className="w-4 h-4 text-blue-400 transform transition-transform duration-300" /> 
      : <ChevronRight className="w-4 h-4 text-slate-500 transform transition-transform duration-300" />;
  };

  return (
    // CAMBIO 1: Fondo oscuro global
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 sm:p-8 font-sans">
      
      <Header 
        totalPrompts={totalPrompts} 
        filteredCount={searchText ? filteredCount : null}
      />

      <SearchBar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onClear={handleClearSearch}
      />

      {/* CAMBIO 2: Contenedor más ancho para que quepan las 3 columnas */}
      <main className="max-w-7xl mx-auto mt-10">
        
        {/* Mensaje: Sin resultados */}
        {searchText.length > 0 && displayedPrompts.length === 0 && (
          <div className="text-center p-12 bg-[#1e293b] rounded-2xl shadow-xl border border-slate-700 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-300">No se encontraron resultados</h2>
            <p className="text-slate-400 mt-3">
              Intenta con otras palabras clave o{' '}
              <button 
                onClick={handleClearSearch} 
                className="text-blue-400 hover:text-blue-300 font-medium underline"
              >
                limpia la búsqueda
              </button>.
            </p>
          </div>
        )}

        {/* CAMBIO 3: GRID LAYOUT (Aquí está la magia de las tarjetas) */}
        {displayedPrompts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {displayedPrompts.map(category => {
              const categoryExpanded = collapsedState[category.title] === true || searchText; 
              
              return (
                <div 
                  key={category.title} 
                  // ESTILO DE TARJETA: Borde sutil, fondo Slate 800, Hover effect
                  className="bg-[#1e293b] rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col overflow-hidden"
                >
                  
                  {/* Línea de color superior (Decorativa) */}
                  <div className={`h-1.5 w-full ${category.color || 'bg-blue-500'}`}></div>

                  {/* Header de la Tarjeta */}
                  <button
                    className="w-full text-left p-5 flex flex-col gap-3 transition duration-150"
                    onClick={() => toggleCollapse(category.title)}
                  >
                    <div className="flex justify-between items-start w-full">
                        {/* Icono con fondo suave */}
                        <div className="p-2 rounded-lg bg-[#0f172a] text-slate-200 border border-slate-700">
                            {/* Si category.icon es un string (emoji), lo mostramos, si es componente, lo renderizamos */}
                            <span className="text-xl">{category.icon || <Zap size={20}/>}</span> 
                        </div>
                        {getIcon(category.title)}
                    </div>
                    
                    <div>
                        <h2 className="text-lg font-bold text-slate-100 leading-tight mb-1">
                            {category.title}
                        </h2>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                            {category.subcategories.length} Subcategorías
                        </p>
                    </div>
                  </button>
                  
                  {/* Contenido Expandible (Acordeón dentro de la tarjeta) */}
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        categoryExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-5 pt-0 border-t border-slate-700/50 bg-[#1e293b]">
                      
                      {category.subcategories.map(subcategory => {
                        const subcategoryExpanded = collapsedState[subcategory.title] === true || searchText; 
                        
                        return (
                          <div key={subcategory.title} className="mt-4 first:mt-4">
                            
                            {/* Título Subcategoría */}
                            <button
                              className="w-full text-left py-2 flex items-center justify-between group"
                              onClick={() => toggleCollapse(subcategory.title)}
                            >
                              <h3 className="text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                                {subcategory.title}
                              </h3>
                              <div className="opacity-50 group-hover:opacity-100">
                                  {getIcon(subcategory.title)}
                              </div>
                            </button>
                            
                            {/* Lista de Prompts (Botones pequeños) */}
                            <div 
                                className={`pl-2 border-l-2 border-slate-700 space-y-2 mt-1 overflow-hidden transition-all duration-300 ${
                                    subcategoryExpanded ? 'max-h-[1000px] py-2' : 'max-h-0'
                                }`}
                            >
                                {subcategory.prompts.map(promptItem => (
                                  <button
                                    key={promptItem.title}
                                    onClick={() => handlePromptClick(category.title, subcategory.title, promptItem)}
                                    className="w-full text-left p-3 rounded-lg bg-[#0f172a] hover:bg-[#334155] border border-slate-800 hover:border-blue-500/30 transition-all duration-200 group relative"
                                  >
                                    <span className="text-sm text-slate-300 group-hover:text-white block pr-4">
                                      {promptItem.title}
                                    </span>
                                    <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                                  </button>
                                ))}
                            </div>
                          </div>
                        );
                      })}
                      
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      {/* Modal de Detalles */}
      {selectedPrompt && (
        <PromptDetailModal 
          promptData={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
          onCopySuccess={handleCopySuccess}
        />
      )}

      {/* Toast Notification */}
      <div className={`fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-2xl shadow-blue-500/20 transition-all duration-300 z-50 flex items-center gap-2 border border-blue-400 ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <Check className="w-5 h-5 text-white" />
          <span className="font-bold">¡Prompt copiado!</span>
      </div>
      
    </div>
  );
};

export default App;
