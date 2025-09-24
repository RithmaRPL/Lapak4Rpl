let cart = [];

// buka & tutup modal
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");

cartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartModal.style.display = "flex";
  renderCart();
});

closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// tambah ke keranjang
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const name = item.getAttribute("data-name");
    const price = parseInt(item.getAttribute("data-price"));

    const existing = cart.find((p) => p.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    updateCartCount();
  });
});

// render isi keranjang
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - Rp ${item.price} x ${item.qty}
      <div>
        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toLocaleString();
}

// ubah jumlah qty
function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartCount();
  renderCart();
}

// update jumlah icon cart
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = count;
}

// checkout ke WhatsApp
document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }
  let message = "Hai, saya ingin memesan:\n";
  let total = 0;
  cart.forEach((item) => {
    message += `- ${item.name} (${item.qty}x) = Rp ${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });
  message += `Total: Rp ${total.toLocaleString()}\nApakah stok tersedia?`;

  const whatsappNumber = "6287873268973"; // nomor WA kamu
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
});

/* SCRIPT UNTUK TOGGLE MENU */
function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("show");
}

function toggleMenu() {
  const nav = document.getElementById("mobile-nav");
  nav.classList.toggle("active");
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
