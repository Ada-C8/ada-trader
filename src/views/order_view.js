import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    // TODO to change click, I want to add the element to the list after they click buy or sellQuote
  },
  renderOrder(){
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this
  },
});


export default OrderView;
