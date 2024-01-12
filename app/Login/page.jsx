"use client";

// pages/Login.js
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
// import { useRouter } from 'next/router';

const Login = () => {
  const { user, error, isLoading } = useUser();
  const [mindMaps, setMindMaps] = useState([]);
  const [newMindMap, setNewMindMap] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    const storedMindMaps = localStorage.getItem("mindMaps");
    if (storedMindMaps) {
      setMindMaps(JSON.parse(storedMindMaps));
    }

    const loadMindMaps = () => {
      const storedMindMaps = localStorage.getItem("mindMaps");
      if (storedMindMaps) {
        setMindMaps(JSON.parse(storedMindMaps));
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadMindMaps();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("mindMaps", JSON.stringify(data));
    setMindMaps(data);
  };

  const handleAddMindMap = async () => {
    const newMap = {
      id: nanoid(),
      name: "MindMap Không Có Tên",
      description: "Chưa có mô tả",
      createdAt: new Date().toLocaleString(),
    };

    setNewMindMap(newMap);
    const updatedMindMaps = [...mindMaps, newMap];
    saveToLocalStorage(updatedMindMaps);

    // Construct the link with the dynamic ID
    const link = `/MindMap/${newMap.id}`;

    // Use window.location.href to navigate
    window.location.href = link;
  };

  const handleDeleteMindMap = (id) => {
    // Lọc mindmap cần xóa
    const updatedMindMaps = mindMaps.filter((map) => map && map.id !== id);
    setMindMaps(updatedMindMaps);

    // Lưu lại dữ liệu sau khi xóa
    saveToLocalStorage(updatedMindMaps);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <div className="container px-4 mx-auto">
        <div className="text-start">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl md:text-4xl font-medium my-2">
                私のマインドマップ
              </h3>
            </div>
            <div className="px-10 py-2 rounded-md bg-red-600">
              <Link href="/api/auth/logout" className="text-white">
                Logout
              </Link>
            </div>
          </div>
          <div className="flex py-4">
            <div
              className="bg-blue-900 text-white px-6 p-2 rounded-md cursor-pointer"
              onClick={handleAddMindMap}
            >
              新しく追加する
            </div>
          </div>
          <div className="px-4">
            <div className="flex items-center py-2">
              <span className="w-1/6 text-center">
                <input type="checkbox" />
              </span>
              <span className="w-1/2">
                <span className="text-lg uppercase text-gray-600 font-bold">
                  名前
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-lg uppercase text-gray-600 font-bold">
                  時間を作る
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-lg uppercase text-gray-600 font-bold">
                  高度
                </span>
              </span>
            </div>
            {mindMaps.map((map) => (
              <div
                key={map?.id ?? "defaultId"}
                className="hover:bg-gray-200 cursor-pointer bg-white shadow flex items-center mb-5 rounded-lg"
              >
                <span className="w-1/6 text-center">
                  <input type="checkbox" />
                </span>
                <span className="w-1/2">
                  <Link href={`/MindMap/${map.id}`}>
                    <div className="flex items-center ml-4">
                      <div>
                        <span className="capitalize block text-gray-800">
                          {map?.name ?? "MindMap Không Có Tên"}
                        </span>
                        <span className="text-sm block text-gray-600">
                          {map?.description ?? "Chưa có mô tả"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </span>
                <span className="w-1/4">
                  <span className="text-gray-600 text-sm">
                    {map?.createdAt ?? "N/A"}
                  </span>
                </span>
                <span className="w-1/4 flex">
                  <Link href={`/MindMap/${map.id}`}>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-gray-600 text-sm px-2 cursor-pointer"
                      />
                    </div>
                  </Link>
                  <div
                    className="flex items-center"
                    onClick={() => handleDeleteMindMap(map.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-gray-600 text-sm px-2 cursor-pointer"
                    />
                  </div>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="flex text-center justify-center m-5 text-gray-600 font-semibold text-lg">
        Vui Lòng Đăng Nhập Để Vào MindMap{" "}
      </h1>
      <h1 className="flex text-center justify-center m-5 text-gray-600 font-semibold text-lg">
        ログインしてマインドマップにアクセス
      </h1>
    </div>
  );
};

export default Login;
