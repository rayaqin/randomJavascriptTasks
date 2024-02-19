function mergeSortedLinkedLists(head1, head2) {
  if (!head1) return head2;
  if (!head2) return head1;

  if (head1.data < head2.data) {
    return {
      data: head1.data,
      next: mergeSortedLinkedLists(head1.next, head2)
    };
  }

  return {
    data: head2.data,
    next: mergeSortedLinkedLists(head1, head2.next)
  };
}