if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    var removeCartItemsButton = document.getElementsByClassName("btn-danger") //Assign Buttons to a variable//
    for (var i = 0; i < removeCartItemsButton.length; i++) {
        var button = removeCartItemsButton[i];
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName("cart-quantity-input")
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }
    var addCartItemsButton = document.getElementsByClassName("btn-add")
    for (var i = 0; i < addCartItemsButton.length; i++) {
        var buttons = addCartItemsButton[i];
        buttons.addEventListener('click', addCartItem)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for shopping with us!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function removeCartItem(event) {
    var clickedButton = event.target
    clickedButton.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addCartItem(event) {
    var buttonClicked = event.target
    var addItem = buttonClicked.parentElement.parentElement
    var title = addItem.getElementsByClassName('card-title')[0].innerText
    var price = addItem.getElementsByClassName('btn-add')[0].innerText

    console.log(title, price)
    addCartItem(title, price)
    updateCartTotal()
}

function addItemToCart(title, price) {
    var newCartRow = document.createElement('div')
    newCartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already in the cart')
            return
        }
    }
    var newRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image"
            src="${imageSrc}">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Remove</button>
        </div>`
    newCartRow.innerHTML = newRowContent
    cartItems.append(newCartRow)
    newCartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    newCartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function updateCartTotal() {
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemsContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
