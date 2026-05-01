export async function loadProducts(url = 'products.json') {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('No se pudo cargar el catálogo de productos.');
    }

    return response.json();
}
