# 🚀 Contador 4.0 Express v2

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)

Sistema de transformación con IA para contadores - **Versión mejorada con búsqueda inteligente y modal de detalles**.

## 🆕 Novedades v2

- ✅ **Búsqueda en tiempo real** - Encuentra prompts instantáneamente
- ✅ **Modal de detalles** - Vista dedicada para cada prompt
- ✅ **Botones integrados** - Usa directamente en Claude/ChatGPT
- ✅ **Sistema de colapsado** - Navegación más intuitiva
- ✅ **Resaltado de variables** - Identifica fácilmente qué personalizar
- ✅ **Diseño mejorado** - UI/UX más moderna con Tailwind CSS

## 📊 Comparación con v1

| Característica | v1 | v2 |
|---------------|----|----|
| Búsqueda | ❌ | ✅ |
| Modal detalles | ❌ | ✅ |
| Colapsado | ❌ | ✅ |
| Navegación | 3 niveles | Todo en uno |
| CSS | Custom | Tailwind |
| Total Prompts | 105 | 105 |

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/contador4-express-v2.git

# Instalar dependencias
cd contador4-express-v2
npm install

# Iniciar desarrollo
npm start
```

## 📦 Deploy a Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

O conecta el repo directamente desde el dashboard de Vercel.

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── Header.jsx       # Header con título y descripción
│   ├── SearchBar.jsx    # Barra de búsqueda con filtrado
│   ├── CategoryCard.jsx # Card de categoría principal
│   ├── PromptCard.jsx   # Card individual de prompt
│   ├── PromptDetailModal.jsx # Modal con detalles completos
│   └── Footer.jsx       # Footer con créditos
├── data/                # Datos de la aplicación
│   └── promptsData.js   # 105 prompts organizados
├── utils/               # Funciones auxiliares
│   ├── filterPrompts.js # Lógica de filtrado
│   └── highlightPlaceholders.js # Resaltado de variables
├── hooks/               # Custom hooks
│   └── useSearch.js     # Hook de búsqueda
├── App.jsx              # Componente principal
└── index.css            # Estilos globales + Tailwind
```

## 🎯 Uso

1. **Explora categorías** - 7 áreas principales de contabilidad
2. **Busca prompts** - Usa la barra de búsqueda para encontrar rápido
3. **Abre detalles** - Click en cualquier prompt para ver el modal
4. **Copia y usa** - Botón de copiar o enviar directo a Claude/ChatGPT

## 🔗 Links

- **v1 (Producción):** [contador4-webapp.vercel.app](https://contador4-webapp.vercel.app/)
- **v2 (Beta):** [contador4-v2.vercel.app](#) *(próximamente)*
- **Autor:** [Jairo Amaya - Full Stack Marketer](https://jairoamaya.co)

## 📝 Changelog

### v2.0.0 (2025-01-XX)
- ✨ Nueva búsqueda en tiempo real
- ✨ Modal de vista detallada
- ✨ Sistema de colapsado jerárquico
- ✨ Botones integrados Claude/ChatGPT
- ✨ Resaltado automático de variables
- 🎨 Rediseño completo de UI con Tailwind
- ⚡ Optimización de performance

### v1.0.0 (2025-01-XX)
- 🎉 Lanzamiento inicial
- 📊 105 prompts organizados
- 🗂️ Navegación por niveles
- 📋 Sistema de copiado

## 🤝 Contribución

Este es un proyecto propietario. Para consultas o sugerencias, contacta a [Jairo Amaya](https://jairoamaya.co).

## 📄 Licencia

Todos los derechos reservados © 2025 Jairo Amaya - Full Stack Marketer

## 🐛 Reporte de Bugs

Si encuentras algún problema, por favor:
1. Verifica que no esté ya reportado en Issues
2. Crea un nuevo Issue con descripción detallada
3. Incluye screenshots si es posible

---

**Hecho con ❤️ para contadores que quieren transformarse con IA**
