import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { createEvent } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";

function CreateEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const artistInput = useRef(null);
  const [error, setError] = useState({});
  const [artists, setArtists] = useState([]);
  const [input, setInput] = useState({
    description: "",
    price: 0,
    date: "",
    artist: [],
    place: "",
    stock: 0,
    category: [],
  });

  function validation(input) {
    let errors = {};
    if (input.description.length < 20) {
      errors.description = "Minium 20 characters";
    }
    if (input.description.length > 255) {
      errors.description = "Max 255 characters";
    }
    if (!Date.parse(input.date)) {
      errors.date = "Date of release is required";
    }
    if (!input.artist) {
      errors.artist = "artist is required";
    }
    if (!input.price) {
      errors.price = "price is required";
    }
    if (!input.stock) {
      errors.stock = "stock is required";
    }
    if (!input.place) {
      errors.place = "place is required";
    }
    if (!input.category.length) {
      errors.category = "Select at least a one or five genres ";
    }
    return errors;
  }

  function handleArtistDelete(e) {
    e.preventDefault();
    const { value } = e.target;
    const artistId = artists.filter((artist) => artist === value);
    if (value && artists.includes(value)) {
      const newArtists = artists.filter((artist) => artist !== value);
      const newArtistInput = input.artist.filter(
        (artist) => artist !== artistId[0].name
      );
      setArtists(newArtists);
    }
  }

  function handleArtist(e) {
    e.preventDefault();
    setArtists([...artists, artistInput.current.value]);
    setInput({ ...input, artist: [] });
  }

  function handleInputArtist(e) {
    setInput({
      ...input,
      artist: artists,
    });
    setError(
      validation({
        ...input,
        artist: artists,
      })
    );
  }

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleInputPrice(e) {
    setInput({
      ...input,
      price: Number(e.target.value),
    });
    setError(
      validation({
        ...input,
        price: [e.target.value],
      })
    );
  }

  function handleInputStock(e) {
    setInput({
      ...input,
      stock: Number(e.target.value),
    });
    setError(
      validation({
        ...input,
        stock: [e.target.value],
      })
    );
  }

  const handleSelectCategory = (e) => {
    setInput({
      ...input,
      category: [...new Set([...input.category, e.target.value])],
    });
    setError(
      validation({
        ...input,
        category: [...input.category, e.target.value],
      })
    );
  };

  const handleSelectPlace = (e) => {
    const { value } = e.target;
    setInput({
      ...input,
      place: value,
    });
    setError(
      validation({
        ...input,
        place: value,
      })
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    setInput({
      ...input,
      artist: [...input.artist, artists],
    });
    dispatch(createEvent(input));
    setError(validation(input));
    setInput({
      description: "",
      price: 0,
      date: "",
      artist: [],
      place: "",
      stock: 0,
      category: [],
    });
    navigate("/");
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your Event
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    onChange={(e) => handleInputChange(e)}
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Description..."
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {error.description && <p> ❌{error.description}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Artist
                </label>
                <div className="mt-1 flex">
                  <input
                    ref={artistInput}
                    onChange={(e) => handleInputArtist(e)}
                    id="artist"
                    name="artist"
                    type="text"
                    placeholder="Artist..."
                    autoComplete="current-Artist"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <button onClick={(e) => handleArtist(e)} className="m-2">
                    <PlusCircleIcon className="h-5 w-5 text-green-800 text-right" />
                  </button>
                </div>
                {error.artist && <p> ❌{error.artist}</p>}
                {artists.length
                  ? artists.map((artist) => {
                      return (
                        <div key={artist}>
                          {artist}
                          <button
                            type="button"
                            value={artist}
                            onClick={(e) => handleArtistDelete(e)}
                          >
                            X
                          </button>
                        </div>
                      );
                    })
                  : null}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Place
                </label>
                <div className="mt-1">
                  <select
                    onChange={(e) => handleSelectPlace(e)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option default value="">
                      Please select a place
                    </option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Venezuela">Venezuela</option>
                  </select>
                </div>
                {error.place && <p> ❌{error.place}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="mt-1">
                  <select
                    onChange={(e) => handleSelectCategory(e)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option default value="">
                      Please select a category
                    </option>
                    <option value="Musica">Musica</option>
                    <option value="Desfile">Desfile</option>
                    <option value="Espectaculo">Espectaculo</option>
                    <option value="Convenciones">Convenciones</option>
                  </select>
                </div>
                {error.category && <p> ❌{error.category}</p>}
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => handleInputPrice(e)}
                    id="price"
                    name="price"
                    type="price"
                    placeholder="$..."
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {error.price && <p> ❌{error.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => handleInputStock(e)}
                    id="stock"
                    name="stock"
                    type="stock"
                    placeholder="Stock..."
                    autoComplete="current-Stock"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {error.stock && <p> ❌{error.stock}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => handleInputChange(e)}
                    id="date"
                    type="date"
                    name="date"
                    autoComplete="current-Date"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {error.date && <p> ❌{error.date}</p>}
              </div>
              <button
                type="submit"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-indigo-400"
              >
                Create
              </button>
            </form>
            <div className="mt-4">
              <a
                href="/"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-center"
              >
                <input type="button" value="Go Back" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
