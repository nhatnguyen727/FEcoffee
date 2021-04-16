import React from 'react';
import { Avatar } from 'antd';
import { TextField, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useUsers } from '../app-context/UserProvider';

function UserFieldsTableCell({
	columnId,
	inputStyle,
	value,
	onChange = (f) => f,
	onBlur = (f) => f,
	dlgOpen,
	handleDlgOpen = (f) => f,
	handleDlgClose = (f) => f,
}) {
	const { roles } = useUsers();
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

	if (columnId === 'photo') {
		return (
			<>
				<div>
					<Avatar shape='rounded' size={64} style={{ marginBottom: '4px', marginLeft: '20%' }} src={value} />
					<br />
					<Button size='small' style={{ width: 128 }} color='primary' onClick={handleDlgOpen}>
						update photo
					</Button>
				</div>
				<Dialog fullWidth open={dlgOpen} onClose={handleDlgClose} aria-labelledby='form-dialog-title'>
					<DialogTitle>Update User's Profile Photo</DialogTitle>
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
	if (columnId === 'role') {
		return (
			<Autocomplete
				options={roles}
				style={{ width: 120, margin: 0, padding: 0 }}
				size='small'
				renderInput={(params) => <TextField {...params} onBlur={onBlur} />}
				value={roles[roles.map((role) => role.id).indexOf(value.id)]}
				getOptionLabel={(value) => value.name}
				onChange={(event, newValue) => onChange(newValue)}
				disableClearable
			/>
		);
	}
	if (columnId === 'fullname' || columnId === 'address' || columnId === 'username' || columnId === 'phone') {
		return <input style={{ ...inputStyle, width: 100 }} value={value} onChange={onChange} onBlur={onBlur} />;
	}
	return <input style={inputStyle} value={value} onChange={onChange} onBlur={onBlur} />;
}

export default UserFieldsTableCell;
