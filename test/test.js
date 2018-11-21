const test = require('ava');
const proxyquire = require('proxyquire');
const _ = require('lodash');

const {beforeEach, afterEach} = require('./helpers');

test.beforeEach(beforeEach);
test.afterEach(afterEach);

function createFakeResponse(source) {
  return {
    data: {
      propertySources: [{source}]
    }
  };
}

test('async > axios gets a error', async t => {
  const client = proxyquire('..', {
    axios: () => Promise.reject(new Error('Teste'))
  });
  try {
    await client.load();
  } catch (err) {
    t.is(err.message, 'Teste');
  }
});

test('sync > axios gets a error', t => {
  const client = proxyquire('..', {
    axios: () => Promise.reject(new Error('Teste'))
  });
  try {
    client.loadSync({});
  } catch (err) {
    t.is(err.message, 'Teste');
  }
});

test('sync > success', t => {
  process.env.CONFIG_SERVER_URL = 'http://teste/';
  process.env.CONFIG_SERVER_APP = 'teste';
  process.env.CONFIG_SERVER_ENV = 'production';

  const client = proxyquire('..', {
    axios: url => Promise.resolve(createFakeResponse({
      'Config.Server.Url': url
    }))
  });
  const itens = client.loadSync();
  t.is(itens.CONFIG_SERVER_URL, 'http://teste/teste/production');
});

test('async > no results', async t => {
  process.env.CONFIG_SERVER_URL = 'http://teste/';
  process.env.CONFIG_SERVER_APP = 'teste';
  process.env.CONFIG_SERVER_ENV = 'production';

  const client = proxyquire('..', {
    axios: () => Promise.resolve({data: {propertySources: []}})
  });
  const itens = await client.load();
  t.is(_.keys(itens).length, 0);
});

test('async > axios uses env vars', async t => {
  process.env.CONFIG_SERVER_URL = 'http://teste/';
  process.env.CONFIG_SERVER_APP = 'teste';
  process.env.CONFIG_SERVER_ENV = 'production';

  const client = proxyquire('..', {
    axios: url => Promise.resolve(createFakeResponse({
      'Config.Server.Url': url
    }))
  });
  const itens = await client.load();
  t.is(itens.CONFIG_SERVER_URL, 'http://teste/teste/production');
});

test('async > stringify contents', async t => {
  process.env.CONFIG_SERVER_URL = 'http://teste/';
  process.env.CONFIG_SERVER_APP = 'teste';
  process.env.CONFIG_SERVER_ENV = 'production';

  const client = proxyquire('..', {
    axios: url => Promise.resolve(createFakeResponse({
      'Config.Server.Url[0]': url
    }))
  });
  const itens = await client.load({stringify: true});
  t.is(itens.CONFIG_SERVER_URL, JSON.stringify(['http://teste/teste/production']));
});

test('async > array no stringify', async t => {
  process.env.CONFIG_SERVER_URL = 'http://teste/';
  process.env.CONFIG_SERVER_APP = 'teste';

  const client = proxyquire('..', {
    axios: url => Promise.resolve(createFakeResponse({
      'Config.Server.Url[0]': url
    }))
  });
  const itens = await client.load();
  t.is(itens.CONFIG_SERVER_URL[0], 'http://teste/teste/test');
});
