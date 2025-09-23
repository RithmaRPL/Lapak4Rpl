const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = [];

// buka modal keranjang
cartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartModal.style.display = "flex";
});

// tutup modal
closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// klik di luar modal tutup
window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// tambahkan produk ke keranjang
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const item = e.target.closest(".produk-item");
    const name = item.getAttribute("data-name");
    const price = parseInt(item.getAttribute("data-price"));

    const existingItem = cart.find((p) => p.name === name);
    if (existingItem) {
      existingItem.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCart();
  });
});

// update tampilan keranjang
function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} (x${item.qty})</span>
      <div>
        <button onclick="changeQty(${index}, -1)">-</button>
        <button onclick="changeQty(${index}, 1)">+</button>
        Rp ${item.price * item.qty}
      </div>
    `;
    cartItemsList.appendChild(li);
  });

  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = cart.reduce((a, b) => a + b.qty, 0);
}

// ubah jumlah item
function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCart();
}

// tombol checkout
document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let items = cart.map((item) => `${item.name} x${item.qty}`).join(", ");
  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  let message = `Hai, saya ingin memesan ${items}, total Rp ${total.toLocaleString()}. Apakah stock masih ada? Bisa di antar kapan?`;

  // Ganti nomor berikut dengan nomor WhatsApp tujuan
  const phone = "6287873268973";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});

/* SCRIPT UNTUK TOGGLE MENU */
function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("show");
}


// Efek scroll header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
