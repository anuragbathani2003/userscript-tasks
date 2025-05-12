// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-05-12
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_webRequest
// ==/UserScript==

(function() {
    'use strict';

     // Array of domain patterns to block
    const blockedDomains = [
        'https://ads.servenobid.com/*',
        'https://tracking.example.com/*',
        'https://ads.anotherdomain.com/*',
        'https://px.ads.linkedin.com/*',
        'https://pagead2.googlesyndication.com/*',
        'https://securepubads.g.doubleclick.net/*'
    ];

    // Create webRequest rules from blockedDomains array
    const rules = blockedDomains.map(domain => ({
        selector: domain,
        action: 'cancel'
    }));

    // Register the rules
    GM_webRequest(rules, (info, message, details) => {
        console.log('Blocked request:', info, message, details);
    });
})();