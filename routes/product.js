var express = require('express');
const model = require('../models/agenda');
const imageRepository = require('../repository/aws');
const aws = new imageRepository();
var router = express.Router();
const multer = require('multer');
const { S3 } = require('aws-sdk');
const upload = multer();

/* GET home page. */
router.get('/', function (req, res, next) {

  model.find((err, agen) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { title: 'Sistema de Agenda', agen: agen });
    }
  });

});

router.get('/update:id', function (req, res, next) {


  const id = req.params.id

  model.findById(id, (err, agen) => {
    if (err) return console.log(err);
    console.log(agen);
    res.render('update', { title: 'Sistema de Agenda', agen: agen });
  });


});

router.post('/uploadImage:id', upload.single('imagen'), async (req, res, next) => {
  const id = req.params.id
  const imagen = req.file.buffer;
  const type = req.file.mimetype
  const key = `${id}.${type.split('/')[1]}`
  //const imageUrl = `https://azgendabucket.s3.amazonaws.com/${key}`
  await aws.uploadImage(id, imagen, type);
  model.findOneAndUpdate({ id: id }, { imagen: key }, (err, response) => {
    if (err) return console.log(err);
  });

  return res.redirect('/');
});

router.post('/updateImage:id', upload.single('imagenupdate'), async (req, res, next) => {
  const id = req.params.id
  const imagen = req.file.buffer;
  const type = req.file.mimetype
  const key = `${id}.${type.split('/')[1]}`
  const keydelete = req.body.imagendelete;

  await aws.deleteImage(keydelete)

  await aws.uploadImage(id, imagen, type);

  model.findOneAndUpdate({ id: id }, { imagen: key }, (err, response) => {
    if (err) return console.log(err);
  });

  return res.redirect('/');
});

router.post('/create', function (req, res, next) {

  const data = {
    id: req.body.id,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    fecha_nac: req.body.fecha_nac,
    imagen: '',
  }

  model.create(data, (err, agen) => {
    if (err) {
      console.log(err);
    } else {
      console.log({ data: agen });
      res.redirect('/')
    }
  });

});

router.post('/delete:id', async function (req, res, next) {

  const id = req.params.id;
  const key = req.body.imagendelete;

  await aws.deleteImage(key);

  model.remove({
    _id: id
  }, function (err) {
    if (err) return console.log(err);
  });

  return res.redirect('/');

});

router.post('/updateproduct:id', function (req, res) {

  const id = req.params.id;

  const filter = { _id: id };
  const dataUpdate = {
    id: req.body.id,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    fecha_nac: req.body.fecha_nac,
  };

  model.findOneAndUpdate(filter, dataUpdate, (err, response) => {
    if (err) return console.log(err);

    res.redirect('/');

  });

});

module.exports = router;
