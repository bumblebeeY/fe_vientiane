/**
 * @Description：Queue
 * @author：yigong4
 * @date：2021/4/19
 * @version：v1.0.0
 */
import LinkedList from '@/data-structures/linked-list/LinkedList'
import { LinkedListNode, LinkedListNodeCallback } from '@/data-structures/linked-list/LinkedListNode'

export default class Queue<T> {
  private linkedList: LinkedList<T>

  constructor() {
    this.linkedList = new LinkedList()
  }

  /**
   * 判断队列是否为空
   * @returns {boolean}
   */
  isEmpty(): boolean {
    return !this.linkedList.head
  }

  /**
   * 返回队列头部节点
   * @returns {LinkedListNode | null}
   */
  peek(): LinkedListNode<T> | null {
    if (this.isEmpty()) return null
    return this.linkedList.head
  }

  /**
   * 入列
   * @param value
   * @returns {this}
   */
  enqueue(value: any) {
    this.linkedList.append(value)
    return this
  }

  /**
   * 出列
   * @returns {any}
   */
  dequeue(): any {
    const removeHead = this.linkedList.deleteHead()
    return removeHead ? removeHead.value : null
  }

  /**
   * convert queue to array
   * @returns {any[]}
   */
  convertToArray(): any[] {
    return this.linkedList.convertToArray().map(element => {
      return element.value
    })
  }

  /**
   * convert queue to string
   * @param {LinkedListNodeCallback} callback
   * @returns {string}
   */
  convertToString(callback?: LinkedListNodeCallback): string {
    return this.linkedList.convertToString(callback)
  }
}
