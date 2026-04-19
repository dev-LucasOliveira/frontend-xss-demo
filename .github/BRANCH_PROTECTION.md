# How to protect the `main` branch

This repository is set up so the `main` branch is protected from direct pushes. All changes must go through **Pull Requests** (PRs) that are reviewed before they are merged.

> **Free for public repositories**  
> Branch protection is available **at no cost** for public repositories on GitHub. You do not need GitHub Pro or any paid plan.

## Quick guide

**For a detailed step-by-step walkthrough, see: [SETUP_BRANCH_PROTECTION.md](./SETUP_BRANCH_PROTECTION.md)**

### Short summary

1. **Settings** → **Branches** → **Add rule**
2. **Branch name pattern**: `main`
3. Enable:
   - **Require a pull request before merging**
   - **Require conversation resolution before merging**
   - **Do not allow bypassing the above settings** (important)
4. Click **Create**

### What you get

- No one (including you) can run `git push origin main` directly.
- All changes must come through Pull Requests.
- You review and approve before merging.
- History stays clear and controlled.

## Alternative: use another default branch

If you prefer, you can:

1. Create a branch such as `develop` or `contributions`.
2. Make that branch the default for PRs.
3. Keep `main` protected and merge into it when you choose.

## For contributors

If you want to contribute:

1. **Fork** the repository.
2. Create a branch: `git checkout -b my-contribution`.
3. Make your changes and commit: `git commit -m "Clear description"`.
4. Push to your fork: `git push origin my-contribution`.
5. Open a **Pull Request** on the original repository.

---

*This setup protects the code and keeps the repository organized for educational use.*
