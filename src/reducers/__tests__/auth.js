import reducer, * as selectors from '../auth';

describe('auth selectors', () => {
  describe('isLoggedIn', () => {
    it('should return false if activeAccount is not set', () => {
      const state = {};
      expect(selectors.isLoggedIn(state)).toBeFalse;
    });
    it('should return true if activeAccount is set', () => {
      const state = { activeAccount: 'abc' };
      expect(selectors.isLoggedIn(state)).toBeTrue;
    });
  });

  describe('getAccounts', () => {
    it('should return an empty list if no accounts are set', () => {
      const state = { accounts: {} };
      expect(selectors.getAccounts(state)).toEqual([]);
    });
    it('should return an list accounts', () => {
      const state = {
        accounts: {
          abc: { posting: '123' },
          bob: { posting: '456' }
        }
      };
      expect(selectors.getAccounts(state)).toEqual([
        { username: 'abc', keys: { posting: '123' } },
        { username: 'bob', keys: { posting: '456' } }
      ]);
    });
  });

  describe('activeAccountName', () => {
    it('should return an empty string if no account is set', () => {
      const state = { activeAccount: undefined };
      expect(selectors.activeAccountName(state)).toEqual('');
    });
    it('should return the active account name', () => {
      const state = { activeAccount: 'abc' };
      expect(selectors.activeAccountName(state)).toEqual('abc');
    });
  });
});
