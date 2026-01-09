import type { LoggerConfig, LogLevel, RuntimeEnvironment } from './types';
import { detectEnvironment, shouldLogByDefault } from './env';

/**
 * ANSI color codes for Node.js terminal
 */
const ANSI_COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
} as const;

/**
 * CSS styles for browser console
 */
const BROWSER_STYLES = {
  success: 'background: #10b981; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
  error: 'background: #ef4444; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
  warn: 'background: #f59e0b; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
  info: 'background: #3b82f6; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
} as const;

/**
 * Log level symbols and labels
 */
const LOG_CONFIG = {
  success: { symbol: '✔', label: 'SUCCESS', color: ANSI_COLORS.green },
  error: { symbol: '✖', label: 'ERROR', color: ANSI_COLORS.red },
  warn: { symbol: '⚠', label: 'WARNING', color: ANSI_COLORS.yellow },
  info: { symbol: 'ℹ', label: 'INFO', color: ANSI_COLORS.blue },
} as const;

/**
 * Logger class - handles all logging operations
 */
class Logger {
  private config: Required<LoggerConfig>;
  private runtime: RuntimeEnvironment;

  constructor() {
    this.runtime = detectEnvironment();
    this.config = {
      enabled: shouldLogByDefault(),
      showTimestamp: false,
    };
  }

  /**
   * Configure logger options
   */
  public configure(options: LoggerConfig): this {
    try {
      if (options.enabled !== undefined) {
        this.config.enabled = options.enabled;
      }
      if (options.showTimestamp !== undefined) {
        this.config.showTimestamp = options.showTimestamp;
      }
    } catch {
      // Fail silently
    }
    return this;
  }

  /**
   * Get current timestamp string
   */
  private getTimestamp(): string {
    try {
      const now = new Date();
      return `[${now.toLocaleTimeString()}]`;
    } catch {
      return '';
    }
  }

  /**
   * Log message in Node.js with ANSI colors
   */
  private logNode(level: LogLevel, message: string): void {
    try {
      const cfg = LOG_CONFIG[level];
      const timestamp = this.config.showTimestamp ? `${this.getTimestamp()} ` : '';
      const formattedMessage = `${cfg.color}${cfg.symbol} ${cfg.label.padEnd(10)}${ANSI_COLORS.reset} ${timestamp}${message}`;
      
      console.log(formattedMessage);
    } catch {
      // Fail silently
    }
  }

  /**
   * Log message in browser with CSS styling
   */
  private logBrowser(level: LogLevel, message: string): void {
    try {
      const cfg = LOG_CONFIG[level];
      const timestamp = this.config.showTimestamp ? `${this.getTimestamp()} ` : '';
      const label = `${cfg.symbol} ${cfg.label}`;
      
      console.log(`%c${label}%c ${timestamp}${message}`, BROWSER_STYLES[level], '');
    } catch {
      // Fail silently
    }
  }

  /**
   * Core log method - routes to appropriate handler
   */
  private log(level: LogLevel, message: string): void {
    // Don't log if disabled
    if (!this.config.enabled) {
      return;
    }

    try {
      // Convert message to string safely
      const msg = String(message ?? '');

      if (this.runtime === 'node') {
        this.logNode(level, msg);
      } else if (this.runtime === 'browser') {
        this.logBrowser(level, msg);
      } else {
        // Fallback to plain console.log
        console.log(`[${level.toUpperCase()}]`, msg);
      }
    } catch {
      // Fail silently - never break user's app
    }
  }

  /**
   * Log success message
   */
  public success(message: string): void {
    this.log('success', message);
  }

  /**
   * Log error message
   */
  public error(message: string): void {
    this.log('error', message);
  }

  /**
   * Log warning message
   */
  public warn(message: string): void {
    this.log('warn', message);
  }

  /**
   * Log info message
   */
  public info(message: string): void {
    this.log('info', message);
  }
}

/**
 * Singleton logger instance
 */
export const logger = new Logger();
