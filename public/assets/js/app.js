document.addEventListener('DOMContentLoaded', function () {
    const formAddDeporte = document.querySelector('#formAddDeporte');
    const cuerpoDOM = document.querySelector('#cuerpoDOM');

    if (formAddDeporte && cuerpoDOM) {
        formAddDeporte.addEventListener('submit', function (event) {
            event.preventDefault();
            agregar();
        });
        getData();
    } else {
        console.error('No se encontraron los elementos necesarios en el DOM.');
    }

    async function getData() {
        if (cuerpoDOM) {
            cuerpoDOM.innerHTML = '';
            try {
                const response = await axios.get('/deportes');
                const deportes = response.data.deportes;
                deportes.forEach((d, i) => {
                    cuerpoDOM.innerHTML += `
                        <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${d.nombre}</td>
                            <td>${d.precio}</td>
                            <td>
                                <button class="btn btn-warning" onclick='preEdit("${d.nombre}","${d.precio}")' data-toggle="modal" data-target="#exampleModal">Editar</button>
                                <button class="btn btn-danger" onclick='eliminar("${d.nombre}")'>Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        } else {
            console.error('No se encontró el elemento con ID "cuerpoDOM" en el DOM.');
        }
    }

    async function agregar() {
        const nombre = document.querySelector('#nombre').value;
        const precio = document.querySelector('#precio').value;
        try {
            const response = await axios.post(`/api/v1/deportes`, { nombre, precio });
            alert(response.data);
            getData();
        } catch (error) {
            console.error('Error al agregar el deporte:', error);
        }
        document.querySelector('#exampleModal').modal('hide');
    }

    function preEdit(nombre, precio) {
        document.querySelector('#nombreModal').value = nombre;
        document.querySelector('#precioModal').value = precio;
    }

    async function edit() {
        const nombre = document.querySelector('#nombreModal').value;
        const precio = document.querySelector('#precioModal').value;
        try {
            const response = await axios.put(`/api/v1/deportes/${nombre}`, { precio });
            alert(response.data);
            getData();
        } catch (error) {
            console.error('Error al editar el deporte:', error);
        }
        document.querySelector('#exampleModal').modal('hide');
    }

    async function eliminar(nombre) {
        try {
            const response = await axios.delete(`/api/v1/deportes/${nombre}`);
            alert(response.data);
            getData();
        } catch (error) {
            console.error('Error al eliminar el deporte:', error);
        }
        document.querySelector('#exampleModal').modal('hide');
    }
});
