import React, { useState } from 'react';
import { Box, Typography, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox, Button, Grid, TextField } from '@mui/material';
import dogImage from './dog.png'; // הקישור לתמונה שהצגת

const CustomSigns: React.FC = () => {
    const [selectedWood, setSelectedWood] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedFont, setSelectedFont] = useState('');
    const [showIcons, setShowIcons] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<string[]>([]); // עדכון כאן לסוג string[]
    const [finish, setFinish] = useState('');
  
  const handleWoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWood(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFont(event.target.value);
  };

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (selectedIcon.includes(value)) {
      setSelectedIcon(selectedIcon.filter((icon) => icon !== value));
    } else {
      setSelectedIcon([...selectedIcon, value]);
    }
  };

  const handleFinishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinish(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: '20px',
        border: '2px solid #D2B48C',
        borderRadius: '8px',
        maxWidth: '800px',
        margin: 'auto',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          flex: 1,
          paddingRight: '20px',
        }}
      >
        <img src={dogImage} alt="Dog" style={{ width: '100%', borderRadius: '8px' }} />
      </Box>

      <Box sx={{ flex: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
          אישור פרטי השלט המותאם
        </Typography>

        {/* סוג עץ */}
        <FormControl component="fieldset" sx={{ marginBottom: '16px' }}>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            סוג עץ
          </Typography>
          <RadioGroup value={selectedWood} onChange={handleWoodChange}>
            <FormControlLabel value="עץ אגוז" control={<Radio />} label="עץ אגוז" />
            <FormControlLabel value="עץ תמר" control={<Radio />} label="עץ תמר" />
            <FormControlLabel value="עץ שקד" control={<Radio />} label="עץ שקד" />
          </RadioGroup>
        </FormControl>

        {/* גודל */}
        <FormControl component="fieldset" sx={{ marginBottom: '16px' }}>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            גודל
          </Typography>
          <RadioGroup value={selectedSize} onChange={handleSizeChange}>
            <FormControlLabel value="10X10" control={<Radio />} label="10X10" />
            <FormControlLabel value="20X20" control={<Radio />} label="20X20" />
            <FormControlLabel value="30X20" control={<Radio />} label="30X20" />
          </RadioGroup>
        </FormControl>

        {/* פונט */}
        <FormControl component="fieldset" sx={{ marginBottom: '16px' }}>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            פונט
          </Typography>
          <RadioGroup value={selectedFont} onChange={handleFontChange}>
            <FormControlLabel value="סן סריפי" control={<Radio />} label="סן סריפי" />
            <FormControlLabel value="רגיל" control={<Radio />} label="רגיל" />
          </RadioGroup>
        </FormControl>

        {/* איקון */}
        <FormControl component="fieldset" sx={{ marginBottom: '16px' }}>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            איקון
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={showIcons} onChange={() => setShowIcons(!showIcons)} />}
            label="הראה איקונים"
          />
          {showIcons && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Checkbox
                  value="icon1"
                  onChange={handleIconChange}
                  checked={selectedIcon.includes('icon1')}
                />
                <Typography>איקון 1</Typography>
              </Grid>
              <Grid item xs={6}>
                <Checkbox
                  value="icon2"
                  onChange={handleIconChange}
                  checked={selectedIcon.includes('icon2')}
                />
                <Typography>איקון 2</Typography>
              </Grid>
            </Grid>
          )}
        </FormControl>

        {/* פיניש */}
        <FormControl component="fieldset" sx={{ marginBottom: '16px' }}>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            פיניש
          </Typography>
          <RadioGroup value={finish} onChange={handleFinishChange}>
            <FormControlLabel value="ללא" control={<Radio />} label="ללא" />
            <FormControlLabel value="ציפוי לקה" control={<Radio />} label="ציפוי לקה" />
            <FormControlLabel value="מריחת שמן" control={<Radio />} label="מריחת שמן" />
          </RadioGroup>
        </FormControl>

        {/* כפתור לשליחה */}
        <Button variant="contained" color="primary" sx={{ marginTop: '16px' }}>
          אישור והמשך
        </Button>
      </Box>
    </Box>
  );
};

export default CustomSigns;
