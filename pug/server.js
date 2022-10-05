const express = require('express');
const app = express();
const routerProductos = require('./src/routes/productos')

const Contenedor = require('./src/class/main');
const contenedor = new Contenedor('productos.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);
app.use(express.static('public'));

/* ------------ PUG ---------------- */

// Configuración de PUG	

app.set('views', './views');
app.set('view engine', 'pug');

// Ruta de PUG


app.get('/productos', async (req, res) => {
    
    const productos = await contenedor.getAll();

    res.render("vista", {
        productos: productos
    });
});

/* --------------------------------- */


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port} | Modo Pug`));
server.on('error', error => console.log(`Error en servidor ${error}`));