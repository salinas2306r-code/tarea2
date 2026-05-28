function calcularAhorro(){
    // Captura de datos usando var e IDs de los elementos
    var tipo = document.getElementById("tipoTiempo").value;
    var tiempo = parseInt(document.getElementById("tiempoInput").value);
    var baseAhorro = parseInt(document.getElementById("baseInput").value);

    // Validación de los datos del formulario
    if (isNaN(tiempo) || tiempo < 1 || isNaN(baseAhorro) || baseAhorro < 1) {
        alert("Por favor, ingresa valores válidos mayores a 0.");
        return;
    }

    // Alerta de seguridad para evitar números infinitos
    if (tipo == "dias" && tiempo > 40) {
        alert("Para planes mayores a 40 días se recomienda usar el modo 'Meses', debido al crecimiento exponencial de Fibonacci.");
        return;
    }

    // Variables de control clásicas de Fibonacci
    var a = 0;
    var b = 1;
    var c = 0;
    var totalAhorrado = 0;
    
    // Variable de texto para construir la tabla interactiva
    var tablaHTML = "";
    var etiquetaTiempo = "";

    if (tipo == "meses") {
        etiquetaTiempo = "Mes";
    } else {
        etiquetaTiempo = "Día";
    }
    
    tablaHTML = tablaHTML + "<p>Plan generado por <b>" + tiempo + " " + tipo + "</b> con una base inicial de <b>Bs. " + baseAhorro + "</b>:</p>";
    
    // Contenedor con barra de desplazamiento (Scroll)
    tablaHTML = tablaHTML + "<div class='tabla-contenedor'>";
    tablaHTML = tablaHTML + "<table border='1'>";
    tablaHTML = tablaHTML + "<thead><tr><th>" + etiquetaTiempo + "</th><th>Término Fibonacci</th><th>Depósito correspondiente</th><th>Saldo Acumulado</th></tr></thead>";
    tablaHTML = tablaHTML + "<tbody>";

    // Ciclo iterativo unificado
    for (var i = 1; i <= tiempo; i++) {
        var fiboPuro = 0;
        
        if (i == 1) {
            fiboPuro = 1;
        } else {
            c = a + b;
            fiboPuro = c;
            a = b;
            b = c;
        }
        
        // Aplicación del multiplicador base
        var ahorroFinal = fiboPuro * baseAhorro;
        
        // Acumulador total (Saldo Acumulado)
        totalAhorrado = totalAhorrado + ahorroFinal;

        // Armado de la fila correspondiente
        tablaHTML = tablaHTML + "<tr>";
        tablaHTML = tablaHTML + "<td>" + etiquetaTiempo + " " + i + "</td>";
        tablaHTML = tablaHTML + "<td>F(" + i + ") = " + fiboPuro + "</td>";
        tablaHTML = tablaHTML + "<td>Bs. " + ahorroFinal + "</td>";
        tablaHTML = tablaHTML + "<td><b>Bs. " + totalAhorrado + "</b></td>";
        tablaHTML = tablaHTML + "</tr>";
    }

    tablaHTML = tablaHTML + "</tbody></table>";
    tablaHTML = tablaHTML + "</div>";
    
    // Mensaje final con Saldo Acumulado
    tablaHTML = tablaHTML + "<p style='margin-top: 15px; text-align: right; font-size: 1.2rem;'><b>Saldo Acumulado: <span style='color: #10b981;'>Bs. " + totalAhorrado + "</span></b></p>";

    // Hacer visible la tarjeta de resultados antes de inyectar los datos
    document.getElementById('resultadoCard').style.display = "block";

    // Inyección en el elemento interactivo por medio de .innerHTML
    document.getElementById('res').innerHTML = tablaHTML;
}
