const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const {database} = require('./keys');
const flash = require('connect-flash');

//inicializacion

const app = express();


//Configuraciones


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(flash());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));


//Variables Globales

app.use((req,res,next) =>{


res.locals.user = req.user;


next();

});

//Rutas
app.use(require('./routes'));
app.use('/clientes',require('./routes/clientes'));
app.use('/proveedor',require('./routes/proveedor'));




//Carpeta pública

app.use(express.static(path.join(__dirname, 'public')));

//Arranca el servidor

app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});



