import Backbone from 'backbone';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.trades = [];
    this.template = params.template;

    this.listenTo(this.model, 'update', this.bind);
  },
  bind() {
    this.stopListening();

    this.model.each((quote) => {
      this.listenTo(quote, 'trade', this.render);
    });
  },
  render(info) {
    this.trades.push(info);

    this.$('#trades').empty();

    for (let i = 0; i < this.trades.length; i++) {
      let compiledTemplate = this.template(this.trades[i]);
      this.$('#trades').prepend(compiledTemplate);
    }

    return this;
  }
});

export default TradeHistoryView;
