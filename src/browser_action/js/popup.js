/**
 * Created by Ben Hayward on 19/09/17.
 * Manages the popup functionality.
 */

const EXT_ID = 'kindgboflaljopjnjegdkhkhllhlblpo'; //TODO Combine into strings file when more vars to fill the class.
let _coinsList= [];
let port = chrome.runtime.connect(EXT_ID, {name: "refresh"});
//
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log("popup js listening")
//         if (request.data.currencyListStored) {
//             //  To do something
//             console.dir(request.data);
//         }
//     }
// );
//

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.coinsListStored) {
            chrome.storage.local.get('coinList', function(value){
                console.log(value.coinList)
                // let wrapper = document.getElementById('firstDropdownWrapper');
                // let dropdown = document.getElementById('currencyList')
                value.coinList.map((coin) => {
                    $(".selectpicker").append('<option value="'+coin.symbol+'" selected="">'+coin.name+'</option>');
                })
                $('.selectpicker').selectpicker();
                $('.selectpicker').selectpicker('render');
                $('.selectpicker').selectpicker('refresh');



            })
        }
    }
);
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
 * Handles the event for the drop-down menu's release onto a new currency.
 */
function dropdownAutoSwitcher(){
    var e = document.getElementById("currencyList");
    console.log("currencyList: entered");
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
    sendMessage({currencyChanged: _currency});
    console.log("Switcher Triggered Current Currency: " + _currency);
}


/**
 * The body of the update buttons click functionality.
 */
function updateClicked(){
    console.log("update clicked");
    sendMessage({update: true});
}


/**
 * Sends the JSON response to the background script.
 * @param msg The JSON object to be sent.
 */
function sendMessage(msg){
    console.log("Sending Message To Background: "+msg);
    try {
        port.postMessage(msg);
    } catch(err){
        console.log(err.message);
    }
}



/**
 * Adds click functionality to a button.
 * @param selector The id of the buttons element.
 * @param fn The function for the button to execute.
 */
// function addClick(selector, fn) {
//     $(selector).on('mousedown', fn);
// }
