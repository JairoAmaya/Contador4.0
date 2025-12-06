import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check, Database, Layers, Zap } from 'lucide-react';

// Importar componentes
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PromptDetailModal from './components/PromptDetailModal';
import Footer from './components/Footer'; // Asegúrate de que este Footer sea el que tiene el robot

// Importar datos y hooks
import promptsData from './data/promptsData';
import useSearch from './hooks/useSearch';
import { countPrompts } from './utils/filterPrompts';

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

  // ESTA LÍNEA CUENTA LOS PROMPTS REALES. 
  // Si en el archivo hay 105, mostrará 105. Si agregas los 10 que faltan, mostrará 115.
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

  const getIcon = (key) => {
    const isExpanded = collapsedState[key];
    if (searchText) return <ChevronDown className="w-4 h-4 text-slate-500" />;
    return isExpanded 
      ? <ChevronDown className="w-4 h-4 text-blue-400 transform transition-transform duration-300" /> 
      : <ChevronRight className="w-4 h-4 text-slate-500 transform transition-transform duration-300" />;
  };

  return (
    // FONDO OSCURO GLOBAL (Slate 900)
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 sm:p-8 font-sans">
      
      {/* Header */}
      <Header 
        totalPrompts={totalPrompts} 
        filteredCount={searchText ? filteredCount : null}
      />

      {/* Buscador */}
      <SearchBar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onClear={handleClearSearch}
      />

      {/* CONTENEDOR GRID DE TARJETAS */}
      <main className="max-w-7xl mx-auto mt-10">
        
        {/* Mensaje Sin Resultados */}
        {searchText.length > 0 && displayedPrompts.length === 0 && (
          <div className="text-center p-12 bg-[#1e293b] rounded-2xl shadow-xl border border-red-900/50">
            <h2 className="text-2xl font-bold text-red-400">No se encontraron resultados</h2>
            <button onClick={handleClearSearch} className="text-blue-400 underline mt-2">Limpiar búsqueda</button>
          </div>
        )}

        {/* LISTA DE CATEGORÍAS (GRID 3 COLUMNAS) */}
        {displayedPrompts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {displayedPrompts.map(category => {
              const categoryExpanded = collapsedState[category.title] === true || searchText; 
              
              return (
                <div key={category.title} className="bg-[#1e293b] rounded-2xl border border-slate-700/50 hover:border-blue-500/50 shadow-lg flex flex-col overflow-hidden transition-all duration-300">
                  
                  {/* Decoración superior */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-cyan-400"></div>

                  {/* Título de Tarjeta */}
                  <button
                    className="w-full text-left p-5 flex flex-col gap-3 group"
                    onClick={() => toggleCollapse(category.title)}
                  >
                    <div className="flex justify-between items-start w-full">
                        <div className="p-3 rounded-xl bg-[#0f172a] border border-slate-700 text-2xl shadow-inner group-hover:border-blue-500/30 transition-colors">
                            {category.icon || "📂"}
                        </div>
                        {getIcon(category.title)}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-blue-400 transition-colors">
                            {category.title}
                        </h2>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider flex items-center gap-1">
                            <Layers size={12} /> {category.subcategories.length} Áreas
                        </p>
                    </div>
                  </button>
                  
                  {/* Acordeón de Subcategorías */}
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${categoryExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5 pt-0 border-t border-slate-700/50 bg-[#1e293b]">
                      {category.subcategories.map(subcategory => (
                        <div key={subcategory.title} className="mt-4 first:mt-4">
                          <button
                            className="w-full text-left py-2 flex items-center justify-between group/sub"
                            onClick={() => toggleCollapse(subcategory.title)}
                          >
                            <h3 className="text-sm font-semibold text-slate-300 group-hover/sub:text-blue-400 transition-colors">
                              {subcategory.title}
                            </h3>
                            <div className="opacity-50 group-hover/sub:opacity-100">{getIcon(subcategory.title)}</div>
                          </button>
                          
                          {/* Lista de Prompts (Botones) */}
                          <div className={`pl-3 border-l-2 border-slate-700 space-y-2 mt-1 overflow-hidden transition-all duration-300 ${collapsedState[subcategory.title] || searchText ? 'max-h-[1000px] py-2' : 'max-h-0'}`}>
                              {subcategory.prompts.map(promptItem => (
                                <button
                                  key={promptItem.id || promptItem.title}
                                  onClick={() => handlePromptClick(category.title, subcategory.title, promptItem)}
                                  className="w-full text-left p-3 rounded-lg bg-[#0f172a] hover:bg-[#334155] border border-slate-800 hover:border-blue-500/30 transition-all duration-200 group/prompt"
                                >
                                  <span className="text-sm text-slate-400 group-hover/prompt:text-white block">
                                    {promptItem.title}
                                  </span>
                                </button>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer con Personaje */}
      <Footer />

      {/* Modal */}
      {selectedPrompt && (
        <PromptDetailModal 
          promptData={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
          onCopySuccess={handleCopySuccess}
        />
      )}

      {/* Toast */}
      <div className={`fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2 transition-all duration-300 ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <Check className="w-5 h-5 text-white" />
          <span className="font-bold">¡Prompt copiado!</span>
      </div>
      
    </div>
  );
};

export default App;
