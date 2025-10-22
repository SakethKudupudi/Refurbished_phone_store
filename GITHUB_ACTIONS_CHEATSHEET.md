# GitHub Actions Quick Reference

## 🚀 Common Workflow Patterns

### Basic Workflow Structure
```yaml
name: Workflow Name
on: [push, pull_request]
jobs:
  job-name:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Hello World"
```

## 📋 Triggers (Events)

| Event | Description | Example |
|-------|-------------|---------|
| `push` | Code pushed | `on: push` |
| `pull_request` | PR opened/updated | `on: pull_request` |
| `workflow_dispatch` | Manual trigger | `on: workflow_dispatch` |
| `schedule` | Run on schedule | `on: schedule: - cron: '0 0 * * *'` |
| `release` | Release created | `on: release: types: [published]` |

### Trigger with Filters
```yaml
on:
  push:
    branches: [main, develop]     # Only these branches
    paths:                         # Only when these files change
      - 'src/**'
      - '**.js'
  pull_request:
    branches: [main]
    paths-ignore:                  # Ignore these files
      - '**.md'
      - 'docs/**'
```

## 🎯 Jobs

### Basic Job
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building..."
```

### Job Dependencies
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps: [...]
  
  test:
    needs: build              # Run after build
    runs-on: ubuntu-latest
    steps: [...]
  
  deploy:
    needs: [build, test]      # Run after both
    runs-on: ubuntu-latest
    steps: [...]
```

### Job Outputs
```yaml
jobs:
  job1:
    outputs:
      version: ${{ steps.get-version.outputs.version }}
    steps:
      - id: get-version
        run: echo "version=1.0.0" >> $GITHUB_OUTPUT
  
  job2:
    needs: job1
    steps:
      - run: echo ${{ needs.job1.outputs.version }}
```

## 📝 Steps

### Using Actions
```yaml
steps:
  - uses: actions/checkout@v4                    # Checkout code
  - uses: actions/setup-node@v4                  # Setup Node
    with:
      node-version: '20.x'
  - uses: actions/cache@v3                       # Cache dependencies
    with:
      path: ~/.npm
      key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### Running Commands
```yaml
steps:
  - run: npm install
  - run: npm test
  - run: |
      echo "Multi-line"
      echo "command"
  - name: Named step
    run: echo "This has a name"
  - name: With working directory
    working-directory: ./backend
    run: mvn test
```

## 🔄 Matrix Strategy

### Test Multiple Versions
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
```

### Matrix with Include/Exclude
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [18, 20]
    include:                               # Add specific combinations
      - os: macos-latest
        node: 20
    exclude:                               # Remove specific combinations
      - os: windows-latest
        node: 18
```

## 🔐 Secrets and Environment Variables

### Environment Variables
```yaml
env:
  NODE_ENV: production          # Workflow level

jobs:
  build:
    env:
      API_URL: https://api.com  # Job level
    steps:
      - run: echo $NODE_ENV
      - run: echo $API_URL
      - run: echo ${{ env.NODE_ENV }}
```

### Secrets
```yaml
steps:
  - name: Deploy
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
    run: ./deploy.sh
```

Add secrets: Settings → Secrets and variables → Actions → New repository secret

## ✅ Conditional Execution

```yaml
steps:
  - name: Only on main
    if: github.ref == 'refs/heads/main'
    run: echo "Main branch"
  
  - name: Only on PR
    if: github.event_name == 'pull_request'
    run: echo "Pull request"
  
  - name: Only if previous step succeeded
    if: success()
    run: echo "Success!"
  
  - name: Only if previous step failed
    if: failure()
    run: echo "Failed!"
  
  - name: Always run (even if job cancelled)
    if: always()
    run: echo "Cleanup"
  
  - name: Complex condition
    if: github.ref == 'refs/heads/main' && success()
    run: echo "Main and success"
```

## 📦 Artifacts

### Upload Artifacts
```yaml
- name: Build
  run: npm run build

- name: Upload artifact
  uses: actions/upload-artifact@v3
  with:
    name: build-output
    path: dist/
    retention-days: 7
```

### Download Artifacts
```yaml
- name: Download artifact
  uses: actions/download-artifact@v3
  with:
    name: build-output
    path: ./dist
```

## 🏃 Runners

| Runner | OS | Label |
|--------|----|----|
| Linux | Ubuntu | `ubuntu-latest`, `ubuntu-22.04`, `ubuntu-20.04` |
| Windows | Windows Server | `windows-latest`, `windows-2022`, `windows-2019` |
| macOS | macOS | `macos-latest`, `macos-13`, `macos-12` |

## 📊 Context Variables

### GitHub Context
```yaml
steps:
  - run: |
      echo "Repository: ${{ github.repository }}"
      echo "Actor: ${{ github.actor }}"
      echo "Event: ${{ github.event_name }}"
      echo "Ref: ${{ github.ref }}"
      echo "SHA: ${{ github.sha }}"
```

### Runner Context
```yaml
- run: |
    echo "OS: ${{ runner.os }}"
    echo "Temp: ${{ runner.temp }}"
    echo "Workspace: ${{ runner.workspace }}"
```

### Job Context
```yaml
- run: |
    echo "Status: ${{ job.status }}"
    echo "Container: ${{ job.container }}"
```

## 🔧 Useful Actions

### Checkout Code
```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0              # Fetch all history
    submodules: true            # Checkout submodules
```

### Setup Node.js
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20.x'
    cache: 'npm'
```

### Setup Java
```yaml
- uses: actions/setup-java@v4
  with:
    java-version: '21'
    distribution: 'temurin'
    cache: 'maven'
```

### Setup Python
```yaml
- uses: actions/setup-python@v4
  with:
    python-version: '3.11'
    cache: 'pip'
```

### Cache Dependencies
```yaml
- uses: actions/cache@v3
  with:
    path: |
      ~/.npm
      ~/.m2
    key: ${{ runner.os }}-deps-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-deps-
```

## ⏰ Scheduled Workflows

```yaml
on:
  schedule:
    - cron: '0 0 * * *'         # Every day at midnight
    - cron: '0 9 * * 1'         # Every Monday at 9 AM
    - cron: '*/15 * * * *'      # Every 15 minutes
```

Cron format: `minute(0-59) hour(0-23) day(1-31) month(1-12) weekday(0-6)`

## 🎮 Manual Inputs

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        type: choice
        options:
          - dev
          - staging
          - production
      version:
        description: 'Version'
        required: false
        default: 'latest'
      debug:
        description: 'Enable debug'
        type: boolean
        default: false

jobs:
  deploy:
    steps:
      - run: |
          echo "Environment: ${{ inputs.environment }}"
          echo "Version: ${{ inputs.version }}"
          echo "Debug: ${{ inputs.debug }}"
```

## 🚦 Concurrency

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true      # Cancel old runs
```

## ⏱️ Timeouts

```yaml
jobs:
  build:
    timeout-minutes: 30         # Job timeout
    steps:
      - name: Test
        timeout-minutes: 10     # Step timeout
        run: npm test
```

## 🏷️ Job Summary

```yaml
steps:
  - name: Create summary
    run: |
      echo "# Test Results" >> $GITHUB_STEP_SUMMARY
      echo "✅ All tests passed" >> $GITHUB_STEP_SUMMARY
      echo "Total: 150" >> $GITHUB_STEP_SUMMARY
```

## 🛠️ Common Patterns

### Build and Test
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

### Deploy to Production
```yaml
jobs:
  deploy:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: ./deploy.sh
```

### Notify on Failure
```yaml
jobs:
  build:
    steps:
      - run: npm test
      
      - name: Notify failure
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Build failed',
              body: 'The build has failed. Check the logs.'
            })
```

## 📚 Resources

- [Official Docs](https://docs.github.com/en/actions)
- [Marketplace](https://github.com/marketplace?type=actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Your workflows](https://github.com/SakethKudupudi/Refurbished_phone_store/actions)

## 💡 Pro Tips

1. **Use caching** for dependencies to speed up builds
2. **Specify exact versions** of actions (e.g., `@v4`)
3. **Use matrix builds** to test across multiple environments
4. **Set timeouts** to prevent stuck jobs
5. **Use concurrency** to cancel duplicate runs
6. **Keep secrets secure** - never log them
7. **Use path filters** to run only when needed
8. **Add job summaries** for better visibility
