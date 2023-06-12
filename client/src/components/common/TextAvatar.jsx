import { Avatar } from "@mui/material";


const TextAvatar = ({ text }) => {
  
  //Δημιουργεί ένα χρώμα με βάση ένα κείμενο, ώστε να μπορεί να εμφανίσει
  //ένα Avatar με ένα μοναδικό χρώμα για κάθε διαφορετικό κείμενο.
  const stringToColor = (str) => {
    let hash = 0;
    let i;

    for (i = 0; i < str.length; i += 1) {             //Επανάληψη για κάθε χαρακτήρα του κειμένου
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";          //Η # αντιπροσωπεύει την αρχή της μορφής HEX χρώματος
    for (i = 0; i < 3; i += 1) {      //Δημιουργία 3 θέσεων HEX για το χρώμα RGB
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };


  return (
    <Avatar
      sx={{
        backgroundColor: stringToColor(text),
        width: 40,
        height: 40
      }}
      children={`${text.split(" ")[0][0]}`}
    />
  );
};

export default TextAvatar;