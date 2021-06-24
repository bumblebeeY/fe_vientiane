/**
 * @Description：InsertionSort
 * @author：yigong4
 * @date：2021/4/7
 * @version：v1.0.0
 */
import Sort from '@/algorithm/sort/Sort'

type nodeType = any
export default class InsertionSort<node extends nodeType> extends Sort<node> {
  /**
   * 插入排序 时间复杂度O(n - n²)
   * @return {Array<any>}
   */
  sort(): Array<node> {
    const array = [...this.originalArray]
    for (let i = 1, len = array.length; i < len; i++) {
      let cur = i
      // Call visiting callback
      this.callbacks.visitingCallback(array[i])

      while (array[cur - 1] !== undefined && this.comparator.lessThan(array[cur], array[cur - 1])) {
        // Call visiting callback
        this.callbacks.visitingCallback(array[cur - 1])
        // Swap the elements
        ;[array[cur - 1], array[cur]] = [array[cur], array[cur - 1]]
        cur--
      }
    }
    return array
  }
}
