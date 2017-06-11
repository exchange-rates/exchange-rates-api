import express from 'express';
import { getHistorical, getCurrencies, getLatest } from '../services/fx-svc';

const router = express.Router();

router.get('/rate', async (req, res) => {
  try {
    const { rates } = await getLatest();

    res.json(rates);
  } catch ({ status = 500, message }) {
    res.json({
      status,
      code: 'exchange-rate.http.fail',
      message: 'getHistorical failed'
    });
  }
});

router.get('/currencies', async (req, res) => {
  try {
    const currencies = await getCurrencies();

    res.json(currencies);
  } catch ({ status = 500 }) {
    res.json({
      status,
      code: 'exchange-rate.http.fail',
      message: 'getCurrencies failed'
    });
  }
});

router.get('/rate/date/:date', async (req, res) => {
  const date = req.params.date;

  try {
    const { rates } = await getHistorical(date);

    res.json(rates);
  } catch ({ status = 500 }) {
    res.json({
      status,
      code: 'exchange-rate.http.fail',
      message: 'getHistorical failed'
    });
  }
});

export default router;
