import test from 'ava';
import { noCallThru } from 'proxyquire';
import nock from 'nock';

const proxyquire = noCallThru();

const fxApi = 'http://fx-api.com/';
const appId = '123';

const { getHistorical, getLatest, getCurrencies } = proxyquire('./fx-svc', {
 '../config': {
   fxApi,
   appId
 }
});

function setupNock(path, response, status = 200) {
  return nock(fxApi)
    .get(path)
    .query({
      app_id: appId
    })
    .reply(status, {
      data: response
    });
}

test.beforeEach(() => {
  setupNock('/historical/2017-05-01.json', 'historical');
  setupNock('/currencies.json', 'currencies');
  setupNock('/latest.json', 'latest');
});

test.afterEach(() => {
  nock.cleanAll();
});

test('should call the correct historical api', async t => {
  const data = await getHistorical('2017-05-01');

  t.deepEqual(data, {
    data: 'historical'
  });
});

test('should call the correct currency api', async t => {
  const data = await getCurrencies();

  t.deepEqual(data, {
    data: 'currencies'
  });
});

test('should call the correct latest api', async t => {
  const data = await getLatest();

  t.deepEqual(data, {
    data: 'latest'
  });
});