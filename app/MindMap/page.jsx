"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Background,
  MiniMap,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useShareHandler from "./ShareHandler";
import {
  faPlus,
  faSave,
  faShare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

// Khởi tạo node 
const initialNodes = [
  {
    id: "0",
    type: "input",
    data: { label: "MindMap" },
    position: { x: 0, y: 50 },
  },
];

// Thêm node khi kéo thả 
let id = 1;
const getId = () => `${id++}`;

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("private");
  const shareableLink = useShareHandler(nodes, edges);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  const handleUnsavedChanges = useCallback((event) => {
    if (unsavedChanges) {
      const message = "You have unsaved changes. Are you sure you want to leave?";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    }
  }, [unsavedChanges]);

  useEffect(() => {
    const handleBeforeUnload = (event) => handleUnsavedChanges(event);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleUnsavedChanges]);


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    setSelectedOption("private");
  }, []);

  const handleClickSave = () => {
    const savedData = {
      nodes: nodes.map((node) => ({
        id: node.id,
        label: node.data.label,
        // Add other properties as needed
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        // Add other properties as needed
      })),
    };
    // Use the savedData as needed (e.g., send it to a server or save to localStorage)
    console.log("Saved Data:", savedData);
    toast.success("Đã lưu thành công!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setUnsavedChanges(false);
  };  

  const onConnect = useCallback((params) => {
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const MAX_LABEL_LENGTH = 20; // Số ký tự tối đa cho Label

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;
      const id = nanoid(); // Generate a unique ID
      const targetIsPane = event.target.classList.contains("react-flow__pane");
      if (targetIsPane) {
        const id = getId();
        const newLabel = `Text ${id}`;
        const truncatedLabel = newLabel.length > MAX_LABEL_LENGTH ? newLabel.substring(0, MAX_LABEL_LENGTH) : newLabel;
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: truncatedLabel},
          origin: [0.5, 0.0],
          fullLabel: newLabel
        };
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );                     

  const onNodeClick = useCallback(
    (event, node) => {
      event.preventDefault();
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onInputBlur = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const onInputChange = useCallback(
    (event) => {
      const inputValue = event.target.value;
      const maxLength = MAX_LABEL_LENGTH;
      const updatedLabel = 
        inputValue.length > maxLength
          ? inputValue.substring(0, maxLength)
          : inputValue;
  
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: { ...node.data, label: updatedLabel },
          };
        }
        return node;
      });
  
      setNodes(updatedNodes);
    },
    [nodes, selectedNodeId, setNodes]
  );

  return (
    <div className="py-5 mx-auto">
      <div className="text-start">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-4/5">
              <h1
                className="text-2xl md:text-4xl font-medium my-2 outline-0"
                contentEditable="true"
                spellCheck="false"
              >
                マインドマップに名前はない
              </h1>
              <p
                className="outline-0"
                contentEditable="true"
                spellCheck="false"
              >
                まだ説明がありません
              </p>
            </div>
            <div className="w-1/5">
              <div className="flex justify-end items-center">
                <button
                  className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700"
                  onClick={handleClickSave}
                  target="_blank"
                  rel="noopener"
                >
                  <FontAwesomeIcon icon={faSave} />
                  <span className="ml-2">Save</span>
                </button>
                <button
                  className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700"
                  target="_blank"
                  onClick={toggleModal}
                  rel="noopener"
                >
                  <FontAwesomeIcon icon={faShare} />
                  <span className="ml-2">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="wrapper"
        ref={reactFlowWrapper}
        style={{ height: "50vh", position: "relative" }}
      >
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
            value={
              nodes.find((node) => node.id === selectedNodeId)?.data.label || ""
            }
            onChange={onInputChange}
            onBlur={onInputBlur}
            maxLength={MAX_LABEL_LENGTH}
            style={{
              position: "absolute",
              top: "20px",
              background: "#fff",
              color: "#000",
              border: "1px solid #000",
              right: "0",
              padding: "10px",
              resize: "none",
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "300px"
            }}
            className="node-input"
          />
        )}
      </div>
      <div
        className={`fixed z-10 overflow-y-auto top-10 w-full left-0 ${
          modalVisible ? "block" : "hidden"
        }`}
        id="modal"
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute bg-gray-900 inset-0 opacity-75"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:p-4">
                <div className="w-full">
                    <div className="flex text-center justify-center">
                      <div className="flex items-center mr-4 mb-4">
                        <input
                          id="radio1"
                          type="radio"
                          value="private"
                          name="mode"
                          className="hidden"
                          checked={selectedOption === "private"}
                          onClick={() => handleOptionChange("private")}
                        />
                        <label
                          for="radio1"
                          className="flex items-center cursor-pointer"
                          onClick={() => handleOptionChange("private")}
                        >
                          <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                          Riêng tư
                        </label>
                      </div>
                      <div className="flex items-center mr-4 mb-4">
                        <input
                          id="radio2"
                          type="radio"
                          value="private"
                          name="mode"
                          className="hidden"
                          checked={selectedOption === "public"}
                          onClick={() => handleOptionChange("public")}
                        />
                        <label
                          for="radio2"
                          className="flex items-center cursor-pointer"
                          onClick={() => handleOptionChange("public")}
                        >
                          <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                          Công khai
                        </label>
                      </div>
                    </div>
                  {selectedOption === "private" && (
                    <div>
                      <p>Nếu chọn riêng tư, chỉ có bạn mới được quyền xem MindMap này</p>
                    </div>
                  )}
                  {selectedOption === "public" && (
                    <>
                      <div className="w-fill">
                        <label for="share-input">Liên kết chia sẻ</label>
                        <input
                          id="share-input"
                          className="peer h-10 w-full rounded-md bg-gray-50 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                          type="url"
                          value="https://mind-map-rosy.vercel.app/MindMap"
                          readOnly
                        />
                      </div>
                      <div className="group relative mt-3">
                        <label>Tiêu đề </label>
                        <input
                          className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-400 outline-none"
                          type="url"
                          placeholder="MindMap không tên"
                        />
                      </div>
                      <div className="group relative mt-3">
                        <label>Mô tả</label>
                        <textarea className="peer h-20 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 forcus:ring-blue-400 outline-none"/>
                      </div>
                      <div className="group ralative mt-3">
                        <label>Ảnh chia sẻ</label>
                        <input className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={closeModal}
                >
                  <FontAwesomeIcon icon={faXmark} className="mr-2" />
                  Đóng
                </button>
                <button
                  type="submit"
                  onClick={handleClickSave}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Lưu Lại
                </button>
              </div>
            </div>
          </div>
        </div>
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
