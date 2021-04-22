const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/listaProveedor', async (req,res) =>{
    res.render('proveedor/listaProveedor');
});
router.get('/listaProveedorAjax', async (req,res)=>{
   try {
       const proveedor = await pool.query("Select rut, comuna, nombre, telefono, direccion, numero, correo from proveedor");
       res.send(proveedor);
       
   } catch (error) {
       console.log(error);
       
   }
});

router.get('/agregarProveedor', async (req,res) =>{
    const regiones = await pool.query('SELECT * FROM REGION');
    res.render('proveedor/agregarProveedor',{regiones});
 });



 router.get('/regiones/:id', async (req,res) =>{
    const comunas =  await pool.query('Select * from comunas where Id_Region = ?',req.params.id);
    res.send(comunas);
});

router.post('/agregarProveedor', async (req,res) => {
    try {
     const {RUT, COMUNA, NOMBRE, TELEFONO, DIRECCION, NUMERO, CORREO} = req.body;
     await pool.query('call Agregar_Proveedor(?,?,?,?,?,?,?)',[RUT, COMUNA, NOMBRE, TELEFONO, DIRECCION, NUMERO, CORREO]);
     res.redirect('/proveedor/agregarProveedor');
        
    } catch (e) {
 
        console.log(e);
    }
 });

 module.exports = router;