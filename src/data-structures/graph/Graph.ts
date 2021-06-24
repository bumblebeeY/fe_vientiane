/**
 * @Description：Graph
 * @author：yigong4
 * @date：2021/6/22
 * @version：v1.0.0
 */
import GraphVertex from '@/data-structures/graph/GraphVertex'
import GraphEdge from '@/data-structures/graph/GraphEdge'

export default class Graph {
  public vertices: Record<any, GraphVertex> = {}
  public edges: Record<any, GraphEdge> = {}
  public isDirected = false

  constructor(isDirected: boolean) {
    this.isDirected = isDirected
  }

  /**
   * 新增顶点
   * @param {GraphVertex} vertex
   * @returns {this}
   */
  addVertex(vertex: GraphVertex) {
    this.vertices[vertex.getKey()] = vertex
    return this
  }

  /**
   * 根据key值获取图顶点
   * @param vertexKey
   * @returns {GraphVertex}
   */
  getVertexByKey(vertexKey: any): GraphVertex {
    return this.vertices[vertexKey]
  }

  /**
   * 获取所有的顶点
   * @returns {GraphVertex[]}
   */
  getAllVertices(): GraphVertex[] {
    return Object.values(this.vertices)
  }

  /**
   * 获取所有边
   * @returns {GraphEdge[]}
   */
  getAllEdges(): GraphEdge[] {
    return Object.values(this.edges)
  }

  /**
   * 新增边
   * @param {GraphEdge} edge
   * @returns {this}
   */
  addEdge(edge: GraphEdge) {
    let startVertex = this.getVertexByKey(edge.startVertex.getKey())
    let endVertex = this.getVertexByKey(edge.endVertex.getKey())
    if (!startVertex) {
      this.addVertex(edge.startVertex)
      startVertex = this.getVertexByKey(edge.startVertex.getKey())
    }
    if (!endVertex) {
      this.addVertex(edge.endVertex)
      endVertex = this.getVertexByKey(edge.endVertex.getKey())
    }
    if (this.edges[edge.getKey()]) {
      throw new Error('Edge has already been added before')
    } else {
      this.edges[edge.getKey()] = edge
    }
    if (this.isDirected) {
      startVertex.addEdge(edge)
    } else {
      startVertex.addEdge(edge)
      endVertex.addEdge(edge)
    }
    return this
  }
}
