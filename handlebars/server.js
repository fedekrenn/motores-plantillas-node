const express = require('express');
const app = express();
const path = require('path');
const routerProductos = require('./src/routes/productos');

const Contenedor = require('./src/class/main');
const contenedor = new Contenedor('productos.txt');

const handlebars = require('express-handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routerProductos);
app.use(express.static(path.join(__dirname, 'public')));

/* ----------- Handlebars ----------- */

app.engine('hbs', handlebars.engine({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
})
);
app.set('view engine', 'hbs');
app.set("views", "./views");


app.get('/productos', async (req, res) => {

    const productos = await contenedor.getAll();

    res.render("vista", {
        productos: productos
    });

})



/* ---------------------- */

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port} | Modo handlebars`));
server.on('error', error => console.log(`Error en servidor ${error}`));