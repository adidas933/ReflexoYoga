import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from '@mui/material';
import ReactClampLine from 'react-clamp-line';


interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  onOrderNow: (serviceName: string) => void;
}

const ServiceCard = ({
  title,
  description,
  image,
  onOrderNow,
}: ServiceCardProps) => {
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
      <CardMedia component="img" height="140" image={image} alt={title}loading='lazy' />
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
          
          <ReactClampLine
            type="text"
            id={title}
            text={description}
            lines={3}
            ellipsis="..."
          />
        </Typography>
        <Button
          onClick={() => onOrderNow(title)}
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
