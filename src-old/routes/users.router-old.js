import {Router} from 'express';
// import { uploader } from '../utils';
const router = Router;

let users = [];

// router.post('/',uploader.single('file'), (req,res)=>{
//     if(!req.file){
//         return res.status(400).send({status:"error", error:"No se pudo guardar la imagen"})
//     }
//     console.log(req,file);
//     let user = req.body;
//     user.profile = req.file.path;
//     users.push(user);
//     res.send({status:"success",message:"User Created"})
// })

/**
 * CRUD -> Las 4 operaciones básicas sobre datos
 * CRUD -> Create (Crear), Read (Leer), Update (Actualizar), Delete (Eliminar)
 */
// get = read
router.get('/api/users', (req, res) => {
    res.status(200).send({ error: null, data: users });
});

// post = create
router.post('/api/users', (req, res) => {
    if (req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('lastName')) {
        // Math.max nos devuelve el valor máximo de una LISTA
        // Aprovechamos el spread (...) para desestructurar el array devuelto por map
        const maxId = Math.max(...users.map(element => +element.id));
        const newUser = { id: maxId + 1, firstName: req.body.firstName, lastName: req.body.lastName };
        users.push(newUser);
        res.status(200).send({ error: null, data: newUser });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

// put / patch = update
router.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    
    if (index > -1) {
        // Atención!!!, esta es una simplificación, NUNCA utilizaremos el
        // body sin controlarlo previamente.
        users[index] = req.body;
        res.status(200).send({ error: null, data: users[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

//  delete = delete
router.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    
    if (index > -1) {
        users.splice(index, 1);
        res.status(200).send({ error: null, data: 'Usuario borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});




export default router;