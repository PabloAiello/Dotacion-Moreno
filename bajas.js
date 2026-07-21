// Reemplaza GID_BAJAS_AQUI con el número gid de la pestaña Bajas en tu Google Sheet
const baseCsvUrl = "https://docs.google.com/spreadsheets/d/1-ZjmiJVt_u5fN9We8W-JeBzIFmSyFfSH/export?format=csv&gid=GID_BAJAS_AQUI";

let datosBajas = [];

async function fetchBajasData() {
    try {
        const response = await fetch(`${baseCsvUrl}&t=${new Date().getTime()}`);
        if (!response.ok) throw new Error("Error al conectar con los datos");
        
        const textData = await response.text();
        const lines = textData.split(/\r?\n/).filter(line => line.trim() !== "");
        if (lines.length === 0) return;

        const separator = lines[0].split(';').length > lines[0].split(',').length ? ';' : ',';
        const rows = lines.map(line => line.split(new RegExp(`\\${separator}(?=(?:(?:[^"]*"){2})*[^"]*$)`)));

        // Encabezados
        const headers = rows[0].map(h => h.replace(/["]/g, '').trim());
        renderHeader(headers);

        // Filas
        datosBajas = rows.slice(1).map(row => row.map(cell => cell.replace(/["]/g, '').trim()));

        renderTable(datosBajas);
        document.getElementById('loadingStatus').style.display = 'none';
        document.getElementById('mainTable').style.display = 'table';
    } catch (error) {
        document.getElementById('loadingStatus').innerText = "⚠️ Error al cargar los datos de Bajas.";
        console.error(error);
    }
}

function renderHeader(headers) {
    const thead = document.getElementById('tableHeader');
    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
}

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="100%" style="text-align:center; padding:20px;">No se encontraron registros.</td></tr>`;
        return;
    }
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = row.map(cell => `<td>${cell}</td>`).join('');
        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = datosBajas.filter(row => 
                row.some(cell => cell.toLowerCase().includes(query))
            );
            renderTable(filtered);
        });
    }
    fetchBajasData();
});
