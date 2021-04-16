import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';

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

function AddCouponDialog({ record, handleChange = (f) => f, setErrors = (f) => f }) {
	const classes = useStyles();
	const [codeError, setCodeError] = React.useState(false);

	React.useEffect(() => {
		if (record.name === '' || record.code === '' || codeError) {
			setErrors(true);
		} else {
			setErrors(false);
		}
	}, [record, codeError, setErrors]);

	const handleCodeChange = (fieldName) => ({ target: { value } }) => {
		handleChange(fieldName, value);
		if (/^(?=.{4,20}$)[a-zA-Z0-9]+$/.test(value)) {
			setCodeError(false);
		} else {
			setCodeError(true);
		}
	};

	return (
		<div>
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
				inputProps={{ pattern: '^(?=.{4,20}$)[a-zA-Z0-9]+$', className: classes.inputProps }}
				label='Code'
				value={record.code}
				onChange={handleCodeChange('code')}
				error={codeError}
				helperText={codeError ? 'Coupon code must be 4 to 20 chars, only alphanumeric chars are allowed.' : ''}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
			<ValidationTextField
				{...generalInputStyle}
				type='number'
				inputProps={{ min: '0', step: '1', className: classes.inputProps }}
				label='Discount %'
				value={record.discount}
				onChange={(e) => handleChange('discount', e.target.value)}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
		</div>
	);
}

export default AddCouponDialog;
