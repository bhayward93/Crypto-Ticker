/**
 * Created by Ben Hayward on 19/09/17.
 * Manages the background processing for the extension.
 */

//Include
// $.getScript( "../common/currencyEnum.js", function( data, textStatus, jqxhr ) {
//     console.log( data ); // Data returned
//     console.log( textStatus ); // Success
//     console.log( jqxhr.status ); // 200
//     console.log( "Load was performed." );
// });

//URLs
var EXT_ID = 'kindgboflaljopjnjegdkhkhllhlblpo';
var COIN_FLOOR_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
var _currency = 'GBP'; //Temp default val TODO: Make this detect location.


chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 225]}); //does not match definition...
getFromAllSources();    //Simulate an update quick so the price is displayed on load.

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "refresh");
    console.log("Connected to port: "+port.name);
    port.onMessage.addListener(function(msg) {
        console.log("from the extension");
        if(msg.currencyChanged){
            sendResponse({received: true});
            console.log("Current currency:" + _currency);
            console.log("msg.currency: " + msg.currency);
            console.log("msg.cur.val : " + msg.currency.val());
            _currency = msg._currency;
            console.log("Currency after changing: " + _currency);
        } else if(Number.isInteger(msg.update)){
            sendResponse({received: true});
            getFromAllSources();
        }})});

// chrome.runtime.onConnect.addListener(
//     function(request, sender, sendResponse) {
//
//     });


//TODO: https://developer.chrome.com/apps/messaging


/**
 * Calls from all API sources.
 */
function getFromAllSources(){
    getJSON(COIN_FLOOR_URL, coinDeskJSONAdapter);
}


/**
 * The adapter to serve CoinDesks response.
 * @param results
 */
function coinDeskJSONAdapter(results){
    var parsed = $.parseJSON(JSON.stringify(results));
    var rate = parsed['bpi'][_currency]['rate'];
    setBadgeText({text: rate});
}


/**
 * Gets JSON from a given URL.
 * @param selectUrl the complete URL to retrieve.
 * @param fn the function to be called upon the JSONs return.
 */
function getJSON(selectUrl, fn){
    console.log("getting JSON");
        jQuery(document).ready(function() {
            $.ajax({ //make an AJAX request
                url: selectUrl,
                dataType: 'Json',
                success: function (results) { //On Success
                    fn(results);
                }
            });
    });
}


/**
 * Sets the badge text to the current price.
 * @param currentPrice the current price of a Bitcoin.
 */
function setBadgeText(currentPrice){
    jQuery(document).ready(function() {
        chrome.browserAction.setBadgeText(currentPrice);
    });
    console.log("price changed to: "+currentPrice.toString());
}