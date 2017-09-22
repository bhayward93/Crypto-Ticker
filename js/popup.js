/**
 * Created by Ben Hayward on 19/09/17.
 */

var COIN_FLOOR_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

checkReadyStateAndExecute();


function checkReadyStateAndExecute(){
    if(document.readyState === 'loading' ) {
        addClick();
    } else  {
        document.addEventListener('DOMContentLoaded', addClick());
    }
}


function addClick() {
    var button = document.getElementById('currentPrice');
    button.addEventListener('click', updateClicked);
}


function updateClicked(){
    var temptxt = getJSON(COIN_FLOOR_URL); //currently not firing.
    setBadgeText(temptxt);
    alert(temptxt);
}


function getJSON(url){  //https://api.coindesk.com/v1/bpi/currentprice.json
    $.ajax.get(url, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}

function setBadgeText(currentPrice){
    chrome.browserAction.setBadgeText(currentPrice);
}

function setBadgeBGColor(){
    chrome.browserAction.setBadgeBackgroundColor({color: [0,0,255]});
}
