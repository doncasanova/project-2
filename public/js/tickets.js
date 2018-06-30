$(function() {

  $(".create-ticket-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newTicket = {
      email: $('#email').val90.trim();
      ticket_name: $("#ticket_name").val().trim(),
      location: $("#location").val().trim(),
      season_start: $("#ticket_name").val().trim(),
      season_end: $("#ticket_name").val().trim(),
      price: $("#ticket_name").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/tickets", {
      type: "POST",
      data: newTicket
    }).then(
      function() {
        console.log("created new ticket");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".trade-ticket").on("click", function(event) {
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
      function() {
        console.log("Traded ticket " + ticket_id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
















});