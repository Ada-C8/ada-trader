import Backbone from 'backbone';

const TradesView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

});

export default TradesView;
