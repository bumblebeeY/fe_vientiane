/**
 * @Description：ShellSort
 * @author：yigong4
 * @date：2021/4/7
 * @version：v1.0.0
 */
import Sort from '@/algorithm/sort/Sort'

type nodeType = any

export default class ShellSort<node extends GraphModels.vertexType> extends Sort<node> {
  /**
   * 希尔排序 时间复杂度O(nlogN - n(logN)²)
   * @return {Array<node>}
   */
  sort(): Array<node> {
    const array = [...this.originalArray]
    let gap = Math.floor(array.length / 2)
    while (gap > 0) {
      for (let i = 0, len = array.length - gap; i < len; i++) {
        let curIndex = i
        let gapShiftedIndex = i + gap
        while (curIndex >= 0) {
          // Call visiting callback
          this.callbacks.visitingCallback(array[curIndex])

          if (
            this.comparator.lessThan(array[gapShiftedIndex], array[curIndex])
          ) {
            ;[array[curIndex], array[gapShiftedIndex]] = [array[gapShiftedIndex], array[curIndex]]
          }
          gapShiftedIndex = curIndex
          curIndex -= gap
        }
      }
      gap = Math.floor(gap / 2)
    }
    return array
  }
}