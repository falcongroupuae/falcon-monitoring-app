import { Link } from "react-router-dom";
import notFound from "/src/assets/images/404.jpeg";

export default function NotFound() {
  return (
    <>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{ backgroundImage: `url(${notFound})` }}
          >
            <div className="flex items-center h-full px-20 bg-black/0">
              <div>
                {/* <div className="text-9xl text-white font-dark font-extrabold mb-8">
                  {" "}
                  404
                  <p className="text-2xl md:text-3xl font-semibold leading-normal mb-8">
                    Sorry we couldn't find the page you're looking for
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex items-center flex-col justify-center">
                  <img
                    src="/falcon-logo.png"
                    alt="Falcon Icon"
                    className="w-32 object-contain flex-shrink-0"
                  />

                  <div className="mt-8">
                    <Link
                      to="/"
                      className="px-6 py-3 text-black rounded"
                    >
                      Go Back Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
