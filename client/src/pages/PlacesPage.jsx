import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text){
    return(
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }

  function inputDescription(text){
    return(
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }

  function preInput(header, description){
    return (
      <div>
       {inputHeader(header)}
       {inputDescription(description)}
      </div>
    );
  }

  async function addPhotoByLink(ev){
    ev.preventDefault();
    const {data:filename} =  await axios.post('/upload-by-link', {link:photoLink});
    setAddedPhotos(prev => {
      return [...prev, filename];
    });
    setPhotoLink('')
  }

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
          <p className="text-gray-500 text-sm">
            Title for your place. Should be short and catchy like an
            advertisement.
          </p>
          <input
            type="text"
            placeholder="e.g., My Lovely Apartment"
            className="input-field"
          />

          <h2 className="text-2xl mt-6 font-semibold">Address</h2>
          <p className="text-gray-500 text-sm">Address of your place.</p>
          <input type="text" placeholder="Address" className="input-field" />

          <h2 className="text-2xl mt-6 font-semibold">Photos</h2>
          <p className="text-gray-500 text-sm">
            Upload photos to showcase your place.
          </p>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add using a link ... .jpg"
              className="input-field"
            />
            <button className="bg-gray-200 px-4 py-2 rounded-xl text-sm">
              Add photo
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {/* Placeholder for uploaded photos */}
            <div className="border border-gray-300 rounded-xl p-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                />
              </svg>
              <span className="ml-2 text-gray-600">Upload</span>
            </div>
          </div>
          <h2 className="text-2xl mt-4">Description</h2>
          <p className="text-gray-500 text-sm">description of the place</p>
          <textarea className="" />
          <h2 className="text-2xl mt-4">Perks</h2>
          <p className="text-gray-500 text-sm">
            select all the perks of your place
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
              <input type="checkbox" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                />
              </svg>
              <span>Wifi</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
              <input type="checkbox" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>

              <span>Free parking spot</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
              <input type="checkbox" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>

              <span>TV</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
              <input type="checkbox" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>

              <span>Pets</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
              <input type="checkbox" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>

              <span>Radio</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer mt-2">
              <input type="checkbox" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              <span>Private entrances</span>
            </label>
          </div>
          <h2 className="text-2xl mt-4">Extra info</h2>
          <p className="tex-gray-500 text-sm">house rules, etc</p>
          <textarea />
          <h2 className="text-2xl mt-4">Check in&out times, max guests</h2>
          <p className="tex-gray-500 text-sm">add check in and out time, remainder to close lights and doors</p>
          <div className="grid gap-2 sm:grid-cols-3">
          <div>
          <h3>Check in time</h3>
          <input type="text" placeholder="14:00" />
          </div>
          <div>
          <h3>Check out time</h3>
          <input type="text" />
          </div>
          <div>

          <h3></h3>
          <input type="text"/>
          </div>
          </div>
          <div>
            <button className="primary my-4">Save</button>
          </div>
          </form>
        )}
    </div>
  );
}
