/**
 * Fake auth token helpers for educational demos only.
 */

const AUTH_TOKEN_KEY = 'auth_token'
const FAKE_TOKEN_VALUE = 'fake_token_123'

/**
 * Seeds a fake token in localStorage if missing.
 * Used only to demonstrate how frontends read and attach tokens.
 */
export function initializeAuthToken(): void {
  if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.setItem(AUTH_TOKEN_KEY, FAKE_TOKEN_VALUE)
    console.log('Fake token initialized in localStorage (educational demo only)')
  }
}

/**
 * Returns the stored token or null.
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}
