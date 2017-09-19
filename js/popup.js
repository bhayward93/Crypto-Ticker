/**
 * Created by Ben Hayward on 19/09/17.
 */

$.addEventListener('contentLoaded', function() { //Adding an event listener to the document
    var COIN_FLOOR_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";
    alert('Document EventListener Loaded');  //Test2
   $('currentPrice').addEventListener('currentPriceClick', function() {

        var temptxt = getJSON(COIN_FLOOR_URL);
        setBadgeText(temptxt);
        alert(temptxt);
    }, false);
}, false);

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