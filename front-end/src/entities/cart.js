const NO_NEGATIVE_VALUES = -1;

const Cart = {
  key: 'cart',
  getItems() {
    const cartData = localStorage.getItem(this.key);
    return cartData ? JSON.parse(cartData) : [];
  },
  setItems(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
  },
  addItem(item) {
    const items = this.getItems();
    const index = items.findIndex((i) => i.id === item.id);
    if (index !== NO_NEGATIVE_VALUES) {
      // item already exists in cart, update quantity
      items[index].quantity = item.quantity;
    } else {
      // item does not exist in cart, add it.
      items.push(item);
    }
    this.setItems(items);
  },
  removeItem(id) {
    const items = this.getItems().filter((item) => item.id !== id);
    this.setItems(items);
  },
  clear() {
    this.setItems([]);
  },
  getTotalBRLFormated() {
    const items = this.getItems();
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const formatToBRL = Number(total)
      .toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    return formatToBRL;
  },
  getTotal() {
    const items = this.getItems();
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return parseFloat(total.toFixed(2));
  },
  getItemQuantity(id) {
    const items = this.getItems();
    const index = items.findIndex((item) => item.id === id);
    if (index !== NO_NEGATIVE_VALUES) {
      return items[index].quantity;
    }
    return 0;
  },
};

export default Cart;
