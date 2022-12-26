import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {
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
      </div>
    </section>
  );
};

export default Profile;
