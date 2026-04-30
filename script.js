let products = [];

fetch('navigation.html')
.then((response) => {
    return response.text();
})
.then((data) => {
    document.querySelector('#navigation').innerHTML = data;
})
fetch('products.json')
.then((response) => {
    return response.json();
})
.then((data) => {
    products = data;
    render(products);
    addFilterListeners();
});

function render(productsToShow) {
    let results = document.querySelector('.results');
    let h2 = results.querySelector('h2');
    results.innerHTML = '';
    results.appendChild(h2);
    if (productsToShow.length === 0) {
        let noResults = document.createElement('p');
        noResults.textContent = 'No se encontraron resultados.';
        results.appendChild(noResults);
    }
    let productTemplate = document.querySelector('#product-card-template').content;
    productsToShow.forEach(product => {
        let clon = document.importNode(productTemplate, true);
        clon.querySelector('.product-info').setAttribute('data-model', product.modelo);
        clon.querySelector('.part-number').textContent = product.numero_parte;
        clon.querySelector('.part-number').setAttribute('value', product.numero_parte);
        clon.querySelector('.category-tag').textContent = product.categoria;
        clon.querySelector('.product-title').textContent = product.nombre;
        clon.querySelector('.description').textContent = product.descripcion;
        clon.querySelector('.product-image').setAttribute('src', product.imagen);
        results.appendChild(clon);
    });
}
const cleanText = (text) => { return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); };
function applyFilters() {
    let categories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cleanText(cb.value));
    let models = Array.from(document.querySelectorAll('input[name="model"]:checked')).map(cb => cleanText(cb.value));
    let query = cleanText(document.querySelector('input[type="search"]').value);
    let filteredProducts = products.filter(product => {
        let matchesCategory = categories.length === 0 || categories.some(category => category === cleanText(product.categoria));
        let matchesModel = models.length === 0 || models.some(model => model === cleanText(product.modelo));
        let matchesQuery = query === '' || cleanText(product.numero_parte).includes(query) || cleanText(product.nombre).includes(query) || cleanText(product.descripcion).includes(query);
        return matchesCategory && matchesModel && matchesQuery;
    });
    render(filteredProducts);
}
function addFilterListeners() {
    document.querySelectorAll('input[name="category"], input[name="model"]').forEach(cb => {
        cb.addEventListener('change', applyFilters);
    });
    document.querySelector('input[type="search"]').addEventListener('input', applyFilters);
}