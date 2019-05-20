const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword()],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      async function initUserData(context) {
        context.app.service('/users').emit('initStart');
        await context.app.service('/knights').create({
          _id: context.result._id,
          hp: 50,
          wp: 50,
          appearance: 'KnightMale',
          willGem: 0
        });
        await context.app.service('/battles').create({
          _id: context.result._id,
          level: 1,
          levelProgress: 1,
          monsterTypeId: 'test',
          hp: 30
        });
        context.app.service('/users').emit('initComplete');
        // context.app.service('/game-progress').nextLevel();
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
