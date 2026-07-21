const baseCsvUrl = "https://docs.google.com/spreadsheets/d/1-ZjmiJVt_u5fN9We8W-JeBzIFmSyFfSH/export?format=csv&gid=1030521285";

let puestosPendientes = [];
let globales = { objetivo: 0, cubiertos: 0, medicos: 0, aptos: 0, vacantes: 0 };

async function fetchExcelData() {
    try {
        const response = await fetch(`${baseCsvUrl}&t=${new Date().getTime()}`);
        if (!response.ok) throw new Error("Error de red al intentar descargar los datos");
        
        const textData = await response.text();
        const lines = textData.split(/\r?\n/).filter(line => line.trim() !== "");
        if (lines.length === 0) return;

        // Detección automática de separadores de Excel (, o ;)
        const firstLine = lines[0];
        const separator = firstLine.split(';').length > firstLine.split(',').length ? ';' : ',';

        const rows = lines.map(line => {
            return line.split(new RegExp(`\\${separator}(?=(?:(?:[^"]*"){2})*[^"]*$)`));
        });

        // Limpieza de nombres de cabecera reales
        const headers = rows[0].map(h => h.replace(/["]/g, '').trim().toLowerCase());
        
        // Mapeo por índices exactos
        const idxSector = headers.indexOf("sector");
        const idxPuesto = headers.indexOf("puesto");
        const idxTenemos = headers.indexOf("tenemos");
        const idxPresupuestado = headers.indexOf("presupuestado");
        const idxMedico = headers.indexOf("medico");
        const idxAptos = headers.indexOf("aptos");
        const idxFalta = headers.indexOf("falta");

        if (idxFalta === -1 || idxSector === -1 || idxPuesto === -1) {
            document.getElementById('loadingStatus').innerHTML = `⚠️ Cabeceras no encontradas.<br><small>Detectadas: ${headers.join(' | ')}</small><br><br>Asegurate de que el archivo esté compartido públicamente como 'Lector'.`;
            return;
        }

        puestosPendientes = [];
        globales = { objetivo: 0, cubiertos: 0, medicos: 0, aptos: 0, vacantes: 0 };
        
        for (let i = 1; i < rows.length; i++) {
            const columns = rows[i];
            
            if (columns.length > Math.max(idxSector, idxFalta) && columns[idxSector].trim() !== "") {
                const sector = columns[idxSector].replace(/["]/g, '').trim();
                const puesto = columns[idxPuesto].replace(/["]/g, '').trim();
                
                const tenemos = parseInt(columns[idxTenemos]?.replace(/[".]/g, '')) || 0;
                const presupuestado = parseInt(columns[idxPresupuestado]?.replace(/[".]/g, '')) || 0;
                const medico = parseInt(columns[idxMedico]?.replace(/[".]/g, '')) || 0;
                const aptos = parseInt(columns[idxAptos]?.replace(/[".]/g, '')) || 0;
                const falta = parseInt(columns[idxFalta]?.replace(/[".]/g, '')) || 0;
                
                if (sector.toLowerCase() === "sector" || puesto.toLowerCase() === "puesto") continue;

                globales.objetivo += presupuestado;
                globales.cubiertos += tenemos;
                globales.medicos += medico;
                globales.aptos += aptos;
                globales.vacantes += (falta > 0 ? falta : 0);

                if (falta > 0) {
                    let prioridad = "Baja";
                    if (falta >= 5) prioridad = "Alta";
                    else if (falta >= 2) prioridad = "Media";

                    puestosPendientes.push({ sector, puesto, tenemos, presupuestado, medico, aptos, falta, prioridad });
                }
            }
        }

        renderKPIs();
        populateSectorFilter();
        renderTable(puestosPendientes);
        
        document.getElementById('loadingStatus').style.display = 'none';
        document.getElementById('mainTable').style.display = 'table';
    } catch (error) {
        document.getElementById('loadingStatus').innerHTML = "⚠️ Error al conectar con Google Sheets.<br><small>Verificá que el acceso general en 'Compartir' esté configurado como 'Cualquier persona con el enlace'.</small>";
        console.error(error);
    }
}

function renderKPIs() {
    const porcCobertura = globales.objetivo > 0 ? ((globales.cubiertos / globales.objetivo) * 100).toFixed(1) : 0;
    document.getElementById('kpi-objetivo').innerText = globales.objetivo.toLocaleString();
    document.getElementById('kpi-cubiertos').innerText = globales.cubiertos.toLocaleString();
    document.getElementById('kpi-medicos').innerText = globales.medicos.toLocaleString();
    document.getElementById('kpi-aptos').innerText = globales.aptos.toLocaleString();
    document.getElementById('kpi-vacantes').innerText = globales.vacantes.toLocaleString();
    document.getElementById('kpi-cobertura').innerText = `${porcCobertura}%`;
}

function populateSectorFilter() {
    const sectorFilter = document.getElementById('sectorFilter');
    sectorFilter.innerHTML = '<option value="Todos">📦 Todos los Sectores</option>';
    const sectores = [...new Set(puestosPendientes.map(item => item.sector))];
    sectores.sort().forEach(sector => {
        const option = document.createElement('option');
        option.value = sector;
        option.innerText = sector;
        sectorFilter.appendChild(option);
    });
}

function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:20px;">No se registran vacantes activas.</td></tr>`;
        return;
    }
    data.forEach(item => {
        const tr = document.createElement('tr');
        let pClass = item.prioridad === 'Alta' ? 'alta' : (item.prioridad === 'Media' ? 'media' : 'baja');
        tr.innerHTML = `
            <td>${item.sector}</td>
            <td><strong>${item.puesto}</strong></td>
            <td>${item.tenemos}</td>
            <td>${item.presupuestado}</td>
            <td style="color: var(--accent-purple);">${item.medico}</td>
            <td style="color: #f59e0b;">${item.aptos}</td>
            <td style="color: var(--accent-red); font-weight:600;">${item.falta}</td>
            <td><span class="badge ${pClass}">${item.prioridad}</span></td>
        `;
        tableBody.appendChild(tr);
    });
}

function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const selectedSector = document.getElementById('sectorFilter').value;
    const filtered = puestosPendientes.filter(item => {
        const matchesSearch = item.puesto.toLowerCase().includes(searchValue) || item.sector.toLowerCase().includes(searchValue);
        const matchesSector = selectedSector === 'Todos' || item.sector === selectedSector;
        return matchesSearch && matchesSector;
    });
    renderTable(filtered);
}

// Inicializar eventos
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').addEventListener('input', filterData);
    document.getElementById('sectorFilter').addEventListener('change', filterData);
    fetchExcelData();
});
