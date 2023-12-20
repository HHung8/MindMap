"use client"
import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Background,
  MiniMap,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

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
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onConnect = useCallback(
    (params) => {
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
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id }),
        );
      }
    },
    [screenToFlowPosition],
  );

  const onNodeClick = useCallback(
    (event, node) => {
      event.preventDefault();
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId],
  );

  const onInputBlur = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const onInputChange = useCallback(
    (event) => {
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: { ...node.data, label: event.target.value },
          };
        }
        return node;
      });
      setNodes(updatedNodes);
    },
    [nodes, selectedNodeId, setNodes],
  );

  return (
    <div className="wrapper" ref={reactFlowWrapper} style={{ height: "60vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      >
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
      {selectedNodeId && (
        <input
          type="text"
          value={nodes.find((node) => node.id === selectedNodeId)?.data.label || ''}
          onChange={onInputChange}
          onBlur={onInputBlur}
          style={{
            position: "absolute",
            top: '0',
            background: "gray",
            color: "white",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
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
