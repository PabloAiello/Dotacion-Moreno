// ==========================================
// 1. MAPA DE FOTOS DE GOOGLE DRIVE (Legajo -> ID de Drive)
// ==========================================
const FOTOS_DRIVE = {
  "4990": "1TY9SSp1t0KtHIpc1nhgMEYzctLa8huJQ",
  "4996": "1kzyFGevL6nmCpQOJYOCCSGv6trAh_SWV",
  "4998": "1eMhQ5U3Rudq-nJIxdE4MVtwliQ8mSDGt",
  "4999": "1qwC8kBqw1pI884gcHsBwAV9puBk1y95W",
  "5001": "1Vk4zkrDGKrjASqSgWGOxGdWVLoHifStV"
  // Agrega aquí los demás legajos con su respectivo ID de imagen
};

function obtenerUrlFoto(legajo) {
  if (!legajo) return '';
  const legajoLimpio = String(legajo).trim();
  const driveId = FOTOS_DRIVE[legajoLimpio];
  if (driveId) {
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }
  return '';
}

// ==========================================
// 2. CARGA Y PARSEO DE CSV
// ==========================================
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-TU_LINK_AQUI/pub?output=csv";

document.addEventListener('DOMContentLoaded', () => {
    cargarDatosDesdeDrive();
});

async function cargarDatosDesdeDrive() {
    try {
        const response = await fetch(CSV_URL);
        const textData = await response.text();
        const filas = parsearCSV(textData);
        
        renderizarTabla(filas);
    } catch (error) {
        console.error("Error al cargar la planilla desde Google Drive:", error);
    }
}

function parsearCSV(text) {
    const lineas = text.trim().split('\n');
    const resultado = [];

    // Omitir cabeceras
    const inicio = lineas[0].toLowerCase().includes("legajo") ? 1 : 0;

    for (let i = inicio; i < lineas.length; i++) {
        if (!lineas[i].trim()) continue;

        // Separar por tabulación o comas
        const col = lineas[i].includes('\t') ? lineas[i].split('\t') : lineas[i].split(',');

        const legajo = (col[0] || '').trim();
        const nombre = (col[1] || '').trim();
        const fechaIngreso = (col[2] || '').trim(); // Verifica que la fecha esté en la columna 3 (índice 2)
        const sector = (col[3] || '').trim();
        const tarea = (col[4] || '').trim();
        const convenio = (col[5] || '').trim();
        const horario = (col[6] || '').trim();
        const grado = (col[7] || '').trim();

        if (!legajo && !nombre) continue;

        resultado.push({
            legajo: legajo,
            nombre: nombre,
            fechaIngreso: fechaIngreso,
            sector: sector,
            tarea: tarea,
            convenio: convenio,
            horario: horario,
            grado: grado
        });
    }

    return resultado;
}

// ==========================================
// 3. RENDERIZADO DE TABLA (FECHA + FOTO)
// ==========================================
function renderizarTabla(datos) {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    datos.forEach(row => {
        const tr = document.createElement('tr');

        const urlFoto = obtenerUrlFoto(row.legajo);
        
        // Etiqueta HTML para la imagen (con tamaño fijo y bordes redondeados)
        const htmlFoto = urlFoto 
            ? `<img src="${urlFoto}" alt="Foto ${row.legajo}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; margin-right: 8px;" loading="lazy">`
            : `<div style="width: 36px; height: 36px; border-radius: 50%; background-color: #ccc; margin-right: 8px;"></div>`;

        tr.innerHTML = `
            <td>
                <div style="display: flex; align-items: center;">
                    ${htmlFoto}
                    <span>${row.legajo}</span>
                </div>
            </td>
            <td><strong>${row.nombre}</strong></td>
            <td>${row.fechaIngreso || '-'}</td>
            <td>${row.sector}</td>
            <td>${row.tarea}</td>
            <td>${row.convenio}</td>
            <td>${row.horario}</td>
            <td>${row.grado}</td>
        `;
        tbody.appendChild(tr);
    });
}
