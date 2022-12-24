import { AppBar, Container } from '@mui/material'
import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate()
    React.useEffect(() => {
        if (window.location.pathname === '/') {
            selectHomeHandler()
        } else {
            selectStatisticHandler()
        }
    }, [])


    const selectHomeHandler = () => {
        // toggle class active home-btn id
        const homeBtn = document.getElementById('home-btn')
        const statisticBtn = document.getElementById('statistic-btn')
        homeBtn.classList.add('selected')
        statisticBtn.classList.remove('selected')
        navigate('/')
    }
    const selectStatisticHandler = () => {
        // toggle class active home-btn id
        const statisticBtn = document.getElementById('statistic-btn')
        const homeBtn = document.getElementById('home-btn')
        statisticBtn.classList.add('selected')
        homeBtn.classList.remove('selected')
        navigate('/statistic')
    }

    return (
        <AppBar position="fixed" style={{
            backgroundColor: 'rgb(255 255 255 / 60%)',
        }}>
            <Container maxWidth="xl">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64px' }}>
                    <div id="home-btn" className="nav-button selected" onClick={selectHomeHandler}>
                        PREDICT
                    </div>
                    <div id="statistic-btn" className="nav-button" onClick={selectStatisticHandler}>
                        STATISTIC
                    </div>
                </div>
                
            </Container>
        </AppBar>
    )
}

export default Navbar