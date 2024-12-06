import { Box } from '@mui/material';

const Arrow = ({ className, style, onClick, direction }: any) => {
  const isLeftArrow = direction === 'left';

  return (
    <Box
      className={className}
      sx={{
        ...style,
        zIndex: 100,
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', // Added shadow to create depth
        '&:hover': {
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.6)', // Increase shadow on hover
        },
        position: 'absolute',
        top: '50%',
        [isLeftArrow ? 'left' : 'right']: '30px', // Position the arrow based on direction
        transform: 'translateY(-50%)', // Center the arrow vertically
      }}
      onClick={onClick}
    ></Box>
  );
};

export default Arrow;
