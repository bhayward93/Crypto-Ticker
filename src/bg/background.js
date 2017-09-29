//URLs
var COIN_FLOOR_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
var _currency = 'GBP'; //Temp default val TODO: Make this detect location.

chrome.browserAction.setBadgeBackgroundColor({color: [225, 0, 0,
    100]}); //does not match definition...

chrome.runtime.onMessage.addListener(messageReceived);
getFromAllSources(); //Simulate an update quick so the price is displayed on load.



/**
 * Handles any valid messages received.
 */
function messageReceived(msg) {
    if(msg.clicked) {
        console.log("message received");
        getFromAllSources();
    }
}


/**
 * Calls from all API sources.
 */
function getFromAllSources(){
    getJSON(COIN_FLOOR_URL, coinDeskJSONAdapter);
}


/**
 * Sets the badge text to the current price.
 * @param currentPrice the current price of a Bitcoin.
 */
function setBadgeText(currentPrice){
    jQuery(document).ready(function() {
        chrome.browserAction.setBadgeText(currentPrice);
    });
}


/**
 * The adapter to serve CoinDesks response.
 * @param results
 */
function coinDeskJSONAdapter(results){
    var parsed = $.parseJSON(JSON.stringify(results));
    var rate = parsed['bpi'][_currency]['rate'];
    setBadgeText({text:rate});
}


/**
 * Gets JSON from a given URL.
 * @param selectUrl the complete URL to retrieve.
 * @param fn the function to be called upon the JSONs return.
 */
function getJSON(selectUrl, fn){
    console.log("getting JSON");
    jQuery(document).ready(function($){
        $.ajax({ //make an AJAX request
            url: selectUrl,
            dataType: 'Json',
            success: function (results) { //On Success
                fn(results);
            }});
    });
}