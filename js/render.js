export function renderProducts(productsToShow) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) {
        return;
    }

    const title = productsGrid.querySelector('h2');
    productsGrid.innerHTML = '';
    if (title) {
        productsGrid.appendChild(title);
    }

    if (!productsToShow || productsToShow.length === 0) {
        const noResults = document.createElement('p');
        noResults.textContent = 'No se encontraron resultados.';
        productsGrid.appendChild(noResults);
        return;
    }

    const productTemplate = document.querySelector('#product-card-template').content;

    productsToShow.forEach(product => {
        const clon = document.importNode(productTemplate, true);
        const cardInfo = clon.querySelector('.product-info');
        const partNumber = clon.querySelector('.part-number');
        const categoryTag = clon.querySelector('.category-tag');
        const productTitle = clon.querySelector('.product-title');
        const description = clon.querySelector('.description');
        const productImage = clon.querySelector('.product-image');

        if (cardInfo) {
            cardInfo.setAttribute('data-model', product.modelo);
        }
        if (partNumber) {
            partNumber.textContent = product.numero_parte;
            partNumber.setAttribute('value', product.numero_parte);
        }
        if (categoryTag) {
            categoryTag.textContent = product.categoria;
        }
        if (productTitle) {
            productTitle.textContent = product.nombre;
        }
        if (description) {
            description.textContent = product.descripcion;
        }
        if (productImage) {
            productImage.setAttribute('src', product.imagen);
        }

        productsGrid.appendChild(clon);
    });
}
