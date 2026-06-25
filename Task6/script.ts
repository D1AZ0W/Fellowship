class EventBus<T extends Record<string, any>> {
  private identifyFunction: { [K in keyof T]?: ((data: T[K]) => void)[] } = {};
  public on<K extends keyof T>(eventName: K, callback: (data: T[K]) => void): void {
    if (!this.identifyFunction[eventName]) {
      this.identifyFunction[eventName] = [];
    }
    console.log(`Channel ${callback.name} turned on with ${eventName.toString()}`);
    this.identifyFunction[eventName].push(callback);
  }

  public off<K extends keyof T>(eventName: K, callback: (data: T[K]) => void): void {
    if (!this.identifyFunction[eventName]) {
      return;
    }
    console.log(`Channel ${callback.name} turned off having ${eventName.toString()}`);
    this.identifyFunction[eventName] = this.identifyFunction[eventName].filter((data) => data !== callback);
  }

  public emit<K extends keyof T>(eventName: K, data: T[K]): void {
    if (!this.identifyFunction[eventName]) {
      console.log(`No channel of ${eventName.toString()} exists`);
      return;
    }
    this.identifyFunction[eventName].forEach((d) => d(data));
  }
}
interface ShoppingCartEvents {
  'cart:addItem': { productId: string; price: number; quantity: number };
  'cart:clear': undefined;
  'checkout:success': { orderId: string; totalAmount: number };
}

const shopBus = new EventBus<ShoppingCartEvents>();

function updateInventory(item: { productId: string; price: number; quantity: number }) {
  console.log(`[Inventory] Reducing stock for item ${item.productId} by ${item.quantity}`);
}

function sendAnalytics(item: { productId: string; price: number; quantity: number }) {
  console.log(`[Analytics] Tracked addition of ${item.productId} ($${item.price})`);
}
function successCheckout(item: { orderId: string; totalAmount: number }) {
  console.log(`[Checkout] Successful checkout of orderId: ${item.orderId} Total Amount:($${item.totalAmount})`);
}

shopBus.on('cart:addItem', updateInventory);
shopBus.on('cart:addItem', sendAnalytics);

shopBus.emit('cart:addItem', { productId: 'laptop-123', price: 999, quantity: 1 });
shopBus.off('cart:addItem', sendAnalytics);

shopBus.emit('cart:addItem', { productId: 'mouse-456', price: 25, quantity: 2 });
shopBus.off('cart:addItem', updateInventory);
// shopBus.on('cart:delete', () => {});
// shopBus.emit('cart:addItem', { productId: 'abc', price: 'free', quantity: 1 });
shopBus.emit('checkout:success', { orderId: 'mouse-123', totalAmount: 5 }); // this does not work rn but
shopBus.on('checkout:success', successCheckout);
shopBus.emit('checkout:success', { orderId: '12323423543', totalAmount: 120 });
