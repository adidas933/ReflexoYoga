import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ServiceCard = ({ title, description, image, link }: ServiceCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        direction: 'rtl',
      }}
    >
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ minHeight: '48px', overflow: 'hidden' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minHeight: '60px', overflow: 'hidden' }}
        >
          {description}
        </Typography>
        <Button
          component={NavLink}
          to={link}
          sx={{
            marginTop: '10px',
            backgroundColor: '#6a1b9a',
            color: 'white',
            '&:hover': { backgroundColor: '#9c4dcc' },
            alignSelf: 'center',
          }}
        >
          הזמן עכשיו
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
