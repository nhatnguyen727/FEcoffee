import React from 'react';
import { TextField, Grid, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useCoupons } from '../app-context/CouponProvider';

function CouponFieldsTableCell({ columnId, inputStyle, value, onChange = (f) => f, onBlur = (f) => f }) {
	const { products } = useCoupons();

	const statusOptions = React.useMemo(() => ['ON', 'OFF'], []);

	if (columnId === 'discount') {
		return <input type='number' min='0' step='1' style={{ ...inputStyle, width: 100 }} value={value} onChange={onChange} onBlur={onBlur} />;
	}
	if (columnId === 'products') {
		return (
			<Grid container style={{ width: 360 }}>
				<Grid item xs={12} sm={10}>
					<Autocomplete
						multiple
						size='small'
						options={products}
						groupBy={(p) => p.category.name}
						getOptionLabel={(option) => option.name}
						value={products.filter((option) => value.some((p) => option.id === p.id))} // value is selected products
						renderInput={(params) => <TextField {...params} variant='outlined' label='Products' />}
						onChange={(event, newValue) => onChange(newValue)}
					/>
				</Grid>
				<Grid item xs={2} sm={2}>
					<IconButton onClick={onBlur} title='Save applied products'>
						<SaveRoundedIcon />
					</IconButton>
				</Grid>
			</Grid>
		);
	}
	if (columnId === 'activated') {
		return (
			<Autocomplete
				options={statusOptions}
				style={{ width: 80, margin: 0, padding: 0 }}
				size='small'
				renderInput={(params) => <TextField {...params} onBlur={onBlur} />}
				value={statusOptions[statusOptions.indexOf(value === true ? 'ON' : 'OFF')]}
				getOptionLabel={(value) => value}
				onChange={(event, newValue) => onChange(newValue === 'ON' ? true : false)}
				disableClearable
			/>
		);
	}
	return <input style={{ ...inputStyle, width: '120px' }} value={value} onChange={onChange} onBlur={onBlur} />;
}

export default CouponFieldsTableCell;
