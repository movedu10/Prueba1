const contenido = document.getElementById('contenido');

// Cargar noticias existentes
document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('php/cargar.php');
    contenido.innerHTML = await res.text();
});

// Guardar noticias
document.getElementById('guardar').addEventListener('click', async () => {
    const res = await fetch('php/guardar.php', {
        method: 'POST',
        body: contenido.innerHTML
    });

    alert(await res.text());
});

// Subir imagen
document.getElementById('addImagen').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async () => {
        const formData = new FormData();
        formData.append('image', input.files[0]);

        const res = await fetch('php/subir_imagen.php', {
            method: 'POST',
            body: formData
        });

        const url = await res.text();
        contenido.innerHTML += `<img src="${url}" style="max-width:200px;">`;
    };

    input.click();
});

// Añadir texto
document.getElementById('addParrafo').addEventListener('click', () => {
    contenido.innerHTML += `<div style="margin:15px 0;">Nueva noticia...</div>`;
});
