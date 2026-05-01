const cleanText = (text = '') => {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
};

function getSelectedFilterValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
        .map(cb => cleanText(cb.value));
}

export function filterProducts(products) {
    const categories = getSelectedFilterValues('category');
    const models = getSelectedFilterValues('model');
    const queryInput = document.querySelector('input[type="search"]');
    const query = queryInput ? cleanText(queryInput.value) : '';

    return products.filter(product => {
        const matchesCategory = categories.length === 0 || categories.some(category => category === cleanText(product.categoria));
        const matchesModel = models.length === 0 || models.some(model => model === cleanText(product.modelo));
        const matchesQuery = query === '' ||
            cleanText(product.numero_parte).includes(query) ||
            cleanText(product.nombre).includes(query) ||
            cleanText(product.descripcion).includes(query);

        return matchesCategory && matchesModel && matchesQuery;
    });
}

export function setupFilterListeners(onFilterChange) {
    const checkboxes = document.querySelectorAll('input[name="category"], input[name="model"]');
    checkboxes.forEach(cb => cb.addEventListener('change', onFilterChange));

    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', onFilterChange);
    }

    const searchForm = document.querySelector('form.search');
    if (searchForm) {
        searchForm.addEventListener('submit', event => {
            event.preventDefault();
            onFilterChange();
        });
    }
}
