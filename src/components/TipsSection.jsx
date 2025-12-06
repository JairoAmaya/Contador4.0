import React from 'react';
import { Target, RefreshCw, GitMerge, BookOpen, Lightbulb } from 'lucide-react';

const TipsSection = () => {
  const tips = [
    {
      icon: <Target size={24} />,
      title: "Sé Específico",
      desc: "Personaliza las variables [EN CORCHETES] con información detallada de tu contexto.",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Itera",
      desc: "Si la respuesta no es perfecta, pide a la IA que refine o ajuste el resultado.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      icon: <GitMerge size={24} />,
      title: "Combina",
      desc: "Usa múltiples prompts en secuencia para análisis más profundos y completos.",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Aprende",
      desc: "Observa cómo estructura cada prompt para aprender a crear los tuyos propios.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto mb-12 px-4 sm:px-0">
      
      {/* Título de la Sección */}
      <div className="flex justify-center items-center gap-3 mb-8">
        <Lightbulb className="text-yellow-400 w-6 h-6 animate-pulse" />
        <h2 className="text-xl sm:text-2xl font-bold text-center text-slate-100">
          Consejos para Maximizar tu Uso de IA
        </h2>
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className="bg-[#1e293b] rounded-xl border border-slate-700/50 p-6 shadow-lg hover:border-slate-600 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icono con fondo de color */}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${tip.bg} ${tip.color} ${tip.border} border`}>
              {tip.icon}
            </div>

            {/* Texto */}
            <h3 className={`text-lg font-bold mb-2 ${tip.color}`}>
              {tip.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {tip.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default TipsSection;
