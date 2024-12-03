import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Avatar,
} from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import Arrow from './Arrow';

export function Home(): JSX.Element {
  const studioAddress = '1600 Amphitheatre Parkway, Mountain View, CA'; // Replace with your studio address
  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(
    studioAddress
  )}`;
  const wazeLink = `https://www.waze.com/ul?q=${encodeURIComponent(
    studioAddress
  )}`;

  const navigate = useNavigate();

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Change slide every 3 seconds
    fade: true, // Smooth fade transition
    nextArrow: <Arrow direction="right" />, // Right arrow
    prevArrow: <Arrow direction="left" />, // Left arrow
  };

  const CarouselList = [
    {
      name: 'reflexoyoga',
      image: '/images/butterflyopenlegs.jpg',
      header: 'ברוכים הבאים ל-ReflexoYoga',
      subHeader: 'הדרך שלך לשלווה מתחילה כאן',
      buttonLink: 'about',
      buttonName: 'למד עוד',
    },
    {
      name: 'yoga',
      image: '/images/yoga-background.jpg',
      header: 'גלו את דרך היוגה',
      subHeader: ' מצאו שלום, איזון וכוח בכל אימון.',
      buttonLink: 'about',
      buttonName: 'למד עוד',
    },
    {
      name: 'contact',
      image: '/images/contact-background.jpg',
      header: 'צור קשר',
      subHeader: 'נשמח לשמוע ממך. צור קשר עוד היום!',
      buttonLink: 'contact',
      buttonName: 'צור קשר',
    },
    {
      name: 'ice bath',
      image: '/images/icebath-background.jpg',
      header: 'טיפול בקרח',
      subHeader: 'בואו לסדנאת אמבטיית קרח',
      buttonLink: 'icebath',
      buttonName: 'לתיאום עכשיו!',
    },
    {
      name: 'sadhu nails',
      image: '/images/nails-background.jpg',
      header: 'לדרוך על מסמרים',
      subHeader: 'כמה זמן תצליחו לעמוד על המסמרים?',
      buttonLink: 'nails',
      buttonName: 'לשיעור ניסיון!',
    },
  ];

  const instructors = [
    {
      name: 'עדי כהן',
      specialty: 'מורה ליוגה דינאמית',
      image: '/images/instructor1.jpg',
    },
    {
      name: 'ליאור בס',
      specialty: 'מומחית ברפלקסולוגיה',
      image: '/images/instructor2.jpg',
    },
    {
      name: 'יעל לוי',
      specialty: 'יוגה שיקומית',
      image: '/images/instructor3.jpg',
    },
  ];

  const plans = [
    {
      name: 'תוכנית בסיסית',
      price: '₪200 לחודש',
      image: '/images/basic-plan.jpg',
    },
    {
      name: 'תוכנית פרימיום',
      price: '₪400 לחודש',
      image: '/images/premium-plan.jpg',
    },
    {
      name: 'תוכנית ריטריט',
      price: '₪800 לחודש',
      image: '/images/retreat-plan.jpg',
    },
  ];

  const customers = [
    {
      text: 'חוויה מדהימה, שינתה לי את החיים!',
      image: '/images/client1.jpg',
    },
    {
      text: 'שירות מקצועי ואדיב!',
      image: '/images/client2.jpg',
    },
    {
      text: 'ממליץ בחום על השיעורים והריטריטים!',
      image: '/images/client3.jpg',
    },
  ];

  const classes = [
    {
      title: 'יוגה בבוקר',
      description: 'התחילו את היום באנרגיה חיובית עם יוגה נעימה.',
      image: '/images/morning-yoga.jpg',
    },
    {
      title: 'רפלקסולוגיה בערב',
      description: 'שחרור מתחים בעזרת טיפול רפלקסולוגי בערב.',
      image: '/images/evening-reflexology.jpg',
    },
    {
      title: 'ריטריט סוף שבוע',
      description: 'חוויית ריטריט מושלמת להטענת מצברים.',
      image: '/images/weekend-retreat.jpg',
    },
  ];

  return (
    <Box className="home-container">
      {/* Slideshow Carousel */}
      <Slider {...settings}>
        {CarouselList.map((item) => (
          <Box
            key={item.name}
            sx={{
              height: '80vh',
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
              direction: 'rtl', // Right-to-left layout for Hebrew
            }}
          >
            <Typography variant="h2" sx={{ mb: 2 }} className="fade-in">
              {item.header}
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }} className="fade-in">
              {item.subHeader}
            </Typography>
            <ScrollLink to={item.buttonLink} smooth={true} duration={500}>
              <Button
                onClick={() => navigate(`${item.buttonLink}`)}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {item.buttonName}
              </Button>
            </ScrollLink>
          </Box>
        ))}
      </Slider>

      {/* Bubbles for Instructors */}
      <Typography variant="h4" sx={{ textAlign: 'center', mt: 5 }}>
        הכירו את המדריכים שלנו
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ mt: 3, textAlign: 'center' }}
      >
        {instructors.map((instructor, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box>
              <Avatar
                src={instructor.image}
                alt={instructor.name}
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto',
                  border: '4px solid #f50057',
                }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {instructor.name}
              </Typography>
              <Typography variant="body2">{instructor.specialty}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* More Information Section */}
      <Box sx={{ mt: 5, px: 3, direction: 'rtl' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mt: 5, mb: 3 }}>
          למה רפלקסולוגיה ויוגה?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          רפלקסולוגיה ויוגה מסייעות בהפחתת מתח, שיפור הגמישות והגעה למצב של
          שלווה פנימית. הצטרפו אלינו למסע של רווחה אישית.
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ display: 'block', mx: 'auto' }}
        >
          למידע נוסף
        </Button>
      </Box>

      {/* Customer Testimonials */}
      <Box sx={{ mt: 5, px: 3, direction: 'rtl' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
          מה הלקוחות שלנו אומרים
        </Typography>

        <Slider {...settings}>
          {' '}
          {/* Use the same settings for consistency */}
          {customers.map((testimonial, index) => (
            <Box key={index} sx={{ textAlign: 'center', p: 3 }}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <img
                  src={testimonial.image}
                  alt={`testimonial ${index + 1}`}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  "{testimonial.text}"
                </Typography>
              </Paper>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Plans */}
      <Box sx={{ mt: 5, px: 3, direction: 'rtl' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
          תוכניות המחירים שלנו
        </Typography>
        <Grid container spacing={3}>
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                }}
              >
                <img
                  src={plan.image}
                  alt={`plan ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {plan.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {plan.price}
                </Typography>
                <Button variant="outlined" color="secondary" sx={{ mb: 2 }}>
                  הצטרף עכשיו
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Classes */}
      <Box sx={{ mt: 5, px: 3, direction: 'rtl' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
          כיתות ושיעורים
        </Typography>
        <Grid container spacing={3}>
          {classes.map((classItem, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                  }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {classItem.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {classItem.description}
                </Typography>
                <Button variant="outlined" color="secondary">
                  הצטרף לשיעור
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Location Section */}
        <Box sx={{ mt: 5, px: 3, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            איפה אנחנו נמצאים?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            הכיתות שלנו ממוקמות במקום נגיש ונוח. מצאו אותנו בעזרת המפות!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            href={googleMapsLink}
            target="_blank"
          >
            פתח ב-Google Maps
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ m: 1 }}
            href={wazeLink}
            target="_blank"
          >
            פתח ב-Waze
          </Button>
        </Box>

        {/* קריאה לפעולה להצטרפות */}
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            הצטרפו לניוזלטר שלנו
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            קבלו טיפים מיוחדים, מבצעים ועדכונים ישירות למייל שלכם.
          </Typography>
          <TextField
            label="הכניסו את כתובת המייל שלכם"
            variant="outlined"
            sx={{ mb: 2, width: '300px' }}
          />
          <Button variant="contained" color="primary">
            הצטרפו
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
