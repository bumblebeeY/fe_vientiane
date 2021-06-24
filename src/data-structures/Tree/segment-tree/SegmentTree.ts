/**
 * @Description：SegmentTree
 * @author：yigong4
 * @date：2021/5/19
 * @version：v1.0.0
 */
import isPowerOfTwo from '@/algorithm/math/isPowerOfTwo'

export default class SegmentTree<T> {
  /**
   * 输入数组
   * @type {Array<T>}
   */
  public inputArray: Array<T>
  /**
   * 操作函数
   * @type {Function}
   */
  public operation: Function
  /**
   * 操作回滚
   * @type {any}
   */
  public operationFallback?: any
  /**
   * 生成的线段树 数组
   * @type {Array<T | null>}
   */
  public segmentTree: Array<T | null>

  constructor(inputArray: Array<T>, operation: Function, operationFallback: any) {
    this.inputArray = inputArray
    this.operation = operation
    this.operationFallback = operationFallback
    this.segmentTree = this.initSegmentTree(inputArray)
    this.buildSegmentTree()
  }

  /**
   * 根据输入的数组初始化线段树数组
   * @param {Array<T>} inputArray
   * @returns {any[]}
   */
  initSegmentTree(inputArray: Array<T>) {
    let segmentTreeLength = 0
    const inputArrayLength = this.inputArray.length
    if (isPowerOfTwo(inputArrayLength)) {
      segmentTreeLength = 2 * inputArrayLength - 1
    } else {
      const height = Math.ceil(Math.log2(inputArrayLength))
      segmentTreeLength = 2 * Math.pow(2, height) - 1
    }
    return new Array(segmentTreeLength).fill(null)
  }

  /**
   * 构建线段树
   */
  buildSegmentTree() {
    const leftIndex = 0
    const rightIndex = this.inputArray.length - 1
    const position = 0
    this.buildTreeRecursively(leftIndex, rightIndex, position)
  }

  /**
   * 递归方法构建树
   * @param {number} leftIndex
   * @param {number} rightIndex
   * @param {number} position
   */
  buildTreeRecursively(leftIndex: number, rightIndex: number, position: number) {
    if (leftIndex === rightIndex) {
      this.segmentTree[position] = this.inputArray[leftIndex]
      return
    }
    const middleIndex = Math.floor((leftIndex + rightIndex) / 2)
    this.buildTreeRecursively(leftIndex, middleIndex, this.getLeftChildIndex(position))
    this.buildTreeRecursively(middleIndex + 1, rightIndex, this.getRightChildIndex(position))
    this.segmentTree[position] = this.operation(
      this.segmentTree[this.getLeftChildIndex(position)],
      this.segmentTree[this.getRightChildIndex(position)]
    )
  }

  /**
   * 获取左子节点的索引
   * @param {number} parentIndex
   * @returns {number}
   */
  getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1
  }

  /**
   * 获取右子节点的索引
   * @param {number} parentIndex
   * @returns {number}
   */
  getRightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2
  }
}
