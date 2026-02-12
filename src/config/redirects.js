export const COMPANY_DESTINATIONS = {
  construction: {
    key: 'construction',
    label: 'Technique Construction',
    url: 'https://techniqueconstruction.site',
  },
};

export const REDIRECT_SETTINGS = {
  legacyBrand: 'Si & So Conversions',
  legacyDomainSunsetYear: 2028,
  preservePath: false,
  preserveQuery: true,
};

const normalizePath = (pathname = '/') => {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`;
};

const normalizeSearch = (search = '') => {
  if (!search) {
    return '';
  }

  return search.startsWith('?') ? search : `?${search}`;
};

const joinUrl = (baseUrl, pathname, search) => {
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = normalizePath(pathname);
  const normalizedSearch = normalizeSearch(search);

  if (REDIRECT_SETTINGS.preservePath && normalizedPath !== '/') {
    return `${base}${normalizedPath}${REDIRECT_SETTINGS.preserveQuery ? normalizedSearch : ''}`;
  }

  return `${base}${REDIRECT_SETTINGS.preserveQuery ? normalizedSearch : ''}`;
};

export const resolveDestination = () => COMPANY_DESTINATIONS.construction;

export const resolveRedirectUrl = (pathname = '/', search = '') => {
  const destination = resolveDestination(pathname);
  return joinUrl(destination.url, pathname, search);
};
