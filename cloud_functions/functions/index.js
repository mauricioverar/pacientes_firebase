const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors');

const router = express();
// Automatically allow cross-origin requests
router.use(cors({ origin: true }));

router.get('/patient/:id', async(req, res) => {///id del usuario
    const patient = await
    admin.firestore().collection('pacientes').doc(req.params.id).get();
    res.send(patient);
});

router.get('/patients', async(req, res) => {//trae todos los pacientes
    const patients = await admin.firestore().collection('pacientes').get();
    var lista = [];
    patients.docs.forEach(doc => {
    lista.push({ id: doc.id, data: doc.data() });
    });
    res.send(lista);
});

router.post('/patient', async(req, res) => {// post para crear
    const patient = await admin.firestore().collection('pacientes')
    .add(req.body);
    res.send(patient);
    });
    router.put('/patient/:id', async(req, res) => {// put para actualizar
    const patient = await
    admin.firestore().collection('pacientes').doc(req.params.id)
    .update(req.body);
    res.send(patient);
    });
    router.delete('/patient/:id', async(req, res) => {// delete para borrar
    const patient = await
    admin.firestore().collection('pacientes').doc(req.params.id).delete();
    res.send(patient);
});

    // Expose Express API as a single Cloud Function:
exports.test = functions.https.onRequest(router);// estas son las funciones a importar
