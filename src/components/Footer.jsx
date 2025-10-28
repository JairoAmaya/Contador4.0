import React from 'react';

/**
 * Componente Footer
 * Muestra créditos, copyright y enlaces importantes
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-4xl mx-auto mt-12 pt-6 border-t border-gray-300">
      <div className="text-center space-y-4">
        {/* Texto principal */}
        <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
          <strong>Contador 4.0 Express</strong> es un complemento del E.Book{' '}
          <em>Contador 4.0 Sistema de Transformación con IA para contadores</em>{' '}
          que incluye 105 prompts especializados y fue desarrollado por{' '}
          <a 
            href="https://jairoamaya.co" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-600 hover:text-indigo-800 font-semibold underline transition duration-150"
          >
            Jairo Amaya - Full Stack Marketer
          </a>.
        </p>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          Todos los derechos reservados © {currentYear}
        </p>

        {/* Links adicionales (opcional) */}
        <div className="flex justify-center gap-6 text-xs text-gray-500">
          <a 
            href="https://jairoamaya.co" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition duration-150"
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
            href="mailto:contacto@jairoamaya.co"
            className="hover:text-indigo-600 transition duration-150"
          >
            Contacto
          </a>
        </div>

        {/* Badge de versión */}
        <div className="pt-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full">
            v2.0.0
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
