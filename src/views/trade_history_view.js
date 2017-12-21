import Backbone from 'backbone';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

  },
  bind() {

    this.model.each((quote) => {
      this.listenTo(quote, 'trade', this.render);
    });
  },
  render(data) {

    let compiledTemplate = this.template(data);
    this.$('#trades').prepend(compiledTemplate);

    return this;
  }
});

export default TradeHistoryView;
