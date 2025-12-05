import React from 'react';

/**
 * Componente Footer Optimizado.
 * Nota: Las animaciones y colores dependen de las variables en index.css
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full overflow-x-hidden font-sans">
      
      {/* MARGEN SUPERIOR (Fondo viene de variable CSS) */}
      <div className="relative mt-40 border-t border-gray-700" style={{ backgroundColor: 'var(--secondary-color)' }}>

        {/* 🤖 PERSONAJE FLOTANTE (Clase definida en tu CSS) */}
        <div className="footer-robot-container">
            {/* BURBUJA DE CHAT (Clase definida en tu CSS) */}
            <div className="speech-bubble">
                ¡Potencia tu carrera! 🚀
            </div>

            {/* IMAGEN DEL PERSONAJE */}
            <img 
              src="/personaje-contador.png" 
              alt="Asistente Contador 4.0" 
              className="footer-robot-img"
            />
        </div>

        {/* ⚡ LÍNEA DE NEÓN (Clase definida en tu CSS) */}
        <div className="neon-separator"></div>

        {/* CONTENIDO DEL FOOTER */}
        <div className="container mx-auto max-w-4xl px-4 pt-20 pb-10 text-center">
          
          {/* TÍTULO PRINCIPAL */}
          <div className="flex justify-center items-center gap-2 mb-4 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span className="font-bold tracking-widest text-lg text-white uppercase">
              Contador 4.0 Express
            </span>
          </div>

          {/* AUTOR */}
          <p className="mb-8 text-base text-gray-400">
            Herramienta de productividad diseñada por <br />
            <a 
              href="https://jairoamaya.co" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-author-link"
            >
              Jairo Amaya - Full stack Marketer
            </a>
          </p>

          {/* CAJA BONUS TRACK (Clase definida en tu CSS) */}
          <div className="bonus-track-box">
            <p className="text-sm text-gray-300 leading-relaxed m-0">
              <span className="text-yellow-400 text-lg align-middle mr-1">★</span>
              Como <em>Bonus Track</em> del E-Book <strong>"Contador 4.0: Sistema de Transformación con IA"</strong>.
            </p>
          </div>

          {/* DIVISOR */}
          <hr className="border-t border-gray-700 w-32 mx-auto mb-6" />

          {/* ENLACES SECUNDARIOS & COPYRIGHT */}
          <div className="flex justify-center gap-4 text-xs mb-4 text-gray-500">
             <a href="https://jairoamaya.co" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Sitio Web</a>
             <span>•</span>
             <a href="https://linkedin.com/in/jairoamaya" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">LinkedIn</a>
          </div>

          <p className="text-xs text-gray-600">
            Todos los derechos reservados &copy; {currentYear}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Footer;
