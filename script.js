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
    let products = data
    let productTemplate = document.querySelector('#product-card-template').content;
    products.forEach(product => {
        let clon = document.importNode(productTemplate, true);
        clon.querySelector('.product-info').setAttribute('data-model', product.modelo);
        clon.querySelector('.part-number').textContent = product.numero_parte;
        clon.querySelector('.part-number').setAttribute('value', product.numero_parte);
        clon.querySelector('.category-tag').textContent = product.categoria;
        clon.querySelector('.product-title').textContent = product.nombre;
        clon.querySelector('.description').textContent = product.descripcion;
        clon.querySelector('.product-image').setAttribute('src', product.imagen);
        document.querySelector('.results').appendChild(clon);
    });
});