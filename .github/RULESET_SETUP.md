# 🛡️ Configuração do Ruleset (Nova Interface do GitHub)

Guia específico para a nova interface de **Rulesets** do GitHub.

---

## Campos para preencher:

### 1. **Ruleset Name** ⭐ (obrigatório)
```
Main Branch Protection
```
Ou qualquer nome descritivo como:
- `Protect main branch`
- `Main branch rules`

---

### 2. **Enforcement status**
Mude de **"Disabled"** para:
```
✅ Enabled
```
Isso ativa a proteção.

---

### 3. **Target branches** ⭐ (obrigatório)

Clique em **"Add target"** e configure:

- **Branch name pattern**: `main`
- Ou use o padrão: `main` (exatamente assim)

Isso aplica a regra apenas na branch `main`.

---

### 4. **Bypass list**
**Deixe vazio** (ou adicione apenas se você realmente precisar de exceções).

Se você quiser que nem mesmo você possa fazer bypass:
- **Não adicione nada** na bypass list
- Isso garante que todos (incluindo você) sigam as regras

---

### 5. **Rules - Marque estas opções:**

#### ✅ **Require a pull request before merging**
**MARQUE ESTA!** É a mais importante.
- Isso força que todas as mudanças venham via Pull Request
- Você pode configurar quantas aprovações são necessárias (deixe 0 ou 1 se você aprovar seus próprios PRs)

#### ✅ **Block force pushes**
Já está marcado - mantenha assim.

#### ✅ **Restrict deletions**
Já está marcado - mantenha assim.

#### ✅ **Restrict updates** (recomendado)
**MARQUE ESTA TAMBÉM!**
- Isso impede push direto na branch
- Complementa o "Require pull request"

#### ⚪ **Outras opções** (opcional, pode deixar desmarcado):
- Restrict creations
- Require linear history
- Require signed commits
- Require status checks (só se usar CI/CD)
- Require deployments
- Require code scanning
- Require code quality
- Copilot options

---

## Resumo do que marcar:

```
✅ Ruleset Name: "Main Branch Protection"
✅ Enforcement status: Enabled
✅ Target branches: Add target → "main"
✅ Bypass list: Deixar vazio
✅ Rules:
   ✅ Require a pull request before merging
   ✅ Block force pushes
   ✅ Restrict deletions
   ✅ Restrict updates
```

---

## Depois de preencher:

1. Role até o final da página
2. Clique no botão **"Create"**
3. Pronto! Sua branch `main` está protegida.

---

## Teste:

Tente fazer push direto:
```bash
git push origin main
```

Se aparecer erro, está funcionando! ✅
