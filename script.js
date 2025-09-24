// Simpan data keranjang
let cart = [];

// Ambil elemen
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items-list");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

// Buka / tutup modal keranjang
cartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartModal.style.display = "block";
  renderCart();
});

closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Tambahkan produk ke keranjang
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const produk = button.closest(".produk-item");
    const name = produk.dataset.name;
    const price = parseInt(produk.dataset.price);
    const image = produk.querySelector("img").src; // ✅ ambil gambar

    // cek apakah item sudah ada
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        name: name,
        price: price,
        image: image,   // ✅ simpan gambar
        quantity: 1
      });
    }

    renderCart();
  });
});


// Render isi keranjang
function renderCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  let totalCount = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - Rp ${item.price} x ${item.quantity} 
      = Rp ${item.price * item.quantity}
      <button onclick="updateQuantity(${index}, -1)">-</button>
      <button onclick="updateQuantity(${index}, 1)">+</button>
      <button onclick="removeItem(${index})">Hapus</button>
    `;
    cartItemsList.appendChild(li);

    total += item.price * item.quantity;
    totalCount += item.quantity;
  });

  cartTotal.textContent = total;
  cartCount.textContent = totalCount;
}function renderCart() {
  const cartItemsList = document.getElementById("cart-items-list");
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <strong>${item.name}</strong><br>
          Rp ${item.price.toLocaleString()} x ${item.quantity}
        </div>
      </div>
      <div class="cart-item-actions">
        <button onclick="decreaseQuantity(${index})">-</button>
        <button onclick="increaseQuantity(${index})">+</button>
        <button onclick="removeItem(${index})">Hapus</button>
      </div>
    `;

    cartItemsList.appendChild(li);
  });
  document.getElementById("cart-total").textContent = total.toLocaleString();
  document.getElementById("cart-count").textContent = cart.length;
  
}


// Update jumlah item
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

// Hapus item dari keranjang
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Checkout ke WhatsApp
document.getElementById("checkout-btn").addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const paymentMethod = document.getElementById("payment-method").value;
  const address = document.getElementById("shipping-address").value.trim();

  if (!address) {
    alert("Mohon isi alamat pengiriman!");
    return;
  }

  // Buat pesan WhatsApp
  let message = "Hai, saya ingin memesan:\n";
  cart.forEach(item => {
    message += `- ${item.name} x${item.quantity} = Rp ${item.price * item.quantity}\n`;
  });
  message += `\nTotal: Rp ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}\n`;
  message += `Metode Pembayaran: ${paymentMethod}\n`;
  message += `Alamat Pengiriman: ${address}\n\n`;
  message += "Apakah stock masih ada? Bisa diantar kapan?";

  const encodedMessage = encodeURIComponent(message);
  const waNumber = "6289667045900"; // ganti dengan nomor WA Anda
  window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, "_blank");
});

// Toggle menu mobile
function toggleMenu() {
  document.getElementById("mobile-nav").classList.toggle("active");
}
