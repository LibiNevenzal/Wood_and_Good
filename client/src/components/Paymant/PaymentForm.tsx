// import React from 'react';
// import { TextField, Button, Grid, Typography, Box, Container, Paper } from '@mui/material';
// import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';

// // טיפוס הנתונים של הטופס
// interface IFormInput {
//   name: string;
//   creditCardNumber: string;
//   expiryDate: string;
//   cvv: string;
//   address: string;
// }

// const PaymentForm: React.FC = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();

//   const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
//     console.log(data);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={6} sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
//         <Typography variant="h4" align="center" gutterBottom sx={{ color: '#3f51b5' }}>
//           טופס תשלום
//         </Typography>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={3}>
//             {/* שם בעל כרטיס האשראי */}
//             <Grid item xs={12}>
//               <Controller
//                 name="name"
//                 control={control}
//                 defaultValue=""
//                 rules={{ required: 'השם הוא שדה חובה' }}
//                 render={({ field }: { field: FieldValues }) => (
//                   <TextField
//                     {...field}
//                     label="שם בעל כרטיס האשראי"
//                     fullWidth
//                     error={!!errors.name}
//                     helperText={errors.name?.message}
//                     variant="outlined"
//                     margin="normal"
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         borderColor: '#3f51b5',
//                       },
//                       '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#3f51b5',
//                       },
//                     }}
//                   />
//                 )}
//               />
//             </Grid>

//             {/* מספר כרטיס אשראי */}
//             <Grid item xs={12}>
//               <Controller
//                 name="creditCardNumber"
//                 control={control}
//                 defaultValue=""
//                 rules={{
//                   required: 'מספר כרטיס האשראי הוא שדה חובה',
//                   minLength: { value: 16, message: 'הכרטיס צריך להיות באורך 16 תווים' }
//                 }}
//                 render={({ field }: { field: FieldValues }) => (
//                   <TextField
//                     {...field}
//                     label="מספר כרטיס אשראי"
//                     fullWidth
//                     error={!!errors.creditCardNumber}
//                     helperText={errors.creditCardNumber?.message}
//                     variant="outlined"
//                     margin="normal"
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         borderColor: '#3f51b5',
//                       },
//                       '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#3f51b5',
//                       },
//                     }}
//                   />
//                 )}
//               />
//             </Grid>

//             {/* תוקף כרטיס */}
//             <Grid item xs={6}>
//               <Controller
//                 name="expiryDate"
//                 control={control}
//                 defaultValue=""
//                 rules={{ required: 'תוקף הכרטיס הוא שדה חובה' }}
//                 render={({ field }: { field: FieldValues }) => (
//                   <TextField
//                     {...field}
//                     label="תוקף (MM/YY)"
//                     fullWidth
//                     error={!!errors.expiryDate}
//                     helperText={errors.expiryDate?.message}
//                     variant="outlined"
//                     margin="normal"
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         borderColor: '#3f51b5',
//                       },
//                       '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#3f51b5',
//                       },
//                     }}
//                   />
//                 )}
//               />
//             </Grid>

//             {/* CVV */}
//             <Grid item xs={6}>
//               <Controller
//                 name="cvv"
//                 control={control}
//                 defaultValue=""
//                 rules={{ required: 'ה-CVV הוא שדה חובה' }}
//                 render={({ field }: { field: FieldValues }) => (
//                   <TextField
//                     {...field}
//                     label="CVV"
//                     fullWidth
//                     error={!!errors.cvv}
//                     helperText={errors.cvv?.message}
//                     variant="outlined"
//                     margin="normal"
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         borderColor: '#3f51b5',
//                       },
//                       '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#3f51b5',
//                       },
//                     }}
//                   />
//                 )}
//               />
//             </Grid>

//             {/* כתובת */}
//             <Grid item xs={12}>
//               <Controller
//                 name="address"
//                 control={control}
//                 defaultValue=""
//                 rules={{
//                   required: 'הכתובת היא שדה חובה',
//                   minLength: { value: 5, message: 'הכתובת חייבת להכיל לפחות 5 תווים' }
//                 }}
//                 render={({ field }: { field: FieldValues }) => (
//                   <TextField
//                     {...field}
//                     label="כתובת"
//                     fullWidth
//                     error={!!errors.address}
//                     helperText={errors.address?.message}
//                     variant="outlined"
//                     margin="normal"
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         borderColor: '#3f51b5',
//                       },
//                       '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#3f51b5',
//                       },
//                     }}
//                   />
//                 )}
//               />
//             </Grid>

//             {/* כפתור שליחה */}
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center">
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     padding: '12px 40px',
//                     fontSize: '16px',
//                     borderRadius: '8px',
//                     backgroundColor: '#ff7043',
//                     '&:hover': {
//                       backgroundColor: '#ff5722',
//                     },
//                   }}
//                 >
//                   שלח
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default PaymentForm;

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Container, Paper } from '@mui/material';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';

// טיפוס הנתונים של הטופס
interface IFormInput {
  name: string;
  creditCardNumber: string;
  expiryDate: string;
  cvv: string;
  address: string;
  phoneNumber: string;  // מספר הטלפון
}

const PaymentForm: React.FC = () => {
  const [step, setStep] = useState<number>(1); // שלב של הצגת הטופס
  const [phoneExists, setPhoneExists] = useState<boolean | null>(null); // בדיקת אם המספר קיים במערכת
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    console.log(data);
  };

  const handlePhoneSubmit = (data: IFormInput) => {
    const { phoneNumber } = data;

    // כאן אנחנו עושים את הבדיקה אם המספר קיים במערכת (במקום לבצע בקשת API)
    if (phoneNumber === '1234567890') { // דוגמה למספר קיים
      setPhoneExists(true);
      setStep(2);
    } else {
      setPhoneExists(false);
      setStep(3); // אם הוא לא קיים, הגעת לדף הרשמה
    }
  };

  const handleRegistrationSubmit = () => {
    setPhoneExists(true); // אחרי ההרשמה, נניח שהמשתמש נשמר במערכת
    setStep(2); // חזרה לדף טופס התשלום
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Paper elevation={6} sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#3f51b5' }}>
          טופס תשלום
        </Typography>

        {step === 1 && (
          <form onSubmit={handleSubmit(handlePhoneSubmit)}>
            <Grid container spacing={3}>
              {/* מספר טלפון */}
              <Grid item xs={12}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'המספר טלפון הוא שדה חובה' }}
                  render={({ field }: { field: FieldValues }) => (
                    <TextField
                      {...field}
                      label="מספר טלפון"
                      fullWidth
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />
              </Grid>

              {/* כפתור שליחה */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      padding: '12px 40px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      backgroundColor: '#ff7043',
                      '&:hover': {
                        backgroundColor: '#ff5722',
                      },
                    }}
                  >
                    שלח
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}

        {/* אם המשתמש קיים */}
        {step === 2 && phoneExists && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* שם בעל כרטיס האשראי */}
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'השם הוא שדה חובה' }}
                  render={({ field }: { field: FieldValues }) => (
                    <TextField
                      {...field}
                      label="שם בעל כרטיס האשראי"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />
              </Grid>

              {/* מספר כרטיס אשראי */}
              <Grid item xs={12}>
                <Controller
                  name="creditCardNumber"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'מספר כרטיס האשראי הוא שדה חובה',
                    minLength: { value: 16, message: 'הכרטיס צריך להיות באורך 16 תווים' }
                  }}
                  render={({ field }: { field: FieldValues }) => (
                    <TextField
                      {...field}
                      label="מספר כרטיס אשראי"
                      fullWidth
                      error={!!errors.creditCardNumber}
                      helperText={errors.creditCardNumber?.message}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />
              </Grid>

              {/* תוקף כרטיס */}
              <Grid item xs={6}>
                <Controller
                  name="expiryDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'תוקף הכרטיס הוא שדה חובה' }}
                  render={({ field }: { field: FieldValues }) => (
                    <TextField
                      {...field}
                      label="תוקף (MM/YY)"
                      fullWidth
                      error={!!errors.expiryDate}
                      helperText={errors.expiryDate?.message}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />
              </Grid>

              {/* CVV */}
              <Grid item xs={6}>
                <Controller
                  name="cvv"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'ה-CVV הוא שדה חובה' }}
                  render={({ field }: { field: FieldValues }) => (
                    <TextField
                      {...field}
                      label="CVV"
                      fullWidth
                      error={!!errors.cvv}
                      helperText={errors.cvv?.message}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />
              </Grid>

              {/* כפתור שליחה */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      padding: '12px 40px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      backgroundColor: '#ff7043',
                      '&:hover': {
                        backgroundColor: '#ff5722',
                      },
                    }}
                  >
                    שלח
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}

        {/* אם המשתמש לא קיים - הרשמה */}
        {step === 3 && !phoneExists && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              המספר טלפון לא נמצא במערכת, אנא הירשם
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRegistrationSubmit}
              sx={{
                padding: '12px 40px',
                fontSize: '16px',
                borderRadius: '8px',
                backgroundColor: '#4caf50',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
              }}
            >
              הירשם
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PaymentForm;

