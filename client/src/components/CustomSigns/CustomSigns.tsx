// import React, { useState } from 'react';
// import { Box, Typography, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox, Button, Grid, FormHelperText } from '@mui/material';
// import dogImage from './dog.png';
// import { useNavigate } from 'react-router-dom';

// const CustomSigns: React.FC = () => {
//   const [selectedWood, setSelectedWood] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedFont, setSelectedFont] = useState('');
//   const [showIcons, setShowIcons] = useState(false);
//   const [selectedIcon, setSelectedIcon] = useState<string[]>([]);
//   const [finish, setFinish] = useState('');

//   const [error, setError] = useState({
//     wood: false,
//     size: false,
//     font: false,
//     finish: false,
//   });

//   const navigate = useNavigate();

//   const handleWoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedWood(event.target.value);
//     setError((prevState) => ({ ...prevState, wood: false }));
//   };

//   const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedSize(event.target.value);
//     setError((prevState) => ({ ...prevState, size: false }));
//   };

//   const handleFontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedFont(event.target.value);
//     setError((prevState) => ({ ...prevState, font: false }));
//   };

//   const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     if (selectedIcon.includes(value)) {
//       setSelectedIcon(selectedIcon.filter((icon) => icon !== value));
//     } else {
//       setSelectedIcon([...selectedIcon, value]);
//     }
//   };

//   const handleFinishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFinish(event.target.value);
//     setError((prevState) => ({ ...prevState, finish: false }));
//   };

//   const getIdToCart = (): number => {
//     const savedCartItems = localStorage.getItem('cart');

//     if (savedCartItems) {
//       const cartItems = JSON.parse(savedCartItems);
//       const lastItem = cartItems[cartItems.length - 1];
//       return lastItem ? lastItem.id + 1 : 0;
//     }
//     return 0; // Default case if no cart exists
//   };

//   const handleCart = () => {
//     // בדוק אם כל השדות שהגדרנו כחובה נבחרו, אך לא את האייקונים
//     if (!selectedWood || !selectedSize || !selectedFont || !finish) {
//       setError({
//         wood: !selectedWood,
//         size: !selectedSize,
//         font: !selectedFont,
//         finish: !finish,
//       });
//       return;
//     }

//     const cartData = {
//       id: getIdToCart(),
//       wood: selectedWood,
//       size: selectedSize,
//       font: selectedFont,
//       icons: selectedIcon, // אייקונים יכולים להישאר ריקים
//       price: 0,
//       finish: finish,
//     };

//     const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
//     currentCart.push(cartData);
//     localStorage.setItem('cart', JSON.stringify(currentCart));
//     navigate('/cart');
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         padding: '20px',
//         border: '2px solid #D2B48C',
//         borderRadius: '8px',
//         maxWidth: '800px',
//         margin: 'auto',
//         alignItems: 'center',
//       }}
//     >
//       <Box
//         sx={{
//           flex: 1,
//           paddingRight: '20px',
//         }}
//       >
//         <img src={dogImage} alt="Dog" style={{ width: '100%', borderRadius: '8px' }} />
//       </Box>

//       <Box sx={{ flex: 2 }}>
//         <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
//           אישור פרטי השלט המותאם
//         </Typography>

//         {/* סוג עץ */}
//         <FormControl component="fieldset" sx={{ marginBottom: '16px' }} error={error.wood}>
//           <Typography variant="body1" sx={{ marginBottom: '8px' }}>
//             סוג עץ
//           </Typography>
//           <RadioGroup value={selectedWood} onChange={handleWoodChange}>
//             <FormControlLabel value="עץ אגוז" control={<Radio />} label="עץ אגוז" />
//             <FormControlLabel value="עץ תמר" control={<Radio />} label="עץ תמר" />
//             <FormControlLabel value="עץ שקד" control={<Radio />} label="עץ שקד" />
//           </RadioGroup>
//           {error.wood && <FormHelperText>יש לבחור סוג עץ</FormHelperText>}
//         </FormControl>

//         {/* גודל */}
//         <FormControl component="fieldset" sx={{ marginBottom: '16px' }} error={error.size}>
//           <Typography variant="body1" sx={{ marginBottom: '8px' }}>
//             גודל
//           </Typography>
//           <RadioGroup value={selectedSize} onChange={handleSizeChange}>
//             <FormControlLabel value="10X10" control={<Radio />} label="10X10" />
//             <FormControlLabel value="20X20" control={<Radio />} label="20X20" />
//             <FormControlLabel value="30X20" control={<Radio />} label="30X20" />
//           </RadioGroup>
//           {error.size && <FormHelperText>יש לבחור גודל</FormHelperText>}
//         </FormControl>

//         {/* פונט */}
//         <FormControl component="fieldset" sx={{ marginBottom: '16px' }} error={error.font}>
//           <Typography variant="body1" sx={{ marginBottom: '8px' }}>
//             פונט
//           </Typography>
//           <RadioGroup value={selectedFont} onChange={handleFontChange}>
//             <FormControlLabel value="סן סריפי" control={<Radio />} label="סן סריפי" />
//             <FormControlLabel value="רגיל" control={<Radio />} label="רגיל" />
//           </RadioGroup>
//           {error.font && <FormHelperText>יש לבחור פונט</FormHelperText>}
//         </FormControl>

//         {/* איקון */}
//         <FormControl component="fieldset" sx={{ marginBottom: '16px' }}>
//           <Typography variant="body1" sx={{ marginBottom: '8px' }}>
//             איקון
//           </Typography>
//           <FormControlLabel
//             control={<Checkbox checked={showIcons} onChange={() => setShowIcons(!showIcons)} />}
//             label="הראה איקונים"
//           />
//           {showIcons && (
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Checkbox
//                   value="icon1"
//                   onChange={handleIconChange}
//                   checked={selectedIcon.includes('icon1')}
//                 />
//                 <Typography>איקון 1</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Checkbox
//                   value="icon2"
//                   onChange={handleIconChange}
//                   checked={selectedIcon.includes('icon2')}
//                 />
//                 <Typography>איקון 2</Typography>
//               </Grid>
//             </Grid>
//           )}
//         </FormControl>

//         {/* פיניש */}
//         <FormControl component="fieldset" sx={{ marginBottom: '16px' }} error={error.finish}>
//           <Typography variant="body1" sx={{ marginBottom: '8px' }}>
//             פיניש
//           </Typography>
//           <RadioGroup value={finish} onChange={handleFinishChange}>
//             <FormControlLabel value="ללא" control={<Radio />} label="ללא" />
//             <FormControlLabel value="ציפוי לקה" control={<Radio />} label="ציפוי לקה" />
//             <FormControlLabel value="מריחת שמן" control={<Radio />} label="מריחת שמן" />
//           </RadioGroup>
//           {error.finish && <FormHelperText>יש לבחור פיניש</FormHelperText>}
//         </FormControl>

//         {/* כפתור אישור והמשך */}
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ marginTop: '16px' }}
//           onClick={handleCart}
//         >
//           אישור והמשך
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CustomSigns;








import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  FormControl,
  FormHelperText,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { config } from '../config';

interface ErrorState {
  wood: boolean;
  size: boolean;
  font: boolean;
  finish: boolean;
  engravingText: boolean; 
}

interface Option {
  id: string;
  name: string;
  description: string;
}

interface CustomSignData {
  materialTypesResult: Option[];
  sizesResult: Option[];
  fontsResult: Option[];
  finishesResult: Option[];
  decorationsResult: Option[];
}

const CustomSignForm = () => {
  const [selectedWood, setSelectedWood] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFont, setSelectedFont] = useState("");
  const [selectedFinish, setSelectedFinish] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string[]>([]);
  const [engravingText, setEngravingText] = useState("");
  const [error, setError] = useState<ErrorState>({
    wood: false,
    size: false,
    font: false,
    finish: false,
    engravingText: false,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CustomSignData>({
    materialTypesResult: [],
    sizesResult: [],
    fontsResult: [],
    finishesResult: [],
    decorationsResult: [],
  });
  const [displayWood, setDisplayWood] = useState(false);
  const [displaySize, setDisplaySize] = useState(false);
  const [displayFont, setDisplayFont] = useState(false);
  const [displayFinish, setDisplayFinish] = useState(false);
  const [displayIcons, setDisplayIcons] = useState(false);
  const [woodDescription, setWoodDescription] = useState("בחר אופציה כדי לראות מידע עליה");
  const [sizeDescription, setSizeDescription] = useState("בחר אופציה כדי לראות מידע עליה");
  const [fontDescription, setFontDescription] = useState("בחר אופציה כדי לראות מידע עליה");
  const [finishDescription, setFinishDescription] = useState("בחר אופציה כדי לראות מידע עליה");
  const navigate = useNavigate();
  useEffect(() => {
    const url = `http://${config.SERVERPORT}/customSigns`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedIcon((prev) =>
      prev.includes(value) ? prev.filter((icon) => icon !== value) : [...prev, value]
    );
  };

  const getIdToCart = (): number => {
    const savedCartItems = localStorage.getItem('cart');

    if (savedCartItems) {
      const cartItems = JSON.parse(savedCartItems);
      const lastItem = cartItems[cartItems.length - 1];
      return lastItem ? lastItem.id + 1 : 0;
    }
    return 0; // Default case if no cart exists
  };

const handleCart = () => {
  // בדוק אם כל השדות שהגדרנו כחובה נבחרו, אך לא את האייקונים
  if (!selectedWood || !selectedSize || !selectedFont || !selectedFinish || !engravingText.trim()) {
    setError({
      wood: !selectedWood,
      size: !selectedSize,
      font: !selectedFont,
      finish: !selectedFinish,
      engravingText: !engravingText.trim(),
    });
    return;
  }

  const cartData = {
    id: getIdToCart(),
    wood: selectedWood,
    size: selectedSize,
    font: selectedFont,
    icons: selectedIcon, // אייקונים יכולים להישאר ריקים
    price: 0,
    finish: selectedFinish,
    engravingText: engravingText,
  };

  const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
  currentCart.push(cartData);
  localStorage.setItem('cart', JSON.stringify(currentCart));
  navigate('/cart');
};

const handleSelect = (category: "wood" | "size" | "font" | "finish", description?: string) => {
  const newDescription = description || "אין מידע זמין";

  switch (category) {
    case "wood":
      setWoodDescription(newDescription);
      break;
    case "size":
      setSizeDescription(newDescription);
      break;
    case "font":
      setFontDescription(newDescription);
      break;
    case "finish":
      setFinishDescription(newDescription);
      break;
    default:
      console.warn("Unknown category:", category);
  }
};


  return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Card sx={{ maxWidth: 600, width: "100%", p: 3 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>טוען נתונים...</Typography>
            </Box>
          ) : (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" align="center" gutterBottom>
                :הזמנת שלט מותאם אישית
              </Typography>
    
              <Grid container spacing={3}>
                {/* סוג עץ */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    לחיצה על אופציה תציג מידע נוסף
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#D2B48C", color: "white" }}
                      onClick={() => setDisplayWood(!displayWood)}
                    >
                      :בחר סוג עץ
                    </Button>
                  </Box>
                  {displayWood && (
                    <FormControl fullWidth error={error.wood} sx={{ mt: 2 }}>
                      <RadioGroup
                        value={selectedWood}
                        onChange={(e) => {
                          const selected = data.materialTypesResult.find(wood => wood.name === e.target.value);
                          setSelectedWood(e.target.value);
                          handleSelect("wood", selected?.description);
                        }}
                        
                      >
                        {data.materialTypesResult.map((wood) => (
                          <FormControlLabel
                            key={wood.id}
                            value={wood.name}
                            control={<Radio />}
                            label={wood.name}
                          />
                        ))}
                      </RadioGroup>
                      {error.wood && <FormHelperText>יש לבחור סוג עץ</FormHelperText>}
                    </FormControl>
                  )}
                </Grid>
    
{/* הצגת התיאור */}
<Grid item xs={12}>
                <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                  <Typography variant="subtitle1">תיאור:</Typography>
                  <Typography>{woodDescription}</Typography>
                </Paper>
              </Grid>

                {/* גודל */}
                <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary">
                    לחיצה על אופציה תציג מידע נוסף
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#D2B48C", color: "white" }}
                      onClick={() => setDisplaySize(!displaySize)}
                    >
                      :בחר גודל
                    </Button>
                  </Box>
                  {displaySize && (
                    <FormControl fullWidth error={error.size} sx={{ mt: 2 }}>
                      <RadioGroup
                        value={selectedSize}
                        onChange={(e) => {
                          const selected = data.sizesResult.find(size => size.name === e.target.value);
                          setSelectedSize(e.target.value);
                          handleSelect("size", selected?.description);
                        }}
                        
                      >
                        {data.sizesResult.map((size) => (
                          <FormControlLabel
                            key={size.id}
                            value={size.name}
                            control={<Radio />}
                            label={size.name}
                          />
                        ))}
                      </RadioGroup>
                      {error.size && <FormHelperText>יש לבחור גודל</FormHelperText>}
                    </FormControl>
                  )}
                </Grid>
    
{/* הצגת התיאור */}
<Grid item xs={12}>
                <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                  <Typography variant="subtitle1">תיאור:</Typography>
                  <Typography>{sizeDescription}</Typography>
                </Paper>
              </Grid>

                {/* פונט */}
                <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary">
                    לחיצה על אופציה תציג מידע נוסף
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#D2B48C", color: "white" }}
                      onClick={() => setDisplayFont(!displayFont)}
                    >
                      :בחר סוג פונט
                    </Button>
                  </Box>
                  {displayFont && (
                    <FormControl fullWidth error={error.font} sx={{ mt: 2 }}>
                      <RadioGroup
                        value={selectedFont}
                        onChange={(e) => {
                          const selected = data.fontsResult.find(font => font.name === e.target.value);
                          setSelectedFont(e.target.value);
                          handleSelect("font", selected?.description);
                        }}
                        
                      >
                        {data.fontsResult.map((font) => (
                          <FormControlLabel
                            key={font.id}
                            value={font.name}
                            control={<Radio />}
                            label={font.name}
                          />
                        ))}
                      </RadioGroup>
                      {error.font && <FormHelperText>יש לבחור פונט</FormHelperText>}
                    </FormControl>
                  )}
                </Grid>
    
{/* הצגת התיאור */}
<Grid item xs={12}>
                <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                  <Typography variant="subtitle1">תיאור:</Typography>
                  <Typography>{fontDescription}</Typography>
                </Paper>
              </Grid>
    
                {/* פיניש */}
                <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary">
                    לחיצה על אופציה תציג מידע נוסף
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#D2B48C", color: "white" }}
                      onClick={() => setDisplayFinish(!displayFinish)}
                    >
                      :בחר סוג גימור
                    </Button>
                  </Box>
                  {displayFinish && (
                    <FormControl fullWidth error={error.finish} sx={{ mt: 2 }}>
                      <RadioGroup
                        value={selectedFinish}
                        onChange={(e) => {
                          const selected = data.finishesResult.find(finish => finish.name === e.target.value);
                          setSelectedFinish(e.target.value);
                          handleSelect("finish", selected?.description);
                        }}
                        
                      >
                        {data.finishesResult.map((finish) => (
                          <FormControlLabel
                            key={finish.id}
                            value={finish.name}
                            control={<Radio />}
                            label={finish.name}
                          />
                        ))}
                      </RadioGroup>
                      {error.finish && <FormHelperText>יש לבחור פיניש</FormHelperText>}
                    </FormControl>
                  )}
                </Grid>
    
{/* הצגת התיאור */}
<Grid item xs={12}>
                <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                  <Typography variant="subtitle1">תיאור:</Typography>
                  <Typography>{finishDescription}</Typography>
                </Paper>
              </Grid>
    
                {/* איקונים */}
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#D2B48C", color: "white" }}
                      onClick={() => setDisplayIcons(!displayIcons)}
                    >
                      :בחר איקונים להוספה
                    </Button>
                  </Box>
                  {displayIcons && (
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      {data.decorationsResult.map((icon) => (
                        <Grid item xs={6} key={icon.id}>
                          <Checkbox
                            value={icon.name}
                            onChange={handleIconChange}
                            checked={selectedIcon.includes(icon.name)}
                          />
                          <Typography>{icon.name}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>
    
                {/* שדה טקסט לחריטה */}
                <Grid item xs={12}>
                  <TextField
                    label="?מה תרצה לחרוט על השלט"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={1}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    error={error.engravingText}
                    helperText={error.engravingText ? "שדה זה חובה" : ""}
                  />
                </Grid>
              </Grid>
    
              {/* כפתור שליחה */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCart}
                  sx={{ px: 5 }}
                >
                  שלח הזמנה
                </Button>
              </Box>
            </Paper>
          )}
        </Card>
      </Box>
    );
    
};

export default CustomSignForm;









