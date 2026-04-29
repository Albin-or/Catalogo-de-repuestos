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

function addFilterListeners() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            let categories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
            let models = Array.from(document.querySelectorAll('input[name="model"]:checked')).map(cb => cb.value);
            let filtered = products.filter(product => {
                let categoryMatch = categories.length === 0 || categories.some(cat => product.categoria.toLowerCase() === cat.toLowerCase());
                let modelMatch = models.length === 0 || models.some(mod => product.modelo.toLowerCase().includes(mod.toLowerCase()));
                return categoryMatch && modelMatch;
            });
            render(filtered);
        });
    });
}
