import Order from 'models/order';

describe('validate', () => {
  it ('requires target price', () => {
    const order = new Order();
    expect(order.isValid()).toBeFalsy();
  });

  it ('rejects empty words', () => {
    const order = new Order({ text: '' });

    expect(order.isValid()).toBeFalsy();
  });

  it ('rejects non-integer inputs', () => {
    const order = new Order({ text: 'eebeb' });

    expect(order.isValid()).toBeFalsy();
  });

});
