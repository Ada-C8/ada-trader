import Order from 'models/order';

describe('validate', () => {

  it('will create a valid instance of Order', () => {
    const order = new Order({
      symbol: 'LAUREN',
      targetPrice: 100,
      action: 'Buy',
    });
    let result = order.isValid();
    expect(result).toBeTruthy();
  });

  it ('rejects an empty price', () => {
    const order = new Order({
      symbol: 'LAUREN',
      targetPrice: '',
      action: 'Buy',
    });
    let result = order.isValid();
    expect(result).toBeFalsy();
  });


  it ('rejects non-integer inputs', () => {
    const order = new Order({ text: 'eebeb' });

    expect(order.isValid()).toBeFalsy();
  });

});
