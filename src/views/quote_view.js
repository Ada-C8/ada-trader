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
    this.trigger(this, 'buyShare')
    // this.$el.html(compiledTemplate);
    // console.log(params.template)
    // const tradeTemplate = _.template($('#trade-template').html())
    // const symbol = this.model.attributes.symbol
    // const price = this.model.attributes.price
    // this.$(tradeTemplate).append(`${symbol}`)
  },

  sellShare(e){
    const tradeTemplate = _.template('#trade-template')
    this.model.sell();
    const symbol = this.model.attributes.symbol
    const price = this.model.attributes.price

  }

});

export default QuoteView;
