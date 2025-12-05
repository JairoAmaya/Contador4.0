import React from 'react';

/**
 * Footer Autónomo: Incluye sus propios estilos y colores para asegurar
 * que el cambio se visualice inmediatamente sin depender de CSS externo.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full overflow-x-hidden font-sans">
      
      {/* 1. ESTILOS INTERNOS (Para asegurar que la animación funcione sí o sí) */}
      <style>{`
        @keyframes float {
          0% { transform: translate(-50%, 0px); }
          50% { transform: translate(-50%, -12px); }
          100% { transform: translate(-50%, 0px); }
        }
        .animate-float-character {
          animation: float 4s ease-in-out infinite;
        }
        .footer-glow:hover {
          text-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
        }
      `}</style>

      {/* 2. ESTRUCTURA VISUAL (Con colores Hardcoded #Hex para evitar errores de variables) */}
      
      {/* Margen superior y Fondo Oscuro */}
      <div className="relative mt-40 border-t border-slate-800 bg-[#0f172a]">

        {/* 🤖 PERSONAJE FLOTANTE */}
        <div 
          className="absolute -top-[120px] left-1/2 z-10 w-40 animate-float-character"
          style={{ transform: 'translateX(-50%)' }}
        >
            {/* Burbuja de Texto */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0f172a] px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-xl">
                ¡Potencia tu carrera! 🚀
                {/* Triangulito */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
            </div>

            {/* Imagen */}
            <img 
              src="/personaje-contador.png" 
              alt="Asistente Contador 4.0" 
              className="w-full h-auto drop-shadow-[0_10px_20px_rgba(59,130,246,0.4)]"
              onError={(e) => {e.target.style.display = 'none'; console.error("Imagen no encontrada: Revisa que personaje-contador.png esté en la carpeta public");}}
            />
        </div>

        {/* ⚡ LÍNEA DE NEÓN AZUL */}
        <div 
          className="h-1 w-full relative z-0"
          style={{
            background: 'linear-gradient(90deg, #0f172a 0%, #3b82f6 50%, #0f172a 100%)',
            boxShadow: '0 0 25px rgba(59, 130, 246, 0.6)'
          }}
        ></div>

        {/* CONTENIDO */}
        <div className="container mx-auto max-w-4xl px-4 pt-20 pb-10 text-center text-slate-400">
          
          {/* TÍTULO */}
          <div className="flex justify-center items-center gap-2 mb-4 text-[#3b82f6]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            <span className="font-bold tracking-widest text-lg text-white uppercase">
              Contador 4.0 Express
            </span>
          </div>

          {/* AUTOR */}
          <p className="mb-8 text-base text-slate-400">
            Herramienta de productividad diseñada por <br />
            <a 
              href="https://jairoamaya.co" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-glow text-[#3b82f6] font-bold no-underline border-b border-dotted border-[#3b82f6] transition-all hover:border-solid hover:text-white"
            >
              Jairo Amaya - Full stack Marketer
            </a>
          </p>

          {/* CAJA BONUS TRACK */}
          <div 
            className="max-w-lg mx-auto mb-10 p-5 rounded-xl border border-slate-700 shadow-xl"
            style={{ background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.4) 100%)' }}
          >
            <p className="text-sm text-slate-300 leading-relaxed m-0">
              <span className="text-yellow-400 text-lg align-middle mr-1">★</span>
              Como <em>Bonus Track</em> del E-Book <strong>"Contador 4.0: Sistema de Transformación con IA"</strong>.
            </p>
          </div>

          {/* DIVISOR */}
          <hr className="border-t border-slate-800 w-32 mx-auto mb-6" />

          {/* ENLACES Y COPYRIGHT */}
          <div className="flex justify-center gap-4 text-xs mb-4 text-slate-500">
             <a href="https://jairoamaya.co" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition">Sitio Web</a>
             <span>•</span>
             <a href="https://linkedin.com/in/jairoamaya" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition">LinkedIn</a>
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
