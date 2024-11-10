document.addEventListener('DOMContentLoaded', () => {
    const menuElement = document.getElementById('menu');
    const menuForm = document.getElementById('menuForm');

    // Cargar el menú desde el archivo JSON
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            data.menu.forEach(item => {
                addMenuItem(item);
            });
        });

    // Función para agregar un elemento al menú
    function addMenuItem(item) {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${item.enlace}">${item.nombre}</a>
        `;
        li.setAttribute('data-id', item.id);
        menuElement.appendChild(li);
    }

    // Manejar la adición de una nueva opción
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('id').value);
        const nombre = document.getElementById('nombre').value;
        const enlace = document.getElementById('enlace').value;

        // Validar que el ID no exista
        const existingItem = document.querySelector(`li[data-id='${id}']`);
        if (existingItem) {
            alert('El ID ya existe. Por favor, elige otro.');
            return;
        }

        // Agregar el nuevo elemento al menú
        addMenuItem({ id, nombre, enlace });

        // Limpiar el formulario
        menuForm.reset();
    });

    // Función para eliminar un elemento del menú
    window.deleteMenuItem = function(id) {
        const itemToDelete = document.querySelector(`li[data-id='${id}']`);
        if (itemToDelete) {
            menuElement.removeChild(itemToDelete);
        }
    };
});