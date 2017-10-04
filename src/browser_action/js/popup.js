/**
 * Created by Ben Hayward on 19/09/17.
 * Manages the popups functionality.
 */

//Include

$.getScript( "../common/currencyEnum.js", function( data, textStatus, jqxhr ) {
    console.log( data ); // Data returned
    console.log( textStatus ); // Success
    console.log( jqxhr.status ); // 200
    console.log( "Load was performed." );
});

var EXT_ID = 'kindgboflaljopjnjegdkhkhllhlblpo'; //TODO Combine into strings file when more vars to fill the class.

//port.onMessage.addListener(function(msg) {});

run(); //Execute the script


/**
 * Execute the script, adding an event listener to the document if necessary.
 */
function run(){
    if (document.readyState === 'loading') {
        registerEventListeners();
        //addClick('#currentPriceGet', registerEventHanders);
    } else {
        $.addEventListener('DOMContentLoaded', registerEventListeners);
    }
}


/**
 * All event listeners are registered in here.
 */
function registerEventListeners(){
    $("#currencyList").on('change', dropdownAutoSwitcher);
    $("#currentPriceGet").on('mousedown', updateClicked);
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
 * Handles the event for the dropdown menu's release onto a new currency.
 */
function dropdownAutoSwitcher(){
    var e = document.getElementById("currencyList");
    console.log("currencyList: " + e);
    switch(e.value) {
        case 'GBP':
            _currency = currencyEnum.GBP;
            break;
        case 'USD':
            _currency = currencyEnum.USD;
            break;
        case 'EUR':
            _currency = currencyEnum.EUR;
            break;
        default:
            _currency = currencyEnum.GBP; //default currency
            break;
    }
    sendMessage({clicked:"currencyChanged"}); //click.false
    console.log("Switcher Triggered Current Currency: " + _currency);
}


/**
 * The body of the update buttons click functionality.
 */
function updateClicked(){
    console.log("update clicked");
    sendMessage({clicked:"update"});
}


/**
 * Sends the JSON response to the background script.
 */
function sendMessage(msg){
    console.log("Sending Message To Background: "+msg);
    chrome.runtime.sendMessage(EXT_ID, msg, function(response) {
        console.log("Received =" + response);
    });
}