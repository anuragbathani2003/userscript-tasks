// ==UserScript==
// @name         JPG and PNG Image Downloader
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Adds a button to download all JPG and PNG images on the page
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';



    function getImageURLs() {
        const urls = new Set();
        document.querySelectorAll('img').forEach(img => {
            let src = img.src || img.getAttribute('data-src');
            if (!src) return;

            try {
                src = new URL(src, window.location.href).href;
            } catch (e) {
                return; // Invalid or broken URL
            }

            if (/\.(jpe?g|png)(\?.*)?$/i.test(src)) {
                urls.add(src);
            }
        });
        return Array.from(urls);
    }

    function downloadImage(url, filename = 'image.jpg') {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
            })
            .catch(err => console.error('Download failed:', err, url));
    }

    function addDownloadButton() {
        if (document.getElementById('img-download-btn')) return;

        const button = document.createElement('button');
        button.id = 'img-download-btn';
        button.textContent = 'Download JPG/PNG Images';
        button.style.position = 'fixed';
        button.style.top = '35px';
        button.style.right = '20px';
        button.style.zIndex = '99999';
        button.style.padding = '10px 15px';
        button.style.backgroundColor = '#ff0000';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';

        button.onclick = () => {
            const urls = getImageURLs();
            if (urls.length === 0) {
                alert('No JPG or PNG images found!');
            } else {
                urls.forEach((url, i) => {
                    const ext = url.split('.').pop().split('?')[0];
                    downloadImage(url, `image_${i + 1}.${ext}`);
                });
            }
        };

        document.body.appendChild(button);

    }

    const interval = setInterval(() => {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            addDownloadButton();
        }
    }, 2000);
})();