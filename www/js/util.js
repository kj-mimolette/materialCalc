util = {
  getItems: function() {
    var items = localStorage.getItem('my_items');
    if(items !== null) {
      // console.log(items);
      return JSON.parse(items);
    } else {
      return [];
    }
  },
  addItem: function(memo) {
    var items = this.getItems();
    // console.log(items);
    items.unshift(memo);
    // console.log(memo);
    localStorage.setItem('my_items', JSON.stringify(items));
  },
  deleteItem: function(index) {
    var items = this.getItems();
    items.splice(index, 1);
    localStorage.setItem('my_items', JSON.stringify(items));
  }
}