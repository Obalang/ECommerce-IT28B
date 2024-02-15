const apiUrl = 'data.json';
const cartItems = [];

function renderCartTable() {
    const cartTable = document.getElementById('cart-table');
    const tbody = cartTable.querySelector('tbody');
    tbody.innerHTML = '';

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>${item.quantity}</td>`;
        tbody.appendChild(row);
    });
}

async function fetchAndDisplayProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('card');

            const img = document.createElement('img');
            img.src = product.imageURL || 'placeholder.jpg'; 
            img.classList.add('card-img-top');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = product['Product Name'];

            const price = document.createElement('p');
            price.classList.add('card-text');
            price.textContent = `Price: ₱${product['price']}`;

            const description = document.createElement('p');
            description.classList.add('card-text');
            description.textContent = product['description'];

            const lastUpdated = document.createElement('small');
            lastUpdated.classList.add('text-muted');
            lastUpdated.textContent = `Added on: ${product['date added']}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.classList.add('btn', 'btn-primary', 'mt-3'); 
           
            let counter = 0;
            const counterDisplay = document.createElement('span');
            counterDisplay.textContent = counter;
            addToCartButton.appendChild(counterDisplay);

            addToCartButton.addEventListener('click', () => {
                
                counter++;
                counterDisplay.textContent = counter;
                console.log(`Product ${product['Product Name']} added to cart. Total: ${counter}`);

               
                const itemIndex = cartItems.findIndex(item => item.id === product.id);
                if (itemIndex !== -1) {
                    
                    cartItems[itemIndex].quantity++;
                } else {
                    
                    cartItems.push({
                        id: product.id,
                        name: product['Product Name'],
                        price: product.price,
                        quantity: 1
                    });
                }

               
                renderCartTable();
            });

            cardBody.appendChild(title);
            cardBody.appendChild(price);
            cardBody.appendChild(description);
            cardBody.appendChild(lastUpdated);
            cardBody.appendChild(addToCartButton); 

            productCard.appendChild(img);
            productCard.appendChild(cardBody);

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchAndDisplayProducts();
