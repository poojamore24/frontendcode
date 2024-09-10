// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   useCallback,
// } from "react";
// import axios from "axios";

// interface WishlistContextType {
//   wishlistCount: number;
//   updateWishlistCount: () => Promise<void>;
// }

// const WishlistContext = createContext<WishlistContextType | undefined>(
//   undefined
// );

// export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [wishlistCount, setWishlistCount] = useState(0);

//   const fetchWishlistCount = useCallback(async () => {
//     const token = localStorage.getItem("token");
//     const id = localStorage.getItem("profileId");
//     if (token && id) {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/students/wishlist/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           setWishlistCount(response.data.length);
//         } else {
//           console.error("Failed to fetch wishlist");
//         }
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//     }
//   }, []);

//   const updateWishlistCount = useCallback(async () => {
//     await fetchWishlistCount();
//   }, [fetchWishlistCount]);

//   useEffect(() => {
//     fetchWishlistCount();
//   }, [fetchWishlistCount]);

//   return (
//     <WishlistContext.Provider value={{ wishlistCount, updateWishlistCount }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (context === undefined) {
//     throw new Error("useWishlist must be used within a WishlistProvider");
//   }
//   return context;
// };
