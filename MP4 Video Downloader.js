// ==UserScript==
// @name         MP4 Video Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Finds and downloads all playable video files from a page
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';


function getVideoURLs() {
        const urls = new Set();

        // <video src="">
        document.querySelectorAll('video[src]').forEach(video => {
            const src = video.src;
            if (src && /\.(mp4|webm|ogg|mov|mkv)(\?|$)/i.test(src)) {
                urls.add(src);
            }
        });

        // <video><source src=""></video>
        document.querySelectorAll('video source[src]').forEach(source => {
            const src = source.src;
            if (src && /\.(mp4|webm|ogg|mov|mkv)(\?|$)/i.test(src)) {
                urls.add(src);
            }
        });

        // <source src=""> (standalone)
        document.querySelectorAll('source[src]').forEach(source => {
            const src = source.src;
            if (src && /\.(mp4|webm|ogg|mov|mkv)(\?|$)/i.test(src)) {
                urls.add(src);
            }
        });

        return Array.from(urls);
    }



    function downloadMP4(url, filename = null) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.blob();
            })
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename || url.split('/').pop().split('?')[0] || 'video.mp4';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
            })
            .catch(err => console.error('Download failed:', err, url));
    }


    function addDownloadButton() {
        const button = document.createElement('button');
        button.textContent = 'Download MP4 Videos';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.left = '20px';
        button.style.zIndex = 100000;
        button.style.padding = '10px 15px';
        button.style.backgroundColor = '#28a745';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';

        button.onclick = () => {
            const urls = getVideoURLs();
            console.log(`Found ${urls.length} video(s).`);
            if (urls.length === 0) {
                alert('No MP4 or supported video files found!');
            } else {
                urls.forEach(url => downloadMP4(url));
            }
        };

        document.body.appendChild(button);
    }


    window.addEventListener('load', addDownloadButton);
})();
