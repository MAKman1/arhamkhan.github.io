$(document).ready(function() {

    function recaptchaCallback() {
      $('#hiddenRecaptcha').valid();
    };

    // Contact Form
    $("#contactform").validate({
        submitHandler: function(form) {
          $('#result').html("");
          $.post("inc/func-contact.html", $(form).serialize(), function(data) {
              //alert(data);
              if (data == 0) {
                $('#result').html("<span class='alert alert-danger'><strong>Error:</strong> Email already exist</span>");
              } else if (data == 1) {
                $('#result').html("<span class='alert alert-success'><strong>Thank you</strong>, we have received your information.</span>");
                $('#submit').val('Sent').attr('disabled', true);
              } else if (data == 2) {
                $('#result').html("<span class='alert alert-danger'><strong>Error:</strong> ReCAPTCHA verification failed</span>");
              } else if (data == 3) {
                $('#result').html("<span class='alert alert-danger'><strong>Error:</strong> Please click on the reCAPTCHA box</span>");
              } else if (data == 4) {
                $('#result').html("<span class='alert alert-danger'><strong>Error:</strong> Something went wrong.</span>");
              } else {
                $('#result').html("<span class='alert alert-danger'><strong>Error:</strong> Something went extremely wrong.</span>");
              }
            });
        },
        ignore: ".ignore",
        rules: {
            email: {
                required: true,
                email: true
            },
            hiddenRecaptcha: {
                required: function () {
                    if (grecaptcha.getResponse() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    });

});

