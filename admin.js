const products = JSON.parse(localStorage.getItem('products')) || [
    { name: 'Taza De Pato', id: 'pato', imageUrl: './imagenes.html/Pato.jpeg' },
    { name: 'Taza De Bellota', id: 'bellota', imageUrl: './imagenes.html/bellota.jpeg' },
    // Añadir otros productos iniciales aquí
];

function loadProducts() {
    const productTable = document.getElementById('product-table');

    productTable.innerHTML = ''; // Limpiar la tabla antes de volver a cargar los productos

    products.forEach(product => {
        const currentPrice = localStorage.getItem(`price-${product.id}`) || '5000';

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.name}</td>
            <td><img src="${product.imageUrl}" alt="${product.name}"></td>
            <td>$<span class="current-price" data-product="${product.id}">${currentPrice}</span></td>
            <td><input type="number" min="1" data-product="${product.id}" class="new-price" placeholder="Nuevo Precio"></td>
            <td><button class="button delete-btn" data-product="${product.id}">Eliminar</button></td>
        `;

        productTable.appendChild(row);
    });
}

document.getElementById('save-button').addEventListener('click', () => {
    const newPrices = document.querySelectorAll('.new-price');

    newPrices.forEach(input => {
        const productId = input.getAttribute('data-product');
        const newPrice = input.value;

        if (newPrice) {
            localStorage.setItem(`price-${productId}`, newPrice);
            document.querySelector(`.current-price[data-product="${productId}"]`).innerText = newPrice;
        }
    });

    alert('Los cambios han sido guardados.');
    updateMainPage();
});

document.getElementById('add-product-form').addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const imageFile = document.getElementById('product-image').files[0];
    const price = document.getElementById('product-price').value;

    if (name && imageFile && price) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            const newProduct = {
                name: name,
                id: name.toLowerCase().replace(/\s+/g, '-'),
                imageUrl: imageUrl
            };

            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));

            loadProducts();
            updateMainPage();

            document.getElementById('product-name').value = '';
            document.getElementById('product-image').value = '';
            document.getElementById('product-price').value = '';
        };
        reader.readAsDataURL(imageFile);
    }
});

function updateMainPage() {
    const mainPageScript = document.createElement('script');
    mainPageScript.src = 'main.js';
    document.head.appendChild(mainPageScript);
}

window.onload = loadProducts;
