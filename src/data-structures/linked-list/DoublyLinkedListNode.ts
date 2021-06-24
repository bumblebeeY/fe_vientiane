/**
 * @Description：DoublyLinkedListNode
 * @author：yigong4
 * @date：2021/4/19
 * @version：v1.0.0
 */
export interface DoublyLinkedListNodeCallback {
  (message: any): void
}

export interface DoublyLinkedListNode {
  value: any
  next: DoublyLinkedListNode | null
  previous: DoublyLinkedListNode | null

  convertToString(callback?: DoublyLinkedListNodeCallback, onErrorCallback?: (err: any) => void): string | void
}

export class DoublyLinkedListNodeImpl implements DoublyLinkedListNode {
  public next: DoublyLinkedListNode | null
  public previous: DoublyLinkedListNode | null
  public value: any

  constructor(value: any, next: DoublyLinkedListNode | null = null, previous: DoublyLinkedListNode | null = null) {
    this.value = value
    this.next = next
    this.previous = previous
  }

  convertToString(callback?: DoublyLinkedListNodeCallback, onErrorCallback?: (err: any) => void): string | void {
    return callback ? callback(this.value) : `${JSON.stringify(this.value)}`
  }
}
