/**
 * @Description：BucketSort
 * @author：yigong4
 * @date：2021/4/20
 * @version：v1.0.0
 */
import Sort from '@/algorithm/sort/Sort'
import InsertionSort from '@/algorithm/sort/insertion/InsertionSort'

type nodeType = any
const BUCKET_SIZE = 5 // 默认桶大小
export default class BucketSort<node extends nodeType> extends Sort<node> {
  private bucketSize = BUCKET_SIZE

  sort(): Array<node> {
    let sortedArray = [...this.originalArray]
    if (sortedArray.length < 2) {
      return sortedArray
    }
    const buckets = this.placeElementInNumberBuckets(sortedArray, this.bucketSize)
    sortedArray = buckets.reduce((acc, val) => {
      return [...acc, ...new InsertionSort(val).sort()]
    }, [])
    return sortedArray
  }

  /**
   * 设置桶大小
   * @returns {this<node>}
   * @param bucketSize
   */
  setBucketSize(bucketSize: number) {
    this.bucketSize = bucketSize
    return this
  }

  /**
   * 将数组元素放置到数值桶中
   * @param {node[]} array
   * @param bucketSize
   * @returns {Array<Array<node>>}
   */
  placeElementInNumberBuckets(array: any[], bucketSize: number): Array<Array<node>> {
    const maxElement = Math.max(...array)
    const minElement = Math.min(...array)
    const bucketCount = Math.floor((maxElement - minElement) / bucketSize) + 1
    const buckets = this.createBuckets(bucketCount)

    array.forEach(element => {
      this.callbacks.visitingCallback(element)
      buckets[Math.floor((element - minElement) / bucketSize)].push(element)
    })
    return buckets
  }

  /**
   * 创建空桶 : [[],[],[]........]
   * @returns {Array<Array<any>>}
   * @param bucketCount 桶数量
   */
  createBuckets(bucketCount: number): Array<Array<any>> {
    return new Array(bucketCount).fill(null).map(() => [])
  }
}
