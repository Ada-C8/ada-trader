import Backbone from 'backbone';
import OpenOrder from '../models/OpenOrder';
import _ from 'underscore';

const OpenOrderView = Backbone.View.extend({
  initialize(params){
    this.template = params.template,
    this.listenTo(this.model, 'change', this.render)
  },

  render(){
    const compiledTemplate = this.template(this.model.toJSON())
    this.$el.html(compiledTemplate);
    return this
  },

//   events: {
//     'click button.btn-buy': 'buyShare',
//     'click button.btn-sell': 'sellShare'
//   },
//
//   buyShare(e) {
//     this.model.set('buy', true)
//     this.trigger('appendTrade', this)
//     this.model.buy();
//   },
//
//   sellShare(e){
//     this.model.set('buy', false)
//     this.trigger('appendTrade', this)
//     this.model.sell();
//   }
//
// });

export default OpenOrderView;
