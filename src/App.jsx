import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, ChevronRight, Check, Layers, Star, LayoutGrid } from 'lucide-react';

// Importar componentes
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TipsSection from './components/TipsSection';
import PromptDetailModal from './components/PromptDetailModal';
import Footer from './components/Footer';

// Importar datos y hooks
import promptsData from './data/promptsData';
import useSearch from './hooks/useSearch';
import { countPrompts } from './utils/filterPrompts';

/**
 * Componente Principal - CONTADOR 4.0 EXPRESS (v3.0)
 * Incluye: Grid Dark Mode + Buscador + SISTEMA DE FAVORITOS
 */
const App = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  
  // ESTADO NUEVO: Vista actual ('all' o 'favorites')
  const [viewMode, setViewMode] = useState('all'); 
  
  // ESTADO NUEVO: Lista de IDs favoritos (con carga inicial desde localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('contador_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const {
    searchText,
    setSearchText,
    displayedPrompts,
    collapsedState,
    toggleCollapse,
    handleClearSearch,
    filteredCount
  } = useSearch(promptsData);

  // Guardar en LocalStorage cada vez que cambian los favoritos
  useEffect(() => {
    localStorage.setItem('contador_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const totalPrompts = countPrompts(promptsData);
  const categoryCount = promptsData.length;

  // Lógica para alternar favorito
  const toggleFavorite = (e, promptId) => {
    e.stopPropagation(); // Evita que se abra el modal al dar click en la estrella
    setFavorites(prev => 
      prev.includes(promptId) 
        ? prev.filter(id => id !== promptId) // Quitar
        : [...prev, promptId] // Agregar
    );
  };

  // Lógica de Filtrado para la vista "Mis Favoritos"
  const contentToDisplay = useMemo(() => {
    if (viewMode === 'all') return displayedPrompts;

    // Si estamos en modo favoritos, filtramos la estructura
    return displayedPrompts.map(category => {
      const filteredSubcategories = category.subcategories.map(sub => ({
        ...sub,
        prompts: sub.prompts.filter(p => favorites.includes(p.id))
      })).filter(sub => sub.prompts.length > 0);

      if (filteredSubcategories.length > 0) {
        return { ...category, subcategories: filteredSubcategories };
      }
      return null;
    }).filter(Boolean); // Elimina categorías vacías
  }, [displayedPrompts, viewMode, favorites]);


  const handlePromptClick = (categoryTitle, subcategoryTitle, promptItem) => {
    setSelectedPrompt({ 
      ...promptItem, 
      categoryTitle, 
      subcategoryTitle 
    });
  };

  const handleCopySuccess = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const getIcon = (key) => {
    const isExpanded = collapsedState[key];
    // Si estamos buscando o en modo favoritos, expandimos visualmente o mostramos fijo
    if (searchText || viewMode === 'favorites') return <ChevronDown className="w-4 h-4 text-slate-500" />;
    
    return isExpanded 
      ? <ChevronDown className="w-4 h-4 text-blue-400 transform transition-transform duration-300" /> 
      : <ChevronRight className="w-4 h-4 text-slate-500 transform transition-transform duration-300" />;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 sm:p-8 font-sans">
      
      <Header 
        totalPrompts={totalPrompts} 
        filteredCount={searchText ? filteredCount : null}
        categoryCount={categoryCount}
      />

      {/* --- SWITCHER DE VISTAS (NUEVO) --- */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#1e293b] p-1 rounded-xl border border-slate-700 flex shadow-lg">
          <button
            onClick={() => setViewMode('all')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              viewMode === 'all' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutGrid size={16} /> Explorar Todo
          </button>
          <button
            onClick={() => setViewMode('favorites')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              viewMode === 'favorites' 
                ? 'bg-yellow-500 text-[#0f172a] shadow-md' 
                : 'text-slate-400 hover:text-yellow-400 hover:bg-slate-800'
            }`}
          >
            <Star size={16} fill={viewMode === 'favorites' ? "currentColor" : "none"} /> 
            Favoritos ({favorites.length})
          </button>
        </div>
      </div>

      <SearchBar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onClear={handleClearSearch}
      />

      {/* Tips Section (Solo visible en 'all' y sin búsqueda) */}
      {!searchText && viewMode === 'all' && (
        <div className="mt-12">
           <TipsSection />
        </div>
      )}

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="max-w-7xl mx-auto mt-10 min-h-[400px]">
        
        {/* Mensaje: Sin resultados */}
        {contentToDisplay.length === 0 && (
          <div className="text-center p-16 bg-[#1e293b] rounded-2xl shadow-xl border border-slate-700 max-w-2xl mx-auto flex flex-col items-center">
            {viewMode === 'favorites' ? (
              <>
                <Star size={48} className="text-slate-600 mb-4" />
                <h2 className="text-2xl font-bold text-slate-300">Aún no tienes favoritos</h2>
                <p className="text-slate-400 mt-2 max-w-md">
                  Marca los prompts que más uses con la estrella para acceder a ellos rápidamente aquí.
                </p>
                <button onClick={() => setViewMode('all')} className="mt-6 text-blue-400 hover:text-blue-300 font-bold underline">
                  Ir a explorar prompts
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-red-400">No se encontraron resultados</h2>
                <button onClick={handleClearSearch} className="text-blue-400 hover:text-blue-300 font-medium underline mt-2">
                    Limpiar búsqueda
                </button>
              </>
            )}
          </div>
        )}

        {/* GRID DE TARJETAS */}
        {contentToDisplay.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {contentToDisplay.map(category => {
              // En modo favoritos, siempre expandido. En modo normal, depende del acordeón.
              const categoryExpanded = viewMode === 'favorites' || collapsedState[category.title] === true || searchText; 
              
              return (
                <div 
                  key={category.title} 
                  className="bg-[#1e293b] rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col overflow-hidden"
                >
                  
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-cyan-400"></div>

                  {/* Header de la Tarjeta */}
                  <button
                    className="w-full text-left p-5 flex flex-col gap-3 transition duration-150 group"
                    onClick={() => toggleCollapse(category.title)}
                  >
                    <div className="flex justify-between items-start w-full">
                        <div className="p-3 rounded-xl bg-[#0f172a] text-slate-200 border border-slate-700 shadow-inner group-hover:border-blue-500/30 transition-colors">
                            <span className="text-2xl">{category.icon || "📂"}</span> 
                        </div>
                        {getIcon(category.title)}
                    </div>
                    
                    <div>
                        <h2 className="text-lg font-bold text-slate-100 leading-tight mb-1 group-hover:text-blue-400 transition-colors">
                            {category.title}
                        </h2>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider flex items-center gap-1">
                            <Layers size={12} /> {category.subcategories.length} Áreas
                        </p>
                    </div>
                  </button>
                  
                  {/* Contenido Expandible */}
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        categoryExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-5 pt-0 border-t border-slate-700/50 bg-[#1e293b]">
                      
                      {category.subcategories.map(subcategory => {
                        const subcategoryExpanded = viewMode === 'favorites' || collapsedState[subcategory.title] === true || searchText;

                        return (
                          <div key={subcategory.title} className="mt-4 first:mt-4">
                            
                            {/* Título Subcategoría */}
                            <button
                              className="w-full text-left py-2 flex items-center justify-between group/sub"
                              onClick={() => toggleCollapse(subcategory.title)}
                            >
                              <h3 className="text-sm font-semibold text-slate-300 group-hover/sub:text-blue-400 transition-colors">
                                {subcategory.title}
                              </h3>
                              <div className="opacity-50 group-hover/sub:opacity-100">
                                  {getIcon(subcategory.title)}
                              </div>
                            </button>
                            
                            {/* Lista de Prompts */}
                            <div 
                                className={`pl-3 border-l-2 border-slate-700 space-y-2 mt-1 overflow-hidden transition-all duration-300 ${
                                    subcategoryExpanded ? 'max-h-[2000px] py-2' : 'max-h-0'
                                }`}
                            >
                                {subcategory.prompts.map(promptItem => {
                                  const isFav = favorites.includes(promptItem.id);

                                  return (
                                    <button
                                      key={promptItem.id || promptItem.title}
                                      onClick={() => handlePromptClick(category.title, subcategory.title, promptItem)}
                                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 group/prompt relative ${
                                        isFav 
                                          ? 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50' 
                                          : 'bg-[#0f172a] border-slate-800 hover:bg-[#334155] hover:border-blue-500/30'
                                      }`}
                                    >
                                      <div className="flex justify-between items-start gap-3">
                                        <span className={`text-sm block pr-2 ${isFav ? 'text-yellow-100' : 'text-slate-400 group-hover/prompt:text-white'}`}>
                                          {promptItem.title}
                                        </span>
                                        
                                        {/* Botón Estrella (Favorito) */}
                                        <div 
                                          onClick={(e) => toggleFavorite(e, promptItem.id)}
                                          className={`p-1.5 rounded-md transition-all z-10 shrink-0 ${
                                            isFav 
                                              ? 'text-yellow-400 hover:bg-yellow-500/20' 
                                              : 'text-slate-600 hover:text-yellow-400 hover:bg-slate-700'
                                          }`}
                                        >
                                          <Star size={16} fill={isFav ? "currentColor" : "none"} />
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
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

      {/* Modal */}
      {selectedPrompt && (
        <PromptDetailModal 
          promptData={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
          onCopySuccess={handleCopySuccess}
        />
      )}

      {/* Toast */}
      <div className={`fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-2xl shadow-blue-500/20 transition-all duration-300 z-50 flex items-center gap-2 border border-blue-400 ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <Check className="w-5 h-5 text-white" />
          <span className="font-bold">¡Acción completada!</span>
      </div>
      
    </div>
  );
};

export default App;
