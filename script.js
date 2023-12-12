
//lista objekata
var data = [
	{
		"name": "Frosty",
		"type": "winter",
		"price": "$300",
		"image": "img/16.jpg",
		 "url": 'frosty.html'
	},
  {
		"name": "Roselily",
		"type": "popular",
		"price": "$250",
		"image": "img/1.jpg",
		"url":'roselily.html'
	},
  {
    "name": "Aurora",
    "type": "popular",
    "price": "$400",
    "image": "img/2.jpg",
		"url":'aurora.html'
  },
  {
    "name": "Snowy",
    "type": "winter",
    "price": "$300",
    "image": "img/15.jpg"
  },
  {
    "name": "Winty",
    "type": "winter",
    "price": "$350",
    "image": "img/14.jpg"
  },
  {
    "name": "Summer",
    "type": "popular",
    "price": "$350",
    "image": "img/3.jpg"
  },
  {
    "name": "Winterfall",
    "type": "winter",
    "price": "$380",
    "image": "img/13.jpg"
  },
  {
    "name": "Rosemoon",
    "type": "popular",
    "price": "$250",
    "image": "img/4.jpg"
  },
  {
    "name": "Dandelions",
    "type": "popular",
    "price": "$150",
    "image": "img/5.jpg"
  },
  {
    "name": "Winterfall",
    "type": "winter",
    "price": "$300",
    "image": "img/12.jpg"
  },
  {
    "name": "Rose",
    "type": "popular",
    "price": "$200",
    "image": "img/6.jpg"
  },
  {
    "name": "Frozen",
    "type": "winter",
    "price": "$250",
    "image": "img/11.jpg"
  }

];

var products = "",
	names = "",
	types = "";
//varijable iz objekta
for (var i = 0; i < data.length; i++) {
	var name = data[i].name,
		type = data[i].type,
		price = data[i].price,
		rawPrice = price.replace("$",""),
		image = data[i].image,
		url=data[i].url;

	//dodavanje kartica
	products += "<div class='col-lg-3 col-sm-4 product' data-name='" + name + "' data-type='" + type + "' data-price='" + rawPrice + " ' data-image='" + image + "'><div class='product-inner text-center'><img src='" + image + "' width='150px' height='150px'><br />Name: " + name + "<br />Model: " + type + "<br />Price: " + price + "<br><button class='add-to-cart btn btn-success' >add to cart</button><br><button class='about btn btn-success' data-url='"+url+"' >About</button></div></div>";


	//izbor tipa
	if (types.indexOf("<option value='" + type + "'>" + type + "</option>") == -1) {
		types += "<option value='" + type + "'>" + type + "</option>";
	}
}
//u div sa id-em producs dodaju se kartice
$("#products").html(products);
//$(".filter-name").append(names);
//u filter type types
$(".filter-type").append(types);

var filtersObject = {};

//kad se promeni filter
$(".filter").on("change",function() {
	var filterName = $(this).data("filter"),
		filterVal = $(this).val();

	if (filterVal == "") {
		delete filtersObject[filterName];
	} else {
		filtersObject[filterName] = filterVal;
	}

	var filters = "";

	for (var key in filtersObject) {
	  	if (filtersObject.hasOwnProperty(key)) {
			filters += "[data-"+key+"='"+filtersObject[key]+"']";
	 	}
	}

	if (filters == "") {
		$(".product").show();
	} else {
		$(".product").hide();
		$(".product").hide().filter(filters).show();
	}
});


//on search form submit
$("#search-form").submit(function(e) {
	e.preventDefault();
	var query = $("#search-form input").val().toLowerCase();

	$(".product").hide();
	$(".product").each(function() {
		var name = $(this).data("name").toLowerCase(),
			type = $(this).data("type").toLowerCase();

		if (name.indexOf(query) > -1  || type.indexOf(query) > -1) {
			$(this).show();
		}
	});
});


ready()

function ready(){
    //delete from cart
    var removeCartItem = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItem.length; i++) {
        var button = removeCartItem[i];
        button.addEventListener('click', removeCartItems)
    }
    //adding quantity(how many products)
    var quantityInput = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }
    //add-to-cart
    var addToCart = document.getElementsByClassName('add-to-cart')
    for (var i = 0; i < addToCart.length; i++) {
        var button = addToCart[i]
        button.addEventListener('click' , addToCartClicked)
    }
    //function and event on purchase
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

		var about = document.getElementsByClassName('about')
    for (var i = 0; i < about.length; i++) {
        var button = about[i];
        button.addEventListener('click' , aboutClicked)
    }
}
function aboutClicked(event){
    var buttonClicked = event.target
 const objectUrl = event.target.getAttribute('data-url');
    window.location.href = objectUrl;
}
    //purchase function
function purchaseClicked(){
    alert('Thank you for your order!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

    //remove
function removeCartItems(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
    //add to cart(deklarisanje promenljivih)
function addToCartClicked(event){
    var button = event.target//element that triggered a specific event
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getAttribute('data-name')
    var price = shopItem.getAttribute('data-price')
    var imgSrc = shopItem.getAttribute('data-image')
    console.log(title , price, imgSrc)
    addItemToCart(title, price, imgSrc)
    updateCartTotal()
}
    //add to item
function addItemToCart(title, price, imgSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    for (var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title) {
            alert('Item is already added to cart')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
                     <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">$${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow) //append dodaje na kraju prazan div
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItems)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

function quantityChanged(event){

	var input = event.target
	if(isNaN(input.value) || input.value <= 0 ){
			input.value = 1
	}
	updateCartTotal()
}


	//funckija za updatevanje ukupne sume u kasi
function updateCartTotal(){
	var cartItem = document.getElementsByClassName('cart-items')[0]
	var cartRows = cartItem.getElementsByClassName('cart-row')
	var total = 0
	 for (var i = 0; i < cartRows.length; i++){
			var cartRow = cartRows[i]
			var priceElement = cartRow.getElementsByClassName('cart-price')[0]
			var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
			[0]
			var price =parseFloat(priceElement.innerText.replace('$',''))
			var quantity = quantityElement.value
			total = total + (price * quantity)
	 }
	 total = Math.round(total * 100 ) / 100 //zaokruzuje na dve decimale
	 document.getElementsByClassName('cart-total-price')[0].innerText = '$' +  total //stampa konacne cifre
}
