# 🛡️ Guia Passo a Passo: Proteger a Branch `main`

Siga estes passos para proteger sua branch `main` no GitHub.

---

## Passo 1: Acesse as configurações do repositório

1. Vá para o seu repositório no GitHub (ex: `https://github.com/SEU_USUARIO/XSS_testing`)
2. Clique na aba **Settings** (Configurações) no topo do repositório
   - Se você não vê "Settings", verifique se você é o dono do repositório

---

## Passo 2: Vá para Branch protection rules

1. No menu lateral esquerdo, role até encontrar **Branches**
2. Clique em **Branches**
3. Você verá a seção **Branch protection rules**

---

## Passo 3: Criar a regra de proteção

1. Clique no botão **Add rule** (ou "Add branch protection rule")
2. No campo **Branch name pattern**, digite: `main`
   - Isso protege especificamente a branch `main`
   - Se sua branch padrão for `master`, use `master` aqui

---

## Passo 4: Configurar as proteções

Marque as seguintes opções:

### ✅ Require a pull request before merging
- **Marque esta opção**
- Isso força que todas as mudanças venham via Pull Request
- Opcionalmente, você pode configurar:
  - **Required number of approvals**: Deixe em 0 ou 1 (você pode aprovar seus próprios PRs se quiser)

### ✅ Require conversation resolution before merging
- **Marque esta opção**
- Garante que todas as discussões em PRs sejam resolvidas antes de mesclar

### ✅ Do not allow bypassing the above settings
- **Marque esta opção**
- **IMPORTANTE:** Isso impede até mesmo você (admin) de fazer push direto
- Mesmo você precisará usar Pull Requests

### ⚠️ Opcional (pode deixar desmarcado por enquanto):
- **Require status checks to pass**: Só se você usar CI/CD (GitHub Actions, etc.)
- **Require branches to be up to date**: Pode ser útil, mas não essencial inicialmente
- **Restrict pushes that create files**: Opcional, para evitar criação de arquivos grandes

---

## Passo 5: Salvar a regra

1. Role até o final da página
2. Clique no botão verde **Create** (ou "Create protection rule")
3. Você verá uma mensagem de confirmação

---

## Passo 6: Verificar se funcionou

1. Volte para a página principal do repositório
2. Tente fazer um commit direto na `main` (se quiser testar):
   ```bash
   git checkout main
   git commit --allow-empty -m "test"
   git push origin main
   ```
3. Você deve receber um erro como:
   ```
   ! [remote rejected] main -> main (protected branch hook declined)
   ```
   - ✅ **Isso significa que está funcionando!**

---

## Como trabalhar agora (workflow)

### Para fazer mudanças no seu próprio código:

1. **Crie uma branch:**
   ```bash
   git checkout -b minha-feature
   ```

2. **Faça suas mudanças e commit:**
   ```bash
   git add .
   git commit -m "Minha mudança"
   git push origin minha-feature
   ```

3. **Abra um Pull Request no GitHub:**
   - Vá para o repositório no GitHub
   - Clique em "Pull requests" → "New pull request"
   - Selecione `minha-feature` → `main`
   - Preencha a descrição e clique em "Create pull request"

4. **Revise e mescle:**
   - Revise o código no PR
   - Se estiver tudo ok, clique em "Merge pull request"
   - Confirme clicando em "Confirm merge"

### Para contribuidores externos:

Eles seguirão o mesmo processo, mas farão um **Fork** primeiro:
1. Fork do repositório
2. Clone do fork deles
3. Criam uma branch
4. Fazem mudanças
5. Abrem um Pull Request no seu repositório original
6. Você revisa e aprova

---

## Dúvidas comuns

### "Mas eu sou o dono, por que não posso fazer push direto?"

Porque você marcou "Do not allow bypassing". Isso garante que **tudo** passe por revisão, mantendo o histórico limpo e organizado.

### "E se eu precisar fazer uma correção urgente?"

Você pode:
- Criar uma branch `hotfix`, fazer a mudança, abrir PR e mesclar rapidamente
- Ou temporariamente desabilitar a proteção (não recomendado)

### "Posso aprovar meus próprios PRs?"

Sim! Em repositórios públicos, você pode aprovar seus próprios PRs. Se configurou "Required approvals: 1", você mesmo pode aprovar e mesclar.

---

## ✅ Checklist final

- [ ] Regra criada para branch `main`
- [ ] "Require pull request" marcado
- [ ] "Do not allow bypassing" marcado
- [ ] Testei fazer push direto e foi bloqueado
- [ ] Criei uma branch de teste e abri um PR com sucesso

---

**Pronto!** Sua branch `main` está protegida. 🎉
