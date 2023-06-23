const webpush = require("web-push");

const publicKey =
  "BDeEjWwSClAYzHE15bxl1I0vlnTryaLz8XrfiqpX_nq9sLnmrEL3W-q_y3628MGBjJ10XKFb21LKk1OQGBsrf9Q";
const privateKey = "QhVLSPo2Ja5Dvgtp0qI9RFbEMVL0XTVzRnpOsXoMLgc";
const webPushContact = "mailto: contact@my-site.com";

webpush.setVapidDetails(webPushContact, publicKey, privateKey);

export default function handler(req, res) {
  if (req.method === "POST") {
    const subscription = req.body;

    console.log("subscription info");
    console.log(subscription);
    console.log("--------------------");

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

    const payload = JSON.stringify({
      title: "Hello!",
      body: "It works.",
    });

    webpush
      .sendNotification(subscription, payload, options)
      .then((result) => console.log(result))
      .catch((e) => console.log("error???: " + e.stack));

    res.status(200).json({
      success: true,
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime,
      keys: subscription.keys,
    });
  } else {
    // Handle any other HTTP method
  }
}

// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }
