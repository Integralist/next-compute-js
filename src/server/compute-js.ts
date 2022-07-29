import { Backends } from "./common";
export type BackendInfo = {
  name: string,
  url: string,
};

function findBackendInfo(backends: Backends, url: string): BackendInfo | null {
  for (const [backendName, backend] of Object.entries(backends)) {
    let backendUrl = typeof backend === 'string' ? backend : backend.url;
    if(!backendUrl.endsWith('/')) {
      backendUrl += '/';
    }
    if(url.startsWith(backendUrl)) {
      return {
        name: backendName,
        url: backendUrl,
      };
    }
  }
  return null;
}

export function getBackendInfo(backends: Backends | undefined, url: string) {
  if(backends == null) {
    return null;
  }

  let backendName;

  const urlObj = new URL(url);
  if(urlObj.port === '') {
    // If port is not specified, try the default port
    if (urlObj.protocol === 'https:') {
      urlObj.port = '443';
    } else {
      urlObj.port = '80';
    }
    backendName = findBackendInfo(backends, String(urlObj));
  }
  if(backendName == null) {
    backendName = findBackendInfo(backends, url);
  }

  return backendName;
}