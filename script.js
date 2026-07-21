document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtenemos los elementos de filtro y la tabla
  const inputBuscar = document.getElementById('inputBuscar'); // ID de tu caja de texto
  const selectEstado = document.getElementById('selectEstado'); // ID de tu desplegable de estado
  const filas = document.querySelectorAll('#tablaDotacion tbody tr'); // ID de tu <table>

  function aplicarFiltros() {
    const texto = inputBuscar ? inputBuscar.value.toLowerCase().trim() : '';
    const estado = selectEstado ? selectEstado.value.toLowerCase() : '';

    filas.forEach(fila => {
      const contenidoFila = fila.textContent.toLowerCase();
      
      // Si tienes una columna de estado específica (ej. 4ª columna / índice 3)
      const textoEstado = fila.children[3] ? fila.children[3].textContent.toLowerCase() : '';

      const coincideTexto = contenidoFila.includes(texto);
      const coincideEstado = estado === '' || textoEstado === estado;

      if (coincideTexto && coincideEstado) {
        fila.style.display = '';
      } else {
        fila.style.display = 'none';
      }
    });
  }

  // 2. Escuchar los eventos de entrada
  if (inputBuscar) {
    inputBuscar.addEventListener('input', aplicarFiltros);
  }
  if (selectEstado) {
    selectEstado.addEventListener('change', aplicarFiltros);
  }
});
