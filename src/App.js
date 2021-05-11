import React, { useEffect } from "react";
import { useState } from "react";
import RouteMain from "./routes/routeMain/routeMain";
import RouteLogin from "./routes/routeLogin/routeLogin";
import authCheckUser from "./service/auth/authCheckUser";

function App() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    authCheckUser(setLogin);
  }, [setLogin]);
  
  return (
    <>
    {console.log('app')}
      {isLogin === true ? (
        <RouteMain setLogin={setLogin} />
      ) : (
        <RouteLogin setLogin={setLogin} />
      )}
    </>
  );
}

export default App;
