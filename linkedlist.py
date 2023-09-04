# dont have to preallocate space
# insertion is easier

# traversal - o(n)
#accessing element is o(n)class


class Node:
    def __init__(self, data=None, next=None):
        self.data=data
        self.next=next



class LinkedList:
    def __init__(self):
        self.head=None


    def insert_at_the_beginning(self, data):
         node=Node(data, self.head)
         self.head=node