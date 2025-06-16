
document.addEventListener("DOMContentLoaded", function () {
  const queryParams = new URLSearchParams(window.location.search);
  const category = queryParams.get("cat");
  fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("productList");
      const filtered = data.filter(p => p.category === category);
      filtered.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${item.name}</h3>
          <p>₹${item.price} / ${item.weight}</p>
          <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
        `;
        list.appendChild(div);
      });
    });

  window.addToCart = function(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(i => i.name === item.name);
    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      item.quantity = 1;
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Cart में जोड़ दिया गया!");
  };
});
