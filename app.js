const vergiOrani = 0.18;
const kargoÜcreti = 25.99;

// ?events
const navbarList = document.querySelector(".nav__list");
const ürünlerPanelDivi = document.getElementById("product-painel");
console.log(ürünlerPanelDivi);
//! navbar altı delete ve çöp kutusu
const productList = document.querySelector("div.main__product-painel");
navbarList.addEventListener("click", (e) => {
  if (
    e.target.getAttribute("class") == "nav__list--btn" ||
    e.target.getAttribute("class") == "fa-regular fa-trash-can"
  ) {
    //e.target.parentElement.firstElementChild.innerText = "My Cart";
    //e.target.previousElementSibling.innerText = "My Cart";
    //e.target vs. e.currentTarget
    //foreach ==> array, nodeList
    productList.innerText = "No Product!";
    e.currentTarget.firstElementChild.innerText = "My Cart";
    araToplam();
  }
});

ürünlerPanelDivi.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-minus")) {
    if (e.target.nextElementSibling.innerText > 1) {
      e.target.nextElementSibling.innerText--;
      ürünCarpiBirimFiyat(e.target.closest(".main__product-info"));
    } else {
      if (confirm("Silmek istediğinizden emin misiniz?")) {
        e.target.closest(".main__product").remove();
        araToplam();
      }
    }
  } else if (e.target.classList.contains("fa-plus")) {
    e.target.previousElementSibling.textContent++;
    ürünCarpiBirimFiyat(e.target.closest(".main__product-info"));
  } else if (e.target.classList.contains("fa-trash-can")) {
    if (confirm("Silmek istediğinizden emin misiniz?")) {
      // e.target.closest(".main__product").remove();
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
      araToplam();
    }
  }
});

const ürünCarpiBirimFiyat = (ürünPaneli) => {
  // let miktar = parseFloat(document.getElementById("quantity").textContent);
  // console.log(miktar);
  let miktar = ürünPaneli.querySelector("#quantity").innerText;
  console.log(miktar);
  let fiyat = ürünPaneli.querySelector("strong").innerText;
  // console.log(fiyat);
  let miktarCarpiFiyat = ürünPaneli.querySelector(".main__product-line-price");
  miktarCarpiFiyat.innerText = (miktar * fiyat).toFixed(2);
  console.log(miktarCarpiFiyat);
  araToplam();
};

const araToplam = () => {
  const miktarCarpiFiyatlarListesi = document.querySelectorAll(
    ".main__product-line-price"
  ); //NodeList döndürür
  let subTotal = 0;
  miktarCarpiFiyatlarListesi.forEach((item) => {
    subTotal += parseFloat(item.innerText);
  });
  const araToplamFiyat = document.querySelector(".main__sum-price");
  araToplamFiyat.innerText = subTotal.toFixed(2);

  const shipping = document.querySelector(".card-shipping");
  if (araToplamFiyat.innerText > 3000 || araToplamFiyat.innerText <= 0) {
    shipping.innerText = 0;
  } else {
    shipping.innerText = 25.99;
  }

  const tax = document.querySelector(".card-tax");
  tax.innerText = (araToplamFiyat.innerText * vergiOrani).toFixed(2);

  const genelToplam = document.querySelector(".total");
  genelToplam.innerText = (
    parseFloat(araToplamFiyat.innerText) +
    parseFloat(shipping.innerText) +
    parseFloat(tax.innerText)
  ).toFixed(2);

  // if (subTotal <= 0 || subTotal >= 3000) {
  //   kargo = 0;
  // } else {
  //   kargo = 25;
  // }
  // const vergi = subTotal * vergiOrani;
  // console.log(vergi);
  // const genelToplam = subTotal + vergi + kargo;
  // console.log(genelToplam);

  //! mycard yanında ürün çeşidi yazan kısım
  if (productList.querySelectorAll(".main__product").length == 0) {
    productList.innerText = "No Product!";
    navbarList.firstElementChild.innerText = "My Cart";
  } else {
    navbarList.firstElementChild.innerText = `My Cart (${
      productList.querySelectorAll(".main__product").length
    } Products)`;
  }
};
