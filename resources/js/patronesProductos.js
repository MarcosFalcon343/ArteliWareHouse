document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Obtener el ID del producto desde el atributo data-idproducto
        const idProducto = document
            .getElementById("idProducto")
            .getAttribute("data-idproducto");

        const response = await fetch(
            `/api/reportes/producto/productos-relacionados-dimension2?IdProducto=${idProducto}`
        );
        if (!response.ok) {
            throw new Error("Error al obtener los datos de la API");
        }
        const data = await response.json();
        const tableBody = document.querySelector("#PatronDimension2 tbody");

        data.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.IdProducto}</td>
                <td>${item.Nombre}</td>
                <td>${item.Frecuencia}</td>
                <td>${item.InventarioGlobal}</td>
                <td>${item.PorcentajeProbabilidad}</td>
            `;
            tableBody.appendChild(row); // Agregar la fila a la tabla
        });

        // Inicializar DataTables con orden por defecto en la columna "Frecuencia"
        $("#PatronDimension2").DataTable({
            order: [[2, "desc"]], // Ordenar por "Frecuencia" (índice 2) en orden descendente
        });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        alert("Hubo un problema al cargar los datos.");
    }
});
