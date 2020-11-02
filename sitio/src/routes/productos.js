const express = require('express');
const router = express.Router();
const multer =require ('multer');
const path = require('path');
const sessionUserCheck = require("../middlewares/sessionUserCheck")

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage});

const productosController = require('../controllers/productosController')

router.get('/listar', productosController.listar)
router.get('/detalle/:id', productosController.detalle)
//muestra el form para agregar produto
router.get('/agregar', productosController.agregar)
router.get('/cart',sessionUserCheck, productosController.carrito)
//procesa los datos y agrega producto
router.post('/agregar', upload.any(), productosController.publicar)

router.get('editar/:id',productosController.form)
router.put('/editar/:id',upload.any(), productosController.editar)

router.delete('/delete/:id',productosController.eliminar)

module.exports=router;