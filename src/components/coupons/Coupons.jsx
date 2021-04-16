import React from 'react';
import { Layout, Spin } from 'antd';
import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from '../react-table/EnhancedTable';
import CouponFieldsTableCell from './CouponFieldsTableCell';
import AddCouponDialog from './AddCouponDialog';
import { useCoupons } from '../app-context/CouponProvider';

const { Content } = Layout;

function Coupons() {
	const { coupons, deleteCoupons, addCoupon, updateCoupon, couponLoading, errorMsg, resetErrorMsg } = useCoupons();

	// for adding new coupon
	const initCoupon = React.useMemo(() => {
		return {
			code: '',
			name: '',
			discount: 0,
			products: [],
			activated: true,
		};
	}, []);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Coupon Name',
				accessor: 'name',
			},
			{
				Header: 'Coupon Code',
				accessor: 'code',
			},
			{
				Header: 'Discount %',
				accessor: 'discount',
			},
			{
				Header: 'Applied Products',
				accessor: 'products',
			},
			{
				Header: 'Status',
				accessor: 'activated',
			},
		],
		[]
	);

	const data = React.useMemo(() => {
		return coupons.map((coupon) => ({
			id: coupon.id,
			name: coupon.name,
			code: coupon.code,
			discount: coupon.discount,
			products: coupon.products,
			activated: coupon.activated,
		}));
	}, [coupons]);

	const couponFieldsForm = (record, handleChange = (f) => f, setErrors = (f) => f) => {
		return <AddCouponDialog record={record} handleChange={handleChange} setErrors={setErrors} />;
	};

	const couponFieldsTableCell = (columnId, inputStyle, value, onChange = (f) => f, onBlur = (f) => f) => {
		return <CouponFieldsTableCell columnId={columnId} inputStyle={inputStyle} value={value} onChange={onChange} onBlur={onBlur} />;
	};

	return (
		<Content style={{ margin: '16px' }}>
			<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
				<Spin spinning={couponLoading}>
					<CssBaseline />
					<EnhancedTable
						columns={columns}
						data={data}
						initialRecord={initCoupon}
						fieldsForm={couponFieldsForm}
						fieldsTableCell={couponFieldsTableCell}
						deleteRecordInDB={deleteCoupons}
						addRecordInDB={addCoupon}
						updateRecordInDB={updateCoupon}
						errorMsg={errorMsg}
						resetErrorMsg={resetErrorMsg}
						tableName='Coupons'
					/>
				</Spin>
			</div>
		</Content>
	);
}

export default Coupons;
