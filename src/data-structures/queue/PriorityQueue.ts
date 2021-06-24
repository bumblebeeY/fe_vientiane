/**
 * @Description：PriorityQueue
 * @author：yigong4
 * @date：2021/4/20
 * @version：v1.0.0
 */
import MinHeap from '@/data-structures/heap/MinHeap'
import Comparator from '@/utils/Comparator'

/**
 * 优先队列，基于最小堆实现（priority 值越小 优先级越高）
 */
export default class PriorityQueue extends MinHeap<any> {
  priorities: Map<any, any> = new Map()

  constructor() {
    super()
    this.comparator = new Comparator(this.comparePriority.bind(this))
  }

  /**
   * 添加元素到优先队列
   * @param item
   * @param {number} priority
   * @returns {this}
   */
  add(item: any, priority = 0) {
    this.priorities.set(item, priority)
    super.add(item)
    return this
  }

  /**
   * 删除元素
   * @param item
   * @param {Comparator} customFindingComparator
   * @returns {this}
   */
  remove(item: any, customFindingComparator: Comparator = new Comparator(this.compareValue)) {
    super.remove(item, customFindingComparator)
    this.priorities.delete(item)
    return this
  }

  /**
   * 更改元素的优先级
   * @param item
   * @param {number} priority
   * @returns {this}
   */
  changePriority(item: any, priority: number) {
    this.remove(item, new Comparator(this.compareValue))
    this.add(item, priority)
    return this
  }

  /**
   * 比较元素的优先级
   * @param a
   * @param b
   * @returns {number | number}
   */
  comparePriority(a: any, b: any): number {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0
    }
    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1
  }

  /**
   * 根据值查找元素索引
   * @param item
   * @returns {Array<number>}
   */
  findByValue(item: any) {
    return this.find(item, new Comparator(this.compareValue))
  }

  /**
   * 判断是否存在某个元素
   * @param item
   * @returns {boolean}
   */
  hasValue(item: any) {
    return this.findByValue(item).length > 0
  }

  /**
   * 比较元素
   * @param a
   * @param b
   * @returns {number | number}
   */
  compareValue(a: any, b: any): number {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }
}
