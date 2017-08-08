import * as express from 'express';
import { models } from './../models/index';

const addressPost = (req, res) => (
  req.scope.resolve('addressRepository').create(req.body)
    .then(result => (
      res.status(201).send({ data: result.data })
    ))
    .catch((err) => {
      if (err instanceof models.ValidationError) {
        return res.status(400).send({
          errors: err.message,
        });
      }

      return res.status(500).send({ errors: err.code });
    })
);

const addressGet = (req, res) => (
  req.scope.resolve('addressRepository').fetch()
    .then(result => (
      res.status(200).send({ data: result.data })
    ))
    .catch(err => (
      res.status(500).send({ errors: err.message })
    ))
);

const addressGetById = (req, res) => (
  // console.log(req.scope.registrations)
  req.scope.resolve('addressRepository').fetchSingle(req.params.addressid)
    .then(result => (
      res.status(200).send({ data: result.data })
    ))
    .catch((err) => {
      if (err.message === models.errorTypes.Unavailable) {
        return res.status(404).send();
      }

      return res.status(500).send({ errors: err.message });
    })
);

const addressPut = (req, res) => (
  req.scope.resolve('addressRepository').update(req.params.addressid, req.body)
    .then(result => (
      res.status(200).send(result.data)
    ))
    .catch((err) => {
      if (err.message === models.errorTypes.Unavailable) {
        return res.status(404).send();
      }

      return res.status(500).send({ errors: err.message });
    })
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console
      return res.status(500).send({ errors: err });
    })
);

const addressDelete = (req, res) => (
  req.scope.resolve('addressRepository').deleteSingle(req.params.addressid, req.body)
    .then(result => (
      res.status(200).send(result.data)
    ))
    .catch(err => (
      res.status(500).send({ errors: err })
    ))
);

const router = express.Router();
router.post('/address', addressPost);
router.get('/address', addressGet);
router.get('/address/:addressid', addressGetById);
router.put('/address/:addressid', addressPut);
router.delete('/address/:addressid', addressDelete);

module.exports = router;
