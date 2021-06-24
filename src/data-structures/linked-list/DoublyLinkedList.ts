/**
 * @Description：DoublyLinkedList
 * @author：yigong4
 * @date：2021/4/19
 * @version：v1.0.0
 */
import Helper from '@/common/Helper'
import { OriginalCallbacks } from '@/common/Callbacks'
import {
  DoublyLinkedListNode,
  DoublyLinkedListNodeImpl
} from '@/data-structures/linked-list/DoublyLinkedListNode'
import { LinkedListNode, LinkedListNodeCallback } from '@/data-structures/linked-list/LinkedListNode'

export default class DoublyLinkedList extends Helper {
  public head: DoublyLinkedListNode | null = null
  public tail: DoublyLinkedListNode | null = null

  constructor(originalCallback?: OriginalCallbacks) {
    super(originalCallback)
  }

  /**
   * 在双向链表头部附加节点
   * @param value
   * @returns {this}
   */
  prepend(value: any) {
    const newNode = new DoublyLinkedListNodeImpl(value, this.head)
    if (this.head) {
      this.head.previous = newNode
    }
    this.head = newNode
    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  /**
   * 在双向链表尾部附加节点
   * @param value
   * @returns {this}
   */
  append(value: any) {
    const newNode = new DoublyLinkedListNodeImpl(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      return this
    }
    this.tail ? (this.tail.next = newNode) : undefined
    newNode.previous = this.tail
    this.tail = newNode
    return this
  }

  /**
   * 删除双向链表中的元素
   * @param value
   * @returns {DoublyLinkedListNode | null}
   */
  delete(value: any): DoublyLinkedListNode | null {
    if (!this.head) return null
    let deleteNode = null
    let currentNode: DoublyLinkedListNode | null = this.head
    while (currentNode) {
      if (this.comparator.equal(currentNode.value, value)) {
        deleteNode = currentNode
        if (deleteNode === this.head) {
          this.head = currentNode.next
          if (this.head) {
            this.head.previous = null
          }
          if (deleteNode === this.tail) {
            this.tail = null
          }
        } else if (deleteNode === this.tail) {
          this.tail = deleteNode.previous
          this.tail ? (this.tail.next = null) : undefined
        } else {
          const previousNode = deleteNode.previous as DoublyLinkedListNode
          const nextNode = deleteNode.next as DoublyLinkedListNode
          previousNode.next = nextNode
          nextNode.previous = previousNode
        }
      }
      currentNode = currentNode.next
    }
    return deleteNode
  }

  /**
   * 查找双向链表节点
   * @param {any} value
   * @param {Function | undefined} callback
   * @returns {DoublyLinkedListNode | null}
   */
  find({ value, callback }: { value: any; callback?: Function }): DoublyLinkedListNode | null {
    if (!this.head) return null
    let currentNode: DoublyLinkedListNode | null = this.head
    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode
      }
      if (value !== undefined && this.comparator.equal(currentNode.value, value)) {
        return currentNode
      }
      currentNode = currentNode.next
    }
    return null
  }

  /**
   * 删除双向链表头部节点
   * @returns {null | DoublyLinkedListNode}
   */
  deleteHead(): DoublyLinkedListNode | null {
    if (!this.head) return null
    const deleteNode = this.head
    if (this.head.next) {
      this.head = this.head.next
      this.head.previous = null
    } else {
      this.head = null
      this.tail = null
    }
    return deleteNode
  }

  /**
   * 删除双向链表尾部节点
   * @returns {DoublyLinkedListNode | null}
   */
  deleteTail(): DoublyLinkedListNode | null {
    if (!this.tail) return null
    if (this.head === this.tail) {
      const deleteNode = this.tail
      this.tail = null
      this.head = null
      return deleteNode
    }
    const deleteTail = this.tail
    this.tail = this.tail.previous
    this.tail ? (this.tail.next = null) : undefined
    return deleteTail
  }

  /**
   * convert array to doubly linked list
   * @param {any[]} values
   * @returns {this}
   */
  fromArray(values: any[]) {
    values.forEach(value => this.append(value))
    return this
  }

  /**
   * convert doubly linked list to array
   * @returns {any[]}
   */
  convertToArray(): any[] {
    const nodes = []
    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }
    return nodes
  }

  /**
   * convert linked list to string
   * @param {LinkedListNodeCallback} callback
   * @returns {string}
   */
  convertToString(callback?: LinkedListNodeCallback) {
    return this.convertToArray()
      .map((node: LinkedListNode) => node.convertToString(callback))
      .toString()
  }

  /**
   * 倒序双向链表
   * @returns {this}
   */
  reverse() {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while (currNode) {
      // Store next node.
      nextNode = currNode.next
      prevNode = currNode.previous

      currNode.next = prevNode
      currNode.previous = nextNode

      prevNode = currNode
      currNode = nextNode
    }

    // Reset head and tail.
    this.tail = this.head
    this.head = prevNode

    return this
  }
}
