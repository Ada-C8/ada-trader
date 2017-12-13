import Backbone from 'backbone';

const OpenOrder = Backbone.Model.extend({
  // defaults: {
  //   symbol: 'UNDEF',
  //   price: 0.00
  // },
  //
  // buy() {
  //   console.log('buying quote');
  //   console.log(this.get('price'));
  //   let newPrice = this.get('price') + 1;
  //   this.set({price: newPrice});
  //   console.log(this.get('price'));
  // },
  //
  // sell() {
  //   console.log('selling quote');
  //   console.log(this.get('price'));
  //   let newPrice = this.get('price') - 1;
  //   this.set({price: newPrice});
  //   console.log(this.get('price'));
  // },
});

export default OpenOrder;
