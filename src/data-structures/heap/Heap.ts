import Comparator from '@/utils/Comparator'
import Helper from '@/common/Helper'

/**
 * @Description：Heap
 * @author：yigong4
 * @date：2021/4/13
 * @version：v1.0.0
 */
export default class Heap<hNode> extends Helper {
  public heapContainer: hNode[] = []

  constructor(originalCallbacks?: { [key: string]: Function }) {
    super(originalCallbacks)
    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly')
    }
  }

  /**
   * 获取父节点的左子节点索引
   * 推理过程：
   * 假设一个节点，他在数组下标是i,且该节点在该层位于第x+1个,在二叉树的第n层
   * 那么由于前n层总节点树为2^n - 1,前n-1层有 2^(n-1) - 1个节点，加上它本层前面的x个节点 则有 i=2^(n-1)-1+x
   * i的子节点在n+1层，对于左子节点 令它在数组的下标为j，则它前面应有2x个节点 所以可得 j=(2^n-1)+2x=2(2^(n-1)+x-1)+1 = 2i+1;
   * @param {number} parentIndex
   * @returns {number}
   */
  getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1
  }

  /**
   * 获取父节点的右子节点索引
   * @param {number} parentIndex
   * @returns {number}
   */
  getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2
  }

  /**
   * 获取父节点在数组中的索引
   * @param {number} childIndex
   * @returns {number}
   */
  getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2)
  }

  /**
   * 判断节点是否有父节点
   * @param {number} childIndex
   * @returns {boolean}
   */
  hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0
  }

  /**
   * 判断节点是否有左子节点
   * @param {number} parentIndex
   * @returns {boolean}
   */
  hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   * 判断节点是否有右子节点
   * @param {number} parentIndex
   * @returns {boolean}
   */
  hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   * 获取左子节点
   * @param {number} parentIndex
   * @returns {any}
   */
  getLeftChild(parentIndex: number): hNode {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  /**
   * 获取右子节点
   * @param {number} parentIndex
   * @returns {hNode}
   */
  getRightChild(parentIndex: number): hNode {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }

  /**
   * 获取父节点
   * @param {number} childIndex
   * @returns {hNode}
   */
  getParent(childIndex: number): hNode {
    return this.heapContainer[this.getParentIndex(childIndex)]
  }

  /**
   * 交换两个节点
   * @param {number} indexFirst
   * @param {number} indexSecond
   */
  swap(indexFirst: number, indexSecond: number) {
    const temp = this.heapContainer[indexSecond]
    this.heapContainer[indexSecond] = this.heapContainer[indexFirst]
    this.heapContainer[indexFirst] = temp
  }

  /**
   * 返回堆顶节点，但不将其从堆中取出
   * @returns {hNode | null}
   */
  peek(): hNode | null {
    if (this.heapContainer.length === 0) {
      return null
    }
    return this.heapContainer[0]
  }

  /**
   * 返回堆顶节点，同时将其从堆中取出时间复杂度O(log n)( 删除 最大（最小）元素，下沉)
   * 做法：(sink方法)
   *    1.将堆顶节点与末尾节点对调，
   *    2.取出末尾节点后将新的堆顶节点与其子节点不断比较和对调，直到将其置于正确的位置中。
   * @returns {null | hNode | undefined}
   */
  poll() {
    if (this.heapContainer.length === 0) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }
    const first = this.heapContainer[0]
    const last = this.heapContainer.pop()
    this.heapContainer[0] = last as hNode
    this.sink()
    return first
  }

  /**
   * 将一个新的节点压入堆中 时间复杂度是O(log n)（插入 上浮）
   * 做法 （swim方法）
   *    1.先将节点直接至于最后（如果用数组实现也就是数组的末尾）
   *    2.在通过不断地与父节点进行swap操作来将其置于正确的位置
   * @param {hNode} item
   * @returns {this<hNode>}
   */
  add(item: hNode) {
    this.heapContainer.push(item)
    this.swim()
    return this
  }

  /**
   * 删除节点
   * @param {hNode} item
   * @param comparator
   */
  remove(item: hNode, comparator: Comparator = this.comparator) {
    const foundItems = this.find(item, comparator)
    const numberOfItemToRemove = foundItems.length
    for (let i = 0; i < numberOfItemToRemove; i++) {
      const removeIndex = foundItems.pop() as number
      if (removeIndex === this.heapContainer.length - 1) {
        this.heapContainer.pop()
      } else {
        this.heapContainer[removeIndex] = this.heapContainer.pop() as hNode
        const parent = this.getParent(removeIndex)
        if (
          this.hasLeftChild(removeIndex) &&
          (!parent || this.pairIsInCorrectOrder(parent, this.heapContainer[removeIndex]))
        ) {
          this.sink(removeIndex)
        } else {
          this.swim(removeIndex)
        }
      }
    }
  }

  /**
   * 查找节点，返回找到的节点索引数组
   * @param {hNode} item
   * @param comparator
   * @returns {Array<number>}
   */
  find(item: hNode, comparator: Comparator = this.comparator): Array<number> {
    const foundItemIndices: Array<number> = []
    for (let i = 0, len = this.heapContainer.length; i < len; i++) {
      if (comparator.equal(item, this.heapContainer[i])) {
        foundItemIndices.push(i)
      }
    }
    return foundItemIndices
  }

  /**
   * 是否是空堆
   * @returns {boolean}
   */
  isEmpty(): boolean {
    return !this.heapContainer.length
  }

  /**
   * 堆转换为字符串
   * @returns {string}
   */
  toString(): string {
    return this.heapContainer.toString()
  }

  /**
   * 向下维护heap order
   * 做法：通过不断地与子节点进行swap操作来将其置于正确的位置
   * @param {number} startIndex
   * @returns {Heap<hNode>}
   */
  sink(startIndex = 0): Heap<hNode> {
    let currentIndex = startIndex
    let nextIndex = null
    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(this.getRightChild(currentIndex), this.getLeftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }
      if (this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break
      }
      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
    return this
  }

  /**
   * 向上维护heap order
   * 做法：通过不断地与父节点进行swap操作来将其置于正确的位置
   * @param {number} startIndex
   * @returns {Heap<hNode>}
   */
  swim(startIndex?: number): Heap<hNode> {
    let currentIndex = startIndex || this.heapContainer.length - 1
    let nextIndex = null
    while (this.hasParent(currentIndex)) {
      if (this.pairIsInCorrectOrder(this.getParent(currentIndex), this.heapContainer[currentIndex])) {
        break
      }
      nextIndex = this.getParentIndex(currentIndex)
      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
    return this
  }

  /**
   * 判断两个子节点是否满足比较函数
   * @param {hNode} firstElement
   * @param {hNode} secondElement
   * @returns {boolean}
   */
  pairIsInCorrectOrder(firstElement: hNode, secondElement: hNode): boolean {
    throw new Error(`
      You have to implement heap pair comparison method
      for ${firstElement} and ${secondElement} values.
    `)
  }
}
