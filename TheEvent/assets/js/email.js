function sendEmail() {
  var from;
  var subject;
  var body;
  from=document.getElementById("email").value;
  subject=document.getElementById("subject").value;
  body=document.getElementById("body").value;
  console.log(subject,from,body)
  Email.send({
    Host: "smtp.gmail.com",
    Username: "dhegodcoder@gmail.com",
    Password: "osbusessymviqovs",
    To: 'dhegodcoder@gmail.com',
    From: from,
    Subject: subject,
    Body: body,
  })
        .then(function (message) {
          alert("mail sent successfully")
        });
    }