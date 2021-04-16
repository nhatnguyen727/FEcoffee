import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const AddRecordDialog = (props) => {
	const { initialRecord, fieldsForm, addRecordHandler } = props;
	const [open, setOpen] = React.useState(false);
	const [record, setRecord] = React.useState(initialRecord);
	const [errors, setErrors] = React.useState(true);
	const [openErrorMsg, setOpenErrorMsg] = React.useState(false);

	const [switchState, setSwitchState] = React.useState({
		addMultiple: false,
	});

	const handleSwitchChange = (switchName) => (event) => {
		setSwitchState({ ...switchState, [switchName]: event.target.checked });
	};

	const resetSwitch = () => {
		setSwitchState({ addMultiple: false });
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		resetSwitch();
		setRecord(initialRecord);
	};

	const handleAdd = (event) => {
		if (errors === false) {
			addRecordHandler(record);
			setRecord(initialRecord);
			switchState.addMultiple ? setOpen(true) : setOpen(false);
		} else {
			setOpenErrorMsg(true);
		}
	};

	const handleChange = (fieldName, value) => {
		setRecord({ ...record, [fieldName]: value });
	};

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenErrorMsg(false);
	};

	return (
		<div>
			{Object.keys(initialRecord).length !== 0 ? (
				<div>
					<Tooltip title='Add'>
						<IconButton aria-label='add' onClick={handleClickOpen}>
							<AddIcon />
						</IconButton>
					</Tooltip>

					<Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
						<DialogTitle id='form-dialog-title'>Add Record</DialogTitle>
						<DialogContent>{fieldsForm(record, handleChange, setErrors)}</DialogContent>
						<DialogActions>
							<Tooltip title='Add multiple'>
								<Switch
									checked={switchState.addMultiple}
									onChange={handleSwitchChange('addMultiple')}
									value='addMultiple'
									inputProps={{ 'aria-label': 'secondary checkbox' }}
								/>
							</Tooltip>
							<Button onClick={handleClose} color='primary'>
								Cancel
							</Button>
							<Button onClick={handleAdd} color='primary'>
								Add
							</Button>
						</DialogActions>
					</Dialog>
					<Snackbar open={openErrorMsg} autoHideDuration={5000} onClose={handleErrorClose}>
						<MuiAlert elevation={6} variant='filled' severity='error' onClose={handleErrorClose}>
							Please input all required fields!
						</MuiAlert>
					</Snackbar>
				</div>
			) : null}
		</div>
	);
};

AddRecordDialog.propTypes = {
	initialRecord: PropTypes.object.isRequired,
	fieldsForm: PropTypes.func.isRequired,
	addRecordHandler: PropTypes.func.isRequired,
};

export default AddRecordDialog;
