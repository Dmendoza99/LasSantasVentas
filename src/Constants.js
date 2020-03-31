import meal from "../assets/photos/food.png";
import softdrink from "../assets/photos/softdrink.png";
import harddrink from "../assets/photos/harddrink.png";
import hotdrink from "../assets/photos/hotdrink.png";
import dessert from "../assets/photos/dessert.png";
import extra from "../assets/photos/extra.png";

export default {};
export const PrimaryColor = "#FF9800";
export const theme = { colors: { primary: "#FFA000", secondary: "#FFC107", grey1: "#FFE082" } };
// export const theme = {
//   colors: {
//     primary: "#FFA000",
//     secondary: "#FFC107",
//     grey0: "#FFE082",
//     grey1: "",
//     grey2: "",
//     grey3: "",
//     grey4: "",
//     grey5: "",
//     greyOutline: "",
//     searchBg: "",
//     success: "",
//     error: "",
//     warning: "",
//     divider: "",
//     platform: {
//       android: {
//         // Same as ios
//       },
//     },
//   },
// };

export const categoriesPhotos = [meal, softdrink, harddrink, hotdrink, dessert, extra];

export const categories = [
  "Comida",
  "Bebida Suave",
  "Bebida Alcoholica",
  "Bebida Caliente",
  "Postres",
  "Otros",
];
