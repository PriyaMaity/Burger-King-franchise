let orderCounter = 1000;

document.getElementById('order-btn').addEventListener('click', () => {
  const selectedItems = document.querySelectorAll('input[type="checkbox"]:checked');
  const foodDisplay = document.getElementById('food-display');
  const loadingIndicator = document.getElementById('loading');
  const orderId = document.getElementById('order-id');

  foodDisplay.innerHTML = '';
  orderId.textContent = '';
  loadingIndicator.style.display = 'block';

  if (selectedItems.length === 0) {
    loadingIndicator.textContent = "Please select at least one item to order! 🍴";
    setTimeout(() => (
      loadingIndicator.style.display = 'none'
    ), 2000);
    return;
  }

  orderCounter++;
  const currentOrderId = `Order ID: ${orderCounter}`;
  const preparationTime = Math.floor(Math.random() * 5) + 2; 

  new Promise((resolve) => {
    setTimeout(() => {
      resolve(selectedItems);
    }, preparationTime * 1000);
  })
    .then((items) => {
      orderId.textContent = currentOrderId;

      items.forEach((item) => {
        const imgSrc = item.dataset.img;
        const imgElement = document.createElement('img');
        imgElement.src = `images/${imgSrc}`;
        imgElement.alt = item.value;
        foodDisplay.appendChild(imgElement);
      });
      loadingIndicator.style.display = 'none';
    })
    .catch(() => {
      loadingIndicator.textContent = "Oops! Something went wrong. Please try again.";
    });
});
