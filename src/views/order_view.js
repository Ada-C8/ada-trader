import Backbone from 'backbone';
import Quote from '../models/quote';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.render);

    this.listenTo(this.bus, `check${this.model.get('symbol')}`, this.checkPrice);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click .btn-cancel': 'removeOrder',
  },
  checkPrice(quote) {
    const buy = this.model.get('buy');
    const targetPrice = this.model.get('targetPrice');

    if (buy && targetPrice >= quote.get('price')) {
      console.log(quote.get('price'));
      console.log('buy');
      console.log(quote.attributes);

      const trade = new Quote(quote.attributes);
      console.log('testing new trade');
      console.log(trade);

      this.bus.trigger(`buy${quote.get('symbol')}`);

      this.removeOrder();

    } else if (!buy && targetPrice <= quote.get('price')) {
      console.log('sell');
      this.bus.trigger(`sell${quote.get('symbol')}`);

      this.removeOrder();
    }
  },
  removeOrder() {
    console.log('canceling');
    this.model.destroy();
    this.remove();

    console.log(this.model);
    console.log(this.bus);
  },
});

export default OrderView;
