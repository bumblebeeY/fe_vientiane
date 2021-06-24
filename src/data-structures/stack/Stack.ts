/**
 * @Description：Stack
 * @author：yigong4
 * @date：2021/4/19
 * @version：v1.0.0
 */
import LinkedList from '@/data-structures/linked-list/LinkedList'
import {
  LinkedListNode,
  LinkedListNodeCallback
} from '@/data-structures/linked-list/LinkedListNode'

export default class Stack {
  private linkedList: LinkedList

  constructor() {
    this.linkedList = new LinkedList()
  }

  /**
   * 添加元素到栈的顶端
   * @param value
   */
  push(value: any) {
    this.linkedList.prepend(value)
  }

  /**
   * 移除栈最顶端的元素
   * @returns {any}
   */
  pop() {
    const removeHead = this.linkedList.deleteHead()
    return removeHead ? removeHead.value : null
  }

  /**
   * 获取栈顶的元素
   * @returns {any}
   */
  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.linkedList.head?.value
  }

  /**
   * 判断stack是否为空
   * @returns {boolean}
   */
  isEmpty() {
    return !this.linkedList.head
  }

  /**
   * convert stack to array
   * @returns {any[]}
   */
  convertToArray(): any[] {
    return this.linkedList.convertToArray().map(linkedListNode => linkedListNode.value)
  }

  /**
   * convert stack to string
   * @param {LinkedListNodeCallback} callback
   * @returns {string}
   */
  convertToString(callback?: LinkedListNodeCallback) {
    return this.convertToArray()
      .map((node: LinkedListNode) => node.convertToString(callback))
      .toString()
  }
}
