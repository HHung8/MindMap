"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {} from "@fortawesome/free-brands-svg-icons";
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useShareHandler from './ShareHandler';
import { faSave, faShare } from "@fortawesome/free-solid-svg-icons";

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

  const shareableLink = useShareHandler(nodes, edges); 
  const handleClickSave = () => {
    toast.success('Đã lưu thành công!', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

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
    <div className='py-5 mx-auto'>
      <div className='text-start' >
          <div className='container mx-auto' >
              <div className='flex flex-wrap'>
                  <div className='w-4/5'> 
                        <h1 className='text-2xl md:text-4xl font-medium my-2 outline-0' contentEditable="true" spellCheck="false">Mindmap không có tên</h1>
                        <p className='outline-0' contentEditable="true" spellCheck="false">Chưa có mô tả</p>
                  </div>
                  <div className='w-1/5'>
                       <div className='flex justify-end items-center'>
                          <button className= 'border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700' 
                           onClick={handleClickSave}
                           target="_blank"
                            rel="noopener"
                          >
                            <FontAwesomeIcon icon={faSave} />
                            <span className='ml-2'>Lưu thay đổi</span>
                          </button>
                          <button className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" 
                            target="_blank"
                            rel="noopenr"
                          >
                            <FontAwesomeIcon icon={faShare} />
                            <span className="ml-2">Chia sẻ</span>
                          </button>
                       </div>
                  </div>
              </div>
          </div>
      </div>
     <div className="wrapper" ref={reactFlowWrapper} style={{ height: "50vh", position:'relative' }}>
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
            top: '20px',
            background: "#fff",
            color: "#000",
            border: '1px solid #000',
            right: '0',
            padding: '10px'
          }}
        />
      )}
     </div>
     <ToastContainer />
    </div>
  );
};

const App = () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);
export default App;
