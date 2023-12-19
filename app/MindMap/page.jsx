"use client";
import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeUpdateForm from './NodeUpdate';

const initialNodes = [
  {
    id: '0',
    type: 'input',
    data: { label: 'Node' },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;

const AddNodeOnEdgeDrop = () => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds))
    },
    [],
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        const newId = getId();
        const newNode = {
          id: newId,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node ${newId}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id: newId, source: connectingNodeId.current, target: newId })
        );
      }
    },
    [screenToFlowPosition]
  );

  const onNodeDoubleClick = useCallback(
    (_, { nodeId }) => {
      setSelectedNodeId(nodeId);
      setShowUpdateForm(true);
    },
    []
  );

  return (
    <div className="wrapper" style={{ height: "60vh" }}  >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodeDoubleClick={onNodeDoubleClick}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      {showUpdateForm && (
        <NodeUpdateForm
          nodeId={selectedNodeId}
          onClose={() => setShowUpdateForm(false)}
          onUpdate={(updatedData) => {
            console.log('Updated data received:', updatedData);
            setNodes((prevNodes) =>
              prevNodes.map((node) =>
                node.id === selectedNodeId ? { ...node, data: updatedData } : node
              )
            );
            setShowUpdateForm(false);
          }}
        />
      )}
    </div>
  );
};

const App = () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);

export default App;
