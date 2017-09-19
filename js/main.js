/**
 * Created by Ben Hayward on 18/09/17.
 */

var COIN_FLOOR_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

setBadgeText(getJSON(COIN_FLOOR_URL));
function setBadgeText(currentPrice){
    chrome.browserAction.setBadgeText(currentPrice);
}

function setBadgeBGColor(){
    chrome.browserAction.setBadgeBackgroundColor({color: [0,255,0,255]});
}

function getJSON(url){  //https://api.coindesk.com/v1/bpi/currentprice.json
        $.get(url, function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
}

