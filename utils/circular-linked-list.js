function CircularLinkedList(value, prev, next) {
  this.value = value;
  this.prev = prev || this;
  this.next = next || this;
}

CircularLinkedList.prototype.insert = function(value) {
  const newNode = new CircularLinkedList(value, this, this.next);
  this.next.prev = newNode;
  this.next = newNode;
  return newNode;
};

CircularLinkedList.prototype.remove = function() {
  this.prev.next = this.next;
  this.next.prev = this.prev;
  return this.next;
};

module.exports = CircularLinkedList;
