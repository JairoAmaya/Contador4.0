import React from 'react';

/**
 * Footer con Personaje Flotante (Contador 4.0)
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full overflow-x-hidden font-sans">
      
      <style>{`
        @keyframes float {
          0% { transform: translate(-50%, 0px); }
          50% { transform: translate(-50%, -12px); }
          100% { transform: translate(-50%, 0px); }
        }
        .animate-float-character {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative mt-40 border-t border-slate-800 bg-[#0f172a]">

        {/* 🤖 PERSONAJE FLOTANTE */}
        <div 
          className="absolute -top-[130px] left-1/2 z-10 w-40 animate-float-character"
          style={{ transform: 'translateX(-50%)' }}
        >
            {/* Burbuja */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0f172a] px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-xl border border-blue-100">
                ¡Potencia tu carrera! 🚀
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
            </div>

            {/* Imagen: Asegúrate de que se llame EXACTAMENTE así en la carpeta public */}
            <img 
              src="/personaje-contador.png" 
              alt="Asistente Contador 4.0" 
              className="w-full h-auto drop-shadow-[0_10px_30px_rgba(59,130,246,0.5)]"
              onError={(e) => {
                console.error("Error cargando imagen. Verifica que 'personaje-contador.png' esté en public/");
                e.target.style.display = 'none'; // Oculta si falla para no romper el diseño
              }}
            />
        </div>

        {/* Neón */}
        <div className="h-1 w-full relative z-0 bg-gradient-to-r from-[#0f172a] via-[#3b82f6] to-[#0f172a] shadow-[0_0_25px_rgba(59,130,246,0.6)]"></div>

        {/* Contenido */}
        <div className="container mx-auto max-w-4xl px-4 pt-24 pb-10 text-center text-slate-400">
          
          <div className="flex justify-center items-center gap-2 mb-4 text-[#3b82f6]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            <span className="font-bold tracking-widest text-lg text-white uppercase">Contador 4.0 Express</span>
          </div>

          <p className="mb-8 text-base text-slate-400">
            Herramienta de productividad diseñada por <br />
            <a href="https://jairoamaya.co" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] font-bold hover:text-white transition-colors border-b border-dotted border-[#3b82f6]">
              Jairo Amaya - Full stack Marketer
            </a>
          </p>

          <div className="max-w-lg mx-auto mb-10 p-5 rounded-xl border border-slate-700 shadow-lg bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
            <p className="text-sm text-slate-300 leading-relaxed m-0">
              <span className="text-yellow-400 text-lg align-middle mr-1">★</span>
              Como <em>Bonus Track</em> de <strong>Contador 4.0</strong>.
            </p>
          </div>

          <p className="text-xs text-slate-600">
            Todos los derechos reservados &copy; {currentYear}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Footer;
