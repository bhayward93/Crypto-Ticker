/**
 * Created by Ben Hayward on 19/09/17.
 */

//Enum for supported currencies.
var currencyEnum = {
    'GBP' : 0,
    'EUR' : 1,
    'USD' : 2
};


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
    console.log("Current Currency: " + _currency);
}


/**
 * The body of the update buttons click functionality.
 */
function updateClicked(){
    console.log("Updating price...");
    sendMessage({clicked:true});
}


/**
 * Sends the JSON response to the background script.
 */
function sendMessage(msg){
    console.log("Sending Message To Background.");
    chrome.runtime.sendMessage("kindgboflaljopjnjegdkhkhllhlblpo", msg, function(response) {
    });

}




