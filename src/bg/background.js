/**
 * Created by Ben Hayward on 19/09/17.
 * Manages the background processing for the extension.
 */

//URLs
var COIN_DESK_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

var _currency = currencyEnum.GBP; //Temp default val TODO: Make this detect location.

//init
chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 225]}); //does not match definition...
getFromAllSources();    //Simulate an update quick so the price is displayed on load.

//Ports and listeners are used to send and recieve messages.
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "refresh");      //Check port name
    console.log("Connected to port: "+port.name);
    port.onMessage.addListener(function(msg) {    //Add listener for message
        if(Number.isInteger(msg.currencyChanged)){ //Currency sent through as an integer?
            port.postMessage({received: true});
            _currency = msg.currencyChanged;
            console.log("Currency changed to: " + _currency);
        } else if(msg.update){
             console.log('Update request made.');
             port.postMessage({received: true});
        }
        getFromAllSources(); //Get and update badge.
        
    })});


/**
 * Calls from all API sources.
 */
function getFromAllSources(){
    getJSON(COIN_DESK_URL, coinDeskJSONAdapter);
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

/**
 * The adapter to serve CoinDesks response.
 * @param results JSON results
 */
function coinDeskJSONAdapter(results){
    var parsed = $.parseJSON(JSON.stringify(results));
    var rate = parsed['bpi'][Object.keys(currencyEnum)[_currency]]['rate'];
    setBadgeText({text: rate});
}