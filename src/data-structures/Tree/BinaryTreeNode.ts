/**
 * @Description：BinaryTreeNode
 * @author：yigong4
 * @date：2021/4/23
 * @version：v1.0.0
 */
import Helper from '@/common/Helper'
import { OriginalCallbacks } from '@/common/Callbacks'
import Comparator from '@/utils/Comparator'

export default class BinaryTreeNode<T> extends Helper {
  static readonly null = new BinaryTreeNode<any>(null)
  public left: BinaryTreeNode<T> | null = null
  public right: BinaryTreeNode<T> | null = null
  public parent: BinaryTreeNode<T> | null = null
  public value: T | null
  public nodeComparator: Comparator

  constructor(value: T | null = null, originalCallbacks?: OriginalCallbacks) {
    super(originalCallbacks)
    this.nodeComparator = new Comparator(this.callbacks.nodeCompareCallback)
    this.value = value
  }

  /**
   * 设置节点值
   * @param value
   */
  setValue(value: T | null) {
    this.value = value
  }

  /**
   * 设置当前节点的左子节点
   * @param {BinaryTreeNode} node
   * @returns {this}
   */
  setLeft(node: BinaryTreeNode<T> | null) {
    if (this.left) {
      // 分离左子节点
      this.left.parent = null
    }
    // 附加新节点到左侧
    this.left = node
    if (node) {
      // 设置新左子节点的父节点为当前节点
      this.left ? (this.left.parent = this) : undefined
    }
    return this
  }

  /**
   * 设置当前节点的右子节点
   * @param {BinaryTreeNode} node
   * @returns {this}
   */
  setRight(node: BinaryTreeNode<T> | null) {
    if (this.right) {
      this.right.parent = null
    }
    this.right = node
    if (node) {
      this.right ? (this.right.parent = this) : undefined
    }
    return this
  }

  /**
   * 获取树节点高度
   * @returns {number}
   */
  getHeight(): number {
    return Math.max(this.getLeftHeight(), this.getRightHeight())
  }

  /**
   * 获取树节点左侧高度
   * @returns {number}
   */
  getLeftHeight(): number {
    if (!this.left) {
      return 0
    }
    return this.left.getHeight() + 1
  }

  /**
   * 获取树节点右侧高度
   * @returns {number}
   */
  getRightHeight(): number {
    if (!this.right) {
      return 0
    }
    return this.right.getHeight() + 1
  }

  /**
   * 获取二叉树节点的平衡因子
   * @returns {number}
   */
  getBalanceFactor(): number {
    return this.getLeftHeight() - this.getRightHeight()
  }

  /**
   * 删除节点
   * @param {BinaryTreeNode} node
   */
  removeChild(node: BinaryTreeNode<T> | null): boolean {
    if (this.left && this.nodeComparator.equal(node, this.left)) {
      this.left = null
      return true
    }
    if (this.right && this.nodeComparator.equal(this.right, node)) {
      this.right = null
      return true
    }
    return false
  }

  /**
   * 替换元素
   * @param {BinaryTreeNode | null} nodeToReplace
   * @param {BinaryTreeNode | null} replacementNode
   * @returns {boolean}
   */
  replaceChild(nodeToReplace: BinaryTreeNode<T> | null, replacementNode: BinaryTreeNode<T> | null) {
    if (!nodeToReplace || !replacementNode) return false
    if (this.left && this.nodeComparator.equal(nodeToReplace, this.left)) {
      this.left = replacementNode
      return true
    }
    if (this.right && this.nodeComparator.equal(nodeToReplace, this.right)) {
      this.right = replacementNode
      return true
    }

    return false
  }

  /**
   * 获取父节点的兄弟节点
   * @returns {BinaryTreeNode<T> | undefined}
   */
  getUncle() {
    if (!this.parent) return undefined
    if (!this.parent.parent) return undefined
    if (!this.parent.parent.left || !this.parent.parent.right) return undefined
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) return this.parent.parent.right
    return this.parent.parent.left
  }

  /**
   * 拷贝节点
   * @param {BinaryTreeNode} sourceNode
   * @param {BinaryTreeNode} targetNode
   */
  static copyNode<T>(sourceNode: BinaryTreeNode<T>, targetNode: BinaryTreeNode<T>) {
    targetNode.setValue(sourceNode.value)
    targetNode.setLeft(sourceNode.left)
    targetNode.setRight(sourceNode.right)
  }

  /**
   * convert binary tree node to array
   * @returns {any[]}
   */
  convertToArray() {
    const array: any[] = []
    if (this.left) {
      array.concat(this.left.convertToArray())
    }
    array.push(this.value)
    if (this.right) {
      array.concat(this.right.convertToArray())
    }
    return array
  }

  /**
   * convert binary tree node to string
   * @returns {string}
   */
  convertToString(callback?: (message: any) => void): string {
    return this.convertToArray()
      .map((value: any) => {
        return callback ? callback(this.value) : `${JSON.stringify(this.value)}`
      })
      .toString()
  }
}
