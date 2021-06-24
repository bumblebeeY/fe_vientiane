/**
 * @Description：RadixSort
 * @author：yigong4
 * @date：2021/4/20
 * @version：v1.0.0
 */
import Sort from '@/algorithm/sort/Sort'

const BASE_CHAR_CODE = 97 // charCode 最大值
const NUMBER_OF_POSSIBLE_DIGITS = 10 // 数值位数值最大值
const ENGLISH_ALPHABET_LENGTH = 26 // 字母最大长度

type nodeType = any
/**
 * 基数排序  支持字符串（不支持有负数的数组）
 *       负数支持方案：找出最小的数，若小于0 ，将每个元素都减去这个负数，使得数组中的最小值为0，排序完成后 将数组中的每一个数都加上最小值恢复原来的值
 */
// TODO RadixSort负数支持
export default class RadixSort<node extends nodeType> extends Sort<node> {
  sort(): Array<node> {
    let sortedArray = [...this.originalArray]
    const isArrayOfNumbers = this.isArrayOfNumbers(sortedArray)
    const numPasses = this.determineNumPasses(sortedArray)
    for (let currIndex = 0; currIndex < numPasses; currIndex++) {
      // 创建基数桶
      const buckets = isArrayOfNumbers
        ? this.placeElementInNumberBuckets(sortedArray, currIndex)
        : this.placeElementInCharacterBuckets(sortedArray, currIndex, numPasses)
      sortedArray = buckets.reduce((acc, val) => {
        return [...acc, ...val]
      }, [])
    }
    return sortedArray
  }

  /**
   * 将数组元素放置到数值桶中
   * @param {node[]} array
   * @param {number} index
   * @returns {Array<Array<node>>}
   */
  placeElementInNumberBuckets(array: node[], index: number): Array<Array<node>> {
    const modded = 10 ** (index + 1)
    const divided = 10 ** index
    const buckets = this.createBuckets(NUMBER_OF_POSSIBLE_DIGITS)
    array.forEach(element => {
      this.callbacks.visitingCallback(element)
      if (element < divided) {
        buckets[0].push(element)
      } else {
        const currentDigit = Math.floor(((element as any) % modded) / divided)
        buckets[currentDigit].push(element)
      }
    })

    return buckets
  }

  /**
   * 将数组元素放置到字符串桶中
   * @param {node[]} array
   * @param {number} index
   * @param {number} numPasses
   * @returns {Array<Array<node>>}
   */
  placeElementInCharacterBuckets(array: node[], index: number, numPasses: number): Array<Array<node>> {
    const buckets = this.createBuckets(ENGLISH_ALPHABET_LENGTH)

    array.forEach(element => {
      this.callbacks.visitingCallback(element)
      const currentBucket = this.getCharCodeOfElementAtIndex(element, index, numPasses)
      buckets[currentBucket].push(element)
    })
    return buckets
  }

  /**
   * 获取元素的charCode
   * @param element
   * @param {number} index
   * @param {number} numPasses
   * @returns {number}
   */
  getCharCodeOfElementAtIndex(element: any, index: number, numPasses: number) {
    if (numPasses - index > element.length) {
      return ENGLISH_ALPHABET_LENGTH - 1
    }
    const charPos = index > element.length - 1 ? 0 : element.length - index - 1

    return element.toLowerCase().charCodeAt(charPos) - BASE_CHAR_CODE
  }

  /**
   * 创建空桶 : [[],[],[]........]
   * @param {number} numBuckets 桶个数
   * @returns {Array<Array<any>>}
   */
  createBuckets(numBuckets: number): Array<Array<any>> {
    return new Array(numBuckets).fill(null).map(() => [])
  }

  /**
   * 确定数组中最长元素的长度 数值：log10(num) 字符串：元素的长度
   * @param {any[]} array
   */
  determineNumPasses(array: node[]): number {
    return this.getLengthOfLongestElement(array)
  }

  getLengthOfLongestElement(array: any[]): number {
    if (this.isArrayOfNumbers(array)) {
      return Math.floor(Math.log10(Math.max(...array))) + 1
    }
    return array.reduce((acc: number, val: any) => {
      return val.length > acc ? val.length : acc
    }, -Infinity)
  }

  /**
   * 判断数组 元素是否是整数
   * @param {any[]} array
   * @returns {any}
   */
  isArrayOfNumbers(array: any[]) {
    return this.isNumber(array[0])
  }

  /**
   * 判断是否是整数
   * @param element
   * @returns {boolean}
   */
  isNumber(element: any) {
    return Number.isInteger(element)
  }
}
