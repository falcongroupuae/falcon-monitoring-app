import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center justify-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-9xl text-red-700 font-dark font-extrabold mb-8">
            {" "}
            404
          </div>
          <p className="text-2xl md:text-3xl font-semibold leading-normal mb-8">
            Sorry we couldn't find the page you're looking for
          </p>

          <Link
            to="/"
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Go Back Home
          </Link>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            className=""
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
}
