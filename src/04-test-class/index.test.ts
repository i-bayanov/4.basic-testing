import lodash from 'lodash';

import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  afterAll(() => jest.restoreAllMocks());

  let bankAccount: BankAccount;
  let anotherBankAccount: BankAccount;

  test('should create account with initial balance', () => {
    bankAccount = getBankAccount(100);
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(101)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    anotherBankAccount = getBankAccount(50);
    expect(() => bankAccount.transfer(101, anotherBankAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(10, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(100).getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(100).getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    expect(bankAccount.transfer(50, anotherBankAccount).getBalance()).toBe(50);
    expect(anotherBankAccount.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 42);
    expect(await bankAccount.fetchBalance()).toBe(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 42);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', () => {
    lodash.random = jest.fn(() => 0);
    expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
