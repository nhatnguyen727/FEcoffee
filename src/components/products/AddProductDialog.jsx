import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useProducts } from '../app-context/ProductProvider';

const ValidationTextField = withStyles({
	root: {
		'& input:valid + fieldset': {
			borderColor: 'green',
		},
		'& input:invalid + fieldset': {
			borderColor: 'red',
		},
		'& input:valid:focus + fieldset': {
			borderLeftWidth: 6,
		},
	},
})(TextField);

const generalInputStyle = {
	variant: 'outlined',
	size: 'small',
	type: 'text',
	required: true,
	fullWidth: true,
	style: { marginBottom: '10px' },
};

const useStyles = makeStyles(() => ({
	inputProps: {
		fontSize: 14,
	},
	InputLabelProps: {
		fontSize: 14,
	},
}));

function AddProductDialog({ record, handleChange = (f) => f, setErrors = (f) => f }) {
	const classes = useStyles();
	const { categories, selectedCategory } = useProducts();
	const [selectedCategoryChanged, setSelectedCategoryChanged] = React.useState(false);

	React.useEffect(() => {
		setSelectedCategoryChanged(true);
	}, [selectedCategory]);

	React.useEffect(() => {
		// 'record.category' condition only causes 'handleChange' to set category once at initial time,
		// when 'selectedCategory' changed outside by user's clicking, 'record.category' still holds the old value (not empty string),
		// and the 'handleChange' can not set new default category for adding new record,
		// so we have to add 'selectedCategoryChanged' to check if 'selectedCategory' has changed outside
		if (record.category === '' || selectedCategoryChanged) {
			handleChange('category', categories[categories.map((category) => category.id).indexOf(selectedCategory)]);
			setSelectedCategoryChanged(false);
		}
		if (record.name === '' || record.image === '' || record.description === '') {
			setErrors(true);
		} else {
			setErrors(false);
		}
	}, [record, setErrors, handleChange, categories, selectedCategory, selectedCategoryChanged]);

	return (
		<>
			<ValidationTextField
				{...generalInputStyle}
				label='Name'
				autoFocus
				value={record.name}
				onChange={(e) => handleChange('name', e.target.value)}
				inputProps={{ className: classes.inputProps }}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
			<ValidationTextField
				{...generalInputStyle}
				type='number'
				label='Price'
				inputProps={{ min: '0', step: '0.01', className: classes.inputProps }}
				value={record.price}
				onChange={(e) => handleChange('price', e.target.value)}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
			<ValidationTextField
				{...generalInputStyle}
				label='Image URL'
				value={record.image}
				onChange={(e) => handleChange('image', e.target.value)}
				inputProps={{ className: classes.inputProps }}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
			<ValidationTextField
				{...generalInputStyle}
				label='Description'
				value={record.description}
				onChange={(e) => handleChange('description', e.target.value)}
				inputProps={{ className: classes.inputProps }}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
		</>
	);
}

export default AddProductDialog;
