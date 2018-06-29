
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
  // transition background
  var images = [ 
    "https://blog.roblox.com/wp-content/uploads/2017/09/Sports-Event-Banner_1920x1080_v01.jpg", "https://media.giphy.com/media/5iN37sLcfJWSY/giphy.gif", "http://sports.cbsimg.net/images/blogs/Jack040914.gif", "http://gif.mocksession.com/wp-content/uploads/2011/12/DERP-BREES.gif" ];
var cur_image = 0;

function changeBackground() {

    cur_image++;

    if ( cur_image >= images.length )
        cur_image = 0;

    // change images
    $( '.backGround' ).css({
        backgroundImage: 'url(' + images[ cur_image ] + ')'
    });

    $( '.backGround .slide' ).fadeOut( 'slow', function(){
        $( this ).css({
            backgroundImage: 'url(' + images[ cur_image ] + ')'
        }).show();
    } );

}

setInterval( changeBackground, 5000 );
// ---------------------------------------------------------------------------------------