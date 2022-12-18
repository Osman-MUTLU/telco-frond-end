import { Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import './Layout.css'
import { Container } from '@mui/system'

function Layout() {
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Navbar />
                </Grid>
                <Grid item xs={12}>
                    <div className='background-image'>
                        <Container>
                            <div className="content">
                                home
                            </div>
                        </Container>
                        
                        {/* An <Outlet> renders whatever child route is currently active,
                        so you can think about this <Outlet> as a placeholder for
                        the child routes we defined above. */}
                    </div>
                </Grid>

            </Grid>
            

        </div>
    )
}

export default Layout