$(function() {

  // $('#ticket-list').load("/api/tickets", function(response, status, xhr){
  //     if (status == "success") {
  //       response.data.tickets
  //     }
  //     if (status == "error") {

  //     }
  // });
  // $(window).load(function() {
  //   $.ajax("/api/tickets", {
  //     type: "GET"
  //   }).then(function(tickets) {
  //     return tickets;
  //     //$('#ticket-list')
  //   })
  // })

  $(".create-ticket-form").on("submit", function(event) {
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
    }).then(function() {
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