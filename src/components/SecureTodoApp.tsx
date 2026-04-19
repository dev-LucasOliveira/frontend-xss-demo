import { useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import XssDemoExamples from './XssDemoExamples'
import './TodoApp.css'

/**
 * SECURE COMPONENT — XSS-PROTECTED VERSION
 *
 * This component shows the correct way to reduce XSS risk when HTML is needed.
 * It uses DOMPurify to sanitize content before rendering, stripping scripts and
 * other dangerous elements.
 *
 * This is the recommended approach for production when rich HTML is required.
 */
function SecureTodoApp() {
  const [todos, setTodos] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      // SAFE: value is sanitized before render
      setTodos([...todos, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  /**
   * Sanitize HTML with DOMPurify — removes scripts, event handlers, etc.
   */
  const sanitizeContent = (content: string): string => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href', 'title'],
    })
  }

  return (
    <div className="todo-app">
      <div className="warning-banner secure">
        <h2>Secure version — sanitized content</h2>
        <p>
          This version uses DOMPurify to sanitize content before rendering, which
          helps prevent XSS. <strong>This is the recommended approach.</strong>
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
            placeholder="Type a todo and press Enter..."
            className="todo-input"
          />
          <button onClick={handleAddTodo} className="add-button">
            Add
          </button>
        </div>

        <XssDemoExamples
          variant="secure"
          onUseExample={(payload) => {
            setInputValue(payload)
            requestAnimationFrame(() => inputRef.current?.focus())
          }}
        />

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {/*
                XSS mitigation: DOMPurify strips dangerous markup before render.
              */}
              <span dangerouslySetInnerHTML={{ __html: sanitizeContent(todo) }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SecureTodoApp
