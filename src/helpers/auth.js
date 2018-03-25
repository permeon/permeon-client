/**
 * Selects a active account from accounts
 * @param accounts - and object of {username:[keys]}
 * @returns string - a username if accounts is not empty otherwise an empty string
 */
export function selectActiveAccount(accounts) {
  return accounts.length > 0 ? accounts[0].username : '';
}
