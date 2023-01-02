import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { async } from "@firebase/util";
import ListingItem from "../components/ListingItem";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeDetail, setChangeDetail] = useState(false);

  const { name, email } = formData;
  const onLogOut = () => {
    auth.signOut();
    navigate("/");
  };
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onsubmit() {
    try {
      // Update display name in firsbase auth
      if (auth.currentUser.displayName === !name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("could not update profile detail");
    }
  }

  useEffect(() => {
    async function fetchUserListing() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
        setListings(listings);
        setLoading(false);
      });
    }
    fetchUserListing();
  }, [auth.currentUser.uid]);

  return (
    <section className="max-w-6xl mx-auto flex flex-col justify-center items-center ">
      <h1 className="text-3xl mt-6 font-bold text-center">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-3 ">
        <form>
          {/*NAME INPUT*/}
          <input
            type="text"
            id="name"
            value={name}
            disabled={!changeDetail}
            onChange={onChange}
            className={`mb-6 width-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition ease-in-out rounded ${
              changeDetail && "bg-red-200 focus:bg-red-200"
            }`}
          />
          {/*Email input */}
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          />
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p className="flex items-center ">
              Do you want to change your name ?
              <span
                onClick={() => {
                  changeDetail && onsubmit();
                  setChangeDetail(() => (prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
              >
                {changeDetail ? "apply change" : "edit"}
              </span>
            </p>
            <p
              onClick={onLogOut}
              className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
            >
              Sign Out
            </p>
          </div>
        </form>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white uppercase font-medium text-sm px-7 py-3 rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
        >
          <Link
            to="/create-listing"
            className="flex justify-center items-center"
          >
            <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />{" "}
            Sell or rent your home
          </Link>
        </button>
        <div className="max-x-6xl px-3 mt-6 mx-auto">
          {!loading && listings.length > 0 && (
            <>
              <h2 className="text-2xl text-center font-semibold ">
                My Listings
              </h2>
              <ul>
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
