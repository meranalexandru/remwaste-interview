import { ThemeProvider, CssBaseline, Container, Typography, Box, Grid } from '@mui/material';
import ContainerCard from './components/ContainerCard';
import containerData from './data/index.json';
import Header from './components/Header';
import SelectionBar from './components/SelectionBar';
import { theme } from './styles/theme';
import { useContainerSelection } from './hooks/useContainerSelection';
import { PAGE_TITLE, PAGE_SUBTITLE, STYLES } from './constants';

function App() {
  const {
    selectedContainer,
    handleContainerSelect,
    handleClose,
    handleContinue,
  } = useContainerSelection();

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          ...STYLES.pageContainer,
          pb: selectedContainer ? { xs: 10, sm: 8 } : 0,
        }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h2" 
              component="h1" 
              align="center" 
              gutterBottom
              sx={STYLES.title}
            >
              {PAGE_TITLE}
            </Typography>
            <Typography
              align="center"
              sx={STYLES.subtitle}
            >
              {PAGE_SUBTITLE}
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              {containerData.map((container) => (
                <Grid item key={container.size} xs={12} sm={6} md={4}>
                  <ContainerCard 
                    container={container} 
                    isSelected={selectedContainer?.size === container.size}
                    onSelect={handleContainerSelect}
                    isModalOpen={!!selectedContainer}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>

          <SelectionBar 
            selectedContainer={selectedContainer} 
            onBack={handleClose} 
            onContinue={handleContinue} 
          />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
