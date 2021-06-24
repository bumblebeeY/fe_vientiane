/**
 * @Description：MergeSort
 * @author：yigong4
 * @date：2021/4/8
 * @version：v1.0.0
 */
import Sort from '@/algorithm/sort/Sort'

type nodeType = any
export default class MergeSort<node extends nodeType> extends Sort<node> {
  /**
   * 归并排序 时间复杂度O(nlogN)
   * @return {Array<any>}
   */
  sort(): Array<node> {
    return this.iterationSort(this.originalArray)
  }

  /**
   * 迭代排序算法
   * @param {Array<node>} originalArray
   * @returns {Array<node>}
   */
  iterationSort(originalArray: Array<node>): Array<node> {
    if (originalArray.length <= 1) return originalArray
    const middleIndex = Math.floor(originalArray.length / 2)
    // spilt
    const left = originalArray.slice(0, middleIndex)
    const right = originalArray.slice(middleIndex, originalArray.length)

    // sort
    const leftSortedArr = this.iterationSort(left)
    const rightSortedArr = this.iterationSort(right)

    // merge
    return this.mergeSortedArrays(leftSortedArr, rightSortedArr)
  }

  mergeSortedArrays(leftArray: Array<node>, rightArray: Array<node>): Array<node> {
    const sortedArray = []
    let leftIndex = 0
    let rightIndex = 0
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      let minElement = null
      if (this.comparator.lessThanOrEqual(leftArray[leftIndex], rightArray[rightIndex])) {
        minElement = leftArray[leftIndex]
        leftIndex++
      } else {
        minElement = rightArray[rightIndex]
        rightIndex++
      }
      sortedArray.push(minElement)
      // Call visiting callback
      this.callbacks.visitingCallback(minElement)
    }
    return sortedArray.concat(leftArray.slice(leftIndex)).concat(rightArray.slice(rightIndex))
  }
}
