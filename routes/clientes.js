const express = require('express');
const router = express.Router();
const pool = require('../database');



router.get('/agregarCliente', async (req,res) =>{
    const regiones = await pool.query('SELECT * FROM REGION');
    res.render('clientes/agregarCliente',{regiones});
   

});

router.get('/regiones/:id', async (req,res) =>{

        try {
            const {id} = req.params;
            console.log(id);
            const comunas =  await pool.query('Select * from comunas where Id_Region = ?',id);
            res.json(comunas);
            console.log(comunas);
        } catch (error) {
            console.log(error);
        }

});


router.get('/detalle/:rut', async (req,res) =>{
  try {
      const {rut} = req.params;
      const detalle = await pool.query("Select * from clientes where Rut = ? ",rut);
      res.json(detalle);

      
  } catch (e) {
      
  }
 

});

router.get('/lista', async (req,res) =>{
    res.render('clientes/lista');
});
router.get('/listaClientes', async (req,res)=>{
   try {
       const clientes = await pool.query("Select rut,nombre, apellido_paterno as paterno, apellido_materno as materno, telefono, correo from registro_cliente where estado = 1");
       res.jsonp(clientes);
       
   } catch (error) {
       console.log(error);
       
   }
});



router.post('/agregarCliente', async (req,res) => {
   try {
    const {RUT,NOMBRE,APELLIDOP,APELLIDOM,TELEFONO,CORREO,CALLE,NUMERO,COMUNA,TIPO,SEXO} = req.body;
    await pool.query('call AGREGAR_CLIENTE(?,?,?,?,?,?,?,?,?,?,?)',[RUT,NOMBRE,APELLIDOP,APELLIDOM,TELEFONO,CORREO,CALLE,NUMERO,COMUNA,TIPO,SEXO]);
    res.redirect('/clientes/agregarCliente');
       
   } catch (e) {

       console.log(e);
   }
});




router.get('/editarCliente/:rut', async (req,res) =>{
    try {
        const {rut} = req.params;  
        const cliente = await pool.query('Select * from clientes where Rut = ?',[rut]);
        const regiones = await pool.query('SELECT * FROM REGION');
        res.render('clientes/editarCliente',{cl : cliente[0], regiones})
    } catch (e) {
        console.log(e);
    }

});

router.post('/editarCliente/:rut', async (req,res) =>{
    try {
        const {NOMBRE,APELLIDOP,APELLIDOM,TELEFONO,CORREO,CALLE,NUMERO,COMUNA,TIPO,SEXO} = req.body;
        const {rut} = req.params;  
        console.log(req.body);
        console.log(rut);
        await pool.query('call ACTUALIZAR_CLIENTE(?,?,?,?,?,?,?,?,?,?,?)',[rut,NOMBRE,APELLIDOP,APELLIDOM,TELEFONO,CORREO,SEXO,TIPO,CALLE,NUMERO,COMUNA]);
        res.redirect('/');
        
    } catch (e) {
        console.log(e);
    }
});


router.post('/eliminarCliente/:rut', async (req,res) =>{
    try {
        const {rut} = req.params;
        const clientes = await pool.query('call ELIMINAR_CLIENTE (?)',[rut]);
        res.json(clientes);
        console.log(rut);
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;