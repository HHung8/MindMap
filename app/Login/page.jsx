"use client";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Login = () => {
  const { user, error, isLoading } = useUser();
  const [mindMaps, setMindMaps] = useState([]);

  // Load dữ liệu từ localStorage khi trang được render
  useEffect(() => {
    const storedMindMaps = localStorage.getItem('mindMaps');
    if (storedMindMaps) {
      setMindMaps(JSON.parse(storedMindMaps));
    }
  }, []);

  // Effect để load lại dữ liệu khi quay lại từ trang MindMap
  useEffect(() => {
    const loadMindMaps = () => {
      const storedMindMaps = localStorage.getItem('mindMaps');
      if (storedMindMaps) {
        setMindMaps(JSON.parse(storedMindMaps));
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadMindMaps();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('mindMaps', JSON.stringify(data));
    setMindMaps(data);
  };

  // Hàm thêm 1 MINDMAP
  const handleAddMindMap = () => {
    const newMindMap = {
      id: mindMaps.length + 1,
      name: "MindMap Không Có Tên",
      description: "Chưa có mô tả",
      createdAt: new Date().toLocaleDateString(),
    };
    const updatedMindMaps = [...mindMaps, newMindMap];
    saveToLocalStorage(updatedMindMaps);
  };
  
  // Hàm xoá 1 mindMap
  const handleDeleteMindMap = (id) => {
    const filteredMindMaps = mindMaps.filter(map => map.id !== id);
    saveToLocalStorage(filteredMindMaps);
  };

  // Trường hợp đang loading, hiển thị thông báo "Loading..."
  if (isLoading) return <div>Loading...</div>;

  // Trường hợp có lỗi, hiển thị thông báo lỗi
  if (error) return <div>{error.message}</div>;

  // Nếu đã đăng nhập
  if (user) {
    return (
      <div className="container px-4 mx-auto">
        <div className="text-start">
          <h3 className="text-3xl md:text-4xl font-medium my-2">MindMap của tôi</h3>
          <div className="flex py-4"> 
            <Link href="/MindMap">
              <div className="bg-blue-900 text-white px-6 p-2 rounded-md" onClick={handleAddMindMap}>
                Thêm mới
              </div>
            </Link>
          </div>
          <div className="px-4">
            <div className="flex items-center py-2">
              <span className="w-1/6 text-center">
                <input  type="checkbox" />
              </span>
              <span className="w-1/2">
                <span className="text-xs uppercase text-gray-600 font-bold">Tên</span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">Tạo lúc</span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">Hành động</span>
              </span>
            </div>
            {mindMaps.map((map) => (
              <div key={map.id} className="hover:bg-gray-200 cursor-pointer bg-white shadow flex items-center mb-5 rounded-lg">
                <div className="w-1/6 text-center">
                  <input type="checkbox"/>
                </div>
                <div className="w-1/2">
                  <Link href="/MindMap">
                    <div className="flex items-center ml-4">
                      <div>
                        <span className="capitalize block text-gray-800">
                          {map.name}
                        </span>
                        <span className="text-sm block text-gray-600">
                          {map.description}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="w-1/4">
                  <span className="text-gray-600 text-sm">{map.createdAt}</span>
                </div>
                <div className="w-1/4 flex">
                  <Link href="/MindMap">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-gray-600 text-sm px-2 cursor-pointer"
                      />
                    </div>
                  </Link>
                    <div className="flex items-center" onClick={() => handleDeleteMindMap(map.id)} >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-gray-600 text-sm px-2 cursor-pointer"
                      />
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Nếu chưa đăng nhập
  return (
    <div>
      <h1 className="flex text-center justify-center m-5 text-gray-600 font-semibold text-lg"> Vui Lòng Đăng Nhập Để Vào MindMap </h1>
    </div>
  );
};
  
export default Login;
