import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Grid, Typography, Box, Container, Paper } from "@mui/material";
import { config } from '../config';

interface IFormInput {
  first_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  city: string;
  street_address: string;
  postal_code: string;
}

const SignupForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    console.log("User Registered:", data);
    
    try {
      const response = await fetch(`http://${config.SERVERPORT}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      
      console.log("User successfully registered");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Paper elevation={6} sx={{ padding: 4, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#3f51b5" }}>
          ?עבור מי ההזמנה
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                rules={{ required: "שם משפחה הוא שדה חובה" }}
                render={({ field }) => (
                  <TextField {...field} label="שם משפחה *" fullWidth error={!!errors.last_name} helperText={errors.last_name?.message || ""} variant="outlined" margin="normal" sx={{ textAlign: "right" }} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                rules={{ required: "שם פרטי הוא שדה חובה" }}
                render={({ field }) => (
                  <TextField {...field} label="שם פרטי *" fullWidth error={!!errors.first_name} helperText={errors.first_name?.message || ""} variant="outlined" margin="normal" sx={{ textAlign: "right" }} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone_number"
                control={control}
                defaultValue=""
                rules={{ required: "מספר טלפון הוא שדה חובה", pattern: { value: /^[0-9]{10}$/, message: "מספר טלפון חייב להיות 10 ספרות" } }}
                render={({ field }) => (
                  <TextField {...field} label="מספר טלפון *" fullWidth error={!!errors.phone_number} helperText={errors.phone_number?.message || ""} variant="outlined" margin="normal" sx={{ textAlign: "right" }} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "כתובת אימייל לא תקינה" } }}
                render={({ field }) => (
                  <TextField {...field} label="אימייל" fullWidth error={!!errors.email} helperText={errors.email?.message || ""} variant="outlined" margin="normal" sx={{ textAlign: "right" }} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: "עיר היא שדה חובה" }}
                render={({ field }) => (
                  <TextField {...field} label="עיר *" fullWidth error={!!errors.city} helperText={errors.city?.message || ""} variant="outlined" margin="normal" sx={{ textAlign: "right" }} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="street_address"
                control={control}
                defaultValue=""
                rules={{ required: "כתובת רחוב היא שדה חובה" }}
                render={({ field }) => (
                  <TextField {...field} label="כתובת רחוב *" fullWidth error={!!errors.street_address} helperText={errors.street_address?.message || ""} variant="outlined" margin="normal" sx={{ textAlign: "right" }} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="postal_code"
                control={control}
                defaultValue=""
                rules={{ required: "מיקוד הוא שדה חובה", pattern: { value: /^[0-9]{5,7}$/, message: "מיקוד חייב להיות בין 5 ל-7 ספרות" } }}
                render={({ field }) => (
                  <TextField {...field} label="מיקוד *" fullWidth error={!!errors.postal_code} helperText={errors.postal_code?.message || ""} variant="outlined" margin="normal" sx={{ textAlign: "right" }} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button type="submit" variant="contained" color="primary" sx={{ padding: "12px 40px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#ff7043", "&:hover": { backgroundColor: "#ff5722" } }}>
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
