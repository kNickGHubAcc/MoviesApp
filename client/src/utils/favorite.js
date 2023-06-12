
//Έλεγχος εάν μια συγκεκριμένη ταινία-σειρά υπάρχει στην λίστα listFavorites, δηλαδή στα 'αγαπημένα'
const favoriteUtils = {
  check: ({ listFavorites, mediaId }) => 
  listFavorites && listFavorites.find(e => e.mediaId.toString() === mediaId.toString()) !== undefined
};

export default favoriteUtils;