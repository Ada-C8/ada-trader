import Backbone from 'backbone';

const TradeView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    // const compiledTemplate = this.template(this.model.toJSON());
    const compiledTemplate = this.template(this.model.attributes);
    this.$el.html(compiledTemplate);
    return this;
  },
});

export default TradeView;
