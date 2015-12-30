// ==UserScript==
// @name         YouTube Responsive & Better Cinema Mode
// @namespace    http://alexhowes.co.uk/
// @version      1.0.1
// @description  Makes YouTube a bit more responsive and makes cinema mode fit the viewport width
// @author       Alex Howes
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==


window.matchMedia = null;

var output = "<style> " +
    "#placeholder-player, #theater-background { " +
        "display: none; " +
    "} " +
    ".html5-video-container{ " +
        "height: 100%; " +
        "position: absolute; " +
        "width: 100%; " +
    "} " +
    ".html5-video-container:after{ " +
        "content: ''; " +
        "display: block; " +
        "padding-top: 56.25%; " +
    "} " +
    "#movie_player{ " +
        "bottom: 0; " +
        "left: 0; " +
        "position: absolute; " +
        "right: 0; " +
        "top: 0; " +
    "} " +
    "#movie_player:after { " +
        "content: ''; " +
        "display: block; " +
        "padding-top: 56.25%; " +
    "} " +
    "#player-api, " +
    "#player-unavailable{ " +
        "height: auto !important; " +
        "left: 0 !important; " +
        "margin: 0 auto !important; " +
        "max-width: 1700px !important; " +
        "position: relative !important; " +
        "right: 0 !important; " +
        "width: 100% !important; " +
    "} " +
    "#player-api:before, " +
    "#player-unavailable:before{ " +
        "content: ''; " +
        "display: block; " +
        "padding-top: 56.25%; " +
    "} " +
    ".html5-video-container{ " +
        "height: 100%; " +
        "position: absolute; " +
        "width: 100%; " +
    "} " +
    ".html5-video-container:after{ " +
        "content: ''; " +
        "display: block; " +
        "padding-top: 56.25%; " +
    "} " +
    "#movie_player:not(.ended-mode) .html5-video-container video{ " +
        "height: 100% !important; " +
        "left: 0 !important; " +
        "top: 0 !important; " +
        "width: 100% !important; " +
    "} " +
    ".exp-responsive #yt-masthead { " +
        "width: auto !important; " +
    "} " +
    "#watch-discussion { " +
        "display: block !important; " +
    "} " +
    "#page.watch .content-alignment { " +
        "min-width: 0px; " +
    "} " +
    "#watch7-main #watch7-content, #watch7-sidebar.watch-sidebar, #footer-container, #player-playlist .watch-playlist { " +
        "min-width: 0px;" +
        "max-width: 100%;" +
        "width: auto !important; " +
        "margin: 0 auto; " +
        "padding-left: 10px; " +
        "padding-right: 10px; " +
        "float: none; " +
        "box-sizing: border-box; " +
    "} " +
    "#footer-container .yt-uix-button-group { " +
        "white-space: normal; " +
    "} " +
    ".watch-playlist { " +
        "-moz-transform: translateY(0) !important; " +
        "-ms-transform: translateY(0) !important; " +
        "-webkit-transform: translateY(0) !important; " +
        "transform: translateY(0) !important; " +
        "top: 0 !important; " +
        "left: auto !important; " +
        "right: auto !important; " +
        "position: relative !important; " +
    "} " +
    "#content { " +
        "margin-top: 10px; " +
    "} " +
    ".content-alignment { " +
        "min-width: 0px !important; " +
    "} " +
    "@media screen and (min-width: 900px){ " +
        ".watch-non-stage-mode #player-api { " +
            "width: 65% !important; " +
            "margin-left: 0 !important; " +
            "box-sizing: border-box; " +
            "top: 0; " +
            "bottom: 0; " +
        "} " +
        ".watch-non-stage-mode #player-playlist { " +
            "position: static; " +
        "} " +
        ".watch-non-stage-mode #watch-appbar-playlist { " +
            "position: absolute !important; " +
            "left: 65% !important; " +
            "top: 0 !important; " +
            "right: 0 !important; " +
            "margin-left: 0 !important; " +
        "} " +
        ".watch-stage-mode #watch-appbar-playlist { " +
            "position: absolute !important; " +
            "left: 65% !important; " +
            "top: 10px !important; " +
            "right: 10px !important; " +
        "} " +
        ".watch-non-stage-mode .placeholder-player { " +
            "display: none " +
        "} " +
        "#watch7-main #watch7-content { " +
             "width: 65% !important; " +
             "float: left !important; " +
             "padding-left: 10px !important; " +
             "padding-right: 10px !important; " +
        "} " +
        "#watch7-sidebar.watch-sidebar { " +
             "width: 35% !important; " +
             "float: left !important; " +
             "padding-left: 0 !important; " +
             "padding-right: 10px !important; " +
        "} " +
        ".watch-stage-mode #watch7-sidebar { " +
            "top: 0 !important; " +
        "} " +
    "} " +
    "</style>";

$('head').append(output);

$(document).ready(function(){
    sidebarNonStage();
});


$(window).on('resize', function(){
   sidebarNonStage();
});


function sidebarNonStage() {
    if ($(window).width() > 900) {
        $('.watch-non-stage-mode #watch7-sidebar').css('top', -($('#player-mole-container').outerHeight()+10));
        $('.watch-non-stage-mode #watch-appbar-playlist').css('height', $('#player-mole-container').outerHeight());
        $('.watch-non-stage-mode #placeholder-playlist').css('height', $('#player-mole-container').outerHeight());
    } else {
        $('#watch7-sidebar').css('top', '');
    }
}