# Como proteger a branch `main`

Este repositório está configurado para proteger a branch `main` contra commits diretos. Todas as mudanças devem passar por **Pull Requests** (PRs) que serão revisados antes de serem mesclados.

> **✅ Gratuito para repositórios públicos**  
> A proteção de branches está disponível **sem custo** para repositórios públicos no GitHub. Não é necessário GitHub Pro ou qualquer plano pago.

## 🚀 Guia rápido

**Para um guia passo a passo detalhado, veja: [SETUP_BRANCH_PROTECTION.md](./SETUP_BRANCH_PROTECTION.md)**

### Resumo rápido:

1. **Settings** → **Branches** → **Add rule**
2. **Branch name pattern**: `main`
3. Marque:
   - ✅ **Require a pull request before merging**
   - ✅ **Require conversation resolution before merging**
   - ✅ **Do not allow bypassing the above settings** ⚠️ (importante!)
4. Clique em **Create**

### Resultado

- Ninguém (nem você) pode fazer `git push origin main` diretamente.
- Todas as mudanças devem vir via Pull Requests.
- Você revisa e aprova antes de mesclar.
- O histórico fica limpo e controlado.

## Alternativa: usar outra branch como padrão

Se preferir, você pode:

1. Criar uma branch `develop` ou `contributions`.
2. Tornar essa branch a padrão para PRs.
3. Manter `main` protegida e mesclar manualmente quando quiser.

## Para contribuidores

Se você quer contribuir:

1. Faça um **Fork** do repositório.
2. Crie uma branch: `git checkout -b minha-contribuicao`.
3. Faça suas mudanças e commit: `git commit -m "Descrição clara"`.
4. Push para seu fork: `git push origin minha-contribuicao`.
5. Abra um **Pull Request** aqui no repositório original.

---

*Esta configuração protege o código e mantém o repositório organizado para uso educacional.*
