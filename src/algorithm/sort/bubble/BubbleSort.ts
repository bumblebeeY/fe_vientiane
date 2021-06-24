/**
 * @Description：BubbleSort
 * @author：yigong4
 * @date：2021/4/7
 * @version：v1.0.0
 */
import Sort from '@/algorithm/sort/Sort'

type nodeType = any
export default class BubbleSort<node extends nodeType> extends Sort<node> {
  /**
   * 冒泡排序算法 时间复杂度O(n²)
   * @return {Array<any>}
   */
  sort(): Array<node> {
    const array = [...this.originalArray]
    let swapped = false

    for (let i = 0, len1 = array.length; i < len1; i++) {
      swapped = false
      // Call visiting callback.
      this.callbacks.visitingCallback(array[i])

      for (let j = 0, len2 = len1 - i - 1; j < len2; j++) {
        // Call visiting callback.
        this.callbacks.visitingCallback(array[i])

        if (this.comparator.lessThan(array[j + 1], array[j])) {
          ;[array[j], array[j + 1]] = [array[j + 1], array[j]]

          swapped = true
        }
      }
      if (!swapped) {
        return array
      }
    }
    return array
  }
}

//new BubbleSort().sort([1, 4, 2, 1,8]);
