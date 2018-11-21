function beforeEach() {
  delete process.env.CONFIG_SERVER_URL;
  delete process.env.CONFIG_SERVER_ENV;
  delete process.env.CONFIG_SERVER_APP;
}

function afterEach() {}

module.exports = {beforeEach, afterEach};
