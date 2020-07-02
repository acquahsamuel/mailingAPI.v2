class App {
  constructor() {
    this.animation = bodymovin.loadAnimation({
      container: document.getElementById("loading"),
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "/anims/loading.json",
    });

    this.sendMessage = this.sendMessage.bind(this);
    let submitBtn = document.querySelector("#submit");
    submitBtn.addEventListener("click", this.sendMessage);
  }

  sendMessage(event) {
    event.preventDefault();

    this.animation.play();

    let from = document.querySelector("#from").value;
    let to = document.querySelector("#to").value;
    let subject = document.querySelector("#subject").value;
    let message = document.querySelector("#message").value;

    // let stamp = Date.now().toString();
    // console.log(stamp);
    let postOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: from,
        to: to,
        subject: subject,
        message: message,
      }),
    };
    let head = document.querySelector(".label");
    head.style.color = "black";
    if (
      from.length > 0 &&
      to.length > 0 &&
      subject.length > 0 &&
      message.length > 0
    ) {
      console.log("inside");
      fetch("/sendEmail", postOptions).then(
        (response) => {
          console.log(response);
          response.text().then(async (text) => {
            console.log(text);
            head.innerHTML = "Mail Sent";
            this.animation.stop();
          });
        },
        () => {
          console.log("Failure");

          head.innerHTML = "Failed Sending mail";
          head.style.color = "red";
        }
      );
    } else {
      head.innerHTML = "Enter details in field";
      head.style.color = "red";
      // location.reload()
      console.log("failes");
    }
  }
}

const app = new App();
