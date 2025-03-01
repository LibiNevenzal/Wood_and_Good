import React from "react";
import { useForm, Controller, SubmitHandler, FieldValues } from "react-hook-form";
import { TextField, Button, Grid, Typography, Box, Container, Paper } from "@mui/material";

interface IFormInput {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  city: string;
  streetAddress: string;
}

const SignupForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    console.log("User Registered:", data);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Paper elevation={6} sx={{ padding: 4, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#3f51b5" }}>
          ?עבור מי ההזמנה
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>

            {/* שם משפחה */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: "שם משפחה הוא שדה חובה" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="שם משפחה *"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message as string || ""}
                    variant="outlined"
                    margin="normal"
                    sx={{ textAlign: "right" }}
                  />
                )}
              />
            </Grid>

            {/* שם פרטי */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: "שם פרטי הוא שדה חובה" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="שם פרטי *"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message as string || ""}
                    variant="outlined"
                    margin="normal"
                    sx={{ textAlign: "right" }}
                  />
                )}
              />
            </Grid>

            {/* טלפון */}
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: "מספר טלפון הוא שדה חובה",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "מספר טלפון חייב להיות 10 ספרות",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="מספר טלפון *"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message as string || ""}
                    variant="outlined"
                    margin="normal"
                    sx={{ textAlign: "right" }}
                  />
                )}
              />
            </Grid>

            {/* אימייל (לא חובה) */}
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "כתובת אימייל לא תקינה",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="אימייל"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message as string || ""}
                    variant="outlined"
                    margin="normal"
                    sx={{ textAlign: "right" }}
                  />
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
                  <TextField
                    {...field}
                    label="עיר *"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message as string || ""}
                    variant="outlined"
                    margin="normal"
                    sx={{ textAlign: "right" }}
                  />
                )}
              />
            </Grid>

            {/* כתובת רחוב */}
            <Grid item xs={12}>
              <Controller
                name="streetAddress"
                control={control}
                defaultValue=""
                rules={{ required: "כתובת רחוב היא שדה חובה" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="כתובת רחוב *"
                    fullWidth
                    error={!!errors.streetAddress}
                    helperText={errors.streetAddress?.message as string || ""}
                    variant="outlined"
                    margin="normal"
                    sx={{ textAlign: "right" }}
                  />
                )}
              />
            </Grid>

            {/* כפתור המשך */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: "12px 40px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#ff7043",
                    "&:hover": {
                      backgroundColor: "#ff5722",
                    },
                  }}
                >
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
