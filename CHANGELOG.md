# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-09

### Added
- Initial release of hardlog
- Auto-detection for Node.js and Browser environments
- ANSI color support for terminal output
- CSS-styled console output for browsers
- Production-safe logging (disabled by default in production)
- Configuration API with `log.config()`
- TypeScript support with full type definitions
- Zero dependencies (only dev dependencies)
- Four log levels: success, error, warn, info
- Optional timestamp support

### Features
- Works in Node.js 14+
- Works in all modern browsers
- Compatible with Next.js (App Router + Pages Router)
- Compatible with Express.js
- Compatible with Bun and Deno
- SSR-safe and edge runtime compatible
- Never throws errors - fails silently
