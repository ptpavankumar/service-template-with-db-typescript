import { models } from './../models/index';

export class UserRepository {
  knex: any
  constructor({ knex }) {
    this.knex = knex;
  }

  create(user) {
    const validationInfo = models.userDTO.validate(user);
    if (validationInfo.error) {
      return Promise.reject(new models.ValidationError(validationInfo.error));
    }

    return this.knex('user').insert({
      name: user.name,
      dateofbirth: user.dob,
      gender: user.sex,
      email: user.email,
    }, 'id')
    .then(userids => (
      { data: { id: userids[0] } }
    ))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      throw new Error(`${models.errorTypes.ServerError}:: ${err.message}`);
    });
  }

  fetch() {
    return this.knex('user').select()
      .then(collections => (
        { data: collections }
      ))
      .catch((err) => {
        console.error(err); // eslint-disable-line no-console
        throw new Error(`${models.errorTypes.ServerError}:: ${err.message}`);
      });
  }

  fetchSingle(userid) {
    return this.knex('user').select().where({ id: userid })
      .then((users) => {
        if (users.length <= 0) {
          throw new Error(models.errorTypes.Unavailable);
        }

        return { data: users[0] };
      })
      .catch((err) => {
        if (err.message === models.errorTypes.Unavailable) {
          throw err;
        }
        console.error(err); // eslint-disable-line no-console
        throw new Error(`${models.errorTypes.ServerError}: ${err.code}`);
      });
  }

  /* eslint-disable */
  update(userid, user) {
    return Promise.reject(new Error(models.errorTypes.NotImplemented))
  }
  /* eslint-enable */

  deleteSingle(userid) {
    return this.knex('user').delete().where({ id: userid })
      .then(users => (
        { data: users[0] }
      ))
      .catch((err) => {
        throw new Error(`${models.errorTypes.ServerError}:: ${err.message}`);
      });
  }
}
