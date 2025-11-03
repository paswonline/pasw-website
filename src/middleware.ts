/**
 * Middleware to clean up external scripts injected by server/hosting
 * Moves external scripts from <head> to <body> with defer attribute for optimal performance
 */
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  
  // Only process HTML responses
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    return response;
  }
  
  const html = await response.text();
  
  // Pattern to match external scripts from pasw.com.pl domain
  const externalScriptPattern = /<script[^>]*src=['"]https?:\/\/www\.pasw\.com\.pl\/[^'"]*['"][^>]*><\/script>/gi;
  
  // Find all external scripts
  const scripts: string[] = [];
  let cleanedHtml = html.replace(externalScriptPattern, (match) => {
    // Extract script and modify to use defer
    const deferredScript = match.replace(
      /<script([^>]*)>/i,
      '<script$1 defer>'
    );
    scripts.push(deferredScript);
    return ''; // Remove from head
  });
  
  // If scripts were found, move them to end of body (before closing </body>)
  if (scripts.length > 0) {
    // Insert scripts before closing </body> tag
    cleanedHtml = cleanedHtml.replace(
      '</body>',
      `  <!-- External scripts moved from head for optimal performance -->\n${scripts.join('\n')}\n</body>`
    );
  }
  
  return new Response(cleanedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};

