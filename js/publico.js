document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('php/cargar.php');
    document.getElementById('contenido').innerHTML = await res.text();
});
