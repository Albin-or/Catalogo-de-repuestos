import { loadNavigation } from './js/navigation.js';
import { loadProducts } from './js/productsService.js';
import { renderProducts } from './js/render.js';
import { filterProducts, setupFilterListeners } from './js/filters.js';

let products = [];

function onFilterChange() {
    const filteredProducts = filterProducts(products);
    renderProducts(filteredProducts);
}

async function initCatalogPage() {
    products = await loadProducts();
    renderProducts(products);
    setupFilterListeners(onFilterChange);
}

async function initPage() {
    await loadNavigation();

    if (document.querySelector('.results')) {
        await initCatalogPage();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initPage().catch(error => console.error(error));
});