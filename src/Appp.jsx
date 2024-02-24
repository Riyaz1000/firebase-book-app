import Header from "./components/TheHeader";

// import Input from "./components/Inputs";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function Appp() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [genre, setGenre] = useState("");
  const [donar, setDonar] = useState("");
  const [textarea, setTextarea] = useState("");

  const [show, setShow] = useState(false);

  const [val, setVal] = useState([]);

  const value = collection(db, "books");

  const handleSubmit = async () => {
    await addDoc(value, {
      author: author,
      title: title,
      genre: genre,
      donar: donar,
      textarea: textarea,
    });
    const dbVal = await getDocs(value);
    setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    alert(`Thanks For 📖 Donation ${donar} ✅`);
  };

  useEffect(() => {
    console.log("Effect is running...");
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  //delete
  //   const handleDelete = async (id) => {
  //     const deleteValue = doc(db, "books", id);
  //     await deleteDoc(deleteValue);
  //   };

  const handleDelete = async (id) => {
    try {
      const deleteValue = doc(db, "books", id);
      await deleteDoc(deleteValue);

      // Update the state after successful deletion
      setVal((prevVal) => prevVal.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  //edit
  const handleEdit = async (id, author, title, genre, donar, textarea) => {
    setAuthor(author);
    setTitle(title);
    setId(id);
    setGenre(genre);
    setDonar(donar);
    setShow(true);
    setTextarea(textarea);
  };

  //update
  const handleUpdate = async () => {
    const updateData = doc(db, "books", id);
    await updateDoc(updateData, {
      author: author,
      title: title,
      genre: genre,
      donar: donar,
      textarea: textarea,
    });
    setShow(false);
    setAuthor("");
    setTitle("");
    setGenre("");
    setTextarea("");
  };

  return (
    <div className="h-[1500px] bg-gray-300">
      <Header />

      <div className="sm:flex">
        <div className="bg-yellow-200 sm:h-[600px] h-[500px] sm:w-[555px] w-[300px] sm:ml-20 ml-3 mt-3 rounded-md shadow-gray-400  ">
          <button className="font-0 bg-orange-500 rounded font-bold text-gray-100 sm:text-lg text-xs sm:px-2 px-2 sm:py-0.5 py-1.5 mt-5 ml-[90px] sm:ml-[180px]  ">
            Donate Your Books
          </button>
          <label htmlFor="auth" className="font-0 sm:ml-14 ml-6 mt-4 flex">
            Author Name :
          </label>
          <input
            type="text"
            id="auth"
            value={author}
            placeholder="William Shakespeare"
            onChange={(e) => setAuthor(e.target.value)}
            // className="mx-5 py-3"
            className="outline-none rounded-lg border border-gray-300 shadow-md sm:px-5 px-2 sm:w-[450px] w-[270px] sm:py-1.5 py-0 mt-1 sm:ml-12 ml-3"
          />
          <br />
          <label htmlFor="tit" className="font-0 sm:ml-14 ml-6 mt-4 flex">
            Book Title :
          </label>
          <input
            type="text"
            id="tit"
            value={title}
            placeholder="War and Peace"
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none rounded-lg border border-gray-300 shadow-md sm:px-5 px-2 sm:w-[450px] w-[270px] sm:py-1.5 py-0 mt-1 sm:ml-12 ml-3"
          />
          {/* //genre */}
          <label htmlFor="genre" className="font-0 sm:ml-14 ml-6 mt-4 flex">
            Book Genre :
          </label>
          <input
            type="text"
            id="genre"
            value={genre}
            placeholder="Novel"
            onChange={(e) => setGenre(e.target.value)}
            className="outline-none rounded-lg border border-gray-300 shadow-md sm:px-5 px-2 sm:w-[450px] w-[270px] sm:py-1.5 py-0 mt-1 sm:ml-12 ml-3"
          />
          {/* donar */}
          <label htmlFor="donar" className="font-0 sm:ml-14 ml-6 mt-4 flex">
            Donar Name :
          </label>
          <input
            type="text"
            id="donar"
            value={donar}
            placeholder="Your Name"
            onChange={(e) => setDonar(e.target.value)}
            className="outline-none rounded-lg border border-gray-300 shadow-md sm:px-5 px-2 sm:w-[450px] w-[270px] sm:py-1.5 py-0 mt-1 sm:ml-12 ml-3"
          />
          <label htmlFor="about" className="font-0 sm:ml-14 ml-6 mt-4 flex">
            About Book :
          </label>

          <textarea
            id="about"
            className="outline-none rounded-lg border border-gray-300 shadow-md  px-5 sm:h-[100px] h-20px sm:w-[450px] w-[270px] py-1.5 mt-1 sm:ml-12 ml-4"
            onChange={(e) => setTextarea(e.target.value)}
            placeholder="My fav book"
          ></textarea>

          {/* button */}
          <div className="mx-auto">
            {!show ? (
              <button
                className="sm:px-16 px-8 sm:py-2 py-0.5 mt-1  sm:ml-44 ml-2 mr-32  bg-green-300 hover:bg-green-500 rounded-lg font-0 font-semibold hover:text-gray-100 text-gray-600"
                onClick={handleSubmit}
              >
                Donate
              </button>
            ) : (
              <button
                className="px-16 py-2 mt-1 mb- ml-44 mr-32  bg-green-300 rounded-lg font-0 font-semibold text-gray-600"
                onClick={handleUpdate}
              >
                update
              </button>
            )}
          </div>
        </div>
        <div>
          <div>
            <button className="text-orange-600 bg-orange-300 font-honk font-semibold rounded-md sm:p-3  h-[90px]  sm:h-[150px] sm:mt-5 mt-3 sm:ml-12 m-1 text-lg sm:text-2xl  ">
              GIVING is not just about making a donation it is about making a
              difference
              <h1 className="bg-orange sm:text-2xl text-lg font-protest-revolution sm:text-white text-black mt-5">
                Book hold holds the{" "}
                <span className="text-yellow-800">power </span> to
                <span className="text-yellow-800"> inspire </span>,{" "}
                <span className="text-yellow-800">educate</span> and transform{" "}
                <br />
                {/* life Donating s book is like a passing torch of knowledge */}
              </h1>
            </button>
          </div>

          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/volunteer-group-donates-old-books-and-newspapers-to-poor-students-6673669-5604125.png"
            alt=""
            className="sm:ml-24 ml-2  sm:h-[500px] h-[300px] sm:w-[700px] w-[500px] sm:mt-0 mt-12 "
          />
        </div>
      </div>

      <div className="sm:grid grid-cols-3 ">
        {val.map((values) => (
          <div className="">
            <div className="bg-zinc-900 border border-white shadow-2xl  sm:m-4 m-1  mt-4 rounded-md sm:w-[450px] w-[300px] h-[250px]  ">
              <div className="flex ">
                <div className="p-6 ml-3 space-y-2 relative  text-sm">
                  <h1 className="text-red-400 font-0  ">
                    <span className="text-yellow-100">Author :</span>{" "}
                    <span className="text-yellow-100">{values.author}</span>
                  </h1>
                  <h1 className="text-yellow-100 font-0">
                    Title : {values.title}
                  </h1>
                  <h1 className="text-yellow-100 font-0 ">
                    Genre : {values.genre}
                  </h1>
                  <h1 className="text-yellow-100 font-0 ">
                    Donar : {values.donar}
                  </h1>
                  <h1 className="text-yellow-100 font-0  ">
                    About Book : {values.textarea}
                  </h1>
                </div>
                <div className="flex-shrink-0 overflow-hidden">
                  <img
                    src="https://www.shutterstock.com/image-vector/thanks-your-donations-quote-vector-600nw-1757454131.jpg"
                    alt=""
                    className="sm:h-24 h-12 sm:w-24 w-12 rounded-full mt-6 sm:ml-9 sm:mr-0 mr-5 text-white  "
                  />
                </div>
              </div>

              <button
                className="px-2 py-1 bg-blue-900 hover:bg-red-600 ml-9 font-0 rounded-lg "
                onClick={() => {
                  handleDelete(values.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-5 "
                >
                  <path
                    fill="#ffffff"
                    d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                  />
                </svg>
              </button>
              <button
                className="px-2 py-1 bg-blue-900 hover:bg-green-600  ml-9 font-0 rounded-lg"
                onClick={() => {
                  handleEdit(
                    values.id,
                    values.author,
                    values.title,
                    values.genre,
                    values.donar,
                    values.textarea
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-6 "
                >
                  <path
                    fill="#edeff2"
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appp;
