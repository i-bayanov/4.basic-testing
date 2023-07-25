import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const callback = jest.fn();
const timeout = 30 * 1000;

beforeAll(() => jest.useFakeTimers());

afterAll(() => jest.useRealTimers());

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllTimers();
});

describe('doStuffByTimeout', () => {
  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    const NUMBER_OF_CALLS = 4;
    const SOME_EXTRA_TIME = 100; // in milliseconds

    jest.advanceTimersByTime(NUMBER_OF_CALLS * timeout + SOME_EXTRA_TIME);

    expect(callback).toHaveBeenCalledTimes(NUMBER_OF_CALLS);
  });
});

describe('readFileAsynchronously', () => {
  const somePath = '/some/path';
  const fileContent = 'Awesome file content';

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(somePath);

    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), somePath);
  });

  test('should return null if file does not exist', async () => {
    fs.existsSync = jest.fn(() => false);

    expect(await readFileAsynchronously(somePath)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    fs.existsSync = jest.fn(() => true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementationOnce(() => Promise.resolve(Buffer.from(fileContent)));

    expect(await readFileAsynchronously(somePath)).toBe(fileContent);
  });
});
