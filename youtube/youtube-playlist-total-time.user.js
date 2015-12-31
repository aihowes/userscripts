// ==UserScript==
// @name         Youtube Playlist Total Time
// @namespace    http://alexhowes.co.uk/
// @version      1.0.2
// @description  Gets total playlist time length and displays in playlist details
// @author       Alex Howes
// @match        https://www.youtube.com/playlist?*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==

var totalMinutes = 0,
    totalSeconds = 0,
    totalHours = 0,
    totalTime;

function getMinutesAndSeconds(time) {
    time = time.split(':');
    if(time.length === 3) {
        seconds = parseInt(time[2], 10);
        minutes = parseInt(time[1], 10);
        hours = parseInt(time[0], 10);
        minutes = minutes + (hours*60);
    } else {
        minutes = parseInt(time[0], 10);
        seconds = parseInt(time[1], 10);
    }

    return [minutes, seconds];
}

function fixTotalTime() {
    totalMinutes = totalMinutes + (Math.floor(totalSeconds / 60));
    totalSeconds = totalSeconds % 60;

    if(totalMinutes > 60) {
        totalHours = Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;
        totalTime = totalHours + ":";
    }

    if(totalSeconds.length === 1) {
        totalSeconds = "0" + totalSeconds;
    }
    if(totalMinutes.length === 1) {
        totalMinutes = "0" + totalMinutes;
    }

    totalTime = totalHours+'h' + ' ' + totalMinutes+"m" + ' ' + totalSeconds +'s';
}

function printTotalTime() {
    $('.pl-header-details').append("<li><span class='timestamp'>Total Time: "+totalTime+"</span></li>");
}

function startLoopingThrough() {
    $('.timestamp span').each(function(){
        var thisTime = getMinutesAndSeconds($(this).html());
        totalMinutes = totalMinutes + parseInt(thisTime[0], 10);
        totalSeconds = totalSeconds + parseInt(thisTime[1], 10);
    });
}

function numberOfVideosLoaded() {
    return $('.timestamp span').size();
}

function numberOfTotalVideos() {
    arrayText = $('.pl-header-details li:nth-child(2)').text().split(' ');
    return arrayText[0];
}

function startHere() {
    $('.load-more-button').removeAttr('onclick');
    if (numberOfVideosLoaded() == numberOfTotalVideos()) {
        startLoopingThrough();
        fixTotalTime();
        printTotalTime();
        clearTimeout(startHere);
    } else {
        window.ytplaylisttimeout_i++;
        if (window.ytplaylisttimeout_i <= 40) {
            $('.load-more-button').click();
            setTimeout(startHere, 250);
        }
    }
}

$(document).ready(function(){
    window.ytplaylisttimeout_i = 0;
    $('.load-more-button').removeAttr('onclick');
    startHere();
});