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

function App() {
  // const { handleSubmit } = useForm();

  const [siNo, setsiNo] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  // const booksArray = [];

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const docRef = await addDoc(collection(db, "candidates"), data);
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  // const onclickButton = async () => {};

  // console.log("hi");

  // useEffect(() => {
  //   async function getDataFromFirebase() {
  //     const querySnapshot = await getDocs(collection(db, "cars"));
  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //     });

  //     if (querySnapshot.docs.length===0) {
  //       console.log("no record");

  //   }
  //   getDataFromFirebase();
  // }, []);

  // useEffect(() => {
  //   async function getDataFromFirebase() {
  //     const querySnapshot = await getDocs(collection(db, "cars"));

  //     if (querySnapshot.docs.length === 0) {
  //       console.log("no record");
  //     } else {
  //       querySnapshot.forEach((doc) => {
  //         console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  //       });
  //     }
  //   }

  //   getDataFromFirebase();
  // }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const book = { siNo: parseInt(siNo), author, title };
    await addDoc(collection(db, "books"), book);
    setsiNo("");
    setAuthor("");
    setTitle("");
    getDataFromFirebase();
  };

  const editBooks = async (siNo, author, title) => {
    await updateDoc(doc(db, "books", siNo), {
      siNo: parseInt(siNo),
      author,
      title,
    });
    getDataFromFirebase();
  };

  const deleteBooks = async (siNo) => {
    await deleteDoc(doc(db, "books", siNo));
    getDataFromFirebase();
  };

  useEffect(() => {
    async function getDataFromFirebase() {
      const querySnapshot = await getDocs(collection(db, "books"));
      // console.log(querySnapshot);

      if (querySnapshot.docs.length === 0) {
        console.log("no record");
      } else {
        // querySnapshot.forEach((doc) => {
        //   // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        //   books.push(doc.data());
        // });
        const newBooks = querySnapshot.docs.map((doc) => doc.data());
        setBooks(newBooks);
      }
    }
    getDataFromFirebase();
  }, []);

  // const getBooks = async () => {
  //   const query = query(collection(db, "books"));
  //   const querySnapshot = await getDocs(query);
  //   let books = [];
  //   querySnapshot.forEach((doc) => {
  //     books.push({ ...doc.data, id: doc.id });
  //     setBooks(books);
  //   });
  // };

  return (
    <div className="min-h-screen bg-gray-500">
      <Header />
      {/* <form onSubmit={handleSubmit()}>
        <div className="bg-yellow-200 h-[400px] w-[440px] mx-auto mt-6 rounded-md">
          <h1 className="font-0 font-bold text-gray-700 text-lg p-5 ml-[125px]  ">
            List Your Books
          </h1>

          <Input
            placeholder={"Enter SI . NO"}
            label={"Enter SI.NO"}
            htmlFor={"inputSiNo"}
            id={"inputSiNo"}
            value={siNo}
            onChange={(e) => setsiNo(e.target.value)}
            className={"outline-none rounded px-9 py-1.5 ml-9"}
          />
          <Input
            placeholder={"Enter Author Name"}
            label={"Author Name"}
            htmlFor={"inputAuthor"}
            id={"inputAuthor"}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={"outline-none rounded px-9 py-1.5 ml-2.5"}
          />
          <Input
            placeholder={"Enter Your Book Title"}
            label={"Book Title"}
            htmlFor={"bookTitle"}
            id={"bookTitle"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={"outline-none rounded px-9 py-1.5 ml-[47px]"}
          />
          <div>
            <button
              className="px-16 py-2 mt-12 mb-4 ml-32 mr-32  bg-green-300 rounded-lg font-0 font-semibold text-gray-600"
              onClick={onclickButton}
            >
              Submit
            </button>
          </div>
        </div>
      </form> */}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">SI-NO</label>
          <input
            type="number"
            id="name"
            value={siNo}
            onChange={(e) => setsiNo(e.target.value)}
          />

          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label htmlFor="author">title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="px-6 py-1 bg-red-400">submit</button>
        </div>
      </form>
      {/* <div>{booksArray}</div> */}
      <section key={""}>
        <div className="bg-white h-[190px] mx-auto mt-2 rounded w-[400px]">
          <p className="text-lg font-0 font-bold ml-[120px]">show books</p>

          {books.map((book) => (
            <div>
              <p className="text-xl font-0 font-bold ml-[120px]">{book.siNo}</p>
              <p className="text-xl font-0 font-bold ml-[120px]">
                {book.author}{" "}
              </p>
              <p className="text-xl font-0 font-bold ml-[120px]">
                {book.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4"
                >
                  <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                </svg>
              </p>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5"
                style={{ fill: book.favourite ? "red" : "currentColor" }}
              >
                <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
              </svg>
              <button
                className="px-8 py-2 bg-red-400"
                onClick={() =>
                  editBooks(
                    book.siNo,
                    prompt("Enter Author Name", book.author),
                    prompt("Enter Book Title", book.title)
                  )
                }
              >
                edit
              </button>
              <button
                className="px-8 py-2 bg-green-400"
                onClick={() => deleteBooks(book.siNo)}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
