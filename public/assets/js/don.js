$(document).ready(function () {

    $(".userPreference").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log('clicked on preference')
    });

    $(".userLogIn").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log('user log in click')
    });

    loadAnimatedText()
});


function loadAnimatedText() {
    // $('#gen').click(function () {
var test = 5
        for (var i = 0; i < test; i++) {
            var div = $('<h6>Another</h6><p>Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>').prependTo('.rainbowSlide');

            var height = div.outerHeight();
            div.css({
                "marginTop": -height,
                "opacity": 0
            }).animate({
                "marginTop": 0,
                "opacity": 1
            }, "slow");
        };
    // });


};