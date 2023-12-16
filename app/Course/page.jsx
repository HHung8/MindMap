import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {} from "@fortawesome/free-brands-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const Course = () => {
  return (
    <div className="max-w-6xl mx-auto pt-10 pb-36 px-8">
      <div className="max-w-md mx-auto mb-14 text-center">
        <h1 className="text-4xl font-semibold mb-6 lg:text-5xl">
          <span className="text-indigo-600">Flexible</span> Plans
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          Choose a plan that works best for you and your team.
        </p>
      </div>
      <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
        <div className="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none">
          <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
            <Image
              src="https://images.unsplash.com/photo-1613408181923-f058a1b0e00c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGdyZWVufGVufDB8fDB8fHww"
              width={50}
              height={50}
              alt="img"
              className="rounded-3xl w-20 h-20"
            />
            <div className="ml-5">
              <span className="block text-2xl font-semibold">Basic</span>
              <span>
                <span className="font-medium text-gray-500 text-xl align-top">
                  $
                </span>
                <span className="text-3xl font-bold">10</span>
              </span>
              <span className="text-gray-500 font-medium">/user</span>
            </div>
          </div>
          <ul className="mb-7 font-medium text-gray-500">
            <li className="flex text-lg mb-2">
              <FontAwesomeIcon icon={faCheck} style={{ width: "14px" }} />
              <span className="ml-3">
                Get started with <span className="text-black">messaging</span>
              </span>
            </li>
            <li className="flex text-lg mb-2">
              <FontAwesomeIcon icon={faCheck} style={{ width: "14px" }} />
              <span className="ml-3">
                Flexible<span className="text-black"> team meetings</span>
              </span>
            </li>
            <li className="flex text-lg mb-2">
              <FontAwesomeIcon icon={faCheck} style={{ width: "14px" }} />
              <span className="ml-3">
                <span className="text-black">5TB</span> cloud storage
              </span>
            </li>
          </ul>
          <a
            href="#/"
            className="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl"
          >
            Chose Plan
          </a>
        </div>
        <div className="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
          <div className="mb-8 pb-8 flex items-center border-b border-gray-600">
            <Image
              src="https://images.unsplash.com/photo-1548504773-429e84f586d2?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={50}
              height={50}
              alt="img"
              className="rounded-3xl w-20 h-20"
            />
            <div className="ml-5">
              <span className="block text-2xl font-semibold">Startup</span>
              <span>
                <span className="font-medium text-xl align-top">$</span>
                <span className="text-3xl font-bold text-white">24</span>
              </span>
              <span className="font-medium">/user</span>
            </div>
          </div>
          <ul className="mb-10 font-medium text-xl">
            <li className="flex mb-6">
              <FontAwesomeIcon icon={faCheck} style={{ width: "14px" }} />
              <span className="ml-3">
                All features in <span className="text-white">Basic</span>
              </span>
            </li>
            <li className="flex mb-6">
              <FontAwesomeIcon icon={faCheck} style={{ width: "14px" }} />
              <span className="ml-3">
                Flexible<span className="text-white">call scheduling</span>
              </span>
            </li>
            <li className="flex text-lg mb-2">
              <FontAwesomeIcon icon={faCheck} style={{ width: "14px" }} />
              <span className="ml-3">
                <span className="text-white">15TB</span> cloud storage
              </span>
            </li>
          </ul>
          <a
            href="#/"
            className="flex justify-center items-center bg-indigo-600 rounded-xl py-6 px-4 text-center text-white text-xl text-2xl"
          >
            Chose Plan
          </a>
        </div>
        <div className="w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3 lg:order-l-none">
          <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
            <Image
              src="https://images.unsplash.com/photo-1523633589114-88eaf4b4f1a8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ymx1ZXxlbnwwfHwwfHx8MA%3D%3D"
              width={50}
              height={50}
              alt="img"
              className="rounded-3xl w-20 h-20"
            />
            <div className="ml-5">
              <span className="block text-2xl font-semibold">Enterprise</span>
              <span>
                <span className="font-medium text-gray-500 text-xl align-top">
                  $
                </span>
                <span className="text-3xl font-bold">35</span>
              </span>
              <span className="text-gray-500 font-medium">/user</span>
            </div>
          </div>
          <ul className="mb-7 font-medium text-gray-500">
            <li className="flex text-lg mb-2">
              <FontAwesomeIcon icon={faCheck} style={{ width: "14px" }} />
              <span className="ml-3">
                All features in <span className="text-black">Startup</span>
              </span>
            </li>
            <li className="flex text-lg mb-2">
              <FontAwesomeIcon icon={faCheck} style={{ width: "14px" }} />
              <span className="ml-3">
                Growth<span className="text-black"> oriented</span>
              </span>
            </li>
            <li className="flex text-lg mb-2">
              <FontAwesomeIcon icon={faCheck} style={{ width: "14px" }} />
              <span className="ml-3">
                <span className="text-black">Unlimited</span> cloud storage
              </span>
            </li>
          </ul>
          <a
            href="#/"
            className="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl"
          >
            Chose Plan
          </a>
        </div>
      </div>
    </div>
  );
};

export default Course;
