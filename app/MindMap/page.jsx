"use client";
import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onConnect = useCallback(
    (params) => {
      // Add a new node on connect
      const newNode = {
        id: (nodes.length + 1).toString(),
        data: { label: `New Node ${nodes.length + 1}` },
        position: { x: Math.random() * 200, y: Math.random() * 200 },
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => addEdge(params, eds));
    },
    [nodes]
  );

  const onElementsRemove = useCallback(
    (elementsToRemove) => {
      // Filter out nodes that are being removed
      const filteredNodes = nodes.filter(
        (node) => !elementsToRemove.find((el) => el.id === node.id)
      );
      setNodes(filteredNodes);
    },
    [nodes]
  );

  return (
    <div style={{ height: "60vh" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default Flow;
