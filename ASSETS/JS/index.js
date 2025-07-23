const products = [
    {
        id: 1,
        code: "SMSG001",
        name: "Smartphone Samsung Galaxy S23",
        description: "Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas y cámara de 50MP",
        price: 599990,
        image: "ASSETS/images/100494.jpg"
    },
    {
        id: 2,
        code: "LPHP002",
        name: "Laptop HP Pavilion 15",
        description: "Laptop con procesador Intel Core i7, 16GB RAM y SSD 512GB",
        price: 899990,
        image: "ASSETS/images/100679.jpeg"
    },
    {
        id: 3,
        code: "AUSY003",
        name: "Auriculares Sony WH-1000XM5",
        description: "Auriculares inalámbricos premium con cancelación de ruido activa",
        price: 249990,
        image: "ASSETS/images/100360.jpeg"
    },
    {
        id: 4,
        code: "TBAP004",
        name: "Tablet Apple iPad Air",
        description: "Tablet de 10.9 pulgadas con chip M1 y almacenamiento de 256GB",
        price: 749990,
        image: "ASSETS/images/100458.jpg"
    },
    {
        id: 5,
        code: "MNLG005",
        name: "Monitor LG UltraWide 34''",
        description: "Monitor curvo ultrawide de 34 pulgadas con resolución 3440x1440",
        price: 449990,
        image: "ASSETS/images/100677.jpg"
    },
    {
        id: 6,
        code: "TCAP006",
        name: "Teclado Apple Magic Keyboard",
        description: "Teclado inalámbrico con teclas de tijera y Touch ID",
        price: 129990,
        image: "ASSETS/images/100479.jpg"
    },
    {
        id: 7,
        code: "MTLG007",
        name: "Mouse Logitech MX Master 3",
        description: "Mouse ergonómico inalámbrico para profesionales con scroll electromagnético",
        price: 89990,
        image: "ASSETS/images/100429.jpg"
    },
    {
        id: 8,
        code: "CMCAN008",
        name: "Cámara Canon EOS R6 Mark II",
        description: "Cámara mirrorless full frame con grabación 4K y estabilización interna",
        price: 1299990,
        image: "ASSETS/images/100503.jpg"
    },
    {
        id: 9,
        code: "IMPEP009",
        name: "Impresora Epson EcoTank L3250",
        description: "Impresora multifuncional con sistema de tinta continua",
        price: 179990,
        image: "ASSETS/images/100535.jpg"
    },
    {
        id: 10,
        code: "DDSG010",
        name: "Disco Duro Seagate 2TB",
        description: "Disco duro externo portátil USB 3.0 de 2TB para respaldo",
        price: 79990,
        image: "ASSETS/images/100683.jpg"
    },
    {
        id: 11,
        code: "CONINT011",
        name: "Consola Nintendo Switch OLED",
        description: "Consola de videojuegos híbrida con pantalla OLED de 7 pulgadas",
        price: 349990,
        image: "ASSETS/images/100494.jpg"
    },
    {
        id: 12,
        code: "BOCJBL012",
        name: "Bocina JBL Charge 5",
        description: "Altavoz Bluetooth portátil resistente al agua con 20 horas de batería",
        price: 119990,
        image: "ASSETS/images/100360.jpeg"
    }
];

const cart = [];
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");

// Generar productos dinámicamente
products.forEach((product, index) => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6 mb-4";
    col.innerHTML = `
        <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <h6 class="card-title">${product.name}</h6>
                <p class="text-muted small mb-1"><strong>Código:</strong> ${product.code}</p>
                <p class="card-text small">${product.description}</p>
                <p class="text-success fw-bold fs-6">$${product.price.toLocaleString('es-CL')}</p>
                <div class="mt-auto">
                    <div class="form-check mb-2">
                        <input class="form-check-input product-checkbox" type="checkbox" id="check-${product.id}" data-id="${product.id}">
                        <label class="form-check-label" for="check-${product.id}">
                            Seleccionar
                        </label>
                    </div>
                    <div class="input-group mb-2">
                        <label class="input-group-text" for="qty-${product.id}">Cant:</label>
                        <input type="number" class="form-control form-control-sm quantity-input" id="qty-${product.id}" min="1" value="1" data-id="${product.id}">
                    </div>
                    <button class="btn btn-primary btn-sm w-100 add-to-cart" data-id="${product.id}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    `;
    productList.appendChild(col);
});

// Funcionalidad del carrito
function addToCart(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    
    const existingItem = cart.find(item => item.id === parseInt(productId));
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    updateCartDisplay();
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === parseInt(productId));
    if (index > -1) {
        cart.splice(index, 1);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="alert alert-info text-center"><i class="fas fa-shopping-cart"></i> Tu carrito está vacío</div>';
        cartSummary.innerHTML = '';
        return;
    }
    
    let cartHTML = '<div class="card"><div class="card-header"><h5 class="mb-0"><i class="fas fa-shopping-cart"></i> Productos Seleccionados</h5></div><div class="card-body">';
    let totalConIVA = 0; // Total con IVA incluido (precio que se muestra en las cards)
    
    cart.forEach((item, index) => {
        const itemTotalConIVA = item.price * item.quantity; // Precio total con IVA incluido
        totalConIVA += itemTotalConIVA;
        
        cartHTML += `
            <div class="border-bottom pb-2 mb-2">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">Código: ${item.code}</small><br>
                        <small class="text-muted">Cantidad: ${item.quantity} | Precio unitario: $${item.price.toLocaleString('es-CL')}</small>
                    </div>
                    <div class="col-md-4">
                        <strong class="text-success">$${itemTotalConIVA.toLocaleString('es-CL')}</strong>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-outline-danger btn-sm remove-from-cart" data-id="${item.id}" title="Eliminar producto">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartHTML += '</div></div>';
    
    // Cálculos correctos: del precio con IVA, extraer el valor neto
    // Precio con IVA = Valor Neto + (Valor Neto * 0.19)
    // Precio con IVA = Valor Neto * 1.19
    // Por lo tanto: Valor Neto = Precio con IVA / 1.19
    const valorNeto = Math.round(totalConIVA / 1.19);
    const iva = totalConIVA - valorNeto; // IVA = Total - Neto
    
    // Cargo por despacho: 5% si el total es menor a $100.000
    let cargoDespacho = 0;
    let totalFinal = totalConIVA;
    
    if (totalConIVA < 100000) {
        cargoDespacho = Math.round(totalConIVA * 0.05);
        totalFinal = totalConIVA + cargoDespacho;
    }
    
    cartItems.innerHTML = cartHTML;
    
    // Generar el resumen según si hay cargo de despacho o no
    let resumenHTML = `
        <div class="card mt-3">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-calculator"></i> Resumen de Compra</h5>
            </div>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="col-6"><strong>Valor Neto:</strong></div>
                    <div class="col-6 text-end">$${valorNeto.toLocaleString('es-CL')}</div>
                </div>
                <div class="row mb-2">
                    <div class="col-6"><strong>IVA (19%):</strong></div>
                    <div class="col-6 text-end">$${iva.toLocaleString('es-CL')}</div>
                </div>
                <div class="row mb-2">
                    <div class="col-6"><strong>Subtotal:</strong></div>
                    <div class="col-6 text-end">$${totalConIVA.toLocaleString('es-CL')}</div>
                </div>`;
    
    if (cargoDespacho > 0) {
        resumenHTML += `
                <div class="row mb-2">
                    <div class="col-6"><strong>Cargo despacho (5%):</strong></div>
                    <div class="col-6 text-end text-warning">$${cargoDespacho.toLocaleString('es-CL')}</div>
                </div>
                <div class="alert alert-warning alert-sm mb-2">
                    <small><i class="fas fa-truck"></i> Se aplica cargo de despacho para compras menores a $100.000</small>
                </div>`;
    } else {
        resumenHTML += `
                <div class="alert alert-success alert-sm mb-2">
                    <small><i class="fas fa-gift"></i> ¡Despacho gratis! Tu compra supera los $100.000</small>
                </div>`;
    }
    
    resumenHTML += `
                <hr>
                <div class="row mb-3">
                    <div class="col-6"><h5>Total Final:</h5></div>
                    <div class="col-6 text-end"><h5 class="text-success">$${totalFinal.toLocaleString('es-CL')}</h5></div>
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-success btn-lg" id="checkout-btn">
                        <i class="fas fa-credit-card"></i> Finalizar Compra
                    </button>
                    <button class="btn btn-outline-secondary" id="clear-cart-btn">
                        <i class="fas fa-broom"></i> Limpiar Carrito
                    </button>
                </div>
            </div>
        </div>
    `;
    
    cartSummary.innerHTML = resumenHTML;
}

// Función para agregar productos seleccionados con checkbox
function addSelectedProducts() {
    const checkboxes = document.querySelectorAll('.product-checkbox:checked');
    let addedCount = 0;
    
    checkboxes.forEach(checkbox => {
        const productId = parseInt(checkbox.getAttribute('data-id'));
        const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    ...product,
                    quantity: quantity
                });
            }
            addedCount++;
            
            // Desmarcar checkbox después de agregar
            checkbox.checked = false;
        }
    });
    
    if (addedCount > 0) {
        updateCartDisplay();
        showNotification(`Se agregaron ${addedCount} producto(s) al carrito`, 'success');
    } else {
        showNotification('Por favor selecciona al menos un producto', 'warning');
    }
}

// Función para limpiar todo el carrito
function clearCart() {
    if (cart.length > 0) {
        cart.length = 0; // Vaciar array
        updateCartDisplay();
        showNotification('Carrito limpiado', 'info');
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 1050; max-width: 350px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Event listeners
document.addEventListener('click', function(e) {
    // Agregar producto individual al carrito
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.getAttribute('data-id');
        addToCart(productId);
    }
    
    // Eliminar producto del carrito
    if (e.target.classList.contains('remove-from-cart')) {
        const productId = e.target.getAttribute('data-id');
        removeFromCart(productId);
    }
    
    // Limpiar carrito completo
    if (e.target.id === 'clear-cart-btn') {
        if (confirm('¿Estás seguro de que deseas limpiar todo el carrito?')) {
            clearCart();
        }
    }
    
    // Finalizar compra
    if (e.target.id === 'checkout-btn') {
        if (cart.length > 0) {
            const totalConIVA = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const valorNeto = Math.round(totalConIVA / 1.19);
            const iva = totalConIVA - valorNeto;
            
            let cargoDespacho = 0;
            let totalFinal = totalConIVA;
            
            if (totalConIVA < 100000) {
                cargoDespacho = Math.round(totalConIVA * 0.05);
                totalFinal = totalConIVA + cargoDespacho;
            }
            
            let resumenCompra = `¡Compra finalizada!
            
Resumen:
• Productos: ${cart.length}
• Valor Neto: $${valorNeto.toLocaleString('es-CL')}
• IVA (19%): $${iva.toLocaleString('es-CL')}
• Subtotal: $${totalConIVA.toLocaleString('es-CL')}`;

            if (cargoDespacho > 0) {
                resumenCompra += `
• Cargo despacho (5%): $${cargoDespacho.toLocaleString('es-CL')}`;
            } else {
                resumenCompra += `
• Despacho: GRATIS (compra > $100.000)`;
            }
            
            resumenCompra += `
• TOTAL FINAL: $${totalFinal.toLocaleString('es-CL')}

¡Gracias por tu compra!`;
            
            alert(resumenCompra);
            clearCart();
        }
    }
});

// Event listener para cambios en cantidad
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('quantity-input')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const newQuantity = parseInt(e.target.value);
        
        // Buscar si el producto está en el carrito y actualizar cantidad
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem && newQuantity > 0) {
            cartItem.quantity = newQuantity;
            updateCartDisplay();
        }
    }
});

// Inicializar carrito vacío
updateCartDisplay();
