const axios = require('axios');
const deasync = require('deasync');
const _ = require('lodash');

const idxFilterRegex = /\[\d{1,}\]/g;

const handleArrValue = (newName, envObj, value, stringify) => {
  if (newName.search(idxFilterRegex) > -1) {
    newName = newName.replace(idxFilterRegex, '');
    let actualArr = envObj[newName] || (stringify ? '[]' : []);
    if (stringify) {
      actualArr = JSON.parse(actualArr);
    }
    actualArr.push(value);
    return {newName, value: actualArr};
  }
  return {newName, value};
};

const load = async config => {
  config = {server: {
    url: process.env.CONFIG_SERVER_URL
  },
  env: process.env.CONFIG_SERVER_ENV || process.env.NODE_ENV,
  application: {
    name: process.env.CONFIG_SERVER_APP
  },
  prefix: '',
  stringify: false, ...config || {}};
  const url = `${config.server.url}${config.application.name}/${config.env}`;
  const response = await axios(url);
  const items = response.data.propertySources[0].source;
  const envObj = {};
  const {stringify} = config;
  _.keys(items).forEach(key => {
    const keyName = key.replace(/\./g, '_').toUpperCase();
    const newName = `${config.prefix}${keyName}`;
    const obj = handleArrValue(newName, envObj, items[key], stringify);
    envObj[obj.newName] = stringify ? JSON.stringify(obj.value) : obj.value;
  });
  return envObj;
};

const fnLoadAsync = async (config, cb) => {
  try {
    if (!cb) {
      cb = config;
      config = {};
    }
    const res = await load(config);
    cb(null, res);
  } catch (err) {
    cb(err);
  }
};

module.exports = {
  load,
  loadSync: deasync(fnLoadAsync)
};
