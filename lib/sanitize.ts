/**
 * Escapes HTML entities to prevent XSS attacks
 * @param str - The string to sanitize
 * @returns Sanitized string with HTML entities escaped
 */
export function sanitizeHtml(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return str.replace(/[&<>"'\/]/g, (char) => htmlEntities[char] || char);
}
