import { Paper } from '@mui/material'
import React from 'react'
import contractTypesWithTenure from '../Assets/contract-types-with-tenure-year.png'
import pieChurnAndWithGenderPie from '../Assets/Pie-Churn.png'
import paymentMethodsWithTenure from '../Assets/tenure-with-payment-method.png'

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const images = [
  {
    label: 'Churn Rate',
    imgPath: pieChurnAndWithGenderPie,
    describtion: 
    "This is a pie chart that shows the churn rate of the customers. "+
     "The churn rate is 26.5%. The churn rate is the percentage of customers"+
     " who have left the company within a certain period of time. The other chart shows the distribution of Churn people by gender.",
  },
  {
    label: 'Customer Contract Types',
    imgPath: contractTypesWithTenure,
    describtion:
    "This is a area chart that shows the distribution of customers by contract types "+
    "and tenure years. The tenure is the length of time a customer has been with the company. "+
    "The contract types are month-to-month, one year, and two years. The chart shows that the majority of customers "+
    "have a month-to-month contract type."

  },
  {
    label: 'Payment Method',
    imgPath: paymentMethodsWithTenure,
    describtion:
    "This is a area chart that shows the distribution of customers by payment methods "+
    "and tenure years. The tenure is the length of time a customer has been with the company. "+
    "The payment methods are electronic check, mailed check, bank transfer, and credit card. "+
    "The chart shows that the majority of customers have an mailed check payment method."

  },
];


function Statistic() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 240,
        width: '100vh',
        backgroundColor: 'white',
      }}
    >
      
        <Box sx={{ minHeight: 255, minWidth: 400,  p: 4}}>
          <img
            src={images[activeStep].imgPath}
            alt={images[activeStep].label}
            style={{ width: '800px', height: '320px' }}
          />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1,textAlign:"center",mt:3 }}>
            {images[activeStep].label}
          </Typography>
          <hr></hr>
          <Typography variant="h6" component="p" sx={{ 
            flexGrow: 1,
            textAlign:"left",
            color: 'grey.800',
            fontSize: 20,
            fontWeight: 500,
            fontFamily: 'Roboto',
            letterSpacing: 0.15,
            lineHeight: '130%',
            }}>
            {images[activeStep].describtion}
          </Typography>
        </Box>
        <Box sx={{ width: 400, flexGrow: 1 }}>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </Paper>
  )
}

export default Statistic