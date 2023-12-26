import Image from "next/image";

const Home = () => {
  return (
    <div className="bg-indigo-100 py-6 md:py-12">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium mb-2">
            Study effectively with mind maps
          </h1>
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-full text-xl mt-6">
            Free to use
          </button>
          <div className="mt-4">
            <Image
              src="https://images.unsplash.com/photo-1496112576525-8b31e9ce4872?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={100}
              height={100}
              layout="responsive"
              alt="MindMap" 
            />
          </div>
        </div>
        <div className="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12">
          <div className="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
            <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
            <h5 className="text-xl font-medium uppercase mb-4">Easy to use</h5>
            <p className="text-gray-600">
              FWR blocks bring in an air of fresh design with their creative
              layouts and blocks, which are easily customizable
            </p>
          </div>
          <div className="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
            <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
            <h5 className="text-xl font-medium uppercase mb-4">
              UnLimited
            </h5>
            <p className="text-gray-600">
              FWR blocks bring in an air of fresh design with their creative
              layouts and blocks, which are easily customizable
            </p>
          </div>
          <div className="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
            <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
            <h5 className="text-xl font-medium uppercase mb-4">
              Manage and share
            </h5>
            <p className="text-gray-600">
              FWR blocks bring in an air of fresh design with their creative
              layouts and blocks, which are easily customizable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
