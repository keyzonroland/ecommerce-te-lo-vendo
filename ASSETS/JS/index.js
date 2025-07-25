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
        image: "ASSETS/images/100360.jpg"
    },
    {
        id: 4,
        code: "TBAP004",
        name: "Tablet Apple iPad Air",
        description: "Tablet de 10.9 pulgadas con chip M1 y almacenamiento de 256GB",
        price: 749990,
        image: "ASSETS/images/100458.jpeg"
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
        image: "ASSETS/images/100479.jpeg"
    },
    {
        id: 7,
        code: "MTLG007",
        name: "Mouse Logitech MX Master 3",
        description: "Mouse ergonómico inalámbrico para profesionales con scroll electromagnético",
        price: 89990,
        image: "ASSETS/images/100429.png"
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
        image: "ASSETS/images/100683.png"
    },
    {
        id: 11,
        code: "CONINT011",
        name: "Consola Nintendo Switch OLED",
        description: "Consola de videojuegos híbrida con pantalla OLED de 7 pulgadas",
        price: 349990,
        image: "ASSETS/images/100494.jpeg"
    },
    {
        id: 12,
        code: "BOCJBL012",
        name: "Bocina JBL Charge 5",
        description: "Altavoz Bluetooth portátil resistente al agua con 20 horas de batería",
        price: 119990,
        image: "ASSETS/images/100360.png"
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
    updateCartCounter();
    showNotification(`${product.name} agregado al carrito`, 'success');
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === parseInt(productId));
    if (index > -1) {
        const removedProduct = cart[index];
        cart.splice(index, 1);
        updateCartDisplay();
        updateCartCounter();
        showNotification(`${removedProduct.name} eliminado del carrito`, 'info');
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
                        <i class="fas fa-file-invoice-dollar"></i> Proceder al Checkout
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

// Función para mostrar el resumen en el modal
function updateModalCartSummary() {
    const modalSummary = document.getElementById('modal-cart-summary');
    
    if (cart.length === 0) {
        modalSummary.innerHTML = '<p class="text-muted">No hay productos en el carrito</p>';
        return;
    }
    
    const totalConIVA = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const valorNeto = Math.round(totalConIVA / 1.19);
    const iva = totalConIVA - valorNeto;
    
    let cargoDespacho = 0;
    let totalFinal = totalConIVA;
    
    if (totalConIVA < 100000) {
        cargoDespacho = Math.round(totalConIVA * 0.05);
        totalFinal = totalConIVA + cargoDespacho;
    }
    
    let summaryHTML = `
        <div class="row">
            <div class="col-md-8">
                <h6>Productos (${cart.length}):</h6>
                <ul class="list-unstyled">`;
    
    cart.forEach(item => {
        summaryHTML += `
                    <li class="mb-1">
                        <strong>${item.name}</strong><br>
                        <small class="text-muted">
                            Código: ${item.code} | Cantidad: ${item.quantity} | 
                            $${item.price.toLocaleString('es-CL')} c/u = $${(item.price * item.quantity).toLocaleString('es-CL')}
                        </small>
                    </li>`;
    });
    
    summaryHTML += `
                </ul>
            </div>
            <div class="col-md-4">
                <table class="table table-sm">
                    <tr>
                        <td><strong>Valor Neto:</strong></td>
                        <td class="text-end">$${valorNeto.toLocaleString('es-CL')}</td>
                    </tr>
                    <tr>
                        <td><strong>IVA (19%):</strong></td>
                        <td class="text-end">$${iva.toLocaleString('es-CL')}</td>
                    </tr>
                    <tr>
                        <td><strong>Subtotal:</strong></td>
                        <td class="text-end">$${totalConIVA.toLocaleString('es-CL')}</td>
                    </tr>`;
    
    if (cargoDespacho > 0) {
        summaryHTML += `
                    <tr>
                        <td><strong>Despacho (5%):</strong></td>
                        <td class="text-end text-warning">$${cargoDespacho.toLocaleString('es-CL')}</td>
                    </tr>`;
    } else {
        summaryHTML += `
                    <tr>
                        <td><strong>Despacho:</strong></td>
                        <td class="text-end text-success">GRATIS</td>
                    </tr>`;
    }
    
    summaryHTML += `
                    <tr class="table-success">
                        <td><strong>TOTAL:</strong></td>
                        <td class="text-end"><strong>$${totalFinal.toLocaleString('es-CL')}</strong></td>
                    </tr>
                </table>
            </div>
        </div>
    `;
    
    modalSummary.innerHTML = summaryHTML;
}

// Función para generar la boleta electrónica
function generateInvoice(customerData) {
    const now = new Date();
    const invoiceNumber = 'TLV-' + now.getFullYear() + (now.getMonth() + 1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0') + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    const totalConIVA = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const valorNeto = Math.round(totalConIVA / 1.19);
    const iva = totalConIVA - valorNeto;
    
    let cargoDespacho = 0;
    let totalFinal = totalConIVA;
    
    if (totalConIVA < 100000) {
        cargoDespacho = Math.round(totalConIVA * 0.05);
        totalFinal = totalConIVA + cargoDespacho;
    }
    
    let invoiceHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #007bff; padding-bottom: 20px;">
                <h1 style="color: #007bff; margin: 0;">TE LO VENDO</h1>
                <h2 style="color: #666; margin: 5px 0;">BOLETA ELECTRÓNICA</h2>
                <p style="margin: 5px 0; font-size: 14px;"><strong>N° ${invoiceNumber}</strong></p>
                <p style="margin: 5px 0; font-size: 14px;">Fecha: ${now.toLocaleDateString('es-CL')} - ${now.toLocaleTimeString('es-CL')}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <div style="display: inline-block; width: 48%; vertical-align: top;">
                    <h3 style="color: #007bff; border-bottom: 1px solid #007bff; padding-bottom: 5px;">DATOS DEL CLIENTE</h3>
                    <p><strong>Nombre:</strong> ${customerData.nombre}</p>
                    <p><strong>Email:</strong> ${customerData.email}</p>
                    <p><strong>Teléfono:</strong> ${customerData.telefono || 'No proporcionado'}</p>
                </div>
                <div style="display: inline-block; width: 48%; vertical-align: top; margin-left: 4%;">
                    <h3 style="color: #007bff; border-bottom: 1px solid #007bff; padding-bottom: 5px;">DIRECCIÓN DE DESPACHO</h3>
                    <p><strong>Dirección:</strong> ${customerData.direccion}</p>
                    <p><strong>Comuna:</strong> ${customerData.comuna}</p>
                    <p><strong>Región:</strong> ${customerData.region}</p>
                    <p><strong>Recibe:</strong> ${customerData.quienRecibe}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #007bff; border-bottom: 1px solid #007bff; padding-bottom: 5px;">DETALLE DE PRODUCTOS</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background-color: #f8f9fa;">
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Código</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Producto</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Cantidad</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Precio Unit.</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Total Ítem</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        invoiceHTML += `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${item.code}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${item.price.toLocaleString('es-CL')}</td>
                            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${itemTotal.toLocaleString('es-CL')}</td>
                        </tr>`;
    });
    
    invoiceHTML += `
                    </tbody>
                </table>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #007bff; border-bottom: 1px solid #007bff; padding-bottom: 5px;">RESUMEN DE LA COMPRA</h3>
                <table style="width: 100%; max-width: 400px; margin-left: auto;">
                    <tr>
                        <td style="padding: 5px; text-align: right;"><strong>Monto Neto:</strong></td>
                        <td style="padding: 5px; text-align: right; width: 120px;">$${valorNeto.toLocaleString('es-CL')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px; text-align: right;"><strong>IVA (19%):</strong></td>
                        <td style="padding: 5px; text-align: right;">$${iva.toLocaleString('es-CL')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px; text-align: right;"><strong>Monto Bruto:</strong></td>
                        <td style="padding: 5px; text-align: right;">$${totalConIVA.toLocaleString('es-CL')}</td>
                    </tr>`;
    
    if (cargoDespacho > 0) {
        invoiceHTML += `
                    <tr>
                        <td style="padding: 5px; text-align: right;"><strong>Cargo Despacho (5%):</strong></td>
                        <td style="padding: 5px; text-align: right; color: #ff6b35;">$${cargoDespacho.toLocaleString('es-CL')}</td>
                    </tr>`;
    } else {
        invoiceHTML += `
                    <tr>
                        <td style="padding: 5px; text-align: right;"><strong>Despacho:</strong></td>
                        <td style="padding: 5px; text-align: right; color: #28a745;"><strong>GRATIS</strong></td>
                    </tr>`;
    }
    
    invoiceHTML += `
                    <tr style="border-top: 2px solid #007bff; background-color: #e7f3ff;">
                        <td style="padding: 10px; text-align: right; font-size: 18px;"><strong>TOTAL FINAL:</strong></td>
                        <td style="padding: 10px; text-align: right; font-size: 18px; color: #007bff;"><strong>$${totalFinal.toLocaleString('es-CL')}</strong></td>
                    </tr>
                </table>
            </div>
            
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                <p><strong>¡Gracias por su compra!</strong></p>
                <p>Esta es una boleta electrónica generada automáticamente.</p>
                <p>Te lo Vendo - Ecommerce | contacto@telovendo.cl | www.telovendo.cl</p>
            </div>
        </div>
    `;
    
    return {
        html: invoiceHTML,
        invoiceNumber: invoiceNumber,
        totalFinal: totalFinal,
        customerData: customerData,
        items: cart.length,
        date: now.toLocaleDateString('es-CL')
    };
}

// Función para simular el envío de correo
function sendInvoiceByEmail(invoiceData) {
    return new Promise((resolve) => {
        // Simulamos un delay de envío de correo
        setTimeout(() => {
            console.log('Boleta enviada por correo:', invoiceData);
            resolve(true);
        }, 2000);
    });
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
        updateCartCounter();
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
        updateCartCounter();
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
            updateModalCartSummary();
            const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
            checkoutModal.show();
        } else {
            showNotification('Tu carrito está vacío', 'warning');
        }
    }
    
    // Confirmar compra y enviar boleta
    if (e.target.id === 'confirm-purchase-btn') {
        const form = document.getElementById('checkout-form');
        
        // Validar formulario
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Recopilar datos del cliente
        const customerData = {
            nombre: document.getElementById('cliente-nombre').value,
            email: document.getElementById('cliente-email').value,
            telefono: document.getElementById('cliente-telefono').value,
            direccion: document.getElementById('direccion').value,
            comuna: document.getElementById('comuna').value,
            region: document.getElementById('region').value,
            quienRecibe: document.getElementById('quien-recibe').value
        };
        
        // Generar boleta
        const invoiceData = generateInvoice(customerData);
        
        // Mostrar loading
        const confirmBtn = document.getElementById('confirm-purchase-btn');
        const originalText = confirmBtn.innerHTML;
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        confirmBtn.disabled = true;
        
        // Simular envío de correo
        sendInvoiceByEmail(invoiceData).then(() => {
            // Cerrar modal de checkout
            const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
            checkoutModal.hide();
            
            // Mostrar modal de confirmación
            document.getElementById('purchase-details').innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h6><i class="fas fa-receipt"></i> Detalles de la Compra</h6>
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>N° Boleta:</strong> ${invoiceData.invoiceNumber}</p>
                                <p><strong>Cliente:</strong> ${customerData.nombre}</p>
                                <p><strong>Email:</strong> ${customerData.email}</p>
                                <p><strong>Productos:</strong> ${invoiceData.items} ítem(s)</p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Fecha:</strong> ${invoiceData.date}</p>
                                <p><strong>Dirección:</strong> ${customerData.direccion}</p>
                                <p><strong>Comuna:</strong> ${customerData.comuna}</p>
                                <p><strong>Total:</strong> <span class="text-success fs-5">$${invoiceData.totalFinal.toLocaleString('es-CL')}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            const purchaseModal = new bootstrap.Modal(document.getElementById('purchaseConfirmModal'));
            purchaseModal.show();
            
            // Limpiar carrito
            clearCart();
            
            // Resetear formulario
            form.reset();
            confirmBtn.innerHTML = originalText;
            confirmBtn.disabled = false;
        });
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
            updateCartCounter();
        }
    }
});

// Función para hacer scroll al carrito
function scrollToCart() {
    const carritoSection = document.getElementById('carrito');
    carritoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Agregar efecto visual temporal
    carritoSection.style.backgroundColor = '#f8f9fa';
    setTimeout(() => {
        carritoSection.style.backgroundColor = '';
    }, 1000);
}

// Función para actualizar el contador del carrito en el navbar
function updateCartCounter() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCount.textContent = totalItems;
    
    // Mostrar/ocultar el badge según la cantidad
    if (totalItems > 0) {
        cartCount.style.display = 'inline-block';
        // Agregar animación de pulse cuando se actualiza
        cartCount.classList.add('animate-pulse');
        setTimeout(() => {
            cartCount.classList.remove('animate-pulse');
        }, 500);
    } else {
        cartCount.style.display = 'none';
    }
}

// Inicializar carrito vacío
updateCartDisplay();

// Event listener para el botón del carrito en la navbar
document.addEventListener('DOMContentLoaded', function() {
    const cartNavBtn = document.getElementById('cart-nav-btn');
    if (cartNavBtn) {
        cartNavBtn.addEventListener('click', scrollToCart);
    }
    
    // Inicializar el contador del carrito
    updateCartCounter();
});
