import { Box, FormControl, FormControlLabel, Input, MenuItem, Paper, Radio, RadioGroup, Select, Typography } from '@mui/material'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import { setQuestionsData } from '../Utils/Common';




function Home() {
  const maxDate = dayjs().subtract(1, 'year');
  const [answerList, setAnswerList] = React.useState([maxDate,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const navigate = useNavigate();
  function componentSelector(question, index) {
    const { componentType } = question.answerSettings;
    switch (componentType) {
      case "input":
        return <h1>
          <Input
            id={"input-" + index}
            label="Number"
            type="number"
            value={answerList[index]}
            onChange={(e) => {
              let newAnswerList = [...answerList];
              newAnswerList[index] = e.target.value;
              setAnswerList(newAnswerList);
            }}
          />
          <br />
          {question.answer}
        </h1>;
      case "select":
        return (<>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              id={"select-" + index}
              value={answerList[index]}
              onChange={(e) => {
                let newAnswerList = [...answerList];
                newAnswerList[index] = e.target.value;
                setAnswerList(newAnswerList);
              }}
            >
              {question.answerOptions.map((option) => (
                <MenuItem value={option.value}>{option.answerText}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </>);
      case "radio":
        return (<>
          <FormControl component="fieldset">
            <RadioGroup
              id={"radio-" + index}
              aria-label={question.questionText}
              name={question.questionText}
              value={answerList[index]}
              onChange={(e) => {
                let newAnswerList = [...answerList];
                newAnswerList[index] = e.target.value;
                setAnswerList(newAnswerList);
              }}>
              {question.answerOptions.map((option) => (
                <FormControlLabel value={option.value} control={<Radio />} label={option.answerText} />
              ))}
            </RadioGroup>
          </FormControl>
          {question.answer}
        </>
        )
      case "datePicker":
        return (<>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              id={"datepicker-" + index}
              label="Date picker"
              value={answerList[index] ? answerList[index] : maxDate}
              maxDate={maxDate}
              defaultCalendarMonth={maxDate}
              onChange={(newValue) => {
                let newAnswerList = [...answerList];
                newAnswerList[index] = newValue;
                setAnswerList(newAnswerList);
              }}
              renderInput={(params) => <Input {...params} />}
            />
          </LocalizationProvider>
          {question.answer?.format('DD/MM/YYYY')}
        </>
        );
    }
  }
  let questions = [
    {
      questionText: "What is the customer's birthday?",
      questionKey: "birthday",
      answer: answerList[0],
      answerSettings:
      {
        answerType: 'date',
        componentType: "datePicker",
      },
    },
    {
      questionText: 'Does the customer have a partner?',
      questionKey:"Partner_1.0",
      answer: answerList[1],
      answerOptions: [
        { answerText: 'True', value: 1 },
        { answerText: 'False', value: 0 },
      ],
      answerSettings:
      {
        answerType: 'binary',
        componentType: "radio",
      },
    },
    {
      questionText: 'Does the customer have an dependents?',
      questionKey:"Dependents_1.0",
      answer: answerList[2],
      answerOptions: [
        { answerText: 'True', value: 1 },
        { answerText: 'False', value: 0 },
      ],
      answerSettings:
      {
        answerType: 'binary',
        componentType: "radio",
      },
    },
    {
      questionText: 'How many months have you been a customer of the company?',
      questionKey:"tenure",
      answer: answerList[3],
      answerOptions: [
        { min: 0, max: 72 },
      ],
      answerSettings:
      {
        answerType: 'int',
        componentType: "input",
      },
    },
    {
      questionText: 'Does the customer have internet service?',
      questionKey:"InternetService_1.0",
      answer: answerList[4],
      answerOptions: [
        { answerText: 'DSL', value: 2 },
        { answerText: 'Fiber optic', value: 1 },
        { answerText: 'No', value: 0 },
      ],
      answerSettings:
      {
        answerType: 'int',
        componentType: "select",
      },
    },
    {
      questionText: 'Does the customer have online security?',
      questionKey:"OnlineSecurity_1.0",
      answer: answerList[5],
      answerOptions: [
        { answerText: 'True', value: 1 },
        { answerText: 'False', value: 0 },
      ],
      answerSettings:
      {
        answerType: 'binary',
        componentType: "radio",
      },
    },
    {
      questionText: 'Does the customer have tech support?',
      questionKey:"TechSupport_1.0",
      answer: answerList[6],
      answerOptions: [
        { answerText: 'True', value: 1 },
        { answerText: 'False', value: 0 },
      ],
      answerSettings:
      {
        answerType: 'binary',
        componentType: "radio",
      },
    },
    {
      questionText: "How long is the customer's contract period?",
      questionKey:"Contract",
      value: answerList[7],
      answerOptions: [
        { answerText: 'Month-to-month', value: 0 },
        { answerText: 'One year', value: 1 },
        { answerText: 'Two year', value: 2 },
      ],
      answerSettings:
      {
        answerType: 'int',
        componentType: "select",
      },
    },
    {
      questionText: 'Does the customer have paperless billing?',
      questionKey:"PaperlessBilling_1.0",
      answer: answerList[8],
      answerOptions: [
        { answerText: 'True', value: 1 },
        { answerText: 'False', value: 0 },
      ],
      answerSettings:
      {
        answerType: 'binary',
        componentType: "radio",
      },
    },
    {
      questionText: 'What is the payment method of the customer?',
      questionKey:"PaymentMethod",
      answer: answerList[9],
      answerOptions: [
        { answerText: 'Electronic check', value: 0 },
        { answerText: 'Mailed check', value: 1 },
        { answerText: 'Bank transfer (automatic)', value: 2 },
        { answerText: 'Credit card (automatic)', value: 3 },
      ],
      answerSettings:
      {
        answerType: 'int',
        componentType: "select",
      },
    },
    {
      questionText: 'What is the monthly charge of the customer?',
      questionKey:"MonthlyCharges",
      answer: answerList[10],
      answerSettings:
      {
        answerType: 'int',
        componentType: "input",
      },
    },
    {
      questionText: 'What is the total charge of the customer?',
      questionKey:"TotalCharges",
      answer: answerList[11],
      answerSettings:
      {
        answerType: 'int',
        componentType: "input",
      },
    },


  ]

  const steps = questions.map((question, index) => {
    return {
      label: 'Customer Information - ' + (index + 1) + '/12',
      questionText: question.questionText,
      questionComponent: componentSelector(question, index),
    }
  })


  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    setQuestionsData(questions)
    navigate('/result');
  }
  return (
    <div>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 240,
          width: '100vh',
          backgroundColor: 'white',
          alignItems: 'center',
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.dark',
          }}
        >
          <Typography>{steps[activeStep].label}</Typography>
        </Paper>
        <Box sx={{ height: 255, width: '90%', p: 2 }}>
          <Typography variant="h5">
            {steps[activeStep].questionText}
          </Typography>
          {steps[activeStep].questionComponent}
        </Box>
        <MobileStepper
          variant="progress"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ width: "80%", flexGrow: 1 }}
          nextButton={ activeStep === maxSteps - 1 ? 
          <>
            <Button 
              size="small" 
              sx={{
                color:"red",
                alignItems: 'center',
                justifyContent: 'center',
                }} 
              onClick={handleSubmit} >
                <div>
                  PREDICT
                </div>
                <div>
                  <CheckIcon />
                </div>
            </Button>
          </> 
          : 
          <>
            <Button size="small" onClick={handleNext}>
              Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
                
            </Button>
                
          </> } 
              
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
      </Paper>


    </div>
  )
}

export default Home