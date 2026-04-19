# Step-by-step: protect the `main` branch

Follow these steps to protect your `main` branch on GitHub.

---

## Step 1: Open repository settings

1. Open your repository on GitHub (for example `https://github.com/YOUR_USER/XSS_testing`).
2. Click the **Settings** tab at the top of the repository.
   - If you do not see **Settings**, confirm you own the repository.

---

## Step 2: Go to Branch protection rules

1. In the left sidebar, scroll to **Branches** and click it.
2. You will see the **Branch protection rules** section.

---

## Step 3: Create the protection rule

1. Click **Add rule** (or **Add branch protection rule**).
2. In **Branch name pattern**, enter: `main`
   - This protects the `main` branch specifically.
   - If your default branch is `master`, use `master` here instead.

---

## Step 4: Configure protections

Enable the following:

### Require a pull request before merging

- **Turn this on.**
- This forces all changes to go through a Pull Request.
- Optionally configure:
  - **Required number of approvals**: `0` or `1` (you can approve your own PRs if you want).

### Require conversation resolution before merging

- **Turn this on.**
- Ensures all PR discussions are resolved before merge.

### Do not allow bypassing the above settings

- **Turn this on.**
- **Important:** This prevents even you (as admin) from pushing directly.
- You will also need to use Pull Requests.

### Optional (you can leave these off at first)

- **Require status checks to pass**: Only if you use CI/CD (GitHub Actions, etc.).
- **Require branches to be up to date**: Useful but not required to start.
- **Restrict pushes that create files**: Optional, to limit large file uploads.

---

## Step 5: Save the rule

1. Scroll to the bottom of the page.
2. Click the green **Create** button (or **Create protection rule**).
3. You should see a confirmation message.

---

## Step 6: Verify it works

1. Go back to the main repository page.
2. Optionally try a direct push to `main` to test:
   ```bash
   git checkout main
   git commit --allow-empty -m "test"
   git push origin main
   ```
3. You should get an error similar to:
   ```
   ! [remote rejected] main -> main (protected branch hook declined)
   ```
   - **That means protection is working.**

---

## How to work day to day

### For your own changes

1. **Create a branch:**
   ```bash
   git checkout -b my-feature
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "My change"
   git push origin my-feature
   ```

3. **Open a Pull Request on GitHub:**
   - Open the repo on GitHub.
   - Go to **Pull requests** → **New pull request**.
   - Select `my-feature` → `main`.
   - Fill in the description and click **Create pull request**.

4. **Review and merge:**
   - Review the code in the PR.
   - When ready, click **Merge pull request** and confirm.

### For external contributors

They follow the same flow after **forking** the repo:

1. Fork the repository.
2. Clone their fork.
3. Create a branch.
4. Make changes.
5. Open a Pull Request on your upstream repository.
6. You review and approve.

---

## Common questions

### “I own the repo—why can’t I push directly?”

Because **Do not allow bypassing** is enabled. That way **everything** goes through review and history stays clean.

### “What about urgent fixes?”

You can:

- Create a `hotfix` branch, open a PR, and merge quickly; or
- Temporarily disable protection (not recommended).

### “Can I approve my own PRs?”

Yes. On public repos you can approve your own PRs. If **Required approvals** is `1`, you can still approve and merge your own PR.

---

## Final checklist

- [ ] Rule created for branch `main`
- [ ] **Require pull request** is enabled
- [ ] **Do not allow bypassing** is enabled
- [ ] Direct push to `main` is blocked (tested)
- [ ] You created a test branch and opened a PR successfully

---

**Done.** Your `main` branch is protected.
