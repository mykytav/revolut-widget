import { getTargetCurrencyRate } from './exchangeRateService';
import { Currencies, RATES_API_URL } from '../const';

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('getTargetCurrencyRate', () => {
  it('should call fetch single symbol for base currency', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        rates: {
          USD: 1.2345,
          EUR: 1.2345,
          GPB: 1.2345,
          RUB: 1.2345,
        },
      }),
    });

    await getTargetCurrencyRate(Currencies.EUR, Currencies.USD);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenLastCalledWith(
      `${RATES_API_URL}?base=${Currencies.EUR}&symbols=${Currencies.USD}`
    );

    await getTargetCurrencyRate(Currencies.USD, Currencies.EUR);

    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenLastCalledWith(
      `${RATES_API_URL}?base=${Currencies.USD}&symbols=${Currencies.EUR}`
    );

    await getTargetCurrencyRate(Currencies.GBP, Currencies.RUB);

    expect(window.fetch).toHaveBeenCalledTimes(3);
    expect(window.fetch).toHaveBeenLastCalledWith(
      `${RATES_API_URL}?base=${Currencies.GBP}&symbols=${Currencies.RUB}`
    );
  });
});
