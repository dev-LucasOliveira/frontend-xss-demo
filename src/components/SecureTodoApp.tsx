import { useState } from 'react'
import DOMPurify from 'dompurify'
import './TodoApp.css'

/**
 * COMPONENTE SEGURO - VERSÃO PROTEGIDA CONTRA XSS
 * 
 * ✅ Este componente demonstra a forma correta de prevenir XSS
 * 
 * Este componente usa DOMPurify para sanitizar o conteúdo HTML
 * antes de renderizá-lo, removendo scripts e outros elementos
 * perigosos que poderiam ser explorados em ataques XSS.
 * 
 * Esta é a abordagem recomendada para produção.
 */
function SecureTodoApp() {
  const [todos, setTodos] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      // ✅ SEGURO: Adiciona o valor (será sanitizado na renderização)
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
   * Sanitiza o conteúdo HTML usando DOMPurify
   * Remove scripts, event handlers e outros elementos perigosos
   */
  const sanitizeContent = (content: string): string => {
    return DOMPurify.sanitize(content, {
      // Permite apenas tags HTML básicas e seguras
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href', 'title'],
    })
  }

  return (
    <div className="todo-app">
      <div className="warning-banner secure">
        <h2>✅ Versão Segura — Conteúdo Sanitizado</h2>
        <p>
          Esta versão usa DOMPurify para sanitizar o conteúdo antes de renderizar,
          prevenindo ataques XSS. <strong>Esta é a abordagem recomendada!</strong>
        </p>
      </div>

      <div className="todo-section">
        <h3>Meus TODOs</h3>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite um TODO e pressione Enter..."
            className="todo-input"
          />
          <button onClick={handleAddTodo} className="add-button">
            Adicionar
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {/* 
                ✅ PROTEÇÃO XSS: 
                DOMPurify sanitiza o HTML antes de renderizar, removendo
                scripts e outros elementos perigosos. Mesmo que alguém tente
                inserir código malicioso, ele será neutralizado.
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
