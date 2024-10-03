import {Router} from 'express';

// import { uploader } from '../utils';
const router = Router();
  

router.get('/', (req, res) => {
    const data = {
        firstName: req.query.name || "Maximiliano",
        lastName: "Fabbri",
        age: 52,
        email: "maxi@mail.com",
        phone: "+5411 4444-5555",
        isAdmin: true
    }
    res.status(200).render('index',data)
})

router.get('/chat', (req, res) => {
    const data = messagesLog;

    res.status(200).render('chat',data)
})


router.get('/register', (req, res) => {
    const data = {
    };

    res.status(200).render('register',data)
})

export default router;