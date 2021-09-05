import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

import styles from '../styles/Custom.module.css'

const CustomTextField = ({ name, label }) => {

    const { control } = useFormContext();

    return (
        
        <Controller className={styles.form}
            render={({ field }) => (
                <TextField 
                fullWidth
                label={label}
                required
                />)}
            control={control}
            name={name}
            defaultValue=""
        />
    )
}

export default CustomTextField
