console.log("hello");
let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Grey T-Shirt',
        tag : 'greytshirt',
        price : 399,
        inCart : 0
    },
    {
        name: 'Grey Hoodie',
        tag : 'greyhoodie',
        price : 699,
        inCart : 0
    },
    {
        name: 'Black T-Shirt',
        tag : 'blacktshirt',
        price : 299,
        inCart : 0
    },
    {
        name: 'Black Hoodie',
        tag : 'blackhoodie',
        price : 799,
        inCart : 0
    },
    {
        name: 'Canon DSLR',
        tag : 'canon',
        price : 77799,
        inCart : 0
    },
    {
        name: 'ASUS LAPTOP',
        tag : 'asus-lp-15',
        price : 36799,
        inCart : 0
    },
    {
        name: 'Samsung M31',
        tag : 'samsungm31',
        price : 17799,
        inCart : 0
    },
    {
        name: 'Books',
        tag : 'books',
        price : 199,
        inCart : 0
    },
   
    
];

for (let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartnumbers(products[i]);
        totalCost(products[i]);
    })
}

function OnLoadCartNumbers() {
    let productnumbers = localStorage.getItem('cartnumbers');

    if(productnumbers) {
        document.querySelector('.cart span').textContent = productnumbers;
    }
}

function cartnumbers(product1) {
    let productnumbers = localStorage.getItem('cartnumbers');
    
    productnumbers = parseInt(productnumbers);

    if(productnumbers ){
        localStorage.setItem('cartnumbers', productnumbers + 1);
        document.querySelector('.cart span').textContent = productnumbers + 1;
    }
    else {
        localStorage.setItem('cartnumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    
    setItems(product1);
}

function setItems(product1) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        
        if(cartItems[product1.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product1.tag]: product1
            }
        }
        cartItems[product1.tag].inCart += 1;
    } else {
        product1.inCart = 1;

        cartItems = {
        [product1.tag]: product1
    }
}
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

    function totalCost(product1) {
        // console.log('Total is : ', product1.price);
        let cartCost = localStorage.getItem('totalCost');
        
        if(cartCost != null) {
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + product1.price);
        } else {
            localStorage.setItem("totalCost", product1.price);
        }

    }

    function displayCart() {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        let productContainer  = document.querySelector
        (".products");

        if( cartItems && productContainer ) {
            productContainer.innerHTML = '';
            Object.values(cartItems).map(item => {
                productContainer.innerHTML += `
                <div class="product2">
                    <ion-icon name="close-circle-outline"></ion-icon>
                    <img src="./images/${item.tag}.jpg"/>
                    <span>${item.name}</span>
                </div> 

                <div class="price">${item.price} </div>
                
                <div class="Quantity">
                    <ion-icon name="caret-back-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon name="caret-forward-circle-outline"></ion-icon>
                </div>
                <div class="total">
                    Rs.${item.inCart * item.price},00
                </div>
                `
            });

            let cartCost = localStorage.getItem('totalCost');
            productContainer.innerHTML += `
                <div class="basketTotalContainer">
                    <h4 class="basketTotalTitle">
                        Basket Total
                    </h4>
                    <h4 class="basketTotal">
                        Rs.${cartCost},00
                    </h4>
            `
        }
    }

OnLoadCartNumbers();
displayCart();