import React from 'react';

function OrderFieldsTableCell({ columnId, inputStyle, value, onChange = (f) => f, onBlur = (f) => f }) {
	if (columnId === 'username') {
		return <label style={{ color: 'grey' }}>{value}</label>;
	}
	if (columnId === 'orderDate') {
		return (
			<label style={{ color: 'gray' }}>{new Date(value).toLocaleDateString('en-US') + ' ' + new Date(value).toLocaleTimeString('en-US')}</label>
		);
	}
	return <input style={{ ...inputStyle, width: '120px' }} value={value} onChange={onChange} onBlur={onBlur} />;
}

export default OrderFieldsTableCell;
