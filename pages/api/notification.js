const webpush = require("web-push");

const publicKey =
  "BDeEjWwSClAYzHE15bxl1I0vlnTryaLz8XrfiqpX_nq9sLnmrEL3W-q_y3628MGBjJ10XKFb21LKk1OQGBsrf9Q";
const privateKey = "QhVLSPo2Ja5Dvgtp0qI9RFbEMVL0XTVzRnpOsXoMLgc";
const webPushContact = "mailto:contact@my-site.com";

webpush.setVapidDetails(webPushContact, publicKey, privateKey);

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const subscription = req.body;

    console.log("subscription info");
    console.log(subscription);
    console.log("-----------------__---");

    const options = {
      // vapidDetails: {
      //   publicKey:
      //     "BDeEjWwSClAYzHE15bxl1I0vlnTryaLz8XrfiqpX_nq9sLnmrEL3W-q_y3628MGBjJ10XKFb21LKk1OQGBsrf9Q",
      //   privateKey: "QhVLSPo2Ja5Dvgtp0qI9RFbEMVL0XTVzRnpOsXoMLgc",
      //   subject: "mailto: contactNew@my-site.com",
      // },
      // headers: {
      //   stuff: "abc123",
      // },
      // proxy: { host: "fcm.googlesapis.com", port: 443 },
    };

    let response1 = "?";
    let response2 = "!!";
    const rndInt = randomIntFromInterval(1, 100);

    const payload = JSON.stringify({
      title: "Hello!",
      // body: "It works.",
      body: rndInt.toString(),
    });

    webpush
      .sendNotification(subscription, payload, options)
      .then((result) => {
        response1 = "then:--- " + JSON.stringify(result);
        const thenres = "then:--- " + JSON.stringify(result);
        console.log(response1);
        console.log(result);
        res.status(200).json({
          success: true,
          test: "7899",
          body: rndInt.toString(),
          endpoint: subscription.endpoint,
          expirationTime: subscription.expirationTime,
          keys: subscription.keys,
          thenRes: thenres,
          errorRes: response2,
        });
      })
      .catch((e) => {
        // response2 = "catch e: --- " + e.stringify();
        response2 = "catch e: --- " + JSON.stringify(e);
        const errorres = "catch e: --- " + JSON.stringify(e);
        console.log(response2);
        console.log("error???: " + e.stack);

        res.status(200).json({
          success: true,
          test: "123",
          body: rndInt.toString(),
          endpoint: subscription.endpoint,
          expirationTime: subscription.expirationTime,
          keys: subscription.keys,
          thenRes: response1,
          errorRes: errorres,
        });
      });

    // res.status(200).json({
    //   success: true,
    //   test: "123",
    //   body: rndInt.toString(),
    //   endpoint: subscription.endpoint,
    //   expirationTime: subscription.expirationTime,
    //   keys: subscription.keys,
    //   thenRes: response1,
    //   errorRes: response2,
    // });
  } else {
    // Handle any other HTTP method
  }
}

// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }
