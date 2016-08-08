// ==UserScript==
// @name         Laracasts - Full Width Video
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Makes the Laracasts video player take up the full viewport.
// @author       You
// @match        https://laracasts.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var videoPlayer = document.querySelector(".Video__player");
    videoPlayer.style.width = '100%';
    videoPlayer.style.maxWidth = '100%';
    videoPlayer.style.padding = 0;
    videoPlayer.style.margin = 0;
    videoPlayer.style.border = 'none';

    var videoWrap = document.querySelector(".Video__player-wrap");
    videoWrap.style.border = 'none';

})();
