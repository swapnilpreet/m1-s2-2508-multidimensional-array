// urlparser.js
import url from 'url';
import querystring from 'querystring';

export function parseUrlDetails(fullUrl) {
  if (!fullUrl || typeof fullUrl !== 'string') {
    throw new Error("Invalid URL");
  }
  const parsed = url.parse(fullUrl);
  return {
    hostname: parsed.hostname,
    pathname: parsed.pathname,
    query: querystring.parse(parsed.query)
  };
}
