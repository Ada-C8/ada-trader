import Backbone from 'backbone';

const OpenLitsView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    // TODO to change click, I want to add the element to the list after they click buy or sellQuote
  },
});


export default OpenListView;
