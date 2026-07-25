// ==========================================
// 1. MAPA DE FOTOS DE GOOGLE DRIVE (Legajo -> ID)
// ==========================================
const FOTOS_DRIVE = {
  "33": "1TY9SSp1t0KtHIpc1nhgMEYzctLa8huJQ",
  "48": "1kzyFGevL6nmCpQOJYOCCSGv6trAh_SWV",
  "90": "1eMhQ5U3Rudq-nJIxdE4MVtwliQ8mSDGt",
  "104": "1qwC8kBqw1pI884gcHsBwAV9puBk1y95W",
  "111": "1Vk4zkrDGKrjASqSgWGOxGdWVLoHifStV",
  "114": "1P8FtUyoxPFctxQaoP0r88JXNIvYqEU6H",
  "119": "1bsscin7N_dDcKqdDkCH754wJQvZNFsE-",
  "127": "1oEVOvDcYr5MYqdtX37Zdrm708Ee-5W7g",
  "130": "1ijA7Csei3SzLwmc_QU1AhZJs3xM8Wgun",
  "140": "1Uj7oZzgG3Zy49Gt3JYrWaQFl6_QCYrOs",
  "144": "1JNnIIuYIwQAAPtprWZtihpD8VW_GO7ST",
  "155": "1OSYHu0J-TUABM2Nn1BJm-QZGvpOhhx06",
  "161": "1XZNW0SNRodwR0lMs8IyvKy5mkh9XIghg",
  "175": "1Vxi20tHB1kLRz6Dbw0RAOse1ZtVj1Qy7",
  "198": "1s1DY2sYAGRUyUMFtlsGA9wHAWXb2WNeb",
  "201": "15epTJxTERmK_l54JS6E2WeJA4RIAxhGY",
  "202": "13WQkvZfqHYmfaIb-9zNcd8P9aSwAZ4jc",
  "207": "1xgEATszAnUyWMCRWDQrMQYP9Q0KS86dl",
  "209": "1L5IXzuaMzkBDZSYlh4jazhTe4E3-1I22",
  "212": "1_qp_-NXzPEzW45z0qoj4PqBetqgvG7EF",
  "219": "1hh7c-8bQdCHUFmKZmwMB3pRFGavtA5jv",
  "226": "1AAn7AucwZq7fCIGFIDN9daYRrwiBFo7d",
  "230": "1Gpc3r3Nqw5vDNO259Cvz4W8uWl-OlrCU",
  "231": "1u-VGzpyFZUYXsC25UPePDKdifqg0miQ7",
  "239": "1u8J7KeiSl4jt1KeS1kMIEp2ERTATTl3k",
  "250": "18ryNaFZOSWyQaDE5nz2heya9aredB9qT",
  "251": "14uJWwvM7cmv5RtoRmAKXJaGrFjZ9LqiY",
  "252": "1oKm_gAdEGQg4ugBRID1wA74T6VEEEqXD",
  "253": "1K80GovQEY8cAoqLDyX8lNkxqz5ksIxHw",
  "280": "1zzKTBA4hArHuSpkZ02bYinB2AE7Wj0z-",
  "290": "14-O0Whkmo7ScsNAnxpIZ6IEwBJaTTEK0",
  "294": "1uuAW9iGbcU0QLls9FjbXQm6ky732zfar",
  "308": "1IP2cc5IkJZByZYAgdlsPYkras9u8W0xF",
  "311": "1Pt9YqZUlwHIBXAS1CYw9mVXlIoT5i8ix",
  "349": "1nSJMb6EW6cZ0KkXh_beRUuKfvTNVfhco",
  "364": "1dnsNt77Rh1qWkA7zlDH5Quymvm87sYwX",
  "401": "12OkbEP0IRhOHCZ5Ybcnoh9auCh2SWHR0",
  "442": "1CsyggMdvm7N3mw5r9eKhWbJfxHb4nYkO",
  "458": "1A5z8Nh2nuzlB5ZEDDLwjmcg4z_dhnrtP",
  "462": "1akZdFCN1TKv5QgFzd0AMfrEz20xebjCs",
  "469": "16-yAOBV-XLVsBsSQsiKTYYIlWwLvgR3R",
  "480": "1RFCOhA-RPrPSadgYw3VoPUXeRJud-7Br",
  "483": "1L-f2BwBAMrhTZS8-HJIUurcS2g7o1izG",
  "521": "1acGhrup3mEIUc9ybRgDL4i97-vyHaP-8",
  "557": "1LkqGlCbnco3RMFTZ9i60w7xwkbCs6fOF",
  "598": "1GUzdPoRL78LyAxiGywu5q98zvlT8FM9a",
  "604": "1B23uT5AiyCGJXszTRP0GxopCa2UHijs9",
  "606": "1LuQwD3e5vO5FG1X0cd4ztJP2zcjpP6hB",
  "607": "1W_N6G6IjAmch2oOO7InX9qT205ogbzWb",
  "622": "1dkX8cgrlU8D7dUN5ltO6J5dSAsqxSNNk",
  "652": "1aN3cmNRIlYgv-EdykP19HDD-HcGPoyn9",
  "653": "16DVeuVCdG2SXBiB94jqV5CTH4x88xGm0",
  "670": "1MgpkDIiexyAsV-_DzrWX5Rp4gvWibtf4",
  "679": "1qupLDmd00wXN--Apiu3MV7KSryKuAf5v",
  "682": "1rzktW5m5dlSyT3SF46pV2ri4nHq741L6",
  "695": "1IFMQgBxEyWBasSXMAGdM0-SuPbOSGplI",
  "702": "1gVeb8xsnzV7-ldTvjt1EHVHbthmTVjTl",
  "703": "1qp4n1I95WgVsAR8F-Ao2bm2p-sfIWOBH",
  "705": "1XeiULFB2UO7bfrulk3KyJNy8Npg2R_1V",
  "707": "1zXzKShkWb4Ev5cRP-1QrDNQZ1Is4ei3v",
  "708": "177vp3RrKhAcKteePGJnnuX-E5IO7uTSl",
  "721": "1rYVTI9ojEGFm1YY5hXTkfR1bWQgPHZhL",
  "722": "16GitSgBq8HHdaN2EK11kUCJCBlej3xZx",
  "752": "1PDhq6ZqMc9LMKf2kBBKGdhV06vVWK8Z-",
  "755": "1rd6Tys3OtuxW70zaX3pvmqVAXqj7fK-M",
  "761": "1jLIoFlmHujAk1gs3UgSwhIZAHJrqbXHS",
  "792": "1PB0-6sGVj7sgbsODf9zJ9vJKT1dlEOt2",
  "813": "1lczakZFn0Gt6Qnu-6PBosZBS686FRCWJ",
  "820": "1IH00iLvVuYTvTLqiZDQxZ151_HcLq_PW",
  "826": "1XCMqt1rppN-HivKLQ-Z6jSP0pWGsMOkN",
  "829": "1oJFzL0q55_QE92snSblp5fKVj6ISeVlw",
  "834": "1Vp9vnkT21uHOGc2DxJ3DKc6EJcXUHSbt",
  "841": "1EdOfbAAGVg_M_Yntlk5-qJYxvA7Ze0jd",
  "852": "1k3DayxtDHriTJG4NUJs24y0uzSvAmJ_s",
  "853": "12mO67ntJeupjGE4L7nek_i-i0ye2ZY-L",
  "863": "19OAK6BW0SQwSBBtPRDK_2CTIsKjrHPlM",
  "942": "1YtDUzBuEU2N92hiXCbxtPPEBRN8P07LL",
  "947": "1-Gx9GEUYSHTqhr640lqg_wvrIMf8ZZ7v",
  "949": "1PLibVB3NiRw_DjGwQIButuMpOH-SYrai",
  "964": "1PNDM-_UeuLiRzoOnboR6aGa6GWmRkuIU",
  "1023": "1Vx_J77ipUlpoUic5uLqYWcXIy2H1IMtV",
  "1024": "1wTs9OkAauBAq8ODt4XnZnMtJiVH_DmwF",
  "1028": "10tx-GarVj1SC0HhUzLAff3eUOZwnBNMu",
  "1029": "1fj7m4MFcD4f4nEotj9uxInOKG-H78wOE",
  "1030": "1Pz1QHJw8d20v8605l6B2B0HcKe123afN",
  "1031": "19pJuDXVdgPWS6H_eWIJE6lUqbm-ghglm",
  "1114": "1I9Zy6sQOTRtAj-ZtRkVol6xQ_nXYha-5",
  "1123": "1PrG2lA6krJMGRzOvQ8dZxkRuTiGOYOAB",
  "1139": "1RAUG8kNVzIDoUsAyJZdA98ACHkcyrBbS",
  "1141": "1vXCRWkYFNW1M3rl-QMs4Dojpx9jHU7Xp",
  "1166": "1_kDdcKnkjjjBuEcfMNQtMyqs3BX4qTfH",
  "1171": "1ZMneRogVxxRWHU41pWNHDzsYwMfE535o",
  "1173": "121TqdS-mHLuHFHry0vngEeJgfZZpB7mU",
  "1183": "1fSR-sN2ZzM_z3pRy-KZjbY9GAjAWgr0q",
  "1184": "1EI-NXdUdNQdvW89_lThvTuXyc3nP-YY1",
  "1187": "1gMFjkU7iLnl88a_ReBSQBbrgYDvm1Kr-",
  "1190": "12pFqrTKk7aj8PnBwx1E_Z_QACz26AqMC",
  "1208": "1NE-FxQCjB9wr3CAc3G2DQhA8hX9IIezE",
  "1211": "1_y1NM5OVz2Wu5CiP8qeaBBem4HOpuK2O",
  "1215": "1Gd_aYccuEf4yVVY4XYTzATXAsHmckp0e",
  "1221": "1wIF08x6ZZmb3j9xeCeEtrh_ZyjCYH-f6",
  "1228": "1HQWNJQCDj-S7HDxAJWi5UpNzlOIZvcLB",
  "1311": "167e4zcpFEJ5NkpcDUOIBnGz-zvFRRww6",
  "1318": "1UygydLWYg9cbc_cywap2ejhy5tflWH4E",
  "1346": "1xtBX9wiU4UAwCGUYEljgfzQu-qMb9iJY",
  "1453": "1fEZAmC_MI015WKIb-w3xmaZv9Y6O0O3B",
  "1468": "1JeABYrHE_9_8RucsZLmFUSVndc0UGLiN",
  "1479": "1PZqdhsztfpFOgP-Hm9Ooeo7GaZCjsHwv",
  "1485": "1scEV6_RWLXOM7DgoRebLxWFWio4SzZRa",
  "1488": "1jNHMdW3uQVGcMVGwR2ASqR4_j1zyZjBy",
  "1493": "1YLeQVgd0KBDOKJ9sr9-iLb94O6Ar_1kj",
  "1497": "1DucjaKDW80JQitJH89lY1tO5gdUQ7xxP",
  "1499": "1lm_Dzei9KODMy3kNAY1o10NWkTxWxP3Z",
  "1526": "19F313jvlh2dg0BmxUqX-sr_ozYOXo0g4",
  "1565": "1jYBzPnL04Lw2jeh2jgFNQv8q3QPM360N",
  "1616": "1d90ljCalIjcqB_9vU_CY8J4-v4YXy3uh",
  "1641": "1OuFpmaK8ACHqWscsuD3XhiJt8im-Tar7",
  "1664": "1Kmuox5fJFP-CNrsJ-klk3fJZlESOv5Vo",
  "1674": "1Dw9DO74vgTKCQJc4BG7Wz7Xo7OJ_lHJ2",
  "1675": "1E0vZ0Erya76KCv1z1Fu96bMh08XAUefq",
  "1684": "1J_V-TtgVtRtI4N7aBrFKWVpwgCC8mDRd",
  "1697": "1oXCpFB_nsusru09A3RC6mTd71X_HFdJs",
  "1753": "1Tqkxn5j3hYt_dgvb1Oh4V0ogvE3EHFE1",
  "1758": "1BVDprXXx0je6Ct1SIVcQugE9tZ6KaXZH",
  "1766": "1IH8dPwzt_1afb_QcwNb7L1KWu-5Ta2M9",
  "1770": "1HW5wnQmO8kqLp1X16BOKn13jaNalAfKk",
  "1790": "1bj9wqCJO76lQcuyuatyeFaQaX23kBMs0",
  "1791": "1wPm5jD3s4Z4Hnd34Xus2XLbaCHfvengN",
  "1801": "1zkGcYxnT2O2v9iXejxBAYKxqSnO9-86A",
  "1806": "1OJVsBVFvDSn5__UbJaT2i9sqTZwW90zv",
  "1845": "1wiruYBRuV2XDCNECjodul_f8rn_MlVLQ",
  "1853": "14Yt9bIWikZXptGIE0ruEzRjgl-wH109n",
  "1896": "1KeR8WcUaQvEYKPMrYnuKzXV29vX3Hg8Y",
  "1918": "1al9kUMXuQ1r3t3401GcxFe5IVR0SVBun",
  "1922": "189x85zqh2nzbiJLENXM_NPAt0luPxtlc",
  "1932": "1GszVgFeNnYNTG3H5JFLkpbC0V6HiHOlc",
  "1946": "1350k3JYKPs2bHC2GtXihKH_AJF19E--k",
  "1951": "1uPRX-h5Mt1LsECsGukXtKTz84j_SGsYv",
  "1953": "1cMTyluDM3roJ0dAxqFD9rPHv2-V5E1T4",
  "1954": "1kuWrjXS5G_2QJo-ZtBqu_C_PVRa_qfWz",
  "1973": "1pJCbicaobNXl3d4x36I0-9d1LtWCeIB-",
  "2002": "18iCAwUcKWvZ-mI-tpJTMXkwTZWx7-1Jp",
  "2009": "1dXkOMbujYE_Ph6unJfGir2ayimfL1zb_",
  "2015": "1oY8nptty8BcaFb0Q3-oXgqeuUakXRb8g",
  "2029": "1BpRwZjrYpRCCZmPag-KBc9NzJY4QTSAW",
  "2041": "1wjz_CmYTh1Ett5TdVEmdOm_haGwUDzTQ",
  "2069": "1199Tpqbgk3TeH3kz-K9ANW1o-ObE_jGP",
  "2075": "1Sr_0Yco9PAd9jddvo_VZkOGST2nL7P_O",
  "2096": "1FukEQzxbfsr3h_eBOqdYsm3Xra9cbMCT",
  "2097": "1w7g_6TcoHEj4bBgkeIWSBlHSpg9aNk_2",
  "2125": "1UcCP3wKXw-j9WQfdUzI5cJ2WDQSrppTn",
  "2134": "1MkWjhm_eEpDLY376Enz3FSqwq5L9XyYX",
  "2135": "1Tl5aLp7ewQs3LUspcvvM8YhZrOg0T8ii",
  "2137": "1TlPELwVzifERiHwtBIfHBs2wWJjMKGCA",
  "2139": "1SJuvXgtUU1hmii0HVzxZ52SCRFAnrHbE",
  "2154": "1-E5rP-j86GUHT_8EmbFImg8U2K4VRi-D",
  "2156": "19f-qXNtzsseC61R9VpeBu7RH9g_6YuYE",
  "2163": "1p0D3qWZYrRfePjE3kRFM2GxhGpcVEUxD",
  "2181": "1IEiLjjZdqWqS1SQMmFWCED-U-U4pvbGY",
  "2191": "1Y20ubJUe-Bn01iwrjRAlcNkOo260tuTX",
  "2193": "1Y2q5jFZ67eAvcJsS3-ScZAyjNbSxQomv",
  "2202": "1WHEsNWSflPc7vgefcitb115MoziEl47q",
  "2203": "1LMjOCukyqrmIDlSSRutmd-xxXXxpaEaO",
  "2221": "1tB5jkUhlhNq7ZTgfFDyEsNDm64AnbQ7c",
  "2229": "1W-Q8ILHIUjhGXKejZn_6lJ7luR_ITGrC",
  "2235": "1ooWyvRJvD0qCKLsqWjAwW3NFufKtEig_",
  "2250": "1EanOqHqOx-V_STNJ_-FsUiW5ALWl3GnY",
  "2254": "1Cw-GLoK3ZG79J0LTcaJ7H5ED1Ez3CJFL",
  "2255": "1qj0r0OkGFejZm0ftE9kzdR13Lgf0eQOB",
  "2266": "1L3_HW44zyWr4G32XlDHKMg7Qn00WzG34",
  "2272": "1BPnJTQfEQrAqPYrW8Q13eKbHYxVbiJvf",
  "2275": "1bHKkbQpHo5ODDMxicWKVs_VccvlgrDjg",
  "2280": "1CgSsSo6hq9Tl-wKF3rMG-OfqRUclMCiy",
  "2281": "1E37TZwyOwluFnGlPsfUZC2qmoIMnt9G1",
  "2283": "1rvTWPYnu_9kt-CRfFY_uJX-ukjyB0cYs"
};

// Función auxiliar para obtener la URL directa de la foto desde Drive
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
// 2. CONFIGURACIÓN Y CARGA DE DATOS DESDE DRIVE
// ==========================================
// REEMPLAZA ESTA URL por la URL de tu Google Sheet publicado como CSV
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
            legajo: (col[2] || '').trim(), // Asume que la columna 3 contiene el Legajo
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

// ==========================================
// 3. RENDERIZADO DE TABLA CON VISTA PREVIA
// ==========================================
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

        // Generar vista previa de la foto si existe el legajo
        const urlFoto = obtenerUrlFoto(row.legajo);
        const htmlLegajo = urlFoto 
            ? `<div class="foto-tooltip-container">
                 <span>${row.legajo || row.puesto}</span>
                 <img src="${urlFoto}" class="foto-preview" alt="Foto ${row.legajo}" loading="lazy">
               </div>`
            : `<span>${row.legajo || row.puesto}</span>`;

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

// ==========================================
// 4. FILTROS Y BÚSQUEDA
// ==========================================
function poblarFiltroSectores(datos) {
    const select = document.getElementById('sectorFilter');
    if (!select) return;

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
