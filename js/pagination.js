export function setupPagination(products) {
    const resultsPerPage = 5;
    const TotalPages = Math.ceil(products.length / resultsPerPage);
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= TotalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-button');
        paginationContainer.appendChild(pageButton);
    }
}