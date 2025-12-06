import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // TRUCO: Usamos la imagen de tu servidor Master que sabemos que funciona.
  // Si falla la local, usará esta.
  const characterUrl = "https://contador4-0-master.vercel.app/personaje-contador.png";

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

        {/* Robot Flotante */}
        <div 
          className="absolute -top-[130px] left-1/2 z-10 w-40 animate-float-character"
          style={{ transform: 'translateX(-50%)' }}
        >
            {/* Burbuja */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0f172a] px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-xl border-2 border-blue-100">
                ¡Potencia tu carrera! 🚀
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
            </div>

            {/* IMAGEN: Usa la URL absoluta de tu otra app */}
            <img 
              src={characterUrl}
              alt="Asistente Contador 4.0" 
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            />
        </div>

        {/* Línea Neón */}
        <div className="h-1 w-full relative z-0 bg-gradient-to-r from-[#0f172a] via-[#3b82f6] to-[#0f172a] shadow-[0_0_25px_rgba(59,130,246,0.5)]"></div>

        {/* Contenido */}
        <div className="container mx-auto max-w-4xl px-4 pt-24 pb-12 text-center">
          
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-blue-400 bg-blue-900/30 border border-blue-500/30 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                v2.0
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
            Contador 4.0 Express
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">
            Es un complemento digital del e.book <span className="text-white font-semibold">"Contador 4.0: Sistema de Transformación con IA"</span> que incluye 115 prompts especializados para contadores.
          </p>

          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 max-w-lg mx-auto mb-8 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <p className="text-sm text-slate-300 m-0">
              Herramienta de productividad diseñada por <br />
              <a 
                href="https://jairoamaya.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#3b82f6] font-bold hover:text-white transition-colors border-b border-dotted border-[#3b82f6] pb-0.5"
              >
                Jairo Amaya - Full stack Marketer
              </a>
            </p>
          </div>

          <hr className="border-t border-slate-800 w-1/3 mx-auto mb-6" />

          <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-500 mb-6 uppercase tracking-wider">
             <a href="https://jairoamaya.co" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors flex items-center gap-1">
                Sitio Web
             </a>
             <span className="text-slate-700">•</span>
             <a href="https://linkedin.com/in/jairoamaya" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors flex items-center gap-1">
                LinkedIn
             </a>
             <span className="text-slate-700">•</span>
             <a href="mailto:hola@jairoamaya.co" className="hover:text-[#3b82f6] transition-colors flex items-center gap-1">
                Contacto
             </a>
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
