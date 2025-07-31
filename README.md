 Te lo Vendo - Ecommerce

Tienda online desarrollada con HTML, CSS y JavaScript vanilla con Bootstrap 5. Sistema completo de carrito de compras con cálculo de IVA y cargo por despacho.

 Características

- **12 productos** con información completa (código, nombre, descripción, precio, imagen)
- **Carrito de compras interactivo** con selección por checkbox
- **Cálculo automático de IVA (19%)** extraído del precio total
- **Cargo por despacho condicional (5%)** para compras menores a $100.000
- **Despacho gratis** para compras ≥ $100.000
- **Interfaz responsive** con Bootstrap 5
- **Notificaciones de usuario** para mejor experiencia

Tecnologías

- HTML5 semántico
- CSS3 personalizado
- JavaScript vanilla (ES6+)
- Bootstrap 5.3.0
- Font Awesome 6.0.0

Funcionalidades

### Productos
- Visualización en grid responsive
- Información detallada de cada producto
- Selección múltiple con checkbox
- Control de cantidad por producto

### Carrito de Compras
- Agregar productos individuales o seleccionados
- Mostrar resumen detallado con códigos
- Cálculo automático de totales
- Eliminar productos del carrito
- Limpiar carrito completo

### Sistema de Precios
- **Valor Neto**: Precio sin IVA (calculado)
- **IVA (19%)**: Impuesto sobre el valor neto
- **Cargo Despacho**: 5% si compra < $100.000
- **Total Final**: Suma de todos los conceptos

Responsive Design

- **Desktop**: 4 columnas de productos
- **Tablet**: 3 columnas de productos  
- **Mobile**: 2 columnas de productos
- Interfaz optimizada para todos los dispositivos

Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/keyzonroland/ecommerce-te-lo-vendo.git
   ```


Estructura del Proyecto

```
ECOMMERCE-TAREA/
├── index.html              # Página principal
├── ASSETS/
│   ├── CSS/
│   │   └── STYLE.CSS       # Estilos personalizados
│   ├── JS/
│   │   └── index.js        # Lógica del carrito
│   └── images/             # Imágenes de productos
└── README.md               # Documentación
```


