import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userApi from "../../api/modules/user";
import favoriteApi from "../../api/modules/favorite";
import { setListFavorites, setUser } from "../../redux/features/userSlice";


const MainLayout = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);     //Ανάκτηση του state του χρήστη από το redux store

  useEffect(() => {
    const authUser = async () => {
      const {response, err} = await userApi.getInfo();    //Request για λήψη πληροφοριών που αφορούν τον χρήστη
      if (response){
        dispatch(setUser(response));
      }
      if (err){
        dispatch(setUser(null));
      }
    };
    authUser();
  }, [dispatch]);    //Το useEffect εκτελείται κάθε φορά που αλλάζει η τιμή της μεταβλητής dispatch

  useEffect(() => {
    const getFavorites = async () => {
      const {response, err} = await favoriteApi.getList();    //Request για λήψη της λίστας αγαπημένων
      if (response){
        dispatch(setListFavorites(response));
      }
      if (err){
        toast.error(err.message);
      }
    };
    if (user){        //Αν ο χρήστης έχει συνδεθεί-εγγραφεί στην εφαρμογή
      getFavorites();
    }
    if (!user){
      dispatch(setListFavorites([]));
    }
  }, [user, dispatch]);     //Η useEffect εκτελείται κάθε φορά που αλλάζει η τιμή είτε της μεταβλητής user, είτε της dispatch

  
  return (
    <>
      <GlobalLoading />
      <AuthModal />
      <Box display="flex" minHeight="100vh">
        <Topbar />
        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
        ><Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;