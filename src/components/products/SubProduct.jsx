import React from 'react';
import { useProducts } from '../app-context/ProductProvider';
import { Grid, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

function SubProduct(props) {
	const { sizes, toppings, updateProduct } = useProducts();
	const [selectedSizes, setSelectedSizes] = React.useState(props.sizes);
	const [selectedToppings, setSelectedToppings] = React.useState(props.toppings);

	const handleSizesChange = (newValue) => {
		setSelectedSizes(newValue);
	};

	const handleToppingsChange = (newValue) => {
		setSelectedToppings(newValue);
	};

	const handleSave = () => {
		updateProduct({ ...props, sizes: selectedSizes, toppings: selectedToppings });
	};

	return (
		<Grid container spacing={4}>
			<Grid item xs={8} sm={4}>
				<Autocomplete
					multiple
					size='small'
					options={sizes}
					getOptionLabel={(option) => option.name}
					value={sizes.filter((option) => selectedSizes.some((s) => option.id === s.id))}
					renderInput={(params) => <TextField {...params} variant='outlined' label='Sizes' />}
					onChange={(event, newValue) => handleSizesChange(newValue)}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Autocomplete
					multiple
					size='small'
					options={toppings}
					getOptionLabel={(option) => option.name}
					value={toppings.filter((option) => selectedToppings.some((t) => option.id === t.id))}
					renderInput={(params) => <TextField {...params} variant='outlined' label='Toppings' />}
					onChange={(event, newValue) => handleToppingsChange(newValue)}
				/>
			</Grid>
			<Grid item xs={4} sm={2}>
				<Button style={{ width: 180 }} variant='contained' color='primary' size='medium' onClick={handleSave}>
					save
				</Button>
			</Grid>
		</Grid>
	);
}

export default SubProduct;
