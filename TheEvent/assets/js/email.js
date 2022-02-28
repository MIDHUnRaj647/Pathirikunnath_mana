function sendEmail() {
  var from;
  var subject;
  var body;
  from = document.getElementById("email").value;
  subject = document.getElementById("subject").value;
  body = document.getElementById("body").value;
  // console.log(subject, from, body);
  Email.send({
    Host: "smtp.gmail.com",
    Username: "pathirikunnathmanakshethram@gmail.com",
    Password: "nagaraja123",
    To: "pathirikunnathmanakshethram@gmail.com",
    From: from,
    Subject: subject,
    Body: body,
  }).then(function (message) {
    if (message == "OK") {
      Swal.fire(message, "Your mail has been sent successfully", "success");
      document.getElementById("body").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("email").value = "";
      document.getElementById("name").value = "";
    } else {
      Swal.fire(message, "An error occuerd", "error");
    }
    //
  });
}
