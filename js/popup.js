/**
 * Created by Ben Hayward on 19/09/17.
 */

//URLs
var COIN_FLOOR_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

Run();
//Execute the script


/**
 * Execute the script, adding an event listener to the document if necessary.
 */
function Run(){
    if(document.readyState === 'loading' ) {
        addClick('currentPrice', updateClicked);
    } else  {
        document.addEventListener('DOMContentLoaded', addClick('currentPrice', updateClicked()));
    }
}


/**
 * Adds click functionality to a button.
 * @param id The id of the buttons element.
 * @param fn The function for the button to execute.
 */
function addClick(id, fn) {
    $(id).addEventListener('click', fn);
}


/**
 * The body of the update buttons click functionality.
 */
function updateClicked(){
    console.log("Hello from the updateclicked");
    var temptxt = getJSON(COIN_FLOOR_URL); //currently not firing.
    setBadgeText(temptxt);
    alert(temptxt);
}


/**
 * Gets JSON from a given URL.
 * @param url the complete URL to retrieve.
 */
function getJSON(url){
    $.get(url, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}


/**
 * Sets the badge text to the current price.
 * @param currentPrice the current price of a Bitcoin.
 */
function setBadgeText(currentPrice){
    chrome.browserAction.setBadgeText(currentPrice);
}


/**
 * Sets the background color of the button, in future will take the colour as args.
 */
function setBadgeBGColor(r ,g, b){
    chrome.browserAction.setBadgeBackgroundColor({color: [r, g, b]});
}
