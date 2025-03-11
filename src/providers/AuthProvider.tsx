// // import { useAuthStore } from "@/stores/useAuthStore";
// // import { useChatStore } from "@/stores/useChatStore";
// // import { refreshToken } from "@/utils/api/authApi";
// // import { useAuth } from "@clerk/clerk-react";
// // import { Loader } from "lucide-react";
// // import { useEffect, useState } from "react";

// // const updateApiToken = async (token: string | null) => {
// //   console.log(token);
// //   await refreshToken();
// //   // if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// //   // else delete axiosInstance.defaults.headers.common["Authorization"];
// // };

// // const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// //   const { getToken, userId } = useAuth();
// //   const [loading, setLoading] = useState(true);
// //   const { checkAdminStatus } = useAuthStore();
// //   const { initSocket, disconnectSocket } = useChatStore();

// //   useEffect(() => {
// //     const initAuth = async () => {
// //       try {
// //         const token = await getToken();
// //         updateApiToken(token);
// //         if (token) {
// //           await checkAdminStatus();
// //           // init socket
// //           if (userId) initSocket(userId);
// //         }
// //       } catch (error: any) {
// //         updateApiToken(null);
// //         console.log("Error in auth provider", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     initAuth();

// //     // clean up
// //     return () => disconnectSocket();
// //   }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

// //   if (loading)
// //     return (
// //       <div className="h-screen w-full flex items-center justify-center">
// //         <Loader className="size-8 text-emerald-500 animate-spin" />
// //       </div>
// //     );

// //   return <>{children}</>;
// // };
// // export default AuthProvider;


// import { useAuthStore } from "@/stores/useAuthStore";
// import { useChatStore } from "@/stores/useChatStore";
// import { refreshToken } from "@/utils/api/authApi";
// import { getUser } from "@/utils/api/usersApi";
// // import { refreshToken, login, getUser } from "@/utils/api/authApi"; 
// import { Loader } from "lucide-react";
// import { useEffect, useState, createContext, useContext } from "react";

// const AuthContext = createContext<any>(null);

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const { checkAdminStatus } = useAuthStore();
//   const { initSocket, disconnectSocket } = useChatStore();

//   // Hàm cập nhật token
//   const updateApiToken = async (token: string | null) => {
//     console.log("Token:", token);
//     if (token) {
//       localStorage.setItem("token", token);
//       await refreshToken();
//     } else {
//       localStorage.removeItem("token");
//     }
//   };

//   // Hàm đăng nhập thủ công
//   const login = async (email: string, password: string) => {
//     try {
//       const response = await login(email, password); // Gọi API đăng nhập
//       const { token, userData } = response;
//       updateApiToken(token);
//       setUser(userData);
//       if (userData?.role === "admin") {
//         await checkAdminStatus();
//       }
//       initSocket(userData.id);
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   // Hàm logout
//   const logout = () => {
//     updateApiToken(null);
//     setUser(null);
//     disconnectSocket();
//   };

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (token) {
//           updateApiToken(token);
//           const userData = await getUser(token); // Lấy thông tin user từ API
//           setUser(userData);
//           if (userData?.role === "admin") {
//             await checkAdminStatus();
//           }
//           initSocket(userData.id);
//         }
//       } catch (error) {
//         console.error("Auth initialization failed:", error);
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     initAuth();

//     return () => disconnectSocket();
//   }, []);

//   if (loading)
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <Loader className="size-8 text-emerald-500 animate-spin" />
//       </div>
//     );

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook để sử dụng context trong component khác
// export const useAuthContext = () => useContext(AuthContext);
// export default AuthProvider;
