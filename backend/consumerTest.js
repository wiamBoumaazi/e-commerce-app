const KafkaConsumer = require("./KafkaConsumer");
const nodemailer = require("nodemailer");

const consumer = new KafkaConsumer(["myTopic", "myOtherTopic"]);
const fromEmail = "magulurilikhitha@gmail.com";

consumer.on("message", (message) => {
  let value = JSON.parse(message.value);
  let email_body = `Hello <b>${value[0].buyer_username}</b>! <p>Thank you for shoppping with us.</p><p>Below are the transaction details for order #${value[0].transaction_id}:</p><hr/><table style="width:40%"><tr><th>Product Name</th><th>Quantity</th><th>Price</th></tr>`;
  value[0].items.map((item) => {
    email_body += `<tr align="center"><td>${item[0].product_name}</td><td>${item[0].quantity}</td><td>$${item[0].price}</td></tr>`;
  });
  email_body+= `</table><hr/><table style="width:65%"><tr><th></th><th></th><th>Order Total = $${value[0].total_amount}</th></tr></table>`
  console.log("New item has been read");
  setTimeout(() => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromEmail,
        pass: "", // DO NOT COMMIT THIS
      },
    });

    const mailOptions = {
      from: fromEmail,
      to: fromEmail,
      subject: `Your order #${value[0].transaction_id}`,
      html: email_body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        console.log("Proccessing has completed", message.offset);
      }
    });
  }, 5000);
});

consumer.connect();
