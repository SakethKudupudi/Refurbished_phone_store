# 🚀 GitHub Actions Tutorial - Complete Guide

## 📚 Table of Contents
1. [What are GitHub Actions?](#what-are-github-actions)
2. [Key Concepts](#key-concepts)
3. [Your Current Workflows](#your-current-workflows)
4. [Hands-On Tutorial](#hands-on-tutorial)
5. [Common Patterns](#common-patterns)
6. [Advanced Topics](#advanced-topics)

---

## What are GitHub Actions?

GitHub Actions is a **CI/CD platform** that lets you automate your build, test, and deployment pipeline. You can create workflows that:
- ✅ Run tests automatically when you push code
- ✅ Build and deploy your application
- ✅ Check code quality
- ✅ Automate repetitive tasks

### Why Use GitHub Actions?
- 🆓 **Free** for public repositories
- ☁️ **Runs in the cloud** - no need for your own servers
- 🔧 **Pre-built actions** - use thousands of community actions
- 🔄 **Integrated with GitHub** - works with PRs, issues, releases

---

## Key Concepts

### 1. **Workflow**
A workflow is an automated process defined in a YAML file in `.github/workflows/`.

```yaml
name: My First Workflow    # Name shown in GitHub UI
on: [push, pull_request]   # When to run
jobs:                       # What to do
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Hello World!"
```

### 2. **Event (Triggers)**
Events that trigger workflows:
- `push` - When code is pushed
- `pull_request` - When PR is opened/updated
- `schedule` - Run on a schedule (cron)
- `workflow_dispatch` - Manual trigger
- `release` - When a release is created

### 3. **Jobs**
A workflow contains one or more jobs that run in parallel by default.

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps: [...]
  
  job2:
    runs-on: ubuntu-latest
    needs: job1  # Run after job1 completes
    steps: [...]
```

### 4. **Steps**
Steps are individual tasks within a job:
- **Uses** - Run a pre-built action
- **Run** - Execute a shell command

```yaml
steps:
  - uses: actions/checkout@v4           # Pre-built action
  - run: npm install                     # Shell command
  - run: npm test                        # Another command
```

### 5. **Runners**
GitHub provides virtual machines (runners) to execute jobs:
- `ubuntu-latest` - Linux
- `windows-latest` - Windows
- `macos-latest` - macOS

### 6. **Actions**
Reusable units of code you can use in workflows:
- Community actions: `actions/checkout@v4`
- Your own actions: `./local-action`
- Marketplace: https://github.com/marketplace?type=actions

---

## Your Current Workflows

### 1. Backend CI/CD (`backend-ci-cd.yml`)

**Triggers:**
```yaml
on:
  push:
    branches: [ main, develop ]
    paths: [ 'backend/**' ]
  pull_request:
    branches: [ main, develop ]
```
- Runs when backend code is pushed to `main` or `develop`
- Runs on pull requests targeting those branches

**What it does:**
1. ✅ Checks out your code
2. ✅ Sets up Java 21
3. ✅ Caches Maven dependencies (faster builds)
4. ✅ Builds your Spring Boot app
5. ✅ Runs tests
6. ✅ Generates code coverage
7. ✅ Uploads artifacts

### 2. Frontend CI/CD (`frontend-ci-cd.yml`)

Similar to backend, but for Angular:
1. ✅ Sets up Node.js
2. ✅ Installs npm dependencies
3. ✅ Runs linting
4. ✅ Runs tests
5. ✅ Builds production bundle

---

## Hands-On Tutorial

Let's create a simple workflow to learn! I've created `hello-world.yml` for you.

### Tutorial Workflow Features:
1. **Manual trigger** - You can run it anytime
2. **Multiple jobs** - See how jobs work together
3. **Environment variables** - Pass data between steps
4. **Artifacts** - Upload and download files
5. **Matrix strategy** - Test across multiple versions

### How to Run It:
1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add learning workflow"
   git push
   ```

2. **Go to GitHub:**
   - Navigate to: `https://github.com/SakethKudupudi/Refurbished_phone_store/actions`
   - Click "Hello World Tutorial"
   - Click "Run workflow" button
   - Watch it run! 🎉

3. **Explore the Results:**
   - Click on the running workflow
   - See each job and step
   - Check the logs
   - Download artifacts

---

## Common Patterns

### 1. Environment Variables

```yaml
env:
  NODE_VERSION: '20.x'      # Workflow-level
  API_URL: 'https://api.example.com'

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      DB_HOST: 'localhost'  # Job-level
    steps:
      - run: echo $NODE_VERSION
      - run: echo $DB_HOST
      - run: echo $API_URL
```

### 2. Conditional Execution

```yaml
steps:
  - name: Deploy to production
    if: github.ref == 'refs/heads/main'
    run: ./deploy.sh
  
  - name: Deploy to staging
    if: github.ref == 'refs/heads/develop'
    run: ./deploy-staging.sh
```

### 3. Secrets Management

Store sensitive data in GitHub Secrets:
```yaml
steps:
  - name: Deploy
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
    run: ./deploy.sh
```

**Add secrets:** Settings → Secrets and variables → Actions → New repository secret

### 4. Matrix Builds

Test across multiple versions:
```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node: [18, 20, 22]
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm test
```

### 5. Caching Dependencies

Speed up workflows:
```yaml
- name: Cache npm dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### 6. Upload/Download Artifacts

Share files between jobs:
```yaml
jobs:
  build:
    steps:
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: dist/
  
  deploy:
    needs: build
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: build-output
      - run: ./deploy.sh
```

---

## Advanced Topics

### 1. Reusable Workflows

Create workflows that other workflows can use:

**`.github/workflows/reusable-test.yml`**
```yaml
name: Reusable Test Workflow

on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string
    secrets:
      api-key:
        required: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm test
```

**Use it in another workflow:**
```yaml
jobs:
  call-test:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: '20.x'
    secrets:
      api-key: ${{ secrets.API_KEY }}
```

### 2. Composite Actions

Create custom actions:

**`my-action/action.yml`**
```yaml
name: 'My Custom Action'
description: 'Does something cool'
inputs:
  name:
    description: 'Your name'
    required: true
runs:
  using: "composite"
  steps:
    - run: echo "Hello ${{ inputs.name }}"
      shell: bash
```

**Use it:**
```yaml
- uses: ./my-action
  with:
    name: 'Saketh'
```

### 3. Job Outputs

Pass data from one job to another:
```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.get-version.outputs.version }}
    steps:
      - id: get-version
        run: echo "version=1.0.0" >> $GITHUB_OUTPUT
  
  job2:
    needs: job1
    runs-on: ubuntu-latest
    steps:
      - run: echo "Version is ${{ needs.job1.outputs.version }}"
```

### 4. Scheduled Workflows

Run on a schedule (cron syntax):
```yaml
on:
  schedule:
    # Every day at 2 AM UTC
    - cron: '0 2 * * *'
    # Every Monday at 9 AM UTC
    - cron: '0 9 * * 1'
```

Cron format: `minute hour day month weekday`

### 5. Manual Inputs

Accept input when manually triggering:
```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deployment environment'
        required: true
        type: choice
        options:
          - development
          - staging
          - production
      version:
        description: 'Version to deploy'
        required: false
        default: 'latest'

jobs:
  deploy:
    steps:
      - run: echo "Deploying ${{ inputs.version }} to ${{ inputs.environment }}"
```

---

## Practical Examples for Your Project

### Example 1: Auto-Label PRs
```yaml
name: Auto Label PR

on:
  pull_request:
    types: [opened]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v4
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

### Example 2: Code Quality Check
```yaml
name: Code Quality

on: [pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check for TODO comments
        run: |
          if grep -r "TODO" backend/src; then
            echo "⚠️ Found TODO comments"
          fi
      
      - name: Check file sizes
        run: |
          find backend/src -type f -size +1M -exec ls -lh {} \;
```

### Example 3: Notify on Failure
```yaml
name: Notify on Failure

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: mvn test
      
      - name: Notify on failure
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '❌ Build failed! Check the logs.'
            })
```

---

## Best Practices

### ✅ DO:
1. **Use caching** to speed up workflows
2. **Specify exact versions** of actions (e.g., `@v4` not `@latest`)
3. **Keep secrets in GitHub Secrets**, never hardcode
4. **Use matrix builds** for cross-platform testing
5. **Set timeouts** to prevent stuck jobs:
   ```yaml
   jobs:
     build:
       timeout-minutes: 30
   ```
6. **Use concurrency** to cancel old runs:
   ```yaml
   concurrency:
     group: ${{ github.workflow }}-${{ github.ref }}
     cancel-in-progress: true
   ```

### ❌ DON'T:
1. Don't store secrets in code
2. Don't run workflows on every commit (use paths filter)
3. Don't create workflows that run too long (>60 min)
4. Don't use `pull_request_target` unless you know what you're doing

---

## Debugging Tips

### 1. Enable Debug Logging
Add these secrets to your repo:
- `ACTIONS_RUNNER_DEBUG`: `true`
- `ACTIONS_STEP_DEBUG`: `true`

### 2. Use tmate for SSH access
```yaml
- name: Setup tmate session
  if: failure()
  uses: mxschmitt/action-tmate@v3
```

### 3. Print Context Variables
```yaml
- name: Dump GitHub context
  run: echo '${{ toJSON(github) }}'

- name: Dump job context
  run: echo '${{ toJSON(job) }}'
```

---

## Useful Resources

### Official Documentation
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)

### Your Workflows
- View in GitHub: `https://github.com/SakethKudupudi/Refurbished_phone_store/actions`
- Backend CI/CD: `.github/workflows/backend-ci-cd.yml`
- Frontend CI/CD: `.github/workflows/frontend-ci-cd.yml`
- Tutorial: `.github/workflows/hello-world.yml`

### Cheat Sheet
```yaml
# Trigger on push to main
on:
  push:
    branches: [main]

# Trigger on PR
on:
  pull_request:

# Trigger manually
on:
  workflow_dispatch:

# Trigger on schedule
on:
  schedule:
    - cron: '0 0 * * *'

# Multiple triggers
on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:

# Common steps
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '20.x'
  - run: npm install
  - run: npm test
```

---

## Practice Exercises

### Exercise 1: Create a Simple Workflow
Create a workflow that:
1. Runs on every push
2. Prints "Hello, $USERNAME!"
3. Lists all files in the repository

### Exercise 2: Add a Test Job
Modify your backend workflow to:
1. Run linting before tests
2. Only deploy if tests pass
3. Send a notification on success

### Exercise 3: Matrix Build
Create a workflow that tests your frontend on:
- Node 18, 20, and 22
- Ubuntu and Windows

---

## What's Next?

1. **Try the tutorial workflow** - Run `hello-world.yml` manually
2. **Modify your existing workflows** - Add a new step
3. **Create a custom workflow** - Automate something you do manually
4. **Explore the marketplace** - Find useful actions
5. **Read the docs** - Deep dive into advanced features

---

## Questions?

Check the logs:
1. Go to Actions tab in GitHub
2. Click on a workflow run
3. Click on a job to see step-by-step logs
4. Click on a step to see detailed output

**Happy Learning! 🚀**
