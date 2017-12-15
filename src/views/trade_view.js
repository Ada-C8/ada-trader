import Backbone from 'backbone';
import Quote from '../models/quote'

const TradeView = Backbone.View.extend({
  initialize(params) {
    console.log('in trade initialize');
    this.template = params.template;
  },
  render() {
    console.log('in trade render')
    const compiledTemplate = this.template(this.model.attributes);
    this.$el.html(compiledTemplate);
    return this;
  },
});

export default TradeView;
