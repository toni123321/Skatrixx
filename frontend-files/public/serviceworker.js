const CACHE_NAME = "version-1";
const urlsToCache = ["manifest.json",
'index.html', 
'offline.html',
"stepsPage.html",
"statisticPage.html",
"gameMode.html",
"./css/gameMode.css",
"./css/offline.css",
"./css/statisticPage.css",
"./css/stepsOffline.css",
"./images/background_image.png",
"./images/logo.png",
"./images/good.gif"
];

const self=this;
//instal SW
self.addEventListener('install', (event)=>{
 
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log("Opened cache");

            return cache.addAll(urlsToCache);

        })
    )
});



//listen for requests
self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
            .catch(() => caches.match('offline.html'))
        })
    )
    
});



// Activate the SW
self.addEventListener('activate', (event)=>{
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName)=> {
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});
