import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBolt, faCode, faWrench } from "@fortawesome/free-solid-svg-icons";
const Feature = () => {
  return (
    <div className="feature-1 py-6 md:py-12">
      <div className="container px-4 mx-auto">
        <div className="flex mx-4">
          <div className="px-4 text-center md:w-10/12 xl:w-8/12 mx-auto">
            <h1 className="mb-4 text-4xl font-medium">Features</h1>
            <p className="mb-4 text-xl">
              The main aim of creating FWR blocks is to help designers,
              developers and agencies create websites and web apps quickly and
              easily. Each and every block uses minimal custom styling and is
              based on the utility first Tailwind framework.
            </p>
            <button className="border-2 border-solid border-indigo-600 rounded py-2 px-12 text-xl text-indigo-600 hover:bg-indigo-600 hover:text-white mt-4 transition-color duration-300">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:flex md:mx-4 mt-12 md:pt-4">
          <div className="px-4 md:w-1/3 mt-6 md:mt-0">
            <div className="feature-box text-center p-4 md:p-6 max-w-sm mx-auto border-2 border-solid border-gray-300 rounded md:h-full">
              <div className="text-xl p-4 w-16 h-16 mx-auto">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <h5 className="text-xl font-medium mb-4">Fresh Design</h5>
              <p className="text-gray-600 mb-3">
                FWR blocks bring in an air of fresh design with their creative
                layouts and blocks, which are easily customizable.
              </p>
            </div>
          </div>
          <div className="px-4 md:w-1/3 mt-6 md:mt-0">
            <div className="feature-box text-center p-4 md:p-6 max-w-sm mx-auto border-2 border-solid border-gray-300 rounded md:h-full">
              <div className="text-xl p-4 w-16 h-16 mx-auto">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <h5 className="text-xl font-medium mb-4">Fresh Design</h5>
              <p className="text-gray-600 mb-3">
                FWR blocks bring in an air of fresh design with their creative
                layouts and blocks, which are easily customizable.
              </p>
            </div>
          </div>
          <div className="px-4 md:w-1/3 mt-6 md:mt-0">
            <div className="feature-box text-center p-4 md:p-6 max-w-sm mx-auto border-2 border-solid border-gray-300 rounded md:h-full">
              <div className="text-xl p-4 w-16 h-16 mx-auto">
                <FontAwesomeIcon icon={faWrench} />
              </div>
              <h5 className="text-xl font-medium mb-4">Fresh Design</h5>
              <p className="text-gray-600 mb-3">
                FWR blocks bring in an air of fresh design with their creative
                layouts and blocks, which are easily customizable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
