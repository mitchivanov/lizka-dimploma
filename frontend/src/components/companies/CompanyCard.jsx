import { Paper, Box, Typography, Button, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3,
        borderRadius: 2,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          mb: 2, 
          height: 140,
          overflow: 'hidden'
        }}
      >
        <img 
          src={company.logo || "https://via.placeholder.com/100x100"} 
          alt={company.name} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain'
          }} 
        />
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography 
          variant="h6" 
          align="center" 
          fontWeight={600} 
          sx={{ 
            mb: 1,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {company.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            mb: 1,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {company.slogan}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mb: 2,
          height: 30
        }}>
          <Rating value={company.rating} precision={0.1} readOnly />
          <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
            {company.rating.toFixed(1)}
          </Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 3,
            flexGrow: 1,
            height: 60,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis'
          }}
        >
          {company.description}
        </Typography>
      </Box>
      
      <Button 
        variant="outlined" 
        fullWidth 
        component={Link} 
        to={`/company/${company.id}`}
        sx={{ mt: 'auto', height: 36 }}
      >
        Подробнее
      </Button>
    </Paper>
  );
};

export default CompanyCard; 