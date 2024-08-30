let cart = [];
let cartCount = 0;

function addToCart(productName, price) {
    cart.push({ productName, price });
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    alert(productName + " ha sido agregado al carrito.");
}

function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let message = "¡Hola! Me gustaría comprar:\n\n";
    let total = 0;
    
    cart.forEach(item => {
        message += `- ${item.productName}: $${item.price}\n`;
        total += item.price;
    });

    message += `\nTotal: $${total}\n\nPor favor, infórmame los pasos para completar mi compra.`;
    
    const whatsappNumber = "1234567890"; // Cambia este número por el número real de WhatsApp del dueño
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappLink, '_blank');
}
document.addEventListener('DOMContentLoaded', () => {
    const cart = document.getElementById('shopping-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    
    let cartData = []; // Array para almacenar los productos del carrito

    // Función para actualizar el carrito
    function updateCart() {
        // Mostrar u ocultar el carrito
        if (cartData.length > 0) {
            cart.style.display = 'block';
        } else {
            cart.style.display = 'none';
        }

        // Actualizar la lista de productos
        cartItems.innerHTML = '';
        let total = 0;
        cartData.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `${item.name} - $${item.price}`;
            cartItems.appendChild(itemElement);
            total += item.price;
        });

        // Actualizar el total
        cartTotal.innerHTML = `Total: $${total}`;
    }

    // Función para agregar un producto al carrito
    function addToCart(product) {
        cartData.push(product);
        updateCart();
    }

    // Simular clics en los productos para agregar al carrito
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', () => {
            const productName = item.querySelector('.title').innerText;
            const productPrice = parseInt(item.querySelector('.price').innerText.replace('$', ''));
            addToCart({ name: productName, price: productPrice });
        });
    });

    // Acción del botón de pagar
    checkoutButton.addEventListener('click', () => {
        const whatsappMessage = cartData.map(item => `${item.name} - $${item.price}`).join('%0A');
        const total = cartData.reduce((sum, item) => sum + item.price, 0);
        const whatsappUrl = `https://wa.me/1234567890?text=Productos%20solicitados:%0A${whatsappMessage}%0ATotal:%20$${total}`;
        window.open(whatsappUrl, '_blank');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const cart = document.getElementById('shopping-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    
    let cartData = []; // Array para almacenar los productos del carrito

    // Función para actualizar el carrito
    function updateCart() {
        // Mostrar u ocultar el carrito
        if (cartData.length > 0) {
            cart.style.display = 'block';
        } else {
            cart.style.display = 'none';
        }

        // Actualizar la lista de productos
        cartItems.innerHTML = '';
        let total = 0;
        cartData.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `${item.name} - $${item.price}`;
            cartItems.appendChild(itemElement);
            total += item.price;
        });

        // Actualizar el total
        cartTotal.innerHTML = `Total: $${total}`;
    }

    // Función para agregar un producto al carrito
    function addToCart(product) {
        cartData.push(product);
        updateCart();
    }

    // Manejar los clics en los botones "Agregar al carrito"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.item');
            const productName = productElement.querySelector('.title').innerText;
            const productPrice = parseInt(productElement.querySelector('.price').innerText.replace('$', ''));
            addToCart({ name: productName, price: productPrice });
        });
    });

    // Acción del botón de pagar
    checkoutButton.addEventListener('click', () => {
        const whatsappMessage = cartData.map(item => `${item.name} - $${item.price}`).join('%0A');
        const total = cartData.reduce((sum, item) => sum + item.price, 0);
        const whatsappUrl = `https://wa.me/1234567890?text=Productos%20solicitados:%0A${whatsappMessage}%0ATotal:%20$${total}`;
        window.open(whatsappUrl, '_blank');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.getElementById('shopping-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    
    let cartData = []; // Array para almacenar los productos del carrito

    function updateCart() {
        // Mostrar u ocultar el carrito
        if (cartData.length > 0) {
            cart.style.display = 'block';
        } else {
            cart.style.display = 'none';
        }

        // Actualizar la lista de productos
        cartItems.innerHTML = '';
        let total = 0;
        cartData.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span><strong>${item.name}</strong> - $${item.price}</span>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartItems.appendChild(itemElement);
            total += item.price;
        });

        // Actualizar el total
        cartTotal.innerHTML = `Total: $${total}`;
    }

    function addToCart(product) {
        cartData.push(product);
        updateCart();
    }

    window.removeFromCart = function(index) {
        cartData.splice(index, 1);
        updateCart();
    };

    // Añadir productos al carrito al hacer clic en un artículo
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', () => {
            const productName = item.querySelector('.title').innerText;
            const productPrice = parseInt(item.querySelector('.price').innerText.replace('$', ''));
            addToCart({ name: productName, price: productPrice });
        });
    });

    // Mostrar/Ocultar el carrito al hacer clic en el ícono
    cartIcon.addEventListener('click', () => {
        if (cart.style.display === 'none' || cart.style.display === '') {
            cart.style.display = 'block';
        } else {
            cart.style.display = 'none';
        }
    });

    checkoutButton.addEventListener('click', () => {
        const whatsappMessage = cartData.map(item => `${item.name} - $${item.price}`).join('%0A');
        const total = cartData.reduce((sum, item) => sum + item.price, 0);
        const whatsappUrl = `https://wa.me/1234567890?text=Productos%20solicitados:%0A${whatsappMessage}%0ATotal:%20$${total}`;
        window.open(whatsappUrl, '_blank');
    });
});
console.log(localStorage.getItem('price-pato'));

