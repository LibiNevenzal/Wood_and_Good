import React, { useState } from 'react';
import style from './SignupForm.module.css';

const SignupForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // פונקציה לבדיקת תקינות הטופס
  const validate = (): boolean => {
    let isValid = true;
    let errorMessages: { [key: string]: string } = {};

    // בדיקת שם
    if (!name) {
      errorMessages.name = 'שם לא יכול להיות ריק';
      isValid = false;
    }

    // בדיקת מייל
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      errorMessages.email = 'מייל לא יכול להיות ריק';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      errorMessages.email = 'מייל לא תקין';
      isValid = false;
    }

    // בדיקת טלפון
    const phonePattern = /^[0-9]{10}$/;
    if (!phone) {
      errorMessages.phone = 'טלפון לא יכול להיות ריק';
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      errorMessages.phone = 'טלפון לא תקין';
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  // פונקציה לשליחת הטופס
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validate()) {
      // שליחה של הנתונים (כאן אפשר להוסיף פונקציה לשלוח את הנתונים לשרת)
      console.log('הטופס הושלם בהצלחה');
    }
  };

  return (
    <div className={style.formContainer}>
      <h2>פרטי המזמין</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="name">שם מלא</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={style.input}
          />
          {errors.name && <p className={style.error}>{errors.name}</p>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="email">מייל</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.input}
          />
          {errors.email && <p className={style.error}>{errors.email}</p>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="phone">טלפון</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={style.input}
          />
          {errors.phone && <p className={style.error}>{errors.phone}</p>}
        </div>

        <button type="submit" className={style.submitButton}>
          הרשמה
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
