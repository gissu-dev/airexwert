const allowedUrlProtocols = new Set(["http:", "https:"]);

export function isInternalHref(value: string) {
  return value.startsWith("/") && !value.startsWith("//");
}

export function sanitizeHref(value: unknown) {
  const href = String(value ?? "").trim();

  if (!href) {
    return "";
  }

  if (isInternalHref(href)) {
    return href;
  }

  try {
    const url = new URL(href);
    return allowedUrlProtocols.has(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
}
