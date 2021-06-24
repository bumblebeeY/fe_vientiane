/**
 * @Description：HeadSort
 * @author：yigong4
 * @date：2021/4/8
 * @version：v1.0.0
 */
import Sort from '@/algorithm/sort/Sort'
import MinHeap from '@/data-structures/heap/MinHeap'

type nodeType = any
export default class HeapSort<node extends nodeType> extends Sort<node> {
  /**
   * 时间复杂度O(nlogN)
   * @return {Array<node>}
   */
  sort(): Array<node> {
    const sortedArray = []
    const minHeap = new MinHeap<node>(this.callbacks)
    this.originalArray.forEach((element: node) => {
      this.callbacks.visitingCallback(element)
      minHeap.add(element)
    })
    while (!minHeap.isEmpty()) {
      const nextMinElement = minHeap.poll()

      // Call visiting callback.
      this.callbacks.visitingCallback(nextMinElement)

      sortedArray.push(nextMinElement as node)
    }
    return sortedArray
  }
}
