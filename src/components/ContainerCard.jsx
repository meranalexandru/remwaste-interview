import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, Fade } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { useState, useEffect } from 'react';

const ContainerCard = ({ container, isSelected, onSelect, isModalOpen }) => {
  const [displayPrice, setDisplayPrice] = useState('0.00');
  const [displaySize, setDisplaySize] = useState(container.size);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const basePrice = container.price_before_vat;
      const vatAmount = (basePrice * container.vat) / 100;
      const transportCost = container.transport_cost || 0;
      return (basePrice + vatAmount + transportCost).toFixed(2);
    };

    let startTime = null;
    const duration = 500;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 0.34 + 1.56 * Math.pow(progress - 1, 3) + 0.64 * Math.pow(progress - 1, 2);
      setDisplaySize(container.size);
      setDisplayPrice(calculateTotalPrice());
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [container]);

  const getContainerImage = () => {
    const size = container.size;
    return `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;
  };

  return (
    <Card
      onClick={() => onSelect(container)}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: isSelected ? '2.5px solid #74C69D' : '1px solid #2D6A4F',
        boxShadow: isSelected
          ? '0 0 0 4px rgba(116,198,157,0.15), 0 0 20px 2px #74C69D'
          : '0 1px 4px 0 rgba(0,0,0,0.08)',
        cursor: 'pointer',
        backgroundColor: isSelected ? 'rgba(116, 198, 157, 0.08)' : 'transparent',
        transition: 'border 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s cubic-bezier(0.4,0,0.2,1), background 0.3s',
        filter: isModalOpen && !isSelected ? 'blur(1.5px) grayscale(0.3) opacity(0.7)' : 'none',
        zIndex: isSelected ? 2 : 1,
      }}
    >
      <Fade in={isSelected} timeout={400}>
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 8, sm: 12 },
            right: { xs: 8, sm: 12 },
            zIndex: 3,
            backgroundColor: '#74C69D',
            borderRadius: '50%',
            boxShadow: '0 0 8px 2px #74C69D',
            p: 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isSelected ? 'popIn 0.4s cubic-bezier(0.4,0,0.2,1)' : 'none',
            '@keyframes popIn': {
              '0%': { transform: 'scale(0.7)', opacity: 0 },
              '80%': { transform: 'scale(1.15)', opacity: 1 },
              '100%': { transform: 'scale(1)', opacity: 1 },
            },
          }}
        >
          <CheckCircleIcon sx={{ color: '#081C15', fontSize: { xs: 22, sm: 26 } }} />
        </Box>
      </Fade>
      <CardContent sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 1.5, sm: 2, md: 3 },
      }}>
        <Box sx={{
          width: '100%',
          height: { xs: '150px', sm: '180px', md: '200px' },
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '4px',
          mb: { xs: 1, sm: 2 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url(${getContainerImage()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: 'translateZ(0)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          },
          '&:hover::before': {
            transform: 'scale(1.05) translateZ(0)',
          }
        }}>
          <Box sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 2,
            bgcolor: '#74C69D',
            color: '#081C15',
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            fontSize: { xs: '0.85rem', sm: '0.95rem' },
            fontWeight: 700,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
            letterSpacing: '0.02em',
            pointerEvents: 'none',
            minWidth: 60,
            textAlign: 'center',
            lineHeight: 1.2,
            border: '1.5px solid #40916C',
          }}>
            {container.size} Yards
          </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          mt: 1,
          mb: 1.5,
        }}>
          <Typography
            sx={{
              color: '#B7E4C7',
              fontWeight: 800,
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              textShadow: '0 2px 8px rgba(64,145,108,0.18)',
              letterSpacing: '0.01em',
              lineHeight: 1.1,
            }}
          >
            £{displayPrice}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}
        >
          {displaySize} Yard Container
        </Typography>
        <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap', mb: { xs: 1, sm: 2 } }}>
          {container.allowed_on_road ? (
            <Chip
              icon={<DirectionsCarIcon />}
              label="Road Placement"
              color="success"
              size="small"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            />
          ) : (
            <Chip
              icon={<WarningIcon />}
              label="No Road Placement"
              color="error"
              size="small"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                backgroundColor: 'rgba(211, 47, 47, 0.15)',
                color: '#ff8a80',
                border: '1px solid rgba(211, 47, 47, 0.3)',
                '& .MuiChip-icon': {
                  color: '#ff8a80',
                },
                '&:hover': {
                  backgroundColor: 'rgba(211, 47, 47, 0.25)',
                },
              }}
            />
          )}
          {container.allows_heavy_waste && (
            <Chip
              icon={<DeleteIcon />}
              label="Heavy Waste"
              color="primary"
              size="small"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            />
          )}
          {container.transport_cost && (
            <Chip
              icon={<LocalShippingIcon />}
              label={`Transport: £${container.transport_cost}`}
              color="secondary"
              size="small"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            />
          )}
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
        >
          Hire Period: {container.hire_period_days} days
        </Typography>
        {container.per_tonne_cost && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            Per Tonne Cost: £{container.per_tonne_cost}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ContainerCard; 