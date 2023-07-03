import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const url = '/some-url';
const body = { data: 'some-data' };

describe('throttledGetDataFromApi', () => {
  beforeAll(() => jest.useFakeTimers());

  afterAll(() => jest.useRealTimers());

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    axios.Axios.prototype.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(body));

    await throttledGetDataFromApi(url);

    jest.runAllTimers();

    expect(createSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementationOnce(() => Promise.resolve(body));

    await throttledGetDataFromApi(url);

    jest.runAllTimers();

    expect(getSpy).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    axios.Axios.prototype.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(body));

    expect(await throttledGetDataFromApi(url)).toBe(body.data);

    jest.runAllTimers();
  });
});
