import React from 'react';
import { Box, Typography, Button, Slide, Fade } from '@mui/material';

const SelectionBar = ({ selectedContainer, onBack, onContinue }) => {
  const open = !!selectedContainer;
  if (!open) return null;
  const totalPrice = (
    selectedContainer.price_before_vat +
    (selectedContainer.price_before_vat * selectedContainer.vat / 100) +
    (selectedContainer.transport_cost || 0)
  ).toFixed(2);
  return (
    <Slide in={open} direction="up" timeout={{ enter: 400, exit: 250 }}>
      <Fade in={open} timeout={{ enter: 400, exit: 250 }}>
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: '#1B4332',
            borderTop: '1px solid #74C69D',
            px: { xs: 2, sm: 4 },
            py: { xs: 2, sm: 2 },
            zIndex: 1300,
            boxShadow: '0 -2px 16px 0 rgba(64,145,108,0.10)',
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 2, md: 4 },
            maxWidth: '1200px',
            mx: 'auto',
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ color: '#74C69D', fontWeight: 600, fontSize: { xs: '1.1rem', md: '1.2rem' } }}>
                {selectedContainer.size} Yard Skip
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ color: '#74C69D', fontWeight: 700, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                  £{totalPrice}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                  {selectedContainer.hire_period_days} day hire
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onBack}
                sx={{
                  borderColor: '#74C69D',
                  color: '#74C69D',
                  fontWeight: 600,
                  width: { xs: '50%', md: 'auto' },
                  '&:hover': {
                    borderColor: '#40916C',
                    backgroundColor: 'rgba(116, 198, 157, 0.08)',
                  },
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={onContinue}
                sx={{
                  backgroundColor: '#74C69D',
                  color: '#081C15',
                  fontWeight: 700,
                  width: { xs: '50%', md: 'auto' },
                  '&:hover': {
                    backgroundColor: '#40916C',
                  },
                }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Slide>
  );
};

export default SelectionBar; 