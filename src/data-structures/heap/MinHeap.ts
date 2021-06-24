/**
 * @Description：MinHeap
 * @author：yigong4
 * @date：2021/4/15
 * @version：v1.0.0
 */
import Heap from '@/data-structures/heap/Heap'

type nodeType = any
/**
 * 最小堆：在一个 最小堆(min heap) 中,如果 P 是 C 的一个父级节点, 那么 P 的key(或value)应小于或等于 C 的对应值
 */
export default class MinHeap<node extends nodeType> extends Heap<node> {
  /**
   * 提供比较函数
   * @param {node} firstElement
   * @param {node} secondElement
   * @returns {boolean}
   */
  pairIsInCorrectOrder(firstElement: node, secondElement: node) {
    return this.comparator.lessThanOrEqual(firstElement, secondElement)
  }
}