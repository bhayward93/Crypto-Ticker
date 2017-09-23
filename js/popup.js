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
    if (document.readyState === 'loading') {
        addClick('#currentPriceGet', updateClicked);
    } else {
        $.addEventListener('DOMContentLoaded', addClick('#currentPriceGet', updateClicked()));
    }
}


/**
 * Adds click functionality to a button.
 * @param selector The id of the buttons element.
 * @param fn The function for the button to execute.
 */
function addClick(selector, fn) {
        $(selector).on('mousedown', fn);
}


/**
 * The body of the update buttons click functionality.
 */
function updateClicked(){
    var temptxt = getJSON(COIN_FLOOR_URL, coinDeskJSONAdapter);
    console.log("CoinFloor JSON Returned:"+temptxt);
}


/**
 * Gets JSON from a given URL.
 * @param selecturl the complete URL to retrieve.
 * @param fn the function to be called upon the JSONs return.
 */
function getJSON(selecturl, fn){
    jQuery(document).ready(function($){
        var ajaxReq = $.ajax({ //make an AJAX request
            url: selecturl,
            dataType: 'Json',
            success: function (results) { //On Success
                fn(results);
            }});    });
}

/**
 * The adapter to serve CoinDesks response.
 * @param results
 */
function coinDeskJSONAdapter(results){
    console.log("Inside CoinDesk adapter.");
    var parsed = $.parseJSON(JSON.stringify(results));
    console.log("Parsed: " + parsed + " ||  Stringify: " + JSON.stringify(results));
    console.log("Price in GBP: " + parsed['bpi']['GBP']['rate']);
    // $.each(results, function(element) { //For each element
    //     console.log(text);
    // })
}

/**
 * Sets the badge text to the current price.
 * @param currentPrice the current price of a Bitcoin.
 */
function setBadgeText(currentPrice){
    jQuery(document).ready(function($) {
        chrome.browserAction.setBadgeText(currentPrice);
    });
}


/**
 * Sets the background color of the button, in future will take the colour as args.
 */
function setBadgeBGColor(r ,g, b){
    chrome.browserAction.setBadgeBackgroundColor({color: [r, g, b]});
}
