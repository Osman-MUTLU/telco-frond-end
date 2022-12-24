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
import { setQuestionsData,setResultData } from '../Utils/Common';




function Home() {
  const maxDate = dayjs().subtract(1, 'year');
  const [answerList, setAnswerList] = React.useState([
    maxDate,'true','true',0,'DSL',
    'true','true','Month-to-month','true','Electronic check',0,0,0]);
  const navigate = useNavigate();
  function componentSelector(question, index) {
    const { componentType } = question.answerSettings;
    switch (componentType) {
      case "input":
        return <>
          <Input
            id={"input-" + index}
            label="Number"
            type="number"
            style={{ 
              fontSize: '1.5rem',
            }}
            value={answerList[index]}
            onChange={(e) => {
              let newAnswerList = [...answerList];
              newAnswerList[index] = e.target.value;
              setAnswerList(newAnswerList);
            }}
          />
        </>;
      case "select":
        return (<>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              id={"select-" + index}
              value={answerList[index]}
              style={{ fontSize: '1rem' }}
              onChange={(e) => {
                let newAnswerList = [...answerList];
                newAnswerList[index] = e.target.value;
                setAnswerList(newAnswerList);
              }}
            >
              {question.answerOptions.map((option) => (
                <MenuItem value={option.value} >{option.answerText}</MenuItem>
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
                <FormControlLabel style={
                  {
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }
                } value={option.value} control={<Radio/>} label={option.answerText} />
              ))}
            </RadioGroup>
          </FormControl>
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
              renderInput={(params) => <Input style={{ 
                fontSize: '1.5rem',
                textAlign: 'center',
              }} {...params} />}
            />
          </LocalizationProvider>
        </>
        );
      default:
        return <></>;
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
      questionKey:"hasPartner",
      answer: answerList[1],
      answerOptions: [
        { answerText: 'True', value: "true" },
        { answerText: 'False', value: "false" },
      ],
      answerSettings:
      {
        answerType: 'binary',
        componentType: "radio",
      },
    },
    {
      questionText: 'Does the customer have an dependents?',
      questionKey:"hasDependents",
      answer: answerList[2],
      answerOptions: [
        { answerText: 'True', value: "true" },
        { answerText: 'False', value: "false" },
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
      questionKey:"InternetService",
      answer: answerList[4],
      answerOptions: [
        { answerText: 'DSL', value: 'DSL' },
        { answerText: 'Fiber optic', value: 'Fiber optic' },
        { answerText: 'No', value: 'No' },
      ],
      answerSettings:
      {
        answerType: 'string',
        componentType: "select",
      },
    },
    {
      questionText: 'Does the customer have online security?',
      questionKey:"hasOnlineSecurity",
      answer: answerList[5],
      answerOptions: [
        { answerText: 'True', value: 'true' },
        { answerText: 'False', value: 'false' },
      ],
      answerSettings:
      {
        answerType: 'binary',
        componentType: "radio",
      },
    },
    {
      questionText: 'Does the customer have tech support?',
      questionKey:"hasTechSupport",
      answer: answerList[6],
      answerOptions: [
        { answerText: 'True', value: "true" },
        { answerText: 'False', value: "false" },
      ],
      answerSettings:
      {
        answerType: 'binary',
        componentType: "radio",
      },
    },
    {
      questionText: "How long is the customer's contract period?",
      questionKey:"contractType",
      answer: answerList[7],
      answerOptions: [
        { answerText: 'Month-to-month', value: 'Month-to-month' },
        { answerText: 'One year', value: 'One year' },
        { answerText: 'Two year', value: 'Two year' },
      ],
      answerSettings:
      {
        answerType: 'string',
        componentType: "select",
      },
    },
    {
      questionText: 'Does the customer have paperless billing?',
      questionKey:"paperlessBilling",
      answer: answerList[8],
      answerOptions: [
        { answerText: 'True', value: "true" },
        { answerText: 'False', value: "false" },
      ],
      answerSettings:
      {
        answerType: 'binary',
        componentType: "radio",
      },
    },
    {
      questionText: 'What is the payment method of the customer?',
      questionKey:"paymentMethod",
      answer: answerList[9],
      answerOptions: [
        { answerText: 'Electronic check', value: 'Electronic check' },
        { answerText: 'Mailed check', value: 'Mailed check' },
        { answerText: 'Bank transfer (automatic)', value: 'Bank transfer (automatic)' },
        { answerText: 'Credit card (automatic)', value: 'Credit card (automatic)' },
      ],
      answerSettings:
      {
        answerType: 'string',
        componentType: "select",
      },
    },
    {
      questionText: 'What is the monthly charge of the customer?',
      questionKey:"monthlyCharges",
      answer: answerList[10],
      answerSettings:
      {
        answerType: 'int',
        componentType: "input",
      },
    },
    {
      questionText: 'What is the total charge of the customer?',
      questionKey:"totalCharges",
      answer: answerList[11],
      answerSettings:
      {
        answerType: 'int',
        componentType: "input",
      },
    },
    {
      questionText: 'What is the total service of the customer?',
      questionKey:"totalServices",
      answer: answerList[12],
      answerOptions: [
        { answerText: '0', value: 0 },
        { answerText: '1', value: 1 },
        { answerText: '2', value: 2 },
        { answerText: '3', value: 3 },
        { answerText: '4', value: 4 },
        { answerText: '5', value: 5 },
        { answerText: '6', value: 6 },
        { answerText: '7+', value: 7 },
      ],
      answerSettings:
      {
        answerType: 'int',
        componentType: "select",
      },
    },
  ]
  React.useEffect(() => {
    setResultData(null)
  }, [])

  const steps = questions.map((question, index) => {
    return {
      label: 'Customer Information - ' + (index + 1) + '/' + questions.length,
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
          <Typography 
            variant="h5"
            sx={{
              color:"#1976d2",
              alignItems: 'center',
              justifyContent: 'center',
              }}

          >{steps[activeStep].label}</Typography>
        </Paper>
        <Box sx={{ height: 255, width: '90%', p: 2 }}>
          <Typography variant="h5">
            {activeStep+1 + ". " + steps[activeStep].questionText}
          </Typography> 
          <br />
          <Box>
            {steps[activeStep].questionComponent}
          </Box>
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