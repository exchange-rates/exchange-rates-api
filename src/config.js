import assert from 'assert';

function getEnv(env) {
  const envVar = process.env[env];

  assert.notEqual(envVar, undefined, `Environment: "${env}" not set`);

  return envVar;
}

export default {
  port: process.env.PORT || 7000,
  appId: getEnv('APP_ID'),
  fxApi: getEnv('FX_API')
};
