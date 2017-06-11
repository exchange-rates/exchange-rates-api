import request from 'request';
import memoizee from 'memoizee';
import config from '../config';

function getExchangeRate(api) {
  return new Promise((resolve, reject) => {
    request(`${config.fxApi}${api}.json?app_id=${config.appId}`, (err, data) => {
      if (err) {
        reject({ body: err });
      } else {
        const { body, statusCode } = data;

        if (statusCode <= 200 && statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject({
            status: statusCode,
            body,
          });
        }
      }
    });
  });
}

export const getHistorical = memoizee(date => getExchangeRate(`historical/${date}`), { promise: 'then' });

export const getLatest = memoizee(() => getExchangeRate('latest'), { promise: 'then' });

export const getCurrencies = memoizee(() => getExchangeRate('currencies'), { promise: 'then' });

