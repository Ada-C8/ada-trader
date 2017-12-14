import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    // SEE QUOTE_LIST_VIEW RENDER() FOR THE TRIGGER
    this.listenTo(this.bus, 'append_symbols', this.render);
  },

  events: {
    'submit #new-open-order': 'displayOpenOrder',
  },

  render(quotes) {
    let $selectOptions = this.$('select[name=symbol]');
    quotes.forEach((quote) => {
      // Append the current symbol and then append the price
      $selectOptions.append(`<option value="${quote.get('symbol')}">${quote.get('symbol')}</option>`);
      // // Create a new order and then add it to the model
      // const order = new Order({
      //   symbol: quote.get('symbol'),
      //   price: quote.get('price'),
      // });
      // this.model.add(order); // TODO: COME BACK TO THIS!
    });
  },

  displayOpenOrder(event) {
    event.preventDefault();
    let selected_symbol = this.$('form select[name=symbol]').val();
    let selected_price = this.$('form input[name=price-target]').val();

    // A new order is created for each submission
    const order = new Order({
      symbol: selected_symbol,
      targetPrice: selected_price,
    });
  },
});

export default OrderListView;
