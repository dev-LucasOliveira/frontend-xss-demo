import { useRef, useState } from 'react'
import XssDemoExamples from './XssDemoExamples'
import './TodoApp.css'

/**
 * INSECURE COMPONENT — XSS-VULNERABLE VERSION
 *
 * WARNING: This component is intentionally insecure.
 *
 * It demonstrates XSS by using dangerouslySetInnerHTML with no sanitization.
 * Any HTML typed into the input is rendered directly in the DOM.
 *
 * NEVER use this in production. For educational purposes only.
 */
function InsecureTodoApp() {
  const [todos, setTodos] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      // UNSAFE: value is stored without sanitization
      setTodos([...todos, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div className="todo-app">
      <div className="warning-banner insecure">
        <h2>Insecure version — XSS risk demo</h2>
        <p>
          This version is vulnerable to XSS. Input is rendered as raw HTML with no
          sanitization. <strong>Do not use this in production.</strong>
        </p>
      </div>

      <div className="todo-section">
        <h3>My todos</h3>
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='e.g. <img src="x" onerror="alert(1)"> (demo)'
            className="todo-input"
          />
          <button onClick={handleAddTodo} className="add-button">
            Add
          </button>
        </div>

        <XssDemoExamples
          variant="insecure"
          onUseExample={(payload) => {
            setInputValue(payload)
            requestAnimationFrame(() => inputRef.current?.focus())
          }}
        />

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {/*
                XSS: dangerouslySetInnerHTML renders HTML without sanitization.
                Malicious script or HTML may execute.
              */}
              <span dangerouslySetInnerHTML={{ __html: todo }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default InsecureTodoApp
