document.addEventListener("DOMContentLoaded", ready);

let cartItems = [];

const productElements = Array.from(document.querySelectorAll("#product"));

const cartItemsElement = document.querySelector(".cart-items");

const addItemsButton = Array.from(document.querySelectorAll(".btn-add"));

const buyButton = document.querySelector(".btn.btn-primary.btn-purchase");

const removeItemsButton = Array.from(
  document.querySelectorAll("btn.btn-danger")
); //Assign Buttons to a variable//

let qty = 1;

function ready() {
  removeItemsButton.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  buyButton.addEventListener("click", purchaseClicked);

  productElements.forEach((element, index) => {
    const img = element.querySelector(".img");
    const title = element.querySelector(".card-title");
    const btn = element.querySelector(".btn-add");

    btn.addEventListener("click", (e) => {
      //   console.log("title", title.innerText);
      //   console.log("text", text.innerText);
      //   console.log("img", img.src);
      //   console.log("price", btn.innerText);

      const product = {
        id: index,
        img: img.src,
        title: title.innerText,
        price: btn.innerText,
        qty: qty,
      };
      console.log("product before adding to cart", product);
      cartItems.push(product);

      updateCart(cartItems, product);

      // updateCart();

      if (cartItems.length > 0) {
        let qty;

        cartItemsElement.innerHTML = "";

        cartItems.map(({ img, title, price, qty, id }) => {
          var newCartRow = document.createElement("div");

          newCartRow.classList.add("cart-row", "w-100");

          var newRowContent = `
        <div class="cart-item cart-column">
             <img class="cart-item-image"
             src="${img}">
             <span class="cart-item-title">${title}</span>
       </div> 
       <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="${qty}">
           <button onclick="removeCartItem(this, ${id})" class="btn btn-danger" type="button">Remove</button>
        </div>
    `;
          newCartRow.innerHTML = newRowContent;
         
          cartItemsElement.append(newCartRow);
        });
        const totalPrice = cartItems.reduce((a, c) => {
          console.log("acc:", a);
          console.log("val:", c);

          return a + c.qty * c.price;
        }, 0);

        console.log("total price", totalPrice.toFixed(2));

        document.querySelector("div.cart-total .cart-total-price").innerText =
          totalPrice.toFixed(2);

        const cartItemElements = Array.from(
          document.querySelectorAll(".cart-items .cart-row.w-100")
        );
        cartItemElements.forEach((element) => {
          const qtyElement = element.querySelector(".cart-quantity-input");

          qtyElement.addEventListener("change", (e) => {
            qty = e.target.value
            
            
          });
          console.log("input value", qty);
          console.log("qty element", qtyElement);
          console.log("element", element);
          console.log("elements", cartItemElements);
        });
        
        
     
      }
    });
  });
  document.querySelector("div.cart-total .cart-total-price").innerText = "0.00"
}

function purchaseClicked() {
  alert("Thank you for shopping with us!");

  console.log("items before", cartItems);

  cartItems = [];
  cartItemsElement.innerHTML = "";
  document.querySelector("div.cart-total .cart-total-price").innerText = "";

  console.log("items after", cartItems);

  // updateCartTotal();
}

function removeCartItem(event, id) {
  var clickedButton = event;
  console.log("evt", clickedButton);
  cartItems = cartItems.filter((items) => id !== items.id);

  totalPrice = cartItems.reduce((a, c) => {
    console.log("acc: in remove", a);
    console.log("val: in remove", c);

    return a + c.qty * c.price;
  }, 0);

  console.log("total price", totalPrice.toFixed(2));

  document.querySelector("div.cart-total .cart-total-price").innerText =
    totalPrice.toFixed(2);
  clickedButton.parentElement.parentElement.remove();
}

function updateCart(cartItems) {
  if (cartItems.length > 0) {
    cartItemsElement.innerHTML = "";
    let totalPrice

    cartItems.map(({ img, title, price, qty, id }) => {
      var newCartRow = document.createElement("div");

      newCartRow.classList.add("cart-row", "w-100");

      var newRowContent = `
    <div class="cart-item cart-column">
         <img class="cart-item-image"
         src="${img}">
         <span class="cart-item-title">${title}</span>
   </div> 
   <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" min='1' value="${qty}">
       <button onclick="removeCartItem(this, ${id})" class="btn btn-danger" type="button">Remove</button>
    </div>
`;
      newCartRow.innerHTML = newRowContent;
      cartItemsElement.append(newCartRow);
    });
    totalPrice = cartItems.reduce((a, c) => {
      console.log("acc:", a);
      console.log("val:", c);

      return a + c.qty * c.price;
    }, 0);

    console.log("total price", totalPrice.toFixed(2));

    document.querySelector("div.cart-total .cart-total-price").innerText =
      totalPrice.toFixed(2);
  }

  const cartItemElements = Array.from(
    document.querySelectorAll(".cart-items .cart-row.w-100")
  );

  cartItemElements.forEach((element) => {
    console.log("element", element);

    const qtyElement = element.querySelector(".cart-quantity-input");

    qtyElement.addEventListener("change", (e) => {
      qty = e.target.value;

      totalPrice =
        qty * parseFloat(element.querySelector(".cart-price").innerText);

      totalPrice = cartItemElements.reduce((a, c) => {
        // console.log("acc:", a);
        // console.log("val:", c);
        return a + c.querySelector('.cart-quantity .cart-quantity-input').valueAsNumber * parseFloat(c.querySelector('.cart-price').innerText);
      }, 0);
      
      document.querySelector("div.cart-total .cart-total-price").innerText =
        totalPrice.toFixed(2);
      // console.log("qty element", cartItems, totalPrice);
    });

    console.log("elementttttttttttttttttttt", qtyElement.max);
  });

  console.log("elements", cartItemElements);
}
