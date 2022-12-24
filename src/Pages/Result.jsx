import React from 'react'
import { getResultData } from '../Utils/Common'
import { predict } from '../Utils/Axios'
import GaugeChart from 'react-gauge-chart'
import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'

function Result() {
  const [result, setResult] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    predict().then(() => {
      setResult(getResultData())
      setLoading(false)
    })
  }, [])


  return (
    <div>
      <Paper sx={{ p: 4, margin: 'auto', minWidth: "800px", flexGrow: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

      
      }}>

          <GaugeChart id="gauge-chart1"
            style={{ width: '400px' }}

            nrOfLevels={3}
            percent={loading? 0 : result?.prediction_proba}
            textColor="#000"
            needleColor="#000"
            needleBaseColor="#000"
            hideText={true}
            arcWidth={0.2}
            colors={[
              '#62B58F',
              '#D4EE5E',
              '#FF5F6D',
            ]}
            formatTextValue={value => `${value}%`}
          />
          <br />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            { loading ? "Loading..." : (Math.round(result?.prediction_proba*100) +"% "+ result?.prediction)}
          </Typography>
        </Box>


      </Paper>
       
    </div>

  )
}

export default Result