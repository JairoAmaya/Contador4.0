import React from 'react';

/**
 * Footer Híbrido: Estética Dark 3D + Contenido Completo Original
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full overflow-x-hidden font-sans">
      
      {/* Estilos de animación internos */}
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

      {/* --- 1. CABECERA DEL FOOTER (ROBOT + NEÓN) --- */}
      <div className="relative mt-48 border-t border-slate-800 bg-[#0f172a]">

        {/* Personaje Flotante */}
        <div 
          className="absolute -top-[130px] left-1/2 z-10 w-40 animate-float-character"
          style={{ transform: 'translateX(-50%)' }}
        >
            {/* Burbuja de Diálogo */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0f172a] px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-xl border-2 border-blue-100">
                ¡Potencia tu carrera! 🚀
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
            </div>

            {/* IMAGEN DEL PERSONAJE */}
            {/* Busca el archivo en la carpeta 'public' de ESTE proyecto */}
            <img 
              src="/personaje-contador.png" 
              alt="Asistente Contador 4.0" 
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            />
        </div>

        {/* Línea de Luz Neón */}
        <div className="h-1 w-full relative z-0 bg-gradient-to-r from-[#0f172a] via-[#3b82f6] to-[#0f172a] shadow-[0_0_25px_rgba(59,130,246,0.5)]"></div>


        {/* --- 2. CONTENIDO COMPLETO (Texto, Enlaces, Copyright) --- */}
        <div className="container mx-auto max-w-4xl px-4 pt-24 pb-12 text-center">
          
          {/* Badge de Versión */}
          <div className="mb-5">
            <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-blue-400 bg-blue-900/20 border border-blue-500/30 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                v2.0.0
            </span>
          </div>

          {/* Título */}
          <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
            Contador 4.0 Express
          </h3>
          
          {/* Descripción del E-book */}
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-10">
            Es un complemento digital del E-Book <span className="text-white font-semibold">"Contador 4.0: Sistema de Transformación con IA"</span> que incluye prompts especializados para contadores.
          </p>

          {/* Caja de Autor (Estilo Tarjeta Glass) */}
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

          {/* Divisor Sutil */}
          <hr className="border-t border-slate-800 w-1/3 mx-auto mb-8" />

          {/* Enlaces de Navegación */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-500 mb-8 uppercase tracking-wider">
             <a href="https://jairoamaya.co" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2">
                Sitio Web
             </a>
             <span className="text-slate-800">•</span>
             <a href="https://linkedin.com/in/jairoamaya" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2">
                LinkedIn
             </a>
             <span className="text-slate-800">•</span>
             <a href="mailto:hola@jairoamaya.co" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2">
                Contacto
             </a>
          </div>

          {/* Copyright */}
          <p className="text-[10px] text-slate-600">
            Todos los derechos reservados &copy; {currentYear} Jairo Amaya.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Footer;
