/**
 * @Description：QuickSort
 * @author：yigong4
 * @date：2021/4/7
 * @version：v1.0.0
 */
import Sort from '@/algorithm/sort/Sort'

type nodeType = any
export default class QuickSort<node extends nodeType> extends Sort<node> {
  /**
   * 快速排序 时间复杂度O(nlogN)
   * @return {Array<node>}
   */
  sort(): Array<node> {
    const array = [...this.originalArray]
    return this.iterationSort(array)
  }

  iterationSort(originalArray: Array<node>): Array<node> {
    if (originalArray.length <= 1) return originalArray
    const pivotIndex = Math.floor(originalArray.length / 2)
    const pivot = originalArray.splice(pivotIndex, 1)[0]
    const left = [],
      right = []
    for (let i = 0, len = originalArray.length; i < len; i++) {
      //Call visiting callback
      this.callbacks.visitingCallback(originalArray[i])

      if (this.comparator.lessThan(originalArray[i], pivot)) {
        left.push(originalArray[i])
      } else {
        right.push(originalArray[i])
      }
    }
    return this.iterationSort(left).concat([pivot], this.iterationSort(right))
  }
}
