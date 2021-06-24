/**
 * @Description：GraphVertex
 * @author：yigong4
 * @date：2021/6/23
 * @version：v1.0.0
 */
import GraphEdge from '@/data-structures/graph/GraphEdge'
import LinkedList from '@/data-structures/linked-list/LinkedList'
import { LinkedListNode } from '@/data-structures/linked-list/LinkedListNode'

export default class GraphVertex {
  public value: GraphModels.vertexType
  public edges: LinkedList<GraphEdge>

  constructor(value: GraphModels.vertexType) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value')
    }
    this.value = value
    this.edges = new LinkedList<GraphEdge>({ compareCallback: GraphVertex.edgeComparator })
  }

  /**
   * 比较函数
   * @param {GraphEdge} edgeA
   * @param {GraphEdge} edgeB
   * @returns {number | number}
   */
  static edgeComparator(edgeA: GraphEdge, edgeB: GraphEdge) {
    if (edgeA.getKey() === edgeB.getKey()) {
      return 0
    }

    return edgeA.getKey() < edgeB.getKey() ? -1 : 1
  }

  /**
   * 获取图顶点的key值
   * @returns {GraphModels.vertexType}
   */
  getKey(): GraphModels.vertexType {
    return this.value
  }

  /**
   * 添加边
   * @param {GraphEdge} edge
   * @returns {this}
   */
  addEdge(edge: GraphEdge) {
    this.edges.append(edge)
    return this
  }

  /**
   * 删除边
   * @param {GraphEdge} edge
   * @returns {GraphEdge}
   */
  deleteEdge(edge: GraphEdge) {
    this.edges.delete(edge)
    return edge
  }

  /**
   * 获取所有边
   * @returns {GraphEdge[]}
   */
  getEdges() {
    return this.edges.convertToArray().map((LinkedListNode: LinkedListNode<GraphEdge>) => LinkedListNode.value)
  }

  /**
   * 获取边长数量
   * @returns {number}
   */
  getDegree() {
    return this.edges.convertToArray().length
  }

  /**
   * 判断是否存在某个边
   * @param {GraphEdge} requiredEdge
   * @returns {boolean}
   */
  hasEdge(requiredEdge: GraphEdge) {
    const edgeNode = this.edges.find({
      callback: (edge: GraphEdge) => (edge = requiredEdge)
    })
    return !!edgeNode
  }
}
