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
    var temptxt = getJSON(COIN_FLOOR_URL);
    alert(temptxt);
}


/**
 * Gets JSON from a given URL.
 * @param selecturl the complete URL to retrieve.
 */
function getJSON(selecturl){
    jQuery(document).ready(function($){
        console.log("Inside getJSON, document ready.");
        var ajaxReq = $.ajax({
            url: selecturl,
            dataType: 'Json',
            success: function (results) {
                console.log(results);
            }
        });
      //  $.get(url, function (data, status) {

      //  });
    });
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
