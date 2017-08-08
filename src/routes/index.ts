const healthcheckRouter = require('./healthcheckrouter');
const userRouter = require('./userrouter');
const addressRoute = require('./addressrouter');

export const routes = [
  healthcheckRouter,
  userRouter,
  addressRoute,
];
