import * as express from 'express';
import { models } from './../models/index';

const userPost = (req, res) => (
  req.scope.resolve('userRepository').create(req.body)
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

const userGet = (req, res) => (
  req.scope.resolve('userRepository').fetch()
  .then(result => (
    res.status(200).send({ data: result.data })
  ))
  .catch(err => (
    res.status(500).send({ errors: err.message })
  ))
);

const userGetById = (req, res) => (
  req.scope.resolve('userRepository').fetchSingle(req.params.userid)
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

const userPut = (req, res) => (
  req.scope.resolve('userRepository').update(req.params.userid, req.body)
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

const userDelete = (req, res) => (
  req.scope.resolve('userRepository').deleteSingle(req.params.userid, req.body)
  .then(result => (
    res.status(200).send(result.data)
  ))
  .catch(err => (
    res.status(500).send({ errors: err })
  ))
);

const router = express.Router();
router.post('/user', userPost);
router.get('/user', userGet);
router.get('/user/:userid', userGetById);
router.put('/user/:userid', userPut);
router.delete('/user/:userid', userDelete);

module.exports = router;
