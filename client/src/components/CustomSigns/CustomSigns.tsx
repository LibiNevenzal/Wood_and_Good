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
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Typography,
  FormHelperText,
  Grid,
  Paper,
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
} from "@mui/material";
import { getRequest } from "../Tools/APIRequests";

interface ErrorState {
  wood: boolean;
  size: boolean;
  font: boolean;
  finish: boolean;
}

interface Option {
  id: string;
  name: string;
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
  const [finish, setFinish] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string[]>([]);
  const [showIcons, setShowIcons] = useState(false);
  const [engravingText, setEngravingText] = useState("");
  const [error, setError] = useState<ErrorState>({
    wood: false,
    size: false,
    font: false,
    finish: false,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CustomSignData>({
    materialTypesResult: [],
    sizesResult: [],
    fontsResult: [],
    finishesResult: [],
    decorationsResult: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getRequest(
          "customSigns",
          "?_limit=10",
          setData,
          (errorMessage: string) => {
            setError({
              wood: true,
              size: true,
              font: true,
              finish: true,
            });
          },
          "הזמנה מותאמת אישית"
        );
        setLoading(false);
      } catch (err) {
        setError({
          wood: true,
          size: true,
          font: true,
          finish: true,
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleWoodChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedWood(event.target.value);
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedSize(event.target.value);
  const handleFontChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedFont(event.target.value);
  const handleFinishChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFinish(event.target.value);
  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedIcon((prev) =>
      prev.includes(value) ? prev.filter((icon) => icon !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    // בדיקת תקינות ושליחת הנתונים
    if (!selectedWood || !selectedSize || !selectedFont || !finish) {
      setError({
        wood: !selectedWood,
        size: !selectedSize,
        font: !selectedFont,
        finish: !finish,
      });
      return;
    }
    console.log("Submitting data:", {
      selectedWood,
      selectedSize,
      selectedFont,
      finish,
      selectedIcon,
      engravingText,
    });
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
              הזמנת שלט מותאם אישית
            </Typography>

            <Grid container spacing={3}>
              {/* סוג עץ */}
              <Grid item xs={12}>
                <FormControl fullWidth error={error.wood}>
                  <Typography variant="body1">סוג עץ</Typography>
                  <RadioGroup value={selectedWood} onChange={handleWoodChange}>
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
              </Grid>

              {/* גודל */}
              <Grid item xs={12}>
                <FormControl fullWidth error={error.size}>
                  <Typography variant="body1">גודל</Typography>
                  <RadioGroup value={selectedSize} onChange={handleSizeChange}>
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
              </Grid>

              {/* פונט */}
              <Grid item xs={12}>
                <FormControl fullWidth error={error.font}>
                  <Typography variant="body1">פונט</Typography>
                  <RadioGroup value={selectedFont} onChange={handleFontChange}>
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
              </Grid>

              {/* פיניש */}
              <Grid item xs={12}>
                <FormControl fullWidth error={error.finish}>
                  <Typography variant="body1">פיניש</Typography>
                  <RadioGroup value={finish} onChange={handleFinishChange}>
                    {data.finishesResult.map((finishOption) => (
                      <FormControlLabel
                        key={finishOption.id}
                        value={finishOption.name}
                        control={<Radio />}
                        label={finishOption.name}
                      />
                    ))}
                  </RadioGroup>
                  {error.finish && <FormHelperText>יש לבחור פיניש</FormHelperText>}
                </FormControl>
              </Grid>

              {/* איקון */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Typography variant="body1">איקון</Typography>
                  <FormControlLabel
                    control={<Checkbox checked={showIcons} onChange={() => setShowIcons(!showIcons)} />}
                    label="הראה איקונים"
                  />
                  {showIcons && (
                    <Grid container spacing={2}>
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
                </FormControl>
              </Grid>

              {/* שדה טקסט לחריטה */}
              <Grid item xs={12}>
                <TextField
                  label="מה תרצה לחרוט על השלט?"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={1}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* כפתור שליחה */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
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
