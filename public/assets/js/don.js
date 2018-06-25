
var ticketType = ['hockey', 'football', 'baseball', 'basketball', 'soccer', 'concerts', 'events of all kinds', 'exhibits']
mainPage()
function mainPage() {
    $(document).ready(function () {
        $(".navBarRollDown").slideUp();
        $(".userPreference").on("click", function (event) {
            // Make sure to preventDefault on a submit event.
            event.preventDefault();
            console.log('clicked on preference')
        });

        $(".userLogIn").on("click", function (event) {
            // Make sure to preventDefault on a submit event.
            event.preventDefault();

            $(".navBarRollDown").slideDown();
            $(".slideUpLogIn").slideUp();
            loadAnimatedLeftSideColunm(ticketType)
            window.setTimeout(function () {
                loadAnimatedMiddleSideColunm(ticketType)
            }, 500);
            window.setTimeout(function () {
                loadAnimatedRightSideColunm(ticketType)
            }, 1000);

            $(".LogOutClick").on("click", function (event) {
                event.preventDefault();
                mainPage()
                
            });
        });
    });
}

function loadAnimatedLeftSideColunm(ticketType) {

    for (var i = 0; i < ticketType.length; i++) {
        console.log(ticketType[1])
        var div = $('<h6 class = "waterFallHeader p-1" >Buy,Sell,Trade</h6><p>' + ticketType[i] + '</p>').prependTo('.waterFallSlideLeft');

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
        var div = $('<h6 class = "waterFallHeader p-1" >Buy,Sell,Trade</h6><p>' + ticketType[i] + '</p>').prependTo('.waterFallSlideMiddle');

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
        var div = $('<h6 class = "waterFallHeader p-1" >Buy,Sell,Trade</h6><p>' + ticketType[i] + '</p>').prependTo('.waterFallSlideRight');

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