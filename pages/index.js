import home from "../public/home.jpg";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useEffect, useState } from "react";

export default function Home() {
  const publicKey =
    "BDeEjWwSClAYzHE15bxl1I0vlnTryaLz8XrfiqpX_nq9sLnmrEL3W-q_y3628MGBjJ10XKFb21LKk1OQGBsrf9Q";

  // const convertedVapidKey = urlBase64ToUint8Array(publicKey);

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
    });
  }

  function subscribeUser() {
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
              if (existedSubscription === null) {
                console.log("No subscription detected, make a request.");
                registration.pushManager
                  .subscribe({
                    // applicationServerKey: convertedVapidKey,
                    applicationServerKey: publicKey,
                    userVisibleOnly: true,
                  })
                  .then(function (newSubscription) {
                    console.log("New subscription added.");
                    sendSubscription(newSubscription);
                  })
                  .catch(function (e) {
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

  useEffect(() => {
    console.log("use state");
  }, []);

  return (
    <div className="p-0">
      <Navbar />
      <div className="w-100">
        <img src="/home.jpg" className="img-fluid" />
        <button onClick={subscribeUser}>Subscribe!</button>
      </div>
      <div className="container my-5">
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