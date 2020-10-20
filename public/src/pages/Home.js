import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { selectCareTaker } from "../redux/slices/careTakerSlice";
import { selectPetOwner } from "../redux/slices/petOwnerSlice";

export default function Home() {
  const user = useSelector(selectUser);
  const petowner = useSelector(selectPetOwner);
  const caretaker = useSelector(selectCareTaker);
  if (user) {
    console.log(user.username);
    console.log(user.type);
    console.log(user);
    return (
      <div>
        <h1>
          Welcome {user.username}. You are a {user.type}.
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <br></br>
        <h1>Please Login. Create an account with us if you haven't!</h1>
      </div>
    );
  }
  // if (petowner && caretaker) {
  //   return (
  //     <div>
  //       <h1>
  //         Welcome {petowner.username}. You are registered as both a petowner and a
  //         caretaker. Would you like to be a parttime caretaker or fulltime
  //         caretaker?
  //       </h1>
  //     </div>
  //   );
  // } else if (petowner) {
  //   return (
  //     <div>
  //       <h1>Welcome {user.username}. You are registered as a petowner.</h1>
  //     </div>
  //   );
  // } else if (caretaker) {
  //   return (
  //     <div>
  //       <h1>
  //         Welcome {caretaker.username}. You are registered as a caretaker. Would
  //         you like to be a parttime caretaker or fulltime caretaker?
  //       </h1>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <br></br>
  //       <h1>Please Login. Create an account with us if you haven't!</h1>
  //     </div>
  //   );
  // }
}
