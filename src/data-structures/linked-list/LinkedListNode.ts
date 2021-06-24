/**
 * @Description：LinkedListNode
 * @author：yigong4
 * @date：2021/4/16
 * @version：v1.0.0
 */
export interface LinkedListNodeCallback {
  (message: any): void
}

export interface LinkedListNode<T = any> {
  value: T
  next: LinkedListNode<T> | null

  convertToString(callback?: LinkedListNodeCallback, onErrorCallback?: (err: any) => void): void
}

export class LinkedListNodeImpl<T> implements LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}

  convertToString(callback?: LinkedListNodeCallback, onErrorCallback?: (err: any) => void) {
    return callback ? callback(this.value) : `${JSON.stringify(this.value)}`
  }
}
