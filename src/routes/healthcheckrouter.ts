import * as express from 'express';
import * as pkg from './../../package.json';

const healthCheckGet = (req, res) => {
  if (req.headers['content-type'] === 'application/json') {
    return res.status(200).send({ version: (<any>pkg).version });
  }

  return res.status(200).send(`<html>
                                 <body>
                                   Im healthy running version <i><b>${(<any>pkg).version}</b></i>!
                                 </body>
                               </html>`);
};

const router = express.Router();
router.get('/_health', healthCheckGet);

module.exports = router;
