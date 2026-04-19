import { XSS_DEMO_EXAMPLES } from '../data/xssDemoExamples'
import './XssDemoExamples.css'

export type XssDemoExamplesVariant = 'insecure' | 'secure'

type Props = {
  /** Fills the todo input with this payload (user still presses Add). */
  onUseExample: (payload: string) => void
  variant: XssDemoExamplesVariant
}

function XssDemoExamples({ onUseExample, variant }: Props) {
  return (
    <section className="xss-examples" aria-label="XSS demo payloads">
      <div className="xss-examples__header">
        <h4 className="xss-examples__title">Try these examples</h4>
        <p className="xss-examples__hint">
          {variant === 'insecure' ? (
            <>
              Load a payload into the input, then press <strong>Add</strong>. On this route,
              HTML runs as written—compare with the secure route.
            </>
          ) : (
            <>
              Load the same payloads here; <strong>DOMPurify</strong> should strip scripts and
              handlers. Compare with the insecure route to see the difference.
            </>
          )}
        </p>
      </div>
      <ul className="xss-examples__list">
        {XSS_DEMO_EXAMPLES.map((ex) => (
          <li key={ex.id} className="xss-examples__card">
            <div className="xss-examples__card-top">
              <span className="xss-examples__badge">{ex.docRef}</span>
              <h5 className="xss-examples__card-title">{ex.title}</h5>
            </div>
            <p className="xss-examples__card-desc">{ex.description}</p>
            <div className="xss-examples__explain">
              <p className="xss-examples__explain-block">
                <span className="xss-examples__explain-label">What you’ll see</span>
                {ex.whatYouSee}
              </p>
              <p className="xss-examples__explain-block xss-examples__explain-block--risk">
                <span className="xss-examples__explain-label">What could go wrong</span>
                {ex.whatCouldGoWrong}
              </p>
            </div>
            <button
              type="button"
              className="xss-examples__btn"
              onClick={() => onUseExample(ex.payload)}
            >
              Load into input
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default XssDemoExamples
