import React from 'react';
import { Box, Button } from '@mui/material';
import MapPinIcon from '@mui/icons-material/Room';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShieldIcon from '@mui/icons-material/Security';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const steps = [
  { label: 'Postcode', icon: <MapPinIcon /> },
  { label: 'Waste Type', icon: <DeleteIcon /> },
  { label: 'Select Skip', icon: <LocalShippingIcon /> },
  { label: 'Permit Check', icon: <ShieldIcon /> },
  { label: 'Choose Date', icon: <CalendarMonthIcon /> },
  { label: 'Payment', icon: <CreditCardIcon /> },
];

const currentStep = 2;

const getStepColor = (idx) => {
  if (idx === currentStep) return '#74C69D';
  if (idx < currentStep) return '#40916C';
  return '#2D6A4F';
};

const Header = () => (
  <Box
    sx={{
      width: '100%',
      bgcolor: 'rgba(8,28,21,0.98)',
      py: { xs: 1, sm: 2 },
      px: { xs: 0.5, sm: 2, md: 4 },
      display: 'flex',
      justifyContent: 'center',
      borderBottom: '1px solid #2D6A4F',
      zIndex: 10,
      position: 'sticky',
      top: 0,
      backdropFilter: 'blur(2px)',
      boxShadow: '0 2px 8px 0 rgba(64,145,108,0.04)',
    }}
  >
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 0.5, sm: 2, md: 4 },
      overflowX: 'auto',
      width: '100%',
      maxWidth: '1200px',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': { height: 4 },
      '&::-webkit-scrollbar-thumb': { background: '#2D6A4F', borderRadius: 2 },
    }}>
      {steps.map((step, idx) => (
        <Box key={step.label} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            startIcon={
              <span style={{ color: getStepColor(idx), display: 'flex', alignItems: 'center' }}>
                {React.cloneElement(step.icon, { fontSize: 'inherit', style: { fontSize: idx === currentStep ? 24 : 20 } })}
              </span>
            }
            disabled={idx > currentStep}
            sx={{
              color: getStepColor(idx),
              fontWeight: 600,
              textTransform: 'none',
              bgcolor: 'transparent',
              cursor: idx <= currentStep ? 'pointer' : 'not-allowed',
              opacity: idx === currentStep ? 1 : idx < currentStep ? 0.95 : 0.5,
              '&:hover': {
                color: getStepColor(idx),
                bgcolor: 'transparent',
              },
              fontSize: { xs: '0.92rem', sm: '1rem' },
              minWidth: 'unset',
              px: { xs: 0.5, sm: 1.5 },
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              letterSpacing: '0.03em',
              transition: 'color 0.2s, font-size 0.2s',
            }}
          >
            <span style={{ color: getStepColor(idx) }}>{step.label}</span>
          </Button>
          {idx < steps.length - 1 && (
            <Box
              sx={{
                width: { xs: 16, sm: 32, md: 40 },
                height: 2,
                bgcolor: idx < currentStep ? '#40916C' : '#2D6A4F',
                mx: { xs: 0.25, sm: 1 },
                borderRadius: 1,
                transition: 'background 0.3s',
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  </Box>
);

export default Header; 