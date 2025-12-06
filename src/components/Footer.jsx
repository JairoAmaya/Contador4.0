import React from 'react';

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

      <div className="relative mt-48 border-t border-slate-800 bg-[#0f172a]">

        {/* CONTENEDOR DEL PERSONAJE */}
        <div 
          className="absolute -top-[130px] left-1/2 z-10 w-40 animate-float-character"
          style={{ transform: 'translateX(-50%)' }}
        >
            {/* Burbuja */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0f172a] px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-xl border-2 border-blue-100">
                ¡Potencia tu carrera! 🚀
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
            </div>

            {/* IMAGEN (Asegúrate de que se llame robot.png en public/) */}
            <img 
              src="/robot.png" 
              alt="Asistente Contador" 
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              style={{ display: 'block' }}
            />
        </div>

        {/* Línea Neón */}
        <div className="h-1 w-full relative z-0 bg-gradient-to-r from-[#0f172a] via-[#3b82f6] to-[#0f172a] shadow-[0_0_25px_rgba(59,130,246,0.5)]"></div>

        {/* Contenido del Footer */}
        <div className="container mx-auto max-w-4xl px-4 pt-24 pb-12 text-center">
          
          <div className="mb-5">
            <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-blue-400 bg-blue-900/20 border border-blue-500/30 rounded-full">
                v2.0.0
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
            Contador 4.0 Express
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-10">
            Es un complemento digital del E-Book <span className="text-white font-semibold">"Contador 4.0: Sistema de Transformación con IA"</span> que incluye prompts especializados para contadores.
          </p>

          <div className="bg-[#1e293b]/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 max-w-lg mx-auto mb-10 shadow-lg hover:border-blue-500/30 transition-colors group">
            <p className="text-sm text-slate-300 m-0">
              Herramienta de productividad diseñada por <br />
              <a 
                href="https://jairoamaya.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#3b82f6] font-bold hover:text-white transition-colors border-b border-dotted border-[#3b82f6] pb-0.5 inline-block mt-1"
              >
                Jairo Amaya - Full stack Marketer
              </a>
            </p>
          </div>

          <hr className="border-t border-slate-800 w-1/3 mx-auto mb-8" />

          <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-500 mb-8 uppercase tracking-wider">
             <a href="https://jairoamaya.co" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors">Sitio Web</a>
             <span className="text-slate-800">•</span>
             <a href="https://linkedin.com/in/jairoamaya" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors">LinkedIn</a>
             <span className="text-slate-800">•</span>
             <a href="mailto:hola@jairoamaya.co" className="hover:text-[#3b82f6] transition-colors">Contacto</a>
          </div>

          <p className="text-[10px] text-slate-600">
            Todos los derechos reservados &copy; {currentYear} Jairo Amaya.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Footer;
