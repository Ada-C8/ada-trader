import Backbone from 'backbone';

const OpenOrdersView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

  },

  render(){
    console.log("Here are the open orders!");
    return this;
  },


});

export default OpenOrdersView
