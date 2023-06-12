import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui";


const mediaTypes = ["movie", "tv", "people"];   //Τύποι ταινιών-σειρών που μπορούν να αναζητηθούν
let timer;
const timeout = 500;

//Ορίζεται μια διεπαφη για την αναζήτηση ταινιών-σειρών
const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
      setOnSearch(true);

      const {response, err} = await mediaApi.search({mediaType, query, page});
      setOnSearch(false);

      if (err) toast.error(err.message);
      if (response) {
        if (page > 1){
          setMedias(m => [...m, ...response.results]);   
        }
        else{
          setMedias([...response.results]);      //Η μεταβλητή medias δέχεται τα αποτελέσματα της αναζήτησης
        }
      }
    },
    [mediaType, query, page],
  );

  useEffect(() => {
    if (query.trim().length === 0) {    //Αν ο χρήστης δεν εισάγει κείμενο αναζήτησης
      setMedias([]);
      setPage(1);
    } else{         //Αν ο χρήστης εισάγει κείμενο αναζήτησης, τότε πραγματοποιείται η αναζήτηση
      search();
    }
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  //Καλείται όταν ο χρήστης αλλάξει τον επιπλεγμένο τύπο ταινίας-σειράς (π.χ από movie σε tv)
  const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

  //Καλείται κάθε φορά που αλλάζει το κείμενο αναζήτησης. Γίνεται χρήση ενός timer με σκοπό
  //την αναμονή ενός χρονικού διαστήματος πριν την τέλεση αιτήματος αναζήτησης με κάθε αλλαγή στο κείμενο
  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };


  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                size="large"
                key={index}
                variant={mediaType === item ? "contained" : "text"}
                sx={{color: mediaType === item ? "primary.contrastText" : "text.primary"}}
                onClick={() => onCategoryChange(item)}
              >{item}
              </Button>
            ))}
          </Stack>
          <TextField
            color="success"
            placeholder="Search"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />
          <MediaGrid medias={medias} mediaType={mediaType} />
          {medias.length > 0 && (
            <LoadingButton
              loading={onSearch}
              onClick={() => setPage(page + 1)}
              color="info"
            >load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;