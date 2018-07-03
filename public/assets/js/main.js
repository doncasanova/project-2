

// ---------------------------------------------------------------------------
// google log-in js
function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}
// ----------------------------------------------------------------------
// transition background images
var images = [
    "https://blog.roblox.com/wp-content/uploads/2017/09/Sports-Event-Banner_1920x1080_v01.jpg",
    "images/demo/bg-slide-01.jpg",
    "images/demo/eminem.jpg",
    "images/demo/wilds.jpg",
    "images/demo/timberwolves.jpg",
    "images/demo/mamma.jpg",
    "images/demo/people.jpg",
    "images/demo/vikings.jpg"];
var cur_image = 0;

function changeBackground() {

    cur_image++;

    if (cur_image >= images.length)
        cur_image = 0;

    // change images
    $('.backGround').css({
        backgroundImage: 'url(' + images[cur_image] + ')'
    });

    $('.backGround .slide').fadeOut('slow', function () {
        $(this).css({
            backgroundImage: 'url(' + images[cur_image] + ')'
        }).show();
    });

}

setInterval(changeBackground, 5000);
// ---------------------------------------------------------------------------------------
// Loads images into modal for preference seletion 
$(".test1").on("click", function (logoImage) {
    var logoImage = [
        "/images/pref_imgs/vikings.png",
        "/images/pref_imgs/twins.png",
        "/images/pref_imgs/wolves.png",
        "/images/pref_imgs/wild.png",
        "/images/pref_imgs/united.png",
        "/images/pref_imgs/saints.png",
        "/images/pref_imgs/lynx.png",
        "/images/pref_imgs/gophers.png"

    ]

    var logoImageName = [
        "Vikings",
        "Twins",
        "Wolves",
        "Wilds",
        "United",
        "Saints",
        "Lynx",
        "Gophers"
    ]

    $(".test123").empty();
    for (var i = 0; i < logoImage.length; i++) {

        $(".test123").append(`<div class="img_container userPreferenceLogo"><img src="${logoImage[i]}" alt="${logoImageName[i]}" class="image"> <div class="middle">  <div class="text">${logoImageName[i]}</div></div></div>`)

        $("#menu").append(`<a><li><img src="${logoImage[i]}" alt="${logoImageName[i]}"height="10%" width="10%"</li></a>`)
    }

});

// -------------------------------------------------------------------------------------
// function for speak voice
function startDictation() {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(e) {
        document.getElementById('transcript').value
                                 = e.results[0][0].transcript;
        recognition.stop();
        document.getElementById('labnol').submit();
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }

    }
  }

//   