
var imageArray = []
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

$(function () {
  $(".create-ticket-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newTicket = {
      email: $('#email').val().trim(),
      ticket_name: $("#ticket_name").val().trim(),
      location: $("#location").val().trim(),
      price: parseFloat($("#price").val().trim()),
      description: $('#description').val().trim()
    };

    console.log('new ticket to store \n', newTicket);

    // Send the POST request.
    $.ajax("/api/tickets", {
      type: "POST",
      data: newTicket
    }).then(function () {
      console.log("created new ticket");
      // Reload the page to get the updated list
      location.reload();
    }
    );
  });

  $(".trade-ticket").on("click", function (event) {
    var ticket_id = $(this).data("ticket_id");
    // we need to get message in modal

    var message = {
      message: 'I am willing to pay $100. Is it good enough for you?'
    }

    // Send the PUT request.
    $.ajax("/api/tickets/" + ticket_id, {
      type: "PUT",
      data: message
    }).then(
      function () {
        console.log("Traded ticket " + ticket_id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });



});


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
$("#pbutton").on("click", function () {

  $(".test123").empty();
  for (var i = 0; i < logoImage.length; i++) {
    var imageClass = ("imageClass" + [i])

    $(".test123").append(`<div class="img_container userPreferenceLogo"><input type="checkbox" name="pref" value="${logoImageName[i]}"><img src="${logoImage[i]}" alt="${logoImageName[i]}" id = "${imageClass}" class="image"><div class="middle"><div class="text">${logoImageName[i]}</div></div></div>`)

  }

});


//--------------------------------------------------------------------------------------
//renders the users choice of preferences images to the div 
$("#submit").click(function () {
//   $("#menu").append(`</div>
//   <button id = "submit2" class="btn btn-danger" data-dismiss="modal">Submit</button>
// </div>`)
  var val = $('input[name=pref]:checked').val();
  $("input:checked").each(function () {

    $("#menu").append(`<input type="checkbox" name="pref" value="${val}"><li><img src="/images/pref_imgs/${val}.png" alt=""height="10%" width="10%"</li>`)
  });
});

//--------------------------------------------------------------------------------------
//renders the users tickets to buy 
$("#submit2").click(function () {

  var val = $('input[name=pref]:checked').val();
  $("#userTrade").prepend(`<div><img src="/images/pref_imgs/${val}.png" alt=""height="100%" width="100%"</div>`)

alert("this is our value " + val)
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

    recognition.onresult = function (e) {
      document.getElementById('transcript').value
        = e.results[0][0].transcript;
      recognition.stop();
      document.getElementById('labnol').submit();
    };

    recognition.onerror = function (e) {
      recognition.stop();
    }

  }
}

$(document).ready(function () {
  var token = '752SKMBHJW64XM6OUEMY';
  var $events = $("#events");

  $.get('https://www.eventbriteapi.com/v3/events/search/?q=sports&location.address=minnesota&token=' + token + '&expand=venue', function (res) {
    if (res.events.length) {
      var s = "<ul class='eventList'>";
      for (var i = 0; i < res.events.length; i++) {
        var event = res.events[i];
        // console.log(event);
        s += "<li><a href='" + event.url + "'>" + event.name.text + "</a> - " + event.description.text + "</li>";
      }
      s += "</ul>";
      $events.html(s);
    } else {
      $events.html("<p>Sorry, there are no upcoming events.</p>");
    }
  });
});