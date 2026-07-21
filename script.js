document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtener elementos del DOM (Inputs, Selects y Filas de la tabla)
  const inputBuscar = document.querySelector('input[type="text"]') || document.getElementById('inputBuscar');
  const selectSector = document.querySelector('select') || document.getElementById('selectSector');
  const filas = document.querySelectorAll('table tbody tr');

  function aplicarFiltros() {
    // Búsqueda por texto (minúsculas y sin espacios sobrantes)
    const textoBusqueda = inputBuscar ? inputBuscar.value.toLowerCase().trim() : '';

    // Sector seleccionado en el menú desplegable
    const sectorSeleccionado = selectSector ? selectSector.value.toUpperCase().trim() : '';

    filas.forEach(fila => {
      // Texto completo de la fila para la búsqueda general
      const textoFila = fila.textContent.toLowerCase();

      // Asumiendo que el Sector/Gerencia está en la primera columna (índice 0)
      const celdaSector = fila.children[0] ? fila.children[0].textContent.toUpperCase().trim() : '';

      // Evaluar coincidencia de texto
      const coincideTexto = textoBusqueda === '' || textoFila.includes(textoBusqueda);

      // Evaluar coincidencia de sector
      const coincideSector =
        sectorSeleccionado === '' ||
        sectorSeleccionado.includes('TODOS') ||
        celdaSector === sectorSeleccionado;

      // Mostrar u ocultar la fila según cumpla ambas condiciones
      if (coincideTexto && coincideSector) {
        fila.style.display = '';
      } else {
        fila.style.display = 'none';
      }
    });
  }

  // 2. Escuchar los eventos cuando el usuario interactúa
  if (inputBuscar) {
    inputBuscar.addEventListener('input', aplicarFiltros);
  }

  if (selectSector) {
    selectSector.addEventListener('change', aplicarFiltros);
  }
});
