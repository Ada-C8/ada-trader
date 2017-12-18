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
 
