export function formatResponse(response, branding) {
  return {
    content: response.trim(),
    metadata: {
      provider: branding.provider,
      copyright: branding.copyright,
      timestamp: new Date().toISOString()
    }
  };
}

export function validateBranding(config) {
  const requiredFields = ['provider', 'copyright'];
  return requiredFields.every(field => config.branding?.[field]);
}

export function addBrandingHeaders(response) {
  return {
    ...response,
    headers: {
      'X-Powered-By': 'Literally Labs',
      'X-Model-Version': '1.0.0',
      'X-Copyright': '© 2024 Literally Labs'
    }
  };
}