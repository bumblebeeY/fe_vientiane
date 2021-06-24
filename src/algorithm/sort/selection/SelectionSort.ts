/**
 * @Description：SelectionSort
 * @author：yigong4
 * @date：2021/4/7
 * @version：v1.0.0
 */
import Sort from '@/algorithm/sort/Sort'

type nodeType = any
export default class SelectionSort<node extends nodeType> extends Sort<node> {
  /**
   * 选择排序 时间复杂度O(n²)
   * @return {Array<node>}
   */
  sort(): Array<node> {
    const array = [...this.originalArray]
    for (let i = 0, len1 = array.length - 1; i < len1; i++) {
      let minIndex = i

      // Call visiting callback
      this.callbacks.visitingCallback(array[i])

      for (let j = i + 1, len2 = array.length; j < len2; j++) {
        // Call visiting callback
        this.callbacks.visitingCallback(array[j])

        if (this.comparator.lessThan(array[j], array[minIndex])) {
          minIndex = j
        }
      }
      if (minIndex !== i) {
        // Swap the elements
        ;[array[i], array[minIndex]] = [array[minIndex], array[i]]
      }
    }
    return array
  }
}
