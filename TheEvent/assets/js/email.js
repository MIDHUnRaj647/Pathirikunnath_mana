function sendEmail() {
  var from;
  var subject;
  var body;
  from=document.querySelector(".form-group col-md-6 mt-3 mt-md-0 .form-control")
  subject=
  Email.send({
    Host: "smtp.gmail.com",
    Username: "dhegodcoder@gmail.com",
    Password: "osbusessymviqovs",
    To: 'dhegodcoder@gmail.com',
    From: "midhunraj647@gmail.com",
    Subject: subject,
    Body: "Well that was easy!!",
  })
        .then(function (message) {
          alert("mail sent successfully")
        });
    }