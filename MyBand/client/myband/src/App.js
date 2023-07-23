import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager"
import { me } from "./modules/authManager"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);


  // useEffect(() => {
  //   if (isLoggedIn) {
  //     me().then(setUserProfile);
  //   } else {
  //     setUserProfile(null);
  //   }
  // }, [isLoggedIn]);


  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>

      <ApplicationViews isLoggedIn={isLoggedIn} profile={userProfile} />
    </Router>
  );
}


export default App;
