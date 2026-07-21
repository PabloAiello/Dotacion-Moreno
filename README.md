# Dotación Pendiente – Sede Moreno

Tablero de control operativo y seguimiento dinámico de vacantes, asignaciones e indicadores clave de dotación para la **Sede Moreno**.

## 🚀 Características

- **Sincronización en Tiempo Real:** Consume datos directamente desde planillas de Google Sheets publicadas en formato CSV.
- **Visualización de KPIs:** Indicadores en tiempo real para:
  - Presupuestado (D)
  - Cubiertos (C)
  - Licencias Médicas (H)
  - Personal Apto (I)
  - Vacantes Faltantes (J)
  - Porcentaje de Cobertura (%)
- **Filtros Dinámicos:**
  - Buscador por texto (Búsqueda por puesto o sector).
  - Desplegable de sectores dinámico generado desde la base de datos.
- **Diseño Moderno:** Interfaz responsiva con modo oscuro y tarjetas estilizadas.

## 🛠️ Tecnologías Utilizadas

- **HTML5**
- **CSS3** (Variables CSS, Flexbox y Grid Layout)
- **JavaScript ES6+** (Fetch API para sincronización de datos)

## 📁 Estructura del Proyecto

```text
Dotacion-Moreno/
├── index.html     # Estructura principal de la aplicación
├── styles.css     # Hojas de estilo y diseño visual
├── script.js     # Lógica de fetching, procesamiento y filtrado
└── README.md      # Documentación del proyecto
