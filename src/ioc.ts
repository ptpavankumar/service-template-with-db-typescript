import * as awilix from 'awilix';
import { repositories } from "./repository/index";

const container = awilix.createContainer();

// Register all the repositories
container.registerClass({ addressRepository: repositories.AddressRepository });
container.registerClass({ userRepository: repositories.UserRepository });

module.exports = container;
