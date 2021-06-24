/**
 * @Description：HashTable
 * @author：yigong4
 * @date：2021/4/20
 * @version：v1.0.0
 */
import LinkedList from '@/data-structures/linked-list/LinkedList'

const defaultHashTableSize = 32
const PRIME = 37 // 质数常量
export default class HashTable {
  buckets: LinkedList[] = []
  keys: { [key: string]: any } = {}

  constructor(hashTableSize = defaultHashTableSize) {
    this.buckets = this.creatBuckets(hashTableSize)
  }

  /**
   * 霍纳算法计算hash值(暂时实现支持键为 string 类型)
   * @param key
   * @returns {number}
   */
  // TODO 支持 任意类型作为键值
  hash(key: string): number {
    const hash = Array.from(key).reduce((total: number, symbol: string) => {
      return total * PRIME + symbol.charCodeAt(0)
    }, 0)
    return parseInt(String(hash % this.buckets.length))
  }

  /**
   * 添加元素
   * @param {string} key
   * @param value
   */
  set(key: string, value: any) {
    const hashKey = this.hash(key)
    this.keys[key] = hashKey
    const bucketLinkedList = this.buckets[hashKey]
    const linkedListNode = bucketLinkedList.find({ callback: (nodeValue: any) => nodeValue.key === key })
    if (!linkedListNode) {
      bucketLinkedList.append({ key, value })
    } else {
      linkedListNode.value.value = value
    }
    return this
  }

  /**
   * 获取元素值
   * @param {string} key
   * @returns {any}
   */
  get(key: string) {
    const hashKey = this.hash(key)
    const bucketLinkedList = this.buckets[hashKey]
    const linkedListNode = bucketLinkedList.find({ callback: (nodeValue: any) => nodeValue.key === key })
    return linkedListNode ? linkedListNode.value.value : undefined
  }

  /**
   * 删除元素
   * @param {string} key
   * @returns {LinkedListNode | null}
   */
  delete(key: string) {
    const hashKey = this.hash(key)
    Reflect.deleteProperty(this.keys, key)
    const bucketLinkedList = this.buckets[hashKey]
    const linkedListNode = bucketLinkedList.find({ callback: (nodeValue: any) => nodeValue.key === key })
    if (linkedListNode) {
      return bucketLinkedList.delete(linkedListNode.value)
    }
    return null
  }

  /**
   * 判断hashTable 中是否存在key值
   * @param {string} key
   * @returns {boolean}
   */
  has(key: string): boolean {
    return Object.hasOwnProperty.call(this.keys, key)
  }

  /**
   * 返回hashTable的keys
   * @returns {string[]}
   */
  getKeys(): string[] {
    return Object.keys(this.keys)
  }

  /**
   * 返回hashTable的values
   * @returns {any[]}
   */
  getValues(): any[] {
    return this.buckets.reduce((values: any, bucket) => {
      const bucketValues = bucket.convertToArray().map(linkedListNode => linkedListNode.value.value)
      return values.concat(bucketValues)
    }, [])
  }

  /**
   * 创建存储桶
   * @param {number} bucketSize
   * @returns {LinkedList[]}
   */
  creatBuckets(bucketSize: number): LinkedList[] {
    return new Array(bucketSize).fill(null).map(() => new LinkedList())
  }
}
