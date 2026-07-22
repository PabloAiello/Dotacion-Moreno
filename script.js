// REEMPLAZA ESTA URL por la URL de tu Google Sheet publicado como CSV
// Archivo -> Compartir -> Publicar en la web -> Formato: CSV (.csv)
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
        poblarFiltroSectores(filas);
    } catch (error) {
        console.error("Error al cargar la planilla desde Google Drive:", error);
    }
}

// Convierte el CSV/TSV recibido en un array de objetos limpios
function parsearCSV(text) {
    const lineas = text.trim().split('\n');
    const resultado = [];

    // Omitir cabecera si la primera línea contiene encabezados
    const inicio = lineas[0].toLowerCase().includes("sector") ? 1 : 0;

    for (let i = inicio; i < lineas.length; i++) {
        if (!lineas[i].trim()) continue;

        // Soporta delimitador por TAB (\t) o COMAS (,)
        const col = lineas[i].includes('\t') ? lineas[i].split('\t') : lineas[i].split(',');

        const sector = (col[0] || '').trim();
        const puesto = (col[1] || '').trim();

        if (!sector || !puesto) continue;

        resultado.push({
            sector: sector,
            puesto: puesto,
            tenemos: parseInt(col[2]) || 0,
            presupuestado: parseInt(col[3]) || 0,
            bajas: parseInt(col[4]) || 0,
            medico: parseInt(col[5]) || 0,
            aptos: parseInt(col[6]) || 0,
            falta: parseInt(col[7]) || 0,
            prioridad: (col[8] || 'Baja').trim()
        });
    }

    return resultado;
}

// Renderiza todas las filas procesadas en el cuerpo de la tabla
function renderizarTabla(datos) {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    datos.forEach(row => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-sector', row.sector);

        let badgeClass = 'badge-baja';
        const prio = row.prioridad.toLowerCase();
        if (prio === 'alta') badgeClass = 'badge-alta';
        if (prio === 'media') badgeClass = 'badge-media';

        tr.innerHTML = `
            <td>${row.sector}</td>
            <td>${row.puesto}</td>
            <td>${row.tenemos}</td>
            <td>${row.presupuestado}</td>
            <td>${row.bajas}</td>
            <td>${row.medico}</td>
            <td>${row.aptos}</td>
            <td>${row.falta}</td>
            <td><span class="${badgeClass}">${row.prioridad}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Genera dinámicamente las opciones del filtro dropdown
function poblarFiltroSectores(datos) {
    const select = document.getElementById('sectorFilter');
    if (!select) return;

    // Guardar opción seleccionada actual
    const seleccionActual = select.value;

    select.innerHTML = '<option value="ALL">Todos los sectores</option>';
    const sectores = new Set(datos.map(item => item.sector));

    sectores.forEach(sec => {
        const option = document.createElement('option');
        option.value = sec;
        option.textContent = sec;
        select.appendChild(option);
    });

    if (seleccionActual) {
        select.value = seleccionActual;
    }
}

// Función ejecutada por el evento onchange del filtro
function filterTable() {
    const filterValue = document.getElementById('sectorFilter').value;
    const rows = document.querySelectorAll('#dataTable tbody tr');

    rows.forEach(row => {
        const sector = row.getAttribute('data-sector');
        if (filterValue === 'ALL' || sector === filterValue) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
