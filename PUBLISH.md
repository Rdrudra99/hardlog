# Quick Start Guide for Publishing @rdrudra99/hardlog

## Prerequisites
- npm account (create at https://www.npmjs.com/signup)
- Git repository connected
- All files committed

## First Time Setup

```bash
# Login to npm (token expires, may need to re-login)
npm login

# Verify login
npm whoami
```

## Publishing Steps

### 1. Final Check
```bash
cd /home/rdrudra99/Desktop/hardlog/hardlog

# Clean build
bun run clean
bun run build

# Test locally
bun run test

# Check what will be published
npm publish --dry-run
```

### 2. Publish to npm
```bash
# For first time publish
npm publish --access public

# For subsequent updates
npm publish
```

### 3. Verify Published Package
```bash
# Check on npm
open https://www.npmjs.com/package/hardlog

# Test installation
mkdir /tmp/test-hardlog
cd /tmp/test-hardlog
bun init -y
bun add @rdrudra99/hardlog
```

## Done! 🎉

Your package is now live at: https://www.npmjs.com/package/@rdrudra99/hardlog

Users can install it with:
```bash
bun add @rdrudra99/hardlog
npm install @rdrudra99/hardlog
yarn add @rdrudra99/hardlog
pnpm add @rdrudra99/hardlog
```

## For Future Updates

See [MAINTAINING.md](MAINTAINING.md) for detailed version management and release process.

Quick version:
```bash
# Make changes, then:
npm version patch  # or minor/major
npm publish
git push && git push --tags
```
