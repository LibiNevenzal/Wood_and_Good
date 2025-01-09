import { Link, Outlet, useNavigate } from "react-router-dom";
import React from "react";
import style from "./Home.module.css";
import woodImage from "./wood.png";
import exampleImage from "./example.png";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Typography, IconButton, Grid } from "@mui/material";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = (): void => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    return (
        <>
            {/* חלק אמצעי - תמונה וכיתוב */}
            <div className={style.heroSection}>
                <img
                    src={woodImage}
                    alt="Wooden background"
                    className={style.heroImage}
                />
            </div>

            {/* תוכן נוסף עם ID */}
            <div id="about-section" className={style.aboutSection}>
                <Typography variant="h6" gutterBottom>
                    הכרה על ידי הקהילה הבינלאומית
                </Typography>
                <Typography variant="body1" paragraph>
                    הכרה על ידי הקהילה הבינלאומית – נדרשת הכרה של מדינה עיקרית ורלוונטית (לפי התאוריה הקונסטיטובית).
                    ישנן שתי תאוריות לעניין דרישת ההכרה במשפט הבין‌לאומי: תאוריית המדינות הדקלרטיבית, לפיה די בהכרזה של מדינה על ידי ישות על מנת שתהיה מדינה 
                    (כלומר תנאים 1–4 הם הכרחיים ומספקים), ותאוריית המדינות הקונסטיטוטיבית, לפיה די בהכרה על ידי הקהילה הבינלאומית 
                    (כלומר תנאי 5 הוא הכרחי ויכול לספק בתנאים מסוימים).
                </Typography>
                <Typography variant="body1" paragraph>
                    התאוריה הדקלרטיבית מתבססת על אמנת מונטבידאו משנת 1933, בה נקבע בסעיף 3 כי אין דרישה להכרה בין‌לאומית בקיומה של מדינה. 
                    מאידך, אמנה זו מציינת כדרישה להכרת מדינה את היכולת של אותה ישות טריטוריאלית להתקשר באמנות בינלאומיות עם ישויות אחרות,
                    היינו נדרשת הכרה דה פקטו מכוח סעיף 1(ד) של האמנה, אף אם אין הכרה דקלרטיבית. כיום, הנוהג הבין‌לאומי מתבסס על התאוריה הקונסטיטוטיבית, 
                    ומדינות מוכרות אף אם איבדו את כל ארבעת הקריטריונים הראשונים. דוגמה לכך היא ההכרה בכווית כמדינה גם בעת כיבושה על ידי עיראק במלחמת המפרץ, 
                    והכרת בעלות הברית בצרפת החופשית כמדינה, אף בהיעדר טריטוריה ושליטה בפועל בטריטוריה.
                </Typography>
                <Typography variant="body1" paragraph>
                    ההבחנה המקובלת כיום היא של מדינה דה יורה – מדינה המקיימת את כל התנאים, כגון קנדה (למעט מקרים חריגים כמו במלחמת העולם השנייה), 
                    ומדינה דה פקטו – מדינה המקיימת את כל התנאים אך אין בה הכרה בין‌לאומית, כגון סומלילנד.
                </Typography>
                <Typography variant="body1" paragraph>
                    במצב בו לא קיים שלטון, מתקיים מצב של אנרכיה – ביטול כל צורה של שלטון, כפייה והיררכיה חברתית. 
                    לדוגמה: מדינת צרפת בזמן מלחמת העולם השנייה לאחר שנכבשה על ידי הגרמנים, חולקה לשניים.
                </Typography>
            </div>
  {/* גלריה */}
  <div id="gallery-section" className={style.gallerySection}>
                <Typography variant="h6" gutterBottom>
                    גלריה
                </Typography>
                <Grid container spacing={2}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={exampleImage}
                                    alt={`תמונה ${index + 1}`}
                                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                                />
                                <Typography variant="caption">
                                    תמונה {index + 1}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </div>
            {/* חלק תחתון - כפתור גישה עם קישורים נוספים */}
            <footer>
                <Box
                    sx={{
                        backgroundColor: "#D2B48C",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    {/* כותרת */}
                    <Typography variant="h6" gutterBottom>
                        חנות
                    </Typography>

                    {/* קישורים */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            marginBottom: "16px",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            component={Link}
                            to="/shop/ready-signs"
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            שלטים מוכנים
                        </Typography>
                        <Typography
                            component={Link}
                            to="/shop/custom-signs"
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            שלטים בהזמנה אישית
                        </Typography>
                    </Box>

                    {/* מספר טלפון */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <IconButton aria-label="call" href="tel:0508765439">
                            <PhoneIcon />
                        </IconButton>
                        <Typography variant="body1">050-876-5439</Typography>
                    </Box>
                </Box>
            </footer>

            <div className={style.content}>
                <Outlet />
            </div>
        </>
    );
};

export default Home;
