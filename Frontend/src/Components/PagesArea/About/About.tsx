import { Box, Grid, Typography } from '@mui/material';

export function About(): JSX.Element {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', direction: 'rtl' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src="/images/stepbystepnails.jpg"
            alt="Reflexology" loading='lazy'
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            על ReflexoYoga
          </Typography>
          <Typography variant="body1">
            גלו את כוח הרפלקסולוגיה והיוגה. אנו מספקים טיפולים הוליסטיים
            ותרגולי יוגה מותאמים אישית שיעזרו לכם להשיג רווחה ושיווי משקל
            בחייכם.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
