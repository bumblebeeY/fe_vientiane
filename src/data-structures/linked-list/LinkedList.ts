import {
  LinkedListNode,
  LinkedListNodeCallback,
  LinkedListNodeImpl
} from '@/data-structures/linked-list/LinkedListNode'
import Helper from '@/common/Helper'

/**
 * @Description：LinkedList
 * @author：yigong4
 * @date：2021/4/16
 * @version：v1.0.0
 */
export default class LinkedList<T = any> extends Helper {
  head: LinkedListNode<T> | null = null
  tail: LinkedListNode<T> | null = null

  constructor(originalCallbacks?: { [key: string]: Function }) {
    super(originalCallbacks)
  }

  /**
   * 在链表尾部附加节点
   * @param value
   * @returns {LinkedList}
   */
  append(value: any): LinkedList<T> {
    const node = new LinkedListNodeImpl(value)
    if (!this.head) {
      this.head = node
      this.tail = node
      return this
    }
    this.tail ? (this.tail.next = node) : undefined
    this.tail = node
    return this
  }

  /**
   * 在链表头部附加节点
   * @param value
   * @returns {LinkedList}
   */
  prepend(value: T): LinkedList<T> {
    const node = new LinkedListNodeImpl(value, this.head)
    this.head = node
    if (!this.tail) {
      this.tail = node
    }
    return this
  }

  /**
   * 删除链表中的元素
   * @param value
   * @returns {LinkedListNode | null }
   */
  delete(value: T): LinkedListNode<T> | null {
    if (!this.head) return null
    let deleteNode = null
    while (this.head && this.comparator.equal(this.head.value, value)) {
      deleteNode = this.head
      this.head = this.head.next
    }
    let currentNode = this.head
    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.comparator.equal(currentNode.next?.value, value)) {
          deleteNode = currentNode.next
          currentNode.next = currentNode.next?.next
        } else {
          currentNode = currentNode.next
        }
      }
    }
    if (this.comparator.equal(this.tail?.value, value)) {
      this.tail = currentNode
    }
    return deleteNode
  }

  /**
   * 查找链表节点
   * @param {any} value
   * @param {Function | undefined} callback
   * @returns {LinkedListNode | null }
   */
  find({ value, callback }: { value?: T; callback?: Function }): LinkedListNode<T> | null {
    if (!this.head) return null
    let currentNode: LinkedListNode<T> | null = this.head
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
   * 删除链表头
   * @returns {LinkedListNode | null}
   */
  deleteHead(): LinkedListNode<T> | null {
    if (!this.head) return null
    const deleteHead = this.head
    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }
    return deleteHead
  }

  /**
   * 删除链表尾部
   * @returns {LinkedListNodeImpl | null}
   */
  deleteTail(): LinkedListNode<T> | null {
    const deleteTail = this.tail
    if (this.head === this.tail) {
      this.head = null
      this.tail = null
      return deleteTail
    }
    let currentNode = this.head
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }
    this.tail = currentNode
    return deleteTail
  }

  /**
   * convert array to linked list
   * @param {any[]} values
   */
  fromArray(values: any[]) {
    values.forEach((value: any) => this.append(value))
  }

  /**
   * convert linked list to array
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
      .map((node: LinkedListNode<T>) => node.convertToString(callback))
      .toString()
  }

  /**
   * 倒序链表
   * @returns {this}
   */
  reverse() {
    let currNode = this.head
    let prevNode = null
    let nextNode = null
    while (currNode) {
      nextNode = currNode.next
      currNode.next = prevNode
      prevNode = currNode
      currNode = nextNode
    }
    this.tail = this.head
    this.head = prevNode
    return this
  }

  *[Symbol.iterator](): Iterator<any> {
    let node = this.head
    while (node) {
      yield node.value
      node = node.next
    }
  }
}
