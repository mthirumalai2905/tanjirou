import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();

  return (
    <div className="max-w-md mx-auto mt-8">
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-primary inline-flex items-center gap-1 text-white py-2 px-6 mt-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <form className="mt-6">
          <h2 className="text-2xl font-semibold">Title</h2>
          <p className="text-gray-500 text-sm">Title for your place. Should be short and catchy like an advertisement.</p>
          <input type='text' placeholder='e.g., My Lovely Apartment' className="input-field" />

          <h2 className="text-2xl mt-6 font-semibold">Address</h2>
          <p className="text-gray-500 text-sm">Address of your place.</p>
          <input type="text" placeholder="Address" className="input-field" />

          <h2 className="text-2xl mt-6 font-semibold">Photos</h2>
          <p className="text-gray-500 text-sm">Upload photos to showcase your place.</p>
          <div className="flex gap-2 mt-2">
            <input type="text" placeholder="Add using a link ... .jpg" className="input-field" />
            <button className="bg-gray-200 px-4 py-2 rounded-xl text-sm">Add photo</button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {/* Placeholder for uploaded photos */}
            <div className="border border-gray-300 rounded-xl p-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
              </svg>
              <span className="ml-2 text-gray-600">Upload</span>
            </div>
          </div>
          <h2 className="text-2xl mt-4">Description</h2>
          <p className="text-gray-500 text-sm">description of the place</p>
          <textarea className="" />
        </form>
      )}
    </div>
  );
}
