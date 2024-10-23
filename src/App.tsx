

// // App.tsx
// import { useEffect, useState } from 'react';
// import { Route, Routes, useLocation, } from 'react-router-dom';
// import Loader from './common/Loader';
// import SignIn from './pages/Authentication/SignIn';
// import Main from './pages/Main';
// import Forgetpassword from './pages/Forgetpassword';
// import { AuthProvider } from './AuthContext'; // Import the AuthProvider

// import Cookies from 'js-cookie';

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const { pathname } = useLocation();
  

// const token =  Cookies.get("userToken");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <AuthProvider> {/* Wrap the Routes with AuthProvider */}
//       <Routes>
//       { !token ? 
//       ( <Route path="/" element={<SignIn />} />) 
//       : (
//         <Route path="/forget-password" element={<Forgetpassword />} />
//         <Route path="/dashboard/*" element={<Main />} />
//         )}
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;


// // App.tsx
// import { useEffect, useState } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import Loader from './common/Loader';
// import SignIn from './pages/Authentication/SignIn.jsx';
// import Main from './pages/Main';
// import Forgetpassword from './pages/Forgetpassword';
// import { AuthProvider } from './AuthContext'; // Import the AuthProvider
// import Cookies from 'js-cookie';

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const { pathname } = useLocation();
  
//   const token = Cookies.get("userToken");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <AuthProvider> {/* Wrap the Routes with AuthProvider */}
//      <>
//            {token ? (
//       <Routes>
//             <>
//             <Route path="/forget-password" element={<Forgetpassword />} />
//             <Route path="/dashboard/*" element={<Main />} />
//             </>
//         ) : (
//           <>
//           <Route path="/" element={<SignIn />} />
//           </>
     
//       </Routes>
//       )}
//       </>
         
//     </AuthProvider>
//   );
// }

// export default App;

// // App.tsx
// import { useEffect, useState } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import Loader from './common/Loader';
// import SignIn from './pages/Authentication/SignIn';
// import Main from './pages/Main';
// import Forgetpassword from './pages/Forgetpassword';
// import { AuthProvider } from './AuthContext'; // Import the AuthProvider
// import Cookies from 'js-cookie';

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const { pathname } = useLocation();

//   const token = Cookies.get("userToken");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <AuthProvider> {/* Wrap the Routes with AuthProvider */}
//       <Routes>
//         {!token ? (
//           <Route path="/" element={<SignIn />} />
//         ) : (
//           <>
//             <Route path="/forget-password" element={<Forgetpassword />} />
//             <Route path="/dashboard/*" element={<Main />} />
//             {/* Add a catch-all route for unmatched paths */}
//             <Route path="*" element={<SignIn />} /> {/* Redirect to SignIn if no match */}
//           </>
//         )}
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;




// import { useEffect, useState } from 'react';
// import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
// import Loader from './common/Loader';
// import SignIn from './pages/Authentication/SignIn';
// import Main from './pages/Main';
// import Forgetpassword from './pages/Forgetpassword';
// import { AuthProvider } from './AuthContext'; // Import the AuthProvider
// import Cookies from 'js-cookie';

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const { pathname } = useLocation();

//   const token = Cookies.get("userToken");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   // If not loading and no token, redirect to SignIn
//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <AuthProvider>
//       <Routes>
//         {!token ? (
//           <Route path="/" element={<SignIn />} />
//         ) : (
//           <>
//             <Route path="/forget-password" element={<Forgetpassword />} />
//             {/* Match /dashboard and its sub-routes */}
//             <Route path="/dashboard" element={<Main />} />
//             {/* Redirect any unmatched paths */}
//             {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
//           </>
//         )}
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;






import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import Main from './pages/Main';
import Forgetpassword from './pages/Forgetpassword';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import Cookies from 'js-cookie';
import {LoaderProvider} from './pages/GlobalContext'

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const token = Cookies.get("userToken");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // If loading, show Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <LoaderProvider>
      <Routes>
        {/* If no token, redirect to SignIn */}
        {!token ? (
          <>
            <Route path="/" element={<SignIn />} />
            <Route path="/forget-password" element={<Forgetpassword />} />
            {/* Redirect any unmatched paths to SignIn */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            {/* Protected routes */}
            <Route path="/forget-password" element={<Forgetpassword />} />
            <Route path="/dashboard/*" element={<Main />} />
            {/* Redirect any unmatched paths to the dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
