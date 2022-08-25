const cart = [];

function fromLocalStorage() {
  const nbItems = localStorage.length;
  for (let i = 0; i < nbItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const parsIt = JSON.parse(item);
    console.log(parsIt);
    cart.push(nbItems);
  }
}
