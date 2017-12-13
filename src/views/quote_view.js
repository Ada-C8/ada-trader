import Backbone from 'backbone';
import Quote from '../models/quote';
import _ from 'underscore';

const QuoteView = Backbone.View.extend({
  initialize(params){
    this.template = params.template,
    this.listenTo(this.model, 'change', this.render)
  },

  render(){
    const compiledTemplate = this.template(this.model.toJSON())
    this.$el.html(compiledTemplate);
    return this
  },

  events: {
    'click button.btn-buy': 'buyShare',
    'click button.btn-sell': 'sellShare'
  },

  buyShare(e) {
    this.model.buy();
    this.trigger('appendTrade', this)
  },

  sellShare(e){
    this.model.sell();
    this.trigger('appendTrade', this)
  }

});

export default QuoteView;
