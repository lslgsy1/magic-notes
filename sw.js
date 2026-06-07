const CACHE_NAME = 'magic-notes-v1';
// 这里写下你需要让手机死记硬背的本地文件
const ASSETS = [
  './',
  './index.html',
  './icon.png',
  './manifest.json'
];

// 1. 监听安装事件：当网页第一次加载时，把上面列表里的文件全部死记硬背到手机本地
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('SW: 正在把魔术道具存入手机本地缓存...');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. 监听抓取事件：当手机断网或正常打开时，直接从手机本地缓存里读取网页，实现秒开
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      // 如果本地缓存里有，就直接用本地的；如果没有（比如请求了外网），再走网络
      return response || fetch(e.request);
    })
  );
});