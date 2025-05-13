import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Grid, Typography, Box, Container, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { config } from '../config';

interface IFormInput {
  first_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  city: string;
  street_name: string;
  house_number: string;
  apartment_number: string;
  floor: string;
  postal_code: string;
  delivery_notes?: string;
}

const SignupForm: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));

    const savedTotalPrice = localStorage.getItem('totalPrice');
    if (savedTotalPrice) setTotalPrice(JSON.parse(savedTotalPrice));
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    console.log("User Registered:", data);
    try {
      const response = await fetch(`http://${config.SERVERPORT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to register user");
      console.log("User successfully registered");
    } catch (error) {
      console.error("Error registering user:", error);
    }
    navigate('/credit-card');
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Paper elevation={6} sx={{ padding: 4, backgroundColor: "#f5f5f5", borderRadius: 3, direction: "rtl" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#6a1b9a" }}>
         עבור מי ההזמנה?
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>

            {/* שם פרטי */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                rules={{ required: "שם פרטי הוא שדה חובה" }}
                render={({ field }) => (
                  <TextField {...field} label="שם פרטי *" fullWidth error={!!errors.first_name} helperText={errors.first_name?.message} variant="outlined" margin="normal" 
                  />
                )}
              />
            </Grid>
           {/* שם משפחה */}
           <Grid item xs={12} sm={6}>
              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                rules={{ required: "שם משפחה הוא שדה חובה" }}
                render={({ field }) => (
                  <TextField {...field} label="שם משפחה *" fullWidth error={!!errors.last_name} helperText={errors.last_name?.message} variant="outlined" margin="normal" />
                )}
              />
            </Grid>
            {/* מספר טלפון */}
            <Grid item xs={12}>
              <Controller
                name="phone_number"
                control={control}
                defaultValue=""
                rules={{ required: "מספר טלפון הוא שדה חובה", pattern: { value: /^[0-9]{10}$/, message: "מספר טלפון חייב להיות 10 ספרות" } }}
                render={({ field }) => (
                  <TextField {...field} label="מספר טלפון *" fullWidth error={!!errors.phone_number} helperText={errors.phone_number?.message} variant="outlined" margin="normal" />
                )}
              />
            </Grid>

            {/* אימייל */}
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "כתובת אימייל לא תקינה" } }}
                render={({ field }) => (
                  <TextField {...field} label="אימייל" fullWidth error={!!errors.email} helperText={errors.email?.message} variant="outlined" margin="normal" />
                )}
              />
            </Grid>

            {/* עיר */}
            <Grid item xs={12}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: "עיר היא שדה חובה" }}
                render={({ field }) => (
                  <TextField {...field} label="עיר *" fullWidth error={!!errors.city} helperText={errors.city?.message} variant="outlined" margin="normal" />
                )}
              />
            </Grid>

            {/* שם רחוב */}
            <Grid item xs={12}>
              <Controller
                name="street_name"
                control={control}
                defaultValue=""
                rules={{ required: "שם רחוב הוא שדה חובה" }}
                render={({ field }) => (
                  <TextField {...field} label="שם רחוב *" fullWidth error={!!errors.street_name} helperText={errors.street_name?.message} variant="outlined" margin="normal" />
                )}
              />
            </Grid>

            {/* מס' בית */}
            <Grid item xs={4}>
              <Controller
                name="house_number"
                control={control}
                defaultValue=""
                rules={{ required: "מס' בית הוא שדה חובה", pattern: { value: /^[0-9]+$/, message: "חייב להיות מספר" } }}
                render={({ field }) => (
                  <TextField {...field} label="מס' בית *" fullWidth error={!!errors.house_number} helperText={errors.house_number?.message} variant="outlined" margin="normal" />
                )}
              />
            </Grid>

            {/* מס' דירה */}
            <Grid item xs={4}>
              <Controller
                name="apartment_number"
                control={control}
                defaultValue=""
                rules={{ required: "מס' דירה הוא שדה חובה", pattern: { value: /^[0-9]+$/, message: "חייב להיות מספר" } }}
                render={({ field }) => (
                  <TextField {...field} label="מס' דירה *" fullWidth error={!!errors.apartment_number} helperText={errors.apartment_number?.message} variant="outlined" margin="normal" />
                )}
              />
            </Grid>

            {/* קומה */}
            <Grid item xs={4}>
              <Controller
                name="floor"
                control={control}
                defaultValue=""
                rules={{ required: "קומה היא שדה חובה", pattern: { value: /^[0-9]+$/, message: "חייב להיות מספר" } }}
                render={({ field }) => (
                  <TextField {...field} label="קומה *" fullWidth error={!!errors.floor} helperText={errors.floor?.message} variant="outlined" margin="normal" />
                )}
              />
            </Grid>

            {/* הערות למשלוח */}
            <Grid item xs={12}>
              <Controller
                name="delivery_notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="הערות למשלוח" fullWidth multiline rows={3} variant="outlined" margin="normal" />
                )}
              />
            </Grid>

            {/* כפתור שליחה */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#6a1b9a", color: "#fff", "&:hover": { backgroundColor: "#8e24aa" } }}>
                  המשך
                </Button>
              </Box>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupForm;
