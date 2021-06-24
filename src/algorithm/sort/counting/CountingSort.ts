/**
 * @Description：CountingSort
 * @author：yigong4
 * @date：2021/4/8
 * @version：v1.0.0
 */
import Sort from '@/algorithm/sort/Sort'

type nodeType = any
export default class CountingSort<node extends nodeType> extends Sort<node> {
  /**
   * 计数排序 时间复杂度O(nlogN)
   * @param {T} smallestElement
   * @param {T} biggestElement
   * @return {Array<any>}
   */
  sort(smallestElement?: number, biggestElement?: number): Array<node> {
    let detectedSmallestElement = smallestElement || 0
    let detectedBiggestElement = biggestElement || 0
    if (smallestElement === undefined || biggestElement === undefined) {
      this.originalArray.forEach((element: node) => {
        // Call visiting callback
        this.callbacks.visitingCallback(element)

        // Detect biggest element
        if (this.comparator.greaterThan(element, detectedBiggestElement)) {
          detectedBiggestElement = Number(element)
        }

        // Detect smallest element
        if (this.comparator.lessThan(element, detectedSmallestElement)) {
          detectedSmallestElement = Number(element)
        }
      })
    }
    // init buckets array
    const buckets = Array(detectedBiggestElement - detectedSmallestElement + 1).fill(0)
    this.originalArray.forEach((element: node) => {
      // Call visiting callback
      this.callbacks.visitingCallback(element)

      buckets[Number(element) - detectedSmallestElement] += 1
    })

    for (let bucketIndex = 1; bucketIndex < buckets.length; bucketIndex += 1) {
      buckets[bucketIndex] += buckets[bucketIndex - 1]
    }

    buckets.pop()
    buckets.unshift(0)
    const sortedArray = Array(this.originalArray.length).fill(null)
    for (let elementIndex = 0; elementIndex < this.originalArray.length; elementIndex += 1) {
      // Get the element that we want to put into correct sorted position.
      const element = this.originalArray[elementIndex]

      // Visit element.
      this.callbacks.visitingCallback(element)

      // Get correct position of this element in sorted array.
      const elementSortedPosition = buckets[Number(element) - detectedSmallestElement]

      // Put element into correct position in sorted array.
      sortedArray[elementSortedPosition] = element

      // Increase position of current element in the bucket for future correct placements.
      buckets[Number(element) - detectedSmallestElement] += 1
    }

    // Return sorted array.
    return sortedArray
  }
}
