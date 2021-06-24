/**
 * @Description：MaxHeap
 * @author：yigong4
 * @date：2021/4/15
 * @version：v1.0.0
 */
import Heap from '@/data-structures/heap/Heap'

/**
 * 最大队
 */
type nodeType = any
export default class MaxHeap<node extends nodeType> extends Heap<node> {
  /**
   * 提供比较函数
   * @param {node} firstElement
   * @param {node} secondElement
   * @returns {boolean}
   */
  pairIsInCorrectOrder(firstElement: node, secondElement: node) {
    return this.comparator.greaterThanOrEqual(firstElement, secondElement)
  }
}
