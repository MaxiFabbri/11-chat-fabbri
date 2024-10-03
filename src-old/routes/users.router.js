import { Router } from 'express';
import { uploader } from '../uploader.js';


const router = Router();

// Array de prueba p/ simular contenidos con los que trabajar
const users = [
    { id: 1, firstName: 'Juan', lastName: 'Perez' },
    { id: 2, firstName: 'Carlos', lastName: 'Perren' },
    { id: 3, firstName: 'Luis', lastName: 'Gonzalez' }
];
// Nuestro primer Middleware Local
const midd2 = (req,res,next) =>{
    console.log('se recibio una solicitud POST');
    next();
}
const midd3 = (req,res,next) =>{
    console.log('Otro Middleware');
    next();
}


router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: users });
});

router.post('/',midd2,midd3 , uploader.single('thumbnail'), (req, res) => {
    if (req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('lastName')) {
        const maxId = Math.max(...users.map(element => +element.id));
        const newUser = { id: maxId + 1, firstName: req.body.firstName, lastName: req.body.lastName };
        users.push(newUser);
        res.status(200).send({ error: null, data: newUser });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    
    if (index > -1) {
        users[index] = req.body;
        res.status(200).send({ error: null, data: users[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

router.delete('/:id', (req, res) => {
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
