(async function (_window, document) {
  const links = await fetch('/static/links.json').then(response =>
    response.json(),
  );

  const appBtn = document.getElementById('mobile-app-download-button');
  if (appBtn) {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod|macintosh|mac os/.test(ua)) {
      appBtn.href = links.ylitseAppStoreUrl;
    }
  }
})(window, document);
