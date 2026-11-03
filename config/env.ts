// The one place where tests read environment settings (passwords and API credentials)

/**
 * Single place to read environment variables.
 * Tests never call process.env directly — this keeps configuration easy to find and change.
 */
function read(name: string, fallback?: string): string {
  const value = process.env[name] || fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}. See .env.example`);
  }
  return value;
}

export const env = {
  // Public demo credentials are used as fallbacks so the project runs out of the box.
  // For a real company app there would be NO fallback: secrets must come from .env / CI secrets.
  saucePassword: read('SAUCE_PASSWORD', 'secret_sauce'),
  apiUsername: read('API_USERNAME', 'admin'),
  apiPassword: read('API_PASSWORD', 'password123'),
};
