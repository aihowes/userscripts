// ==UserScript==
// @name         YouTube Default Playback Rate
// @namespace    http://alexhowes.co.uk/
// @version      1.0
// @description  Sets default playback rate based what it was last changed to
// @author       Alex Howes
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==
/* jshint -W097 */
'use strict';


$(document).ready(function(){

    window.ahOnPlaybackRateChange = function () {
        setCookie('speed', document.getElementById('movie_player').getPlaybackRate(), 365);
    };

    isPlayerThere();
});

function isPlayerThere() {
    if (!document.getElementById('movie_player')) {
        setTimeout(isPlayerThere, 2000);
    } else {
        playerIsThere();
    }
}

function playerIsThere(){
    document.getElementById('movie_player').addEventListener('onPlaybackRateChange', window.ahOnPlaybackRateChange);
    if (window.navigator.cookieEnabled) {
        if (getCookie('speed')) {
            document.getElementById('movie_player').setPlaybackRate(getCookie('speed'));
        } else {
            setCookie('speed', document.getElementById('movie_player').getPlaybackRate(), 365);
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + '; path=/';
}


function getCookie(cname) {
    var name = cname + "=";
    var allcookies = document.cookie.split(';');
    for(var index=0; index<allcookies.length; index++) {
        var thecookie = allcookies[index];
        while (thecookie.charAt(0)==' ') thecookie = thecookie.substring(1);
        if (thecookie.indexOf(name) == 0) {
            return thecookie.substring(name.length, thecookie.length);
        }
    }
    return "";
}
