# **API JSON Arteli Warehouse**

Este programa proporciona cuatro apartados principales para visualizar reportes de **Productos, Categorías, Departamentos y Sucursales**. Cada apartado está diseñado para ofrecer información clave, como el producto más vendido, la sucursal con mayores ventas y los métodos de pago más utilizados, facilitando análisis detallados para la toma de decisiones estratégicas.

## **Apartado Productos**

El apartado de productos cuenta con seis reportes, cada uno diseñado para ofrecer información específica sobre las ventas y el rendimiento de los productos:

### 1. **Cantidad de productos vendidos**

#### **Descripcion**

Muestra la cantidad total de cada producto vendido en un periodo específico. Este reporte ayuda a identificar los productos más populares, facilitando el análisis de demanda y planificación de inventarios. **Este endpoint devuelve un listado de los 10 productos con mayor cantidad vendidos total en un periodo de tiempo especificado**.

#### **Request**

-   **URL:**  
    `GET http://127.0.0.1:8000/api/reportes/productos/cantidad`

#### **Parámetros**

| Parámetro     | Tipo   | Obligatorio | Descripción                                          |
| ------------- | ------ | ----------- | ---------------------------------------------------- |
| `fechaInicio` | String | Sí          | Fecha de inicio del periodo en formato `YYYY-MM-DD`. |
| `fechaFin`    | String | Sí          | Fecha de fin del periodo en formato `YYYY-MM-DD`.    |

#### **Ejemplo de Solicitud**

```http
GET http://127.0.0.1:8000/api/reportes/productos/cantidad?fechaInicio=2023-01-01&fechaFin=2023-01-01
```

---

#### **Response**

-   **Código HTTP:** `200 OK`
-   **Formato:** JSON

#### **Campos de la Respuesta:**

-   `Nombre`: Nombre del producto.
-   `TotalVendido`: Total de la cantidad vendida generada para el producto durante el periodo indicado.

#### **Ejemplo de Respuesta**

```json
[
    {
        "Nombre": "Miel Orgánica",
        "TotalVendido": "375"
    },
    {
        "Nombre": "Enjuague bucal Microban 1 L",
        "TotalVendido": "361"
    },
    {
        "Nombre": "Queso Suizo 250 g",
        "TotalVendido": "352"
    },
    {
        "Nombre": "Salami Picante",
        "TotalVendido": "350"
    },
    {
        "Nombre": "Yogurt Natural Sin Lactosa 1 kg",
        "TotalVendido": "347"
    },
    {
        "Nombre": "Contorno de ojos",
        "TotalVendido": "346"
    },
    {
        "Nombre": "Esponjas de Cocina Multiusos",
        "TotalVendido": "344"
    },
    {
        "Nombre": "Yogur de Papaya 200 g",
        "TotalVendido": "342"
    },
    {
        "Nombre": "Burguer Buns paquete 4 piezas",
        "TotalVendido": "341"
    },
    {
        "Nombre": "Pañales Agoo 34 piezas",
        "TotalVendido": "340"
    }
]
```

---

### 2. **Total de ingreso generado**

#### **Descripcion**

Presenta el ingreso total generado por cada producto durante un periodo determinado, como una semana. Es útil para revisar el flujo de ingresos por producto después de aplicar descuentos. **Este endpoint devuelve un listado de los 10 productos con mayor ingreso total en un periodo de tiempo especificado.**

#### **Request**

-   **URL:**  
    `GET http://127.0.0.1:8000/api/reportes/productos/ingreso`

#### **Parámetros**

| Parámetro     | Tipo   | Obligatorio | Descripción                                          |
| ------------- | ------ | ----------- | ---------------------------------------------------- |
| `fechaInicio` | String | Sí          | Fecha de inicio del periodo en formato `YYYY-MM-DD`. |
| `fechaFin`    | String | Sí          | Fecha de fin del periodo en formato `YYYY-MM-DD`.    |

#### **Ejemplo de Solicitud**

```http
GET http://127.0.0.1:8000/api/reportes/productos/ingreso?fechaInicio=2023-01-01&fechaFin=2023-01-01
```

---

#### **Response**

-   **Código HTTP:** `200 OK`
-   **Formato:** JSON

#### **Campos de la Respuesta:**

-   `Nombre`: Nombre del producto.
-   `TotalIngreso`: Total del ingreso generado para el producto durante el periodo indicado.

#### **Ejemplo de Respuesta**

```json
[
    {
        "Nombre": "Tequila Ley .925 750 ml",
        "TotalIngreso": "24750.00"
    },
    {
        "Nombre": "Rasuradora eléctrica Braun Series 7",
        "TotalIngreso": "21411.00"
    },
    {
        "Nombre": "Don Julio 1942 750 ml",
        "TotalIngreso": "18450.00"
    },
    {
        "Nombre": "Silla de coche para bebé",
        "TotalIngreso": "17640.00"
    },
    {
        "Nombre": "Cochecito de paseo",
        "TotalIngreso": "15750.00"
    },
    {
        "Nombre": "Saco de dormir para bebé",
        "TotalIngreso": "15600.00"
    },
    {
        "Nombre": "Earthborn Holistic 12.7 kg",
        "TotalIngreso": "15588.00"
    },
    {
        "Nombre": "Jamón Serrano Entero 1 kg",
        "TotalIngreso": "15576.00"
    },
    {
        "Nombre": "Croquetas para Perros Ultra Premium 20 kg",
        "TotalIngreso": "15390.00"
    },
    {
        "Nombre": "Don Julio Blanco 750 ml",
        "TotalIngreso": "14750.00"
    }
]
```

---

### 3. **Total de margen de ganancia**

#### **Descripcion**

Detalla la ganancia neta generada por cada producto tras deducir los costos. Este reporte es esencial para identificar los productos más rentables en un periodo específico. **Este endpoint devuelve un listado de los 10 productos con mayor ganancia total en un periodo de tiempo especificado.**

#### **Request**

-   **URL:**  
    `GET http://127.0.0.1:8000/api/reportes/productos/ganancia`

#### **Parámetros**

| Parámetro     | Tipo   | Obligatorio | Descripción                                          |
| ------------- | ------ | ----------- | ---------------------------------------------------- |
| `fechaInicio` | String | Sí          | Fecha de inicio del periodo en formato `YYYY-MM-DD`. |
| `fechaFin`    | String | Sí          | Fecha de fin del periodo en formato `YYYY-MM-DD`.    |

#### **Ejemplo de Solicitud**

```http
GET http://127.0.0.1:8000/api/reportes/productos/ganancia?fechaInicio=2023-01-01&fechaFin=2023-01-01
```

---

#### **Response**

-   **Código HTTP:** `200 OK`
-   **Formato:** JSON

#### **Campos de la Respuesta:**

-   `Nombre`: Nombre del producto.
-   `TotalGanancia`: Total de la ganancia generada para el producto durante el periodo indicado.

#### **Ejemplo de Respuesta**

```json
[
    {
        "Nombre": "Tequila Ley .925 750 ml",
        "TotalGanancia": "4500.00"
    },
    {
        "Nombre": "Don Julio 1942 750 ml",
        "TotalGanancia": "3600.00"
    },
    {
        "Nombre": "Saco de dormir para bebé",
        "TotalGanancia": "3600.00"
    },
    {
        "Nombre": "Caminador con luces y sonidos",
        "TotalGanancia": "2860.00"
    },
    {
        "Nombre": "Baileys Irish Cream 700 ml",
        "TotalGanancia": "2380.00"
    },
    {
        "Nombre": "Jamón Serrano Entero 1 kg",
        "TotalGanancia": "2376.00"
    },
    {
        "Nombre": "Don Julio Blanco 750 ml",
        "TotalGanancia": "2250.00"
    },
    {
        "Nombre": "Silla de coche para bebé",
        "TotalGanancia": "2240.00"
    },
    {
        "Nombre": "Hendricks Gin 700 ml",
        "TotalGanancia": "2040.00"
    },
    {
        "Nombre": "Pisco 750 ml",
        "TotalGanancia": "1995.00"
    }
]
```

---

### 4. **Total de descuentos aplicados**

#### **Descripcion**

Desglosa el total de descuentos aplicados a cada producto en una fecha específica. Ayuda a evaluar el impacto de promociones y descuentos en las ventas. **Este endpoint devuelve un listado de los 10 productos con mayor descuento total aplicado en un periodo de tiempo especificado.**

#### **Request**

-   **URL:**  
    `GET http://127.0.0.1:8000/api/reportes/productos/descuentos`

#### **Parámetros**

| Parámetro     | Tipo   | Obligatorio | Descripción                                          |
| ------------- | ------ | ----------- | ---------------------------------------------------- |
| `fechaInicio` | String | Sí          | Fecha de inicio del periodo en formato `YYYY-MM-DD`. |
| `fechaFin`    | String | Sí          | Fecha de fin del periodo en formato `YYYY-MM-DD`.    |

#### **Ejemplo de Solicitud**

```http
GET http://127.0.0.1:8000/api/reportes/productos/descuentos?fechaInicio=2023-01-01&fechaFin=2023-01-01
```

---

#### **Response**

-   **Código HTTP:** `200 OK`
-   **Formato:** JSON

#### **Campos de la Respuesta:**

-   `Nombre`: Nombre del producto.
-   `TotalDescuento`: Total de la descuento generada para el producto durante el periodo indicado.

#### **Ejemplo de Respuesta**

```json
[
    {
        "Nombre": "Tequila Ley .925 750 ml",
        "TotalDescuento": "2250.00"
    },
    {
        "Nombre": "Depilador Eléctrico Philips Satinelle",
        "TotalDescuento": "2100.00"
    },
    {
        "Nombre": "Silla de coche para bebé",
        "TotalDescuento": "1960.00"
    },
    {
        "Nombre": "Cochecito de paseo",
        "TotalDescuento": "1750.00"
    },
    {
        "Nombre": "Saint-Émilion Grand Cru",
        "TotalDescuento": "1600.00"
    },
    {
        "Nombre": "Peluche de actividades",
        "TotalDescuento": "1560.00"
    },
    {
        "Nombre": "Aspiradora de Mano 800 mL",
        "TotalDescuento": "1550.00"
    },
    {
        "Nombre": "Don Julio Blanco 750 ml",
        "TotalDescuento": "1500.00"
    },
    {
        "Nombre": "Marqués de Riscal Reserva 2016",
        "TotalDescuento": "1440.00"
    },
    {
        "Nombre": "Chivas Regal 12 años 700 ml",
        "TotalDescuento": "1360.00"
    }
]
```

---

### 5. **Patrón de compra de 2 dimensiones**

Este reporte permite analizar relaciones entre productos. Al seleccionar un producto clave, como el más vendido o el de mayor ganancia, muestra con qué otro producto se compra frecuentemente. La información está ordenada por inventario, apoyando la toma de decisiones comerciales.

---

### 6. **Patrón de compra de 3 dimensiones**

Similar al reporte anterior, este analiza la relación entre un producto clave y otros dos productos con los que frecuentemente se adquiere. También se ordena por inventario, ayudando a identificar combinaciones de compra populares para optimizar estrategias.

---

## **Apartado departamentos**

El apartado de departamentos cuenta con seis reportes, cada uno diseñado para ofrecer información específica sobre las ventas y el rendimiento de los departamentos:

### 1. **. Ventas por Departamento**

#### **Descripcion**

Muestra la monto total de ventas de cada departamento en un periodo específico. Este reporte ayuda a identificar los departamentos más populares, facilitando el análisis de demanda y planificación de inventarios. **Este endpoint devuelve un listado de los 10 departamentos con mayor venta total en un periodo de tiempo especificado**.

#### **Request**

-   **URL:**  
    `GET http://127.0.0.1:8000/api/reportes/departamentos/ventas`

#### **Parámetros**

| Parámetro     | Tipo   | Obligatorio | Descripción                                          |
| ------------- | ------ | ----------- | ---------------------------------------------------- |
| `fechaInicio` | String | Sí          | Fecha de inicio del periodo en formato `YYYY-MM-DD`. |
| `fechaFin`    | String | Sí          | Fecha de fin del periodo en formato `YYYY-MM-DD`.    |

#### **Ejemplo de Solicitud**

```http
GET http://127.0.0.1:8000/api/reportes/departamentos/ventas?fechaInicio=2023-01-01&fechaFin=2023-01-01
```

---

#### **Response**

-   **Código HTTP:** `200 OK`
-   **Formato:** JSON

#### **Campos de la Respuesta:**

-   `Nombre`: Nombre del departamento.
-   `TotalVentas`: Monto total de las ventas generada para el departamento durante el periodo indicado.

#### **Ejemplo de Respuesta**

```json
[
    {
        "Nombre": "Cuidado de la ropa",
        "TotalVentas": "128110.00"
    },
    {
        "Nombre": "Productos de papel para el hogar",
        "TotalVentas": "122751.00"
    },
    {
        "Nombre": "Limpieza del hogar",
        "TotalVentas": "119379.00"
    },
    {
        "Nombre": "Lácteos",
        "TotalVentas": "111188.00"
    },
    {
        "Nombre": "Carnes y Mariscos",
        "TotalVentas": "103963.00"
    },
    {
        "Nombre": "Abarrotes",
        "TotalVentas": "99246.00"
    },
    {
        "Nombre": "Higiene y Belleza",
        "TotalVentas": "98800.00"
    },
    {
        "Nombre": "Bebés",
        "TotalVentas": "97851.00"
    },
    {
        "Nombre": "Carnes frías",
        "TotalVentas": "96106.00"
    },
    {
        "Nombre": "Congelados",
        "TotalVentas": "95842.00"
    }
]
```

---

### 2. **. Cantidad de productos vendidos por Departamento**

#### **Descripcion**

Este reporte muestra cuántos productos de cada departamento se vendieron en un día específico. Permite identificar la participación de cada departamento en términos de cantidad de productos vendidos, facilitando el análisis de la demanda diaria y la gestión del inventario. **Este endpoint devuelve un listado de los 10 departamentos con mayor cantidad de productos vendidos en el tiempo especificado.**

#### **Request**

-   **URL:**  
    `GET http://127.0.0.1:8000/api/reportes/departamentos/cantidad-productos`

#### **Parámetros**

| Parámetro     | Tipo   | Obligatorio | Descripción                                          |
| ------------- | ------ | ----------- | ---------------------------------------------------- |
| `fechaInicio` | String | Sí          | Fecha de inicio del periodo en formato `YYYY-MM-DD`. |
| `fechaFin`    | String | Sí          | Fecha de fin del periodo en formato `YYYY-MM-DD`.    |

#### **Ejemplo de Solicitud**

```http
GET http://127.0.0.1:8000/api/reportes/departamentos/cantidad-productos?fechaInicio=2023-01-01&fechaFin=2023-01-01
```

---

#### **Response**

-   **Código HTTP:** `200 OK`
-   **Formato:** JSON

#### **Campos de la Respuesta:**

-   `Nombre`: Nombre del departamento.
-   `TotalCantidadProductos`: Cantidad total de productos vendidos en el departamento durante el periodo indicado.

#### **Ejemplo de Respuesta**

```json
[
    {
        "Nombre": "Abarrotes",
        "TotalCantidadProductos": "4228"
    },
    {
        "Nombre": "Carnes frías",
        "TotalCantidadProductos": "3073"
    },
    {
        "Nombre": "Bebidas y Licores",
        "TotalCantidadProductos": "2778"
    },
    {
        "Nombre": "Higiene y Belleza",
        "TotalCantidadProductos": "2663"
    },
    {
        "Nombre": "Lácteos",
        "TotalCantidadProductos": "2288"
    },
    {
        "Nombre": "Limpieza del hogar",
        "TotalCantidadProductos": "1292"
    },
    {
        "Nombre": "Frutas y verduras",
        "TotalCantidadProductos": "1006"
    },
    {
        "Nombre": "Cuidado de la ropa",
        "TotalCantidadProductos": "1003"
    },
    {
        "Nombre": "Bebés",
        "TotalCantidadProductos": "980"
    },
    {
        "Nombre": "Panadería y Tortillería",
        "TotalCantidadProductos": "924"
    }
]
```

### 3. Ganancia por departamento

#### **Descripcion**

Este reporte presenta la ganancia total generada por cada departamento en un día específico. Permite identificar los departamentos más rentables, facilitando el análisis de beneficios y la toma de decisiones estratégicas. **Este endpoint devuelve un listado de los 10 departamentos con mayor ganancia en el día especificado.**

#### **Request**

-   **URL:**  
    `GET http://127.0.0.1:8000/api/reportes/departamentos/ganancia`

#### **Parámetros**

| Parámetro     | Tipo   | Obligatorio | Descripción                                          |
| ------------- | ------ | ----------- | ---------------------------------------------------- |
| `fechaInicio` | String | Sí          | Fecha de inicio del periodo en formato `YYYY-MM-DD`. |
| `fechaFin`    | String | Sí          | Fecha de fin del periodo en formato `YYYY-MM-DD`.    |

#### **Ejemplo de Solicitud**

```http
GET http://127.0.0.1:8000/api/reportes/departamentos/ganancia?fechaInicio=2023-01-01&fechaFin=2023-01-01
```

---

#### **Response**

-   **Código HTTP:** `200 OK`
-   **Formato:** JSON

#### **Campos de la Respuesta:**

-   `Nombre`: Nombre del departamento.
-   `TotalGanancia`: Monto total de ganacia generado por cada departamento durante el periodo indicado.

#### **Ejemplo de Respuesta**

```json
[
    {
        "Nombre": "Carnes frías",
        "TotalGanancia": "18034.00"
    },
    {
        "Nombre": "Cuidado de la ropa",
        "TotalGanancia": "17267.00"
    },
    {
        "Nombre": "Frutas y verduras",
        "TotalGanancia": "16494.00"
    },
    {
        "Nombre": "Abarrotes",
        "TotalGanancia": "16151.00"
    },
    {
        "Nombre": "Bebidas y Licores",
        "TotalGanancia": "15564.00"
    },
    {
        "Nombre": "Mascotas",
        "TotalGanancia": "15533.00"
    },
    {
        "Nombre": "Productos de papel para el hogar",
        "TotalGanancia": "15227.00"
    },
    {
        "Nombre": "Panadería y Tortillería",
        "TotalGanancia": "14540.00"
    },
    {
        "Nombre": "Congelados",
        "TotalGanancia": "14362.00"
    },
    {
        "Nombre": "Higiene y Belleza",
        "TotalGanancia": "14195.00"
    }
]
```

---

### 4. Ingreso por Departamento

#### **Descripcion**

Este reporte muestra el ingreso generado por cada departamento en un tiempo específico, permitiendo analizar la participación de cada departamento en las ventas totales antes de aplicar descuentos o considerar costos. **Este endpoint devuelve un listado de los 10 departamentos con mayor ingreso en el día especificado.**

#### **Request**

-   **URL:**  
    `GET http://127.0.0.1:8000/api/reportes/departamentos/ingreso`

#### **Parámetros**

| Parámetro     | Tipo   | Obligatorio | Descripción                                          |
| ------------- | ------ | ----------- | ---------------------------------------------------- |
| `fechaInicio` | String | Sí          | Fecha de inicio del periodo en formato `YYYY-MM-DD`. |
| `fechaFin`    | String | Sí          | Fecha de fin del periodo en formato `YYYY-MM-DD`.    |

#### **Ejemplo de Solicitud**

```http
GET http://127.0.0.1:8000/api/reportes/departamentos/ingreso?fechaInicio=2023-01-01&fechaFin=2023-01-01
```

---

#### **Response**

-   **Código HTTP:** `200 OK`
-   **Formato:** JSON

#### **Campos de la Respuesta:**

-   `Nombre`: Nombre del departamento.
-   `TotalIngreso`: Monto total de ingreso generado por cada departamento durante el periodo indicado.

#### **Ejemplo de Respuesta**

```json
[
    {
        "Nombre": "Cuidado de la ropa",
        "TotalIngreso": "122402.00"
    },
    {
        "Nombre": "Carnes frías",
        "TotalIngreso": "117593.00"
    },
    {
        "Nombre": "Lácteos",
        "TotalIngreso": "115121.00"
    },
    {
        "Nombre": "Bebés",
        "TotalIngreso": "110800.00"
    },
    {
        "Nombre": "Panadería y Tortillería",
        "TotalIngreso": "107228.00"
    },
    {
        "Nombre": "Congelados",
        "TotalIngreso": "106616.00"
    },
    {
        "Nombre": "Abarrotes",
        "TotalIngreso": "101097.00"
    },
    {
        "Nombre": "Carnes y Mariscos",
        "TotalIngreso": "96226.00"
    },
    {
        "Nombre": "Frutas y verduras",
        "TotalIngreso": "89427.00"
    },
    {
        "Nombre": "Mascotas",
        "TotalIngreso": "87918.00"
    }
]
```

---

### 5. Transacciones por Departamento

#### **Descripcion**

Este reporte muestra el número total de transacciones realizadas en un tiempo determinado para cada departamento, permitiendo evaluar la actividad de cada departamento en términos de volumen de operaciones. **Este endpoint devuelve un listado de los 10 departamentos con mayor cantidad de transacciones en el día especificado.**

#### **Request**

-   **URL:**  
    `GET http://127.0.0.1:8000/api/reportes/departamentos/transacciones`

#### **Parámetros**

| Parámetro     | Tipo   | Obligatorio | Descripción                                          |
| ------------- | ------ | ----------- | ---------------------------------------------------- |
| `fechaInicio` | String | Sí          | Fecha de inicio del periodo en formato `YYYY-MM-DD`. |
| `fechaFin`    | String | Sí          | Fecha de fin del periodo en formato `YYYY-MM-DD`.    |

#### **Ejemplo de Solicitud**

```http
GET http://127.0.0.1:8000/api/reportes/departamentos/transacciones?fechaInicio=2023-01-01&fechaFin=2023-01-01
```

---

#### **Response**

-   **Código HTTP:** `200 OK`
-   **Formato:** JSON

#### **Campos de la Respuesta:**

-   `Nombre`: Nombre del departamento.
-   `TotalTransacciones`: Numero de transacciones (Tickets) generado por cada departamento durante el periodo indicado.

#### **Ejemplo de Respuesta**

```json
[
    {
        "Nombre": "Abarrotes",
        "TotalTransacciones": "1779"
    },
    {
        "Nombre": "Carnes frías",
        "TotalTransacciones": "1568"
    },
    {
        "Nombre": "Bebidas y Licores",
        "TotalTransacciones": "1474"
    },
    {
        "Nombre": "Higiene y Belleza",
        "TotalTransacciones": "1457"
    },
    {
        "Nombre": "Lácteos",
        "TotalTransacciones": "1321"
    },
    {
        "Nombre": "Limpieza del hogar",
        "TotalTransacciones": "938"
    },
    {
        "Nombre": "Frutas y verduras",
        "TotalTransacciones": "789"
    },
    {
        "Nombre": "Bebés",
        "TotalTransacciones": "777"
    },
    {
        "Nombre": "Cuidado de la ropa",
        "TotalTransacciones": "773"
    },
    {
        "Nombre": "Panadería y Tortillería",
        "TotalTransacciones": "726"
    }
]
```

---
