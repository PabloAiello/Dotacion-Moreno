document.addEventListener("DOMContentLoaded", () => {
    // URL del Google Sheets publicado como CSV
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT.../pub?output=csv'; // REEMPLAZA CON TU URL CSV

    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const filas = parseCSV(data);
            procesarYRenderizar(filas);
        })
        .catch(error => console.error("Error cargando los datos:", error));
});

// Parsea el CSV considerando comillas y comas internas
function parseCSV(text) {
    const lines = text.split('\n');
    return lines.map(line => {
        const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\r\n]*)/gi;
        const matches = [];
        let match;
        while ((match = regex.exec(line)) !== null) {
            let val = match[1];
            if (val.startsWith('"') && val.endsWith('"')) {
                val = val.substring(1, val.length - 1).replace(/""/g, '"');
            }
            matches.push(val.trim());
        }
        return matches;
    });
}

function procesarYRenderizar(filas) {
    const contenedor = document.getElementById('cards-container');
    const selectSector = document.getElementById('select-sector');
    const buscador = document.getElementById('buscador');

    if (!contenedor) return;
    contenedor.innerHTML = '';

    // Omitir cabecera si existe
    const datos = filas.slice(1);
    const sectoresSet = new Set();
    const listaProcesada = [];

    datos.forEach(fila => {
        // Mapeo flexible de columnas (previene errores si faltan columnas)
        const sector = fila[0] || 'SIN SECTOR';
        const puesto = fila[1] || 'SIN PUESTO';
        
        // Conversión limpia a número (convierte vacíos o texto no numérico a 0)
        const cubiertos = parseInt(fila[2]) || 0;
        const presupuestado = parseInt(fila[3]) || 0;
        const licencias = parseInt(fila[7]) || 0;
        const apto = parseInt(fila[8]) || 0;
        const vacantes = parseInt(fila[9]) || 0;

        if (sector && sector !== 'SIN SECTOR') {
            sectoresSet.add(sector);
        }

        listaProcesada.push({
            sector,
            puesto,
            cubiertos,
            presupuestado,
            licencias,
            apto,
            vacantes,
            porcentaje: presupuestado > 0 ? Math.round((cubiertos / presupuestado) * 100) : 0
        });
    });

    // Cargar select de sectores si existe en el DOM
    if (selectSector) {
        selectSector.innerHTML = '<option value="">Todos los Sectores</option>';
        sectoresSet.forEach(sec => {
            const opt = document.createElement('option');
            opt.value = sec;
            opt.textContent = sec;
            selectSector.appendChild(opt);
        });
    }

    // Función para renderizar tarjetas en pantalla
    function render(items) {
        contenedor.innerHTML = '';

        if (items.length === 0) {
            contenedor.innerHTML = '<p class="no-results">No se encontraron puestos o sectores.</p>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <div class="card-header">
                    <span class="badge-sector">${item.sector}</span>
                    <h3>${item.puesto}</h3>
                </div>
                <div class="card-body">
                    <div class="kpi-grid">
                        <div class="kpi-item">
                            <span class="kpi-label">Presupuestado</span>
                            <span class="kpi-value">${item.presupuestado}</span>
                        </div>
                        <div class="kpi-item">
                            <span class="kpi-label">Cubiertos</span>
                            <span class="kpi-value">${item.cubiertos}</span>
                        </div>
                        <div class="kpi-item">
                            <span class="kpi-label">Licencias</span>
                            <span class="kpi-value">${item.licencias}</span>
                        </div>
                        <div class="kpi-item">
                            <span class="kpi-label">Personal Apto</span>
                            <span class="kpi-value">${item.apto}</span>
                        </div>
                        <div class="kpi-item highlight">
                            <span class="kpi-label">Vacantes Faltantes</span>
                            <span class="kpi-value">${item.vacantes}</span>
                        </div>
                        <div class="kpi-item">
                            <span class="kpi-label">% Cobertura</span>
                            <span class="kpi-value">${item.porcentaje}%</span>
                        </div>
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }

    // Render inicial con TODOS los elementos
    render(listaProcesada);

    // Eventos para filtrado dinámico (sin descartar ceros)
    function aplicarFiltros() {
        const texto = buscador ? buscador.value.toLowerCase().trim() : '';
        const sectorSel = selectSector ? selectSector.value : '';

        const filtrados = listaProcesada.filter(item => {
            const coincideSector = !sectorSel || item.sector === sectorSel;
            const coincideTexto = !texto || 
                item.puesto.toLowerCase().includes(texto) || 
                item.sector.toLowerCase().includes(texto);

            return coincideSector && coincideTexto;
        });

        render(filtrados);
    }

    if (buscador) buscador.addEventListener('input', aplicarFiltros);
    if (selectSector) selectSector.addEventListener('change', aplicarFiltros);
}
