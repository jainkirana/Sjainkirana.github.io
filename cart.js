
document.addEventListener("DOMContentLoaded", function() {
  const cartPage = document.getElementById("cartPage");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartDisplay() {
    cartPage.innerHTML = "";
    if (cart.length === 0) {
      cartPage.innerHTML = "<p>आपका कार्ट खाली है।</p>";
      return;
    }
    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>₹${item.price} x 
          <button onclick="changeQty(${index}, -1)">➖</button> 
          ${item.quantity} 
          <button onclick="changeQty(${index}, 1)">➕</button> = ₹${itemTotal}</p>
        <button onclick="removeItem(${index})">❌ हटाएं</button>
      `;
      cartPage.appendChild(itemDiv);
    });
    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<h3>कुल राशि: ₹${total}</h3><button onclick="buyNow()">Buy Now</button>`;
    cartPage.appendChild(totalDiv);
  }

  window.changeQty = function(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  };

  window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  };

  window.buyNow = function() {
    window.location.href = "thankyou.html";
  };

  updateCartDisplay();
});
