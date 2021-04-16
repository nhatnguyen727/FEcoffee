import React from 'react';
import { TextField, Grid, IconButton } from '@material-ui/core';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useOrders } from '../app-context/OrderProvider';

function DetailFieldsTableCell({ columnId, inputStyle, value, onChange = (f) => f, onBlur = (f) => f }) {
	const { sizes, toppings } = useOrders();

	if (columnId === 'productName') {
		return <label style={{ color: 'grey' }}>{value}</label>;
	}
	if (columnId === 'quantity') {
		return <input type='number' min='0' step='1' style={{ ...inputStyle, width: 80 }} value={value} onChange={onChange} onBlur={onBlur} />;
	}
	if (columnId === 'size') {
		return (
			<Autocomplete
				options={sizes}
				style={{ width: 100, margin: 0, padding: 0 }}
				size='small'
				renderInput={(params) => <TextField {...params} onBlur={onBlur} />}
				value={sizes[sizes.map((size) => size.id).indexOf(value.id)]}
				getOptionLabel={(value) => value.name}
				onChange={(event, newValue) => onChange(newValue)}
				disableClearable
			/>
		);
	}
	if (columnId === 'toppings') {
		return (
			<Grid container style={{ width: 300 }}>
				<Grid item xs={12} sm={10}>
					<Autocomplete
						multiple
						size='small'
						fullWidth
						options={toppings}
						getOptionLabel={(option) => option.name}
						value={toppings.filter((option) => value.some((topping) => option.id === topping.id))}
						renderInput={(params) => <TextField {...params} variant='outlined' label='Toppings' />}
						onChange={(event, newValue) => onChange(newValue)}
					/>
				</Grid>
				<Grid item xs={2} sm={2}>
					<IconButton onClick={onBlur} title='Save Toppings'>
						<SaveRoundedIcon />
					</IconButton>
				</Grid>
			</Grid>
		);
	}
	return <input style={{ ...inputStyle, width: 140 }} value={value} onChange={onChange} onBlur={onBlur} />;
}

export default DetailFieldsTableCell;
