import Backbone from 'backbone';


const OrderView = Backbone.View.extend({
 initialize(params) {
   this.template = params.template;
   this.bus = params.bus;
   this.listenTo(this.model, 'change', this.render);
   this.listenTo(this.model.get('quote'), 'change', this.swapOrder);
 },
 render() {
   const compiledTemplate = this.template(this.model.toJSON());
   this.$el.html(compiledTemplate);
   return this;
 },
 events: {
   'click .btn-cancel': 'cancelOrder',
 },
 cancelOrder() {
   this.model.destroy();
   this.remove();
 },
 swapOrder() {
   if (this.model.get('buy')) {
     if (this.model.get('quote').get('price') <= this.model.get('setPrice')) {
       this.bus.trigger('buyOrder', this);
       this.cancelOrder();
     }
   } else {
     if (this.model.get('quote').get('price') >= this.model.get('setPrice')) {
       this.bus.trigger('sellOrder', this);
       this.cancelOrder();
     }
   }
 },
});

export default OrderView;
