import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(attributes) {
    this.buy = attributes.buy;
    this.targetPrice = attributes.targetPrice;
    this.quote = attributes.quote;
    this.listenTo(this.quote, 'change', this.orderMe);
  },
  validate(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors['price'] = 'Invalid target price';
    } else if (attributes.buy && attributes.targetPrice >= attributes.quote.get('price')) {
      errors['price'] = 'Price higher than market price!';
    } else if (!attributes.buy && attributes.targetPrice <= attributes.quote.get('price')) {
      errors['price'] = 'Price lower than market price!';
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
  orderMe() {
    if (this.buy && this.targetPrice >= this.quote.get('price')) {
      this.trigger('orderMe');
      this.quote.buy();
    } else if (!this.buy && this.targetPrice <= this.quote.get('price')) {
      this.trigger('orderMe');
      this.quote.sell();
    }
  },
});

export default Order;
