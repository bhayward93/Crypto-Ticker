/**
 * Created by Ben Hayward on 19/09/17.
 */

document.addEventListener('DOMContentLoaded', function() { //Adding an event listener to the document
    var COIN_FLOOR_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    alert('Document EventListener Loaded');  //Test2
   $('currentPrice').addEventListener('click', updateClicked() , false);
}, false);
//try chromium

function updateClicked(){
    alert ('11111');
    var temptxt = getJSON(COIN_FLOOR_URL);
    setBadgeText(temptxt);
    alert(temptxt);
}
function setBadgeText(currentPrice){
    chrome.browserAction.setBadgeText(currentPrice);
}

function setBadgeBGColor(){
    chrome.browserAction.setBadgeBackgroundColor({color: [0,0,255]});
}

function getJSON(url){  //https://api.coindesk.com/v1/bpi/currentprice.json
    $.get(url, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}