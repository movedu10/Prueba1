const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach (dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const Barra = dropdown.querySelector('.Barra');
    const options = dropdown.querySelectorAll('.Barra li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () =>{
        select.classList.toggle('select-clickend');
        caret.classList.toggle('caret-rotate');
        Barra.classList.toggle('Barra-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
        selectend.innerText = option.innerText;
        select.classList.remove('select-clickend');
        caret.classList.remove('caret-rotate'); 
        Barra.classList.remove('Barra-open');
        options.forEach(option => { option.classList.remove('active'); });
        option.classList.add('active');    
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.toggle-section');

    sections.forEach(section => {
        const header = section.querySelector('.toggle-header');
        const body = section.querySelector('.toggle-body');
        const caret = section.querySelector('.caret');

        header.addEventListener('click', () => {
            const isVisible = body.style.display === 'block';
            body.style.display = isVisible ? 'none' : 'block';
            caret.innerHTML = isVisible ? '&#9660;' : '&#9650;';
        });
    });
});






// === Funcionalidad modo edición para Avisos ===
const editarBtn = document.getElementById('editarBtn');
const toolbar = document.getElementById('toolbar');
const contenido = document.getElementById('contenido');

let modoEdicion = false;

// Credenciales (puedes cambiar aquí usuario y contraseña)
const USUARIO = "admin";
const PASSWORD = "12345";

editarBtn.addEventListener('click', () => {
    if (!modoEdicion) {
        // Pedir usuario y contraseña
        const usuarioIngresado = prompt("👤Usuario:");
        if (usuarioIngresado !== USUARIO) {
            alert("❌Usuario incorrecto");
            return;
        }

        const passwordIngresado = prompt("🔑Contraseña:");
        if (passwordIngresado !== PASSWORD) {
            alert("❌Contraseña incorrecta");
            return;
        }

        // Autenticación exitosa
        modoEdicion = true;
        toolbar.style.display = 'flex';
        contenido.style.display = 'block'; // <-- Mostrar contenido
        editarBtn.textContent = 'Salir de Edición';
    } else {
        // Salir de modo edición
        modoEdicion = false;
        toolbar.style.display = 'none';
        contenido.style.display = 'none'; // <-- Ocultar contenido al salir
        editarBtn.textContent = 'Add Noticia';
        desactivarEdicion();
    }
});


// Añadir noticia (párrafo editable)
document.getElementById('addParrafo').addEventListener('click', () => {
    const div = document.createElement('div');
    div.contentEditable = 'true';
    div.classList.add('editando');
    div.textContent = 'Nueva noticia...';
    agregarBotonEliminar(div);
    contenido.appendChild(div);
    div.focus();
});

// Añadir imagen subida por usuario
document.getElementById('addImagen').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const div = document.createElement('div');
                div.classList.add('editando');
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Imagen subida';
                img.style.maxWidth = '200px';
                div.appendChild(img);
                agregarBotonEliminar(div);
                contenido.appendChild(div);
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});

// Limpiar todo el contenido
document.getElementById('limpiar').addEventListener('click', () => {
    if (confirm('¿Seguro que quieres limpiar todo el contenido?')) {
        contenido.innerHTML = '';
    }
});

//Guardar y salir de modo edición
document.getElementById('guardar').addEventListener('click', () => {
    modoEdicion = false;
    toolbar.style.display = 'none';
    editarBtn.textContent = 'Add Noticia';
    desactivarEdicion();
    alert('✅Cambios guardados (no se guardan en servidor).');
});


// Salir sin guardar
document.getElementById('cancelar').addEventListener('click', () => {
    if (confirm('¿Salir sin guardar? Los cambios se perderán.😞')) {
        modoEdicion = false;
        toolbar.style.display = 'none';
        editarBtn.textContent = 'Add Noticia';
        contenido.innerHTML = ''; // Resetea contenido, podrías hacer un backup para revertir
        desactivarEdicion();
    }
});

// Función para agregar botón eliminar a cada noticia
function agregarBotonEliminar(div) {
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.classList.add('eliminar-noticia');
    btn.addEventListener('click', () => {
        if (confirm('¿Eliminar esta noticia?')) {
            div.remove();
        }
    });
    div.appendChild(btn);
}

// Quitar modo edición de todos los divs
function desactivarEdicion() {
    const items = contenido.querySelectorAll('div');
    items.forEach(item => {
        item.contentEditable = 'false';
        item.classList.remove('editando');
        const btnEliminar = item.querySelector('.eliminar-noticia');
        if (btnEliminar) btnEliminar.remove();
    });
}





document.getElementById('guardar').addEventListener('click', () => {
    const contenidoHTML = contenido.innerHTML;

    fetch("guardar.php", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: contenidoHTML
    })
    .then(res => res.text())
    .then(respuesta => {
        alert("✅ " + respuesta);
        modoEdicion = false;
        toolbar.style.display = 'none';
        editarBtn.textContent = 'Add Noticia';
        desactivarEdicion();
    })
    .catch(error => {
        alert("❌ Error al guardar: " + error);
    });
});



