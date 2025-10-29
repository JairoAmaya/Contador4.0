import React from 'react';

/**
 * Componente de Footer de la aplicación.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    // Estilos modernos: bg-white y borde superior, alineado al ancho máximo (max-w-4xl) de la app
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="container mx-auto max-w-4xl px-4 py-8 text-center text-sm text-gray-500">
        
        {/* TÍTULO/VERSIÓN (Badge) */}
        <div className="pt-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full">
                v2.0.0
            </span>
        </div>

        {/* TEXTO CENTRAL */}
        <p className="font-display font-semibold text-gray-700 text-base mt-2">
          Contador 4.0 Express v2
        </p>
        <p className="mt-1 text-gray-600 leading-relaxed">
          Es un complemento digital del E-Book <span className="font-bold text-gray-800">"Contador 4.0: Sistema de Transformación con IA"</span>
          <br className="sm:hidden" /> que incluye prompts especializados para contadores.
        </p>

        {/* ENLACES ADICIONALES (Reorganizados) */}
        <div className="flex justify-center gap-4 text-xs mt-4">
          <a 
            href="https://jairoamaya.co" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-600 hover:text-indigo-800 transition duration-150"
          >
            Sitio Web
          </a>
          <span>•</span>
          <a 
            href="https://linkedin.com/in/jairoamaya" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-indigo-600 transition duration-150"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a 
            href="mailto:hola@jairoamaya.co"
            className="hover:text-indigo-600 transition duration-150"
          >
            Contacto
          </a>
        </div>
        
        {/* COPYRIGHT */}
        <p className="mt-4 text-xs text-gray-500">
          Desarrollado por <span className="font-semibold text-gray-700">Jairo Amaya - Full Stack Marketer</span>.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Todos los derechos reservados &copy; {currentYear}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
