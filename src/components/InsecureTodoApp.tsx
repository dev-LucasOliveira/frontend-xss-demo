import { useState } from 'react'
import './TodoApp.css'

/**
 * COMPONENTE INSEGURO - VERSÃO VULNERÁVEL A XSS
 * 
 * ⚠️ ATENÇÃO: Este componente é propositalmente inseguro!
 * 
 * Este componente demonstra uma vulnerabilidade XSS ao usar
 * dangerouslySetInnerHTML sem nenhuma sanitização. Qualquer HTML
 * inserido no input será renderizado diretamente no DOM.
 * 
 * NUNCA use isso em produção!
 * Este código é apenas para fins educacionais.
 */
function InsecureTodoApp() {
  const [todos, setTodos] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      // ⚠️ PROBLEMA: Adiciona o valor diretamente sem sanitização
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
        <h2>⚠️ Versão Insegura — Demonstração de Risco XSS</h2>
        <p>
          Esta versão é vulnerável a ataques XSS. O conteúdo inserido é renderizado
          diretamente como HTML sem sanitização. <strong>Não use isso em produção!</strong>
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
                ⚠️ VULNERABILIDADE XSS: 
                dangerouslySetInnerHTML renderiza HTML diretamente sem sanitização.
                Qualquer script ou HTML malicioso será executado!
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
