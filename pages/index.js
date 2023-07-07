import home from "../public/home.jpg";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useEffect, useState } from "react";

let convertedVapidKey;

export default function Home() {
  const [endpoint, setEndpoint] = useState("");
  const [expirationTime, setExpirationTime] = useState("");
  const [keys, setKeys] = useState("");
  const [body, setBody] = useState("");
  const [isSupportWebPush, setIsSupportWebPush] = useState("");
  const [thenRes, setThenRes] = useState("");
  const [errorRes, setErrorRes] = useState("");
  const [clientError, setClientError] = useState("");

  const publicKey =
    "BDeEjWwSClAYzHE15bxl1I0vlnTryaLz8XrfiqpX_nq9sLnmrEL3W-q_y3628MGBjJ10XKFb21LKk1OQGBsrf9Q";
  // const convertedVapidKey = urlBase64ToUint8Array(publicKey); ..

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     convertedVapidKey = urlBase64ToUint8Array(publicKey);
  //     console.log(convertedVapidKey);
  //   }
  // });

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    // eslint-disable-next-line
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function sendSubscription(subscription) {
    // return fetch(`${process.env.REACT_APP_API_URL}/notifications/subscribe`, {

    return fetch(`api/notification`, {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEndpoint(data.endpoint);
        setExpirationTime(data.expirationTime);
        setKeys(data.keys);
        setBody(data.body);
        setThenRes(data.thenRes);
        setErrorRes(data.errorRes);
      });
  }

  function unSubscribe() {
    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((subscription) => {
        if (subscription !== null) {
          subscription
            .unsubscribe()
            .then((successful) => {
              // You've successfully unsubscribed
              console.log("unsubscribed");
              console.log(successful);
            })
            .catch((e) => {
              // Unsubscribing failed
              console.log("unsubscribed failed");
              console.log(e);
            });
        } else {
          console.log("nothing to unsubscribe");
          setClientError("nothing to unsubscribe");
        }
      });
    });
  }

  function subscribeUser() {
    if (typeof window !== "undefined") {
      if (!convertedVapidKey) {
        convertedVapidKey = urlBase64ToUint8Array(publicKey);
        console.log(convertedVapidKey);
      }
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then(function (registration) {
          if (!registration.pushManager) {
            console.log("Push manager unavailable.");
            return;
          }

          registration.pushManager
            .getSubscription()
            .then(function (existedSubscription) {
              console.log("exisiting subscription");
              console.log(existedSubscription);
              console.log("................");
              if (existedSubscription === null) {
                console.log("No subscription detected, make a request.");
                registration.pushManager
                  .subscribe({
                    applicationServerKey: convertedVapidKey,
                    // applicationServerKey: publicKey,
                    userVisibleOnly: true,
                  })
                  .then(function (newSubscription) {
                    console.log("New subscription added.");
                    console.log(newSubscription);
                    console.log("..............");
                    sendSubscription(newSubscription);
                  })
                  .catch(function (e) {
                    console.log(e);
                    setClientError(e.toString());
                    if (Notification.permission !== "granted") {
                      console.log("Permission was not granted.");
                    } else {
                      console.error(
                        "An error ocurred during the subscription process.",
                        e
                      );
                    }
                  });
              } else {
                console.log("Existed subscription detected.");
                sendSubscription(existedSubscription);
              }
            });
        })
        .catch(function (e) {
          console.error(
            "An error ocurred during Service Worker registration.",
            e
          );
        });
    }
  }

  function currentBrowserSupportsPush() {
    if (!"PushManager" in window) {
      return false;
    }
    if (!"serviceWorker" in navigator) {
      return false;
    }
    if (!"Notification" in window) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    setIsSupportWebPush(currentBrowserSupportsPush());
  });

  return (
    <div className="p-0">
      <Navbar />
      {/* <div className="w-100">
        <img src="/home.jpg" className="img-fluid" />
      </div> */}
      <div className="container my-5">
        <br />
        <button onClick={subscribeUser}>Subscribe!</button>
        <button onClick={unSubscribe}>UnSubscribe!</button>
        <p>endpoint: {endpoint}</p>
        <p>expirationTime: {expirationTime || "null"}</p>
        <p>keys (auth): {keys.auth}</p>
        <p>keys (p256dh): {keys.p256dh}</p>
        <p>response: {body}</p>
        <p>Supports web push: {isSupportWebPush.toString()}</p>
        <p>then res: {thenRes}</p>
        <p>errorRes: {errorRes}</p>
        <p>clientError???: {clientError}</p>
        {/* <p>clientError???: {clientError}</p> */}
        <div className="row">
          <Card src="https://images.pexels.com/photos/397096/pexels-photo-397096.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
          <Card src="https://images.pexels.com/photos/629162/pexels-photo-629162.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
          <Card src="https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
          <Card src="https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
          <Card src="https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
          <Card src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        </div>
      </div>
      <div className="py-3 text-white text-center w-100 bg-dark">
        <p>A PWA Web App built on Next.js</p>
      </div>
    </div>
  );
}
