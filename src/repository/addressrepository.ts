import { models } from './../models/index';

export class AddressRepository {
  knex: any
  constructor({ knex }) {
    this.knex = knex;
  }

  create(address) {
    const validationInfo = models.addressDTO.validate(address);
    if (validationInfo.errors) {
      return Promise.reject(new models.ValidationError(validationInfo.error));
    }

    return this.knex('address').insert({
      number: address.number,
      name: address.name,
      suburb: address.suburb,
      state: address.state,
      country: address.country,
    }, 'id')
    .then(addressids => (
      { data: addressids[0] }
    ))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      throw new Error(`${models.errorTypes.ServerError}:: ${err.message}`);
    });
  }

  fetch() {
    return this.knex('address').select()
      .then(collections => (
        { data: collections }
      ))
      .catch((err) => {
        console.error(err); // eslint-disable-line no-console
        throw new Error(`${models.errorTypes.ServerError}:: ${err.message}`);
      });
  }

  fetchSingle(addressid) {
    return this.knex('address').select().where({ id: addressid })
      .then((addresses) => {
        if (addresses.length <= 0) {
          throw new Error(models.errorTypes.Unavailable);
        }

        return { data: addresses[0] };
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
  update(addressid, address) {
    return Promise.reject(new Error(models.errorTypes.NotImplemented));
  }
  /* eslint-enable */

  deleteSingle(addressid) {
    return this.knex('address').delete().where({ id: addressid })
      .then(addresses => (
        { data: addresses[0] }
      ))
      .catch((err) => {
        throw new Error(`${models.errorTypes.ServerError}:: ${err.message}`);
      });
  }
}
