// import { Children, createContext, ReactNode, useContext } from "react";
// import { useAppwrite } from "./useAppwrite";
// import { getCurrentUser } from "./appwrite";

// interface User {
//     $id: string;
//     name: string;
//     email: string;
//     avatar: string;
// }

// interface GlobalContextType {
//     isLoggedIn?: boolean;
//     user: User | null;
//     loading: boolean;
//     refetch: (newParams?: Record<string, string | number>) => Promise<void>;
// }

// const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// const GlobalProvider: React.FC<{ Children: ReactNode }> = ({ Children }) => {
//     const {
//         data: user,
//         loading,
//         refetch
//     } = useAppwrite({ fn: getCurrentUser });
//     const isLoggedIn = !!user;
//     console.log(JSON.stringify(user, null, 2));

//     return (
//         <GlobalContext.Provider value={{
//             isLoggedIn,
//             user,
//             loading,
//             refetch,
//         }}>
//             {Children}
//         </GlobalContext.Provider>
//     );
// };

// export const useGlobalContext = (): GlobalContextType => {
//     const context = useContext(GlobalContext);

//     if (!context) {
//         throw new Error("useGlobalContext must be used within a GlobalProvider");
//     }
//     return context;
// };

// export default GlobalProvider


// import { Children, createContext, ReactNode, useContext } from "react";
// import { useAppwrite } from "./useAppwrite";
// import {getCurrentUser} from "./appwrite"
// import React from "react";

// interface User {
//     $id: string;
//     name: string;
//     email: string;
//     avatar: string; 
// }

// // Define the GlobalContextType interface
// interface GlobalContextType {
//     // Add your context properties here
//     isLoggedIn?: boolean; // Example property
//     // ... other properties
//     user:User | null;
//     loading: boolean;
//     refetch:(newParams?: Record<string,string | number>)=> Promise<void>;
// }

// const GlobalContext = createContext<GlobalContextType | undefined>(undefined); // Initialize with undefined

// export const GlobalProvider = ({Children}:{Children:ReactNode})=>{
    
//     const {
//         data : user,
//         loading,
//         refetch
//     } = useAppwrite({
//         fn: getCurrentUser,
//         params: {},
//         skip: false,
//     });
//     const isLoggedIn = !!user
//     console.log(JSON.stringify(user,null,2))
//     return (<GlobalContext.Provider value={{
//         isLoggedIn,
//         user ,
//         loading,
//         refetch,
//         // Add your context methods here
//         //... other methods
//     }}>
//         {Children}
//     </GlobalContext.Provider>)
// }

// export const useGlobalContext = (): GlobalContextType => {
//     const context = useContext(GlobalContext);
//     if(!context){
//         throw new Error("useGlobalContext must be used within a GlobalProvider")
//     }
//     return context;
// }

// export default GlobalProvider// 
import React, { createContext, useContext, ReactNode } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";


interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch:(newParams?: Record<string,string | number>)=> Promise<void>;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });
//   console.log(JSON.stringify(user,null,2))
  const isLogged = !!user;

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context){
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
