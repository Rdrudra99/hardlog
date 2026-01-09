import { logger } from './logger';
import type { LoggerConfig } from './types';

/**
 * Dev-only logger with beautiful, colorful output
 * 
 * Automatically detects Node.js or Browser environment and applies appropriate styling.
 * Disabled by default in production (NODE_ENV === 'production').
 * 
 * @example
 * ```ts
 * import log from '@rdrudra99/hardlog';
 * 
 * log.success('Server started successfully!');
 * log.error('Database connection failed');
 * log.warn('Missing environment variable');
 * log.info('Listening on port 3000');
 * ```
 * 
 * @example
 * ```ts
 * // Configure logger
 * import log from '@rdrudra99/hardlog';
 * 
 * log.config({ enabled: true, showTimestamp: true });
 * ```
 */
const log = {
  /**
   * Log a success message
   */
  success: (message: string) => logger.success(message),

  /**
   * Log an error message
   */
  error: (message: string) => logger.error(message),

  /**
   * Log a warning message
   */
  warn: (message: string) => logger.warn(message),

  /**
   * Log an info message
   */
  info: (message: string) => logger.info(message),

  /**
   * Configure logger options
   */
  config: (options: LoggerConfig) => {
    logger.configure(options);
    return log;
  },
};

export default log;
export type { LoggerConfig };
