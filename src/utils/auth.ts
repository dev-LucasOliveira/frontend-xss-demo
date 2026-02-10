/**
 * Utilitário para gerenciar o token de autenticação falso
 * usado apenas para fins educacionais
 */

const AUTH_TOKEN_KEY = 'auth_token';
const FAKE_TOKEN_VALUE = 'fake_token_123';

/**
 * Inicializa o token falso no localStorage se ainda não existir
 * Este token é usado apenas para demonstrar como o frontend
 * lê e usa tokens em requests autenticadas
 */
export function initializeAuthToken(): void {
  if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.setItem(AUTH_TOKEN_KEY, FAKE_TOKEN_VALUE);
    console.log('Token falso inicializado no localStorage para fins educacionais');
  }
}

/**
 * Obtém o token do localStorage
 * @returns O token armazenado ou null se não existir
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}
