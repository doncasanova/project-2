
var ticketType = ['hockey', 'football', 'baseball', 'basketball', 'soccer', 'concerts', 'events of all kinds', 'exhibits']


$(document).ready(function () {

    $(".userPreference").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log('clicked on preference')
    });

    $(".userLogIn").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        loadAnimatedLeftSideColunm(ticketType)
    window.setTimeout(function () {
        loadAnimatedMiddleSideColunm(ticketType)
    }, 500);
    window.setTimeout(function () {
        loadAnimatedRightSideColunm(ticketType)
    }, 1000);
   
    });

    
});


function loadAnimatedLeftSideColunm(ticketType) {

    for (var i = 0; i < ticketType.length; i++) {
        console.log(ticketType[1])
        var div = $('<h6 class = "waterFallHeader" >Buy,Sell,Trade</h6><p>' + ticketType[i] + '</p>').prependTo('.waterFallSlideLeft');

        var height = div.outerHeight();
        div.css({
            "marginTop": -height,
            "opacity": 0
        }).animate({
            "marginTop": 0,
            "opacity": 1
        }, "slow");
    };
};

function loadAnimatedMiddleSideColunm(ticketType) {

    for (var i = 0; i < ticketType.length; i++) {
        console.log(ticketType[1])
        var div = $('<h6 class = "waterFallHeader" >Buy,Sell,Trade</h6><p>' + ticketType[i] + '</p>').prependTo('.waterFallSlideMiddle');

        var height = div.outerHeight();
        div.css({
            "marginTop": -height,
            "opacity": 0
        }).animate({
            "marginTop": 0,
            "opacity": 1
        }, "slow");
    };
};

function loadAnimatedRightSideColunm(ticketType) {

    for (var i = 0; i < ticketType.length; i++) {
        console.log(ticketType[1])
        var div = $('<h6 class = "waterFallHeader" >Buy,Sell,Trade</h6><p>' + ticketType[i] + '</p>').prependTo('.waterFallSlideRight');

        var height = div.outerHeight();
        div.css({
            "marginTop": -height,
            "opacity": 0
        }).animate({
            "marginTop": 0,
            "opacity": 1
        }, "slow");
    };
};