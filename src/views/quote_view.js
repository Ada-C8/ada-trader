import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
    initialize(params) {
      this.template = params.template;
      this.bus = params.bus;
      this.listenTo(this.model, "change", this.render);
    },
    render() {
      const compiledTemplate = this.template(this.model.toJSON());
      this.$el.html(compiledTemplate);

      return this;
    },
    events: {
      'click button.btn-buy': 'buyTrade',
      'click button.btn-sell': 'sellTrade',
    },

    buyTrade: function(event) {
      this.model.buy();
    },
    sellTrade: function(event) {
      this.model.sell();
    },
  });

export default QuoteView;
