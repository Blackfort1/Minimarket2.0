const express = require('express');
const router = express.Router();
const pool = require('../database');



router.get('/', async (req,res) =>{

    try {
    const clientes = await pool.query("Select * from clientes where estado = 1");
    res.render('index', {clientes});
    } catch (error) {
        console.log(error);
    }
    
 });




module.exports = router;    