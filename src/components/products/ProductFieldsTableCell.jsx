import React from 'react';
import { Avatar } from 'antd';
import { TextField, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useProducts } from '../app-context/ProductProvider';

function ProductFieldsTableCell({
	columnId,
	inputStyle,
	value,
	onChange = (f) => f,
	onBlur = (f) => f,
	dlgOpen,
	handleDlgOpen = (f) => f,
	handleDlgClose = (f) => f,
}) {
	const { categories } = useProducts();
	const [imgURL, setImgURL] = React.useState('');
	const [imgChanged, setImgChanged] = React.useState(false);

	const handleImgChange = (e) => {
		setImgURL(e.target.value);
	};

	const handleImgSave = () => {
		onChange({ target: { value: imgURL } });
		setImgChanged(true);
	};

	React.useEffect(() => {
		if (imgChanged) {
			onBlur();
			setImgChanged(false);
		}
	}, [imgChanged, onBlur]);

	if (columnId === 'price') {
		return <input type='number' min='0' step='0.01' style={{ ...inputStyle, width: 100 }} value={value} onChange={onChange} onBlur={onBlur} />;
	}
	if (columnId === 'image') {
		return (
			<>
				<div>
					<Avatar shape='rounded' size={128} style={{ marginBottom: '4px' }} src={value} />
					<br />
					<Button size='small' style={{ width: 128 }} color='primary' onClick={handleDlgOpen}>
						update image
					</Button>
				</div>
				<Dialog fullWidth open={dlgOpen} onClose={handleDlgClose} aria-labelledby='form-dialog-title'>
					<DialogTitle>Update Product Image</DialogTitle>
					<DialogContent>
						<DialogContentText>Please enter a new image URL to update! </DialogContentText>
						<TextField autoFocus value={imgURL} label='Image URL' fullWidth onChange={handleImgChange} />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDlgClose} color='primary'>
							Cancel
						</Button>
						<Button onClick={handleImgSave} color='primary'>
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}
	if (columnId === 'category') {
		return (
			<Autocomplete
				options={categories}
				groupBy={(category) => category.group}
				style={{ width: 200, margin: 0, padding: 0 }}
				size='small'
				renderInput={(params) => <TextField {...params} onBlur={onBlur} />}
				value={categories[categories.map((category) => category.id).indexOf(value.id)]}
				getOptionLabel={(value) => value.name}
				onChange={(event, newValue) => onChange(newValue)}
				disableClearable
			/>
		);
	}
	return <input style={inputStyle} value={value} onChange={onChange} onBlur={onBlur} />;
}

export default ProductFieldsTableCell;
