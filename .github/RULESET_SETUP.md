# Ruleset setup (GitHub’s newer UI)

Guide for GitHub’s **Rulesets** interface.

---

## Fields to fill in

### 1. Ruleset name (required)

```
Main Branch Protection
```

Or any descriptive name, for example:

- `Protect main branch`
- `Main branch rules`

---

### 2. Enforcement status

Change from **Disabled** to:

```
Enabled
```

This turns the ruleset on.

---

### 3. Target branches (required)

Click **Add target** and set:

- **Branch name pattern**: `main`
- Or use the pattern `main` exactly as shown.

This applies the rule only to `main`.

---

### 4. Bypass list

**Leave it empty** (or add entries only if you truly need exceptions).

If you want nobody—including yourself—to bypass the rules:

- **Do not add** anyone to the bypass list.
- Everyone follows the same rules.

---

### 5. Rules — enable these

#### Require a pull request before merging

**Enable this.** It is the most important rule.

- All changes must go through a Pull Request.
- Set how many approvals are required (`0` or `1` if you approve your own PRs).

#### Block force pushes

Usually on by default—keep it.

#### Restrict deletions

Usually on by default—keep it.

#### Restrict updates (recommended)

**Enable this too.**

- Prevents direct pushes to the branch.
- Complements **Require a pull request**.

#### Other options (optional; can stay off)

- Restrict creations
- Require linear history
- Require signed commits
- Require status checks (only if you use CI/CD)
- Require deployments
- Require code scanning
- Require code quality
- Copilot-related options

---

## Summary of what to enable

```
Ruleset name: "Main Branch Protection"
Enforcement status: Enabled
Target branches: Add target → "main"
Bypass list: Empty
Rules:
   Require a pull request before merging
   Block force pushes
   Restrict deletions
   Restrict updates
```

---

## After you finish

1. Scroll to the bottom of the page.
2. Click **Create**.
3. Your `main` branch should now be protected.

---

## Test

Try a direct push:

```bash
git push origin main
```

If you get an error, protection is working.
