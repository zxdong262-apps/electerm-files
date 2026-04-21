/**
 * electerm-files - Static website served from R2 bucket "public"
 *
 * Serves static files from Cloudflare R2 storage bucket "public"
 */

// MIME type mapping
const MIME_TYPES = {
  '.html': 'text/html',
  '.htm': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.md': 'text/markdown',
  '.markdown': 'text/markdown',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.gz': 'application/gzip',
  '.wasm': 'application/wasm',
};

/**
 * Get MIME type based on file extension
 * @param {string} filename - The filename to check
 * @returns {string} - MIME type
 */
function getMimeType(filename) {
  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * Get cache control header based on file extension
 * @param {string} filename - The filename to check
 * @returns {string} - Cache-Control header value
 */
function getCacheControl(filename) {
  // Cache aggressively for versioned/hashed files
  if (filename.includes('.') && /\.[a-f0-9]{8,}\./.test(filename)) {
    return 'public, max-age=31536000, immutable';
  }
  // Default caching
  return 'public, max-age=3600';
}

function getHomePageHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="electerm-files - Static file hosting powered by Cloudflare R2">
  <meta name="keywords" content="electerm, static files, cloudflare, r2, storage">
  <meta name="author" content="electerm">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="electerm-files - Static File Hosting">
  <meta property="og:description" content="Static file hosting powered by Cloudflare R2">
  <meta property="og:site_name" content="electerm-files">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📁</text></svg>">

  <title>electerm-files - Static File Hosting</title>

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 3rem;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #11998e;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .subtitle {
      color: #666;
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    .feature {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      padding: 1rem;
      background: #f7fafc;
      border-radius: 8px;
    }
    .feature-icon {
      font-size: 1.5rem;
      margin-right: 1rem;
    }
    h2 {
      color: #333;
      margin: 2rem 0 1rem;
      font-size: 1.5rem;
    }
    .badge {
      display: inline-block;
      background: #11998e;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
    footer {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #eee;
      text-align: center;
      color: #666;
    }
    footer a {
      color: #11998e;
      text-decoration: none;
    }
    footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>electerm-files</h1>
    <p class="subtitle">Static File Hosting Powered by Cloudflare R2</p>

    <div>
      <span class="badge">🚀 Fast</span>
      <span class="badge">💾 R2 Storage</span>
      <span class="badge">🌍 Global</span>
    </div>

    <h2>What is electerm-files?</h2>
    <p>electerm-files is a Cloudflare Worker service that serves static files from R2 storage bucket "public".</p>

    <h2>Features</h2>
    <div class="feature">
      <span class="feature-icon">⚡</span>
      <div>
        <strong>High Performance</strong>
        <p>Built on Cloudflare's global network for minimal latency</p>
      </div>
    </div>
    <div class="feature">
      <span class="feature-icon">💾</span>
      <div>
        <strong>R2 Storage</strong>
        <p>Efficient static file storage with no egress fees</p>
      </div>
    </div>
    <div class="feature">
      <span class="feature-icon">🔒</span>
      <div>
        <strong>Secure</strong>
        <p>Secure file serving from Cloudflare's edge</p>
      </div>
    </div>

    <footer>
      <p>Powered by <a href="https://workers.cloudflare.com/" target="_blank" rel="noopener">Cloudflare Workers</a> + <a href="https://www.cloudflare.com/products/r2/" target="_blank" rel="noopener">R2</a></p>
    </footer>
  </div>
</body>
</html>`;
}

function buildDirectoryIndex(path, entries, baseUrl) {
  const items = entries.map(entry => {
    const name = entry.key.slice(path.length);
    const isDir = entry.key.endsWith('/');
    const size = entry.size || '-';
    const date = entry.uploaded ? new Date(entry.uploaded).toISOString().split('T')[0] : '-';
    return { name: name.replace('/', ''), isDir, size, date };
  }).sort((a, b) => {
    if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const parentPath = path.split('/').slice(0, -2).join('/') || '/';
  const isRoot = path === '/';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Index of ${path}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 0 auto; padding: 2rem; }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f7fafc; font-weight: 600; }
    a { color: #11998e; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .dir::before { content: "📁"; margin-right: 0.5rem; }
    .file::before { content: "📄"; margin-right: 0.5rem; }
    .size, .date { color: #666; font-size: 0.875rem; }
  </style>
</head>
<body>
  <h1>Index of ${path}</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Size</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>`;

  if (!isRoot) {
    html += `
      <tr>
        <td><a href="${parentPath}">..</a></td>
        <td class="size">-</td>
        <td class="date">-</td>
      </tr>`;
  }

  for (const item of items) {
    const href = `${path}${item.name}${item.isDir ? '/' : ''}`;
    html += `
      <tr>
        <td><a href="${href}" class="${item.isDir ? 'dir' : 'file'}">${item.name}${item.isDir ? '/' : ''}</a></td>
        <td class="size">${item.size}</td>
        <td class="date">${item.date}</td>
      </tr>`;
  }

  html += `
    </tbody>
  </table>
</body>
</html>`;

  return html;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;

    if (path === '/' || path === '/index.html') {
      return new Response(getHomePageHTML(), {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    let objectKey = path.slice(1);

    let object = await env.PUBLIC.get(objectKey);
    if (!object) {
      const list = await env.PUBLIC.list({ prefix: objectKey, delimiter: '/' });
      if (list.objects.length > 0 || list.delimitedPrefixes.length > 0) {
        const entries = [
          ...list.objects.map(o => ({ key: o.key, size: o.size, uploaded: o.uploaded })),
          ...list.delimitedPrefixes.map(p => ({ key: p, size: 0, uploaded: null }))
        ];
        return new Response(buildDirectoryIndex(path, entries, url.origin), {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }

      object = await env.PUBLIC.get(`${objectKey}/index.html`);
      if (object) {
        objectKey = `${objectKey}/index.html`;
      }
    }

    if (!object) {
      return new Response('Not Found', { status: 404 });
    }

    const mimeType = getMimeType(objectKey);
    const cacheControl = getCacheControl(objectKey);

    return new Response(object.body, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': cacheControl,
        'ETag': object.httpEtag,
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};