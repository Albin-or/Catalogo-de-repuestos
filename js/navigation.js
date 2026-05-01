export async function loadNavigation(targetId = 'navigation') {
    const response = await fetch('navigation.html');
    if (!response.ok) {
        throw new Error('No se pudo cargar la navegación.');
    }

    const html = await response.text();
    const container = document.querySelector(`#${targetId}`);

    if (container) {
        container.innerHTML = html;
    }
}
