import Backbone from 'backbone';

const TradeView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    // SEE QUOTE VIEW FOR TRIGGER
    this.listenTo(this.bus, 'add_quote', this.render);
  },
  render(currentTrade) {
    // console.log(currentTrade);
    const compiledTemplate = this.template(currentTrade);

      // Select this container and then fill it with the template
      // this.$el.html(compiledTemplate);

    this.$el.prepend(compiledTemplate);
  },
});

export default TradeView;
