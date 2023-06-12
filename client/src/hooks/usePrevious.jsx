import { useRef } from "react";
import { useEffect } from "react";


//Επιστρέφει την προηγούμενη τιμή μιας μεταβλητής κατά την εκτέλεση (σε κάθε ανανέωση) ενός function component
const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;