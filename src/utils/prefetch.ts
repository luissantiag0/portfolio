/**
 * Utility for high-performance link prefetching and dynamic network warming.
 * When a user hovers over an external action link (like GitHub or LinkedIn),
 * we inject preconnect and prefetch directives dynamically to minimize handshakes
 * and render latencies, guaranteeing a lightning-fast responsive feel upon click.
 */

const prefetchedUrls = new Set<string>();

export function prefetchExternalUrl(url: string) {
  if (!url || prefetchedUrls.has(url)) return;

  prefetchedUrls.add(url);

  try {
    const urlObj = new URL(url);
    const origin = urlObj.origin;

    // 1. Dynamic Preconnect to the destination origin
    let preconnectLink = document.querySelector(`link[href="${origin}"][rel="preconnect"]`);
    if (!preconnectLink) {
      preconnectLink = document.createElement('link');
      preconnectLink.setAttribute('rel', 'preconnect');
      preconnectLink.setAttribute('href', origin);
      preconnectLink.setAttribute('crossorigin', 'anonymous');
      document.head.appendChild(preconnectLink);
    }

    // 2. Dynamic Prefetch for the precise target path
    let prefetchLink = document.querySelector(`link[href="${url}"][rel="prefetch"]`);
    if (!prefetchLink) {
      prefetchLink = document.createElement('link');
      prefetchLink.setAttribute('rel', 'prefetch');
      prefetchLink.setAttribute('href', url);
      // Fallback to prerender for higher-priority speculative loads
      prefetchLink.setAttribute('as', 'document');
      document.head.appendChild(prefetchLink);
    }

    // Also support prerendering if supported by the browser engine (Speculating navigation)
    let prerenderLink = document.querySelector(`link[href="${url}"][rel="prerender"]`);
    if (!prerenderLink) {
      prerenderLink = document.createElement('link');
      prerenderLink.setAttribute('rel', 'prerender');
      prerenderLink.setAttribute('href', url);
      document.head.appendChild(prerenderLink);
    }
  } catch (error) {
    console.warn('Failed to speculatively prefetch external URL:', url, error);
  }
}
