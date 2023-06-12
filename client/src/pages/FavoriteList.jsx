import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui";
import favoriteApi from "../api/modules/favorite";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { removeFavorite } from "../redux/features/userSlice";


//Απεικονίζει μια αγαπημένη ταινία-σειρά, επιτρέπει την αφαίρεσή της από τα 'αγαπημένα' 
//και κατ'επέκταση την ενημέρωση της κατάστασης της λίστας με τα 'αγαπημένα'
const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = useState(false);
  
  //Καλείται όταν ο χρήστης αφαιρεί μια ταινία-σειρά από τα 'αγαπημένα'
  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    //Αποστολή ενός request για αφαίρεση μιας ταινίας-σειράς από τα 'αγαπημένα' με το response να 
    //αποθηκεύεται είτε στην response (επιτυχής διαγραφή), είτε στην err (διαγραφή απέτυχε)
    const {response, err} = await favoriteApi.remove({favoriteId: media.id});    
    setOnRequest(false);
    if (err){
      toast.error(err.message);
    }
    if (response) {
      toast.success("Remove favorite success");
      dispatch(removeFavorite({mediaId: media.mediaId}));    //Ενημέρωση της κατάστασης των 'αγαπημένων' στο Redux store
      onRemoved(media.id);      //Εκτέλεση πιθανών πρόσθετων ενεργειών μετά την αφαίρεση της ταινίας-σειράς από τα 'αγαπημένα'
    }
  };


  return (
  <>
    <MediaItem media={media} mediaType={media.mediaType} />
    <LoadingButton
      fullWidth
      variant="contained"
      sx={{ marginTop: 2 }}
      startIcon={<DeleteIcon />}
      loadingPosition="start"
      loading={onRequest}
      onClick={onRemove}
    >remove
    </LoadingButton>
  </>);
};


//Απεικονίζει τη λίστα με τις 'αγαπημένες' ταινίες-σειρές, επιτρέπει την αφαίρεση αγαπημένων
//ταινιών-σειρών από την λίστα και δίνει την δυνατότητα για 'φόρτωση' περισσοτέρων ταινιών-σειρών
//(αν ο χρήστης έχει και άλλες αγαπημένες ταινίες-σειρές οι οποίες δεν έχουν ακόμα εμφανιστεί)
const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const skip = 8;       //Πλήθος ταινιών-σειρών που θα εμφανίζονται κατά την φόρτωση

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));

      const {response, err} = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));

      if (err){
        toast.error(err.message);
      }
      if (response) {
        setCount(response.length);     //H μεταβλητή count ορίζεται ίση με το αριθμό των αγαπημένων ταινιών-σειρών
        //Οι μεταβλητές medias και filteredMedias παίρνουν τις τιμές του response
        setMedias([...response]);
        setFilteredMedias([...response].splice(0, skip));
      }
    };
    getFavorites();
  }, []);

  //Καλείται όταν ο χρήστης ζητά να φορτωθούν περισσότερες ταινίες-σειρές από την λίστα αγαπημένων
  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)]);    //Προσθήκη των επιπλέον ταινιών-σειρών που φορτώθηκαν, στην φιλτραρισμένη λίστα
    setPage(page + 1);
  };

  //Καλείται όταν μια ταινία-σειρά αφαιρείται από την λίστα αγαπημένων
  const onRemoved = (id) => {
    const newMedias = [...medias].filter(e => e.id !== id);    //Πίνακας που πειέχει όλες τις ταινίες-σειρές εκτός από αυτήν που αφαιρέθηκε
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };


  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;