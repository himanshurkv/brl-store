const totalElement = document.getElementById("cart-total");
const cartJsonElement = document.getElementById("cart-json");
const paypalContainer = document.getElementById("paypal-button-container");
const paypalError = document.getElementById("paypal-error");

function showError(message) {
  if (paypalError) {
    paypalError.textContent = message;
  }
  console.error(message);
}

if (!totalElement) {
  showError("Missing total element.");
} else if (!cartJsonElement) {
  showError("Missing cart data.");
} else if (!paypalContainer) {
  showError("Missing PayPal container.");
} else if (typeof paypal === "undefined") {
  showError("PayPal failed to load. Check your client ID.");
} else {
  const totalInInr = Number(totalElement.value);
  const cartData = JSON.parse(cartJsonElement.textContent);

  function convertInrToUsd(inr) {
    return (inr / 83).toFixed(2);
  }

  paypal.Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: convertInrToUsd(totalInInr)
            }
          }
        ]
      });
    },

    onApprove: function (data, actions) {
      return actions.order.capture().then(function () {
        return fetch("/paypal-success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cart: cartData
          })
        }).then(function () {
          window.location.href = "/orders";
        });
      });
    },

    onError: function (err) {
      showError("PayPal button error. Check console for details.");
      console.error(err);
    }
  }).render("#paypal-button-container");
}