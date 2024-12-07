// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         // Obtener el ID del producto desde el atributo data-idproducto
//         const idProducto = document
//             .getElementById("idProducto")
//             .getAttribute("data-idproducto");

//         // Llamar a la API para obtener los datos de patrones de 3 dimensiones
//         const response = await fetch(
//             `/api/reportes/producto/productos-relacionados-dimension3?IdProducto=${idProducto}`
//         );
//         if (!response.ok) {
//             throw new Error("Error al obtener los datos de la API");
//         }
//         const data = await response.json();

//         // Seleccionar el cuerpo de la tabla
//         const tableBody = document.querySelector("#PatronDimension3 tbody");

//         // Rellenar la tabla con los datos de la API
//         data.forEach((item) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${item.IdProducto2}</td>
//                 <td>${item.NombreProducto2}</td>
//                 <td>${item.InventarioProducto2}</td>
//                 <td>${item.IdProducto3}</td>
//                 <td>${item.NombreProducto3}</td>
//                 <td>${item.InventarioProducto3}</td>
//                 <td>${item.Frecuencia}</td>
//                 <td>${parseFloat(item.PorcentajeProbabilidad).toFixed(4)}</td>
//             `;
//             tableBody.appendChild(row); // Agregar la fila a la tabla
//         });

//         // Inicializar DataTables con orden por defecto en la columna "Frecuencia"
//         $("#PatronDimension3").DataTable({
//             order: [[6, "desc"]], // Ordenar por "Frecuencia" (índice 6) en orden descendente
//             language: {
//                 url: "//cdn.datatables.net/plug-ins/1.12.1/i18n/es-MX.json", // Idioma español
//             },
//         });
//     } catch (error) {
//         console.error("Error al obtener los datos:", error);
//         alert("Hubo un problema al cargar los datos.");
//     }
// });
