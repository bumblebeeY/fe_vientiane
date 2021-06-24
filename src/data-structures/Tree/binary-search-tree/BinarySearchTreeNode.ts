/**
 * @Description：BinarySearchTreeNode
 * @author：yigong4
 * @date：2021/4/23
 * @version：v1.0.0
 */
import BinaryTreeNode from '@/data-structures/Tree/BinaryTreeNode'
import { OriginalCallbacks } from '@/common/Callbacks'
import HashTable from '@/data-structures/hash-table/HashTable'

/**
 * 二叉搜索树
 */
export default class BinarySearchTreeNode<T> extends BinaryTreeNode<T> {
  public left: BinarySearchTreeNode<T> | null = null
  public right: BinarySearchTreeNode<T> | null = null
  public parent: BinarySearchTreeNode<T> | null = null
  public meta = new HashTable()
  constructor(value: T | null, public originalCallbacks?: OriginalCallbacks) {
    super(value, originalCallbacks)
  }

  /**
   * 树节点插入元素
   * @param value
   * @returns {BinarySearchTreeNode<T>}
   */
  insert(value: T): BinarySearchTreeNode<T> {
    if (this.comparator.equal(this.value, null)) {
      this.value = value
      return this
    }
    if (this.comparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.insert.call(this.left, value)
      }
      const newNode = new BinarySearchTreeNode<T>(value, this.originalCallbacks)
      this.setLeft(newNode)
      return newNode
    }
    if (this.comparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.insert.call(this.right, value)
      }
      const newNode = new BinarySearchTreeNode<T>(value, this.originalCallbacks)
      this.setRight(newNode)

      return newNode
    }
    return this
  }

  /**
   * 查找节点
   * @param value
   * @returns {BinarySearchTreeNode | null}
   */
  find(value: T | null): BinarySearchTreeNode<T> | null {
    if (this.comparator.equal(value, this.value)) {
      return this
    }
    if (this.comparator.lessThan(value, this.value)) {
      return this.find.call(this.left, value)
    }
    if (this.comparator.greaterThan(value, this.value)) {
      return this.find.call(this.right, value)
    }
    return null
  }

  /**
   * 判断树节点是否包含某个节点
   * @param value
   * @returns {boolean}
   */
  contains(value: T): boolean {
    return !!this.find(value)
  }

  /**
   * 删除节点
   * @param value
   */
  remove(value: T | null) {
    const nodeRemove = this.find(value)
    if (!nodeRemove) throw new Error('Item not found in the tree')
    const { parent } = nodeRemove

    if (!nodeRemove.left && !nodeRemove.right) {
      if (parent) {
        parent.removeChild(nodeRemove)
      } else {
        nodeRemove.setValue(null)
      }
    } else if (nodeRemove.left && nodeRemove.right) {
      const nextBiggerNode = this.getMin.call(nodeRemove.right)
      if (!this.comparator.equal(nextBiggerNode, nodeRemove.right)) {
        this.remove(nextBiggerNode.value)
        nodeRemove.setValue(nextBiggerNode.value)
      } else {
        // In case if next right value is the next bigger one and it doesn't have left child
        // then just replace node that is going to be deleted with the right node.
        nodeRemove.setValue(nodeRemove.right.value)
        nodeRemove.setRight(nodeRemove.right.right)
      }
    } else {
      const childNode = nodeRemove.left || nodeRemove.right
      if (parent) {
        parent.replaceChild(nodeRemove, childNode)
      } else {
        BinaryTreeNode.copyNode(childNode as BinarySearchTreeNode<T>, nodeRemove)
      }
    }
    nodeRemove.parent = null
    return true
  }

  /**
   * 获取最小节点
   * @returns {BinarySearchTreeNode}
   */
  getMin(): BinarySearchTreeNode<T> {
    if (!this.left) {
      return this
    }
    return this.getMin.call(this.left)
  }
}
