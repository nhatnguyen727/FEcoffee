import React from 'react';
import { Layout, Radio, Spin } from 'antd';
import { CssBaseline } from '@material-ui/core';
import EnhancedTable from '../react-table/EnhancedTable';
import AddProductDialog from './AddProductDialog';
import ProductFieldsTableCell from './ProductFieldsTableCell';
import SubProduct from './SubProduct';
import { useProducts } from '../app-context/ProductProvider';

const { Content } = Layout;

function Products() {
	const {
		products,
		deleteProducts,
		addProduct,
		updateProduct,
		productLoading,
		categoryLoading,
		errorMsg,
		resetErrorMsg,
		groupCategories,
		getSelectedCategory,
	} = useProducts();
	const [selectedRdBtn, setSelectedRdBtn] = React.useState('');

	// for adding new product
	const initProduct = React.useMemo(() => {
		return {
			name: '',
			price: 0,
			image: '',
			description: '',
			category: '',
		};
	}, []);

	const columns = React.useMemo(
		() => [
			{
				Header: () => null,
				id: 'expander',
				// Use Cell to render an expander for each row.
				// We can use the getToggleRowExpandedProps prop-getter to build the expander.
				Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</span>,
				SubCell: () => null,
			},
			{
				Header: 'Image',
				accessor: 'image',
			},
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Description',
				accessor: 'description',
			},
			{
				Header: 'Price$',
				accessor: 'price',
			},
			{
				Header: 'Category',
				accessor: 'category',
			},
		],
		[]
	);

	const data = React.useMemo(() => {
		return products.map((p) => ({
			id: p.id,
			image: p.image,
			name: p.name,
			description: p.description,
			price: p.price,
			category: p.category,
			sizes: p.sizes,
			toppings: p.toppings,
		}));
	}, [products]);

	const productFieldsForm = (record, handleChange = (f) => f, setErrors = (f) => f) => {
		return <AddProductDialog record={record} handleChange={handleChange} setErrors={setErrors} />;
	};

	const productFieldsTableCell = (
		columnId,
		inputStyle,
		value,
		onChange = (f) => f,
		onBlur = (f) => f,
		imgDlgOpen,
		handleImgDlgOpen = (f) => f,
		handleImgDlgClose = (f) => f
	) => {
		return (
			<ProductFieldsTableCell
				columnId={columnId}
				inputStyle={inputStyle}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				dlgOpen={imgDlgOpen}
				handleDlgOpen={handleImgDlgOpen}
				handleDlgClose={handleImgDlgClose}
			/>
		);
	};

	const ProductSubRow = (props) => {
		return <SubProduct {...props} />;
	};

	React.useMemo(() => {
		if (groupCategories.length !== 0) {
			setSelectedRdBtn(groupCategories[0].name);
		}
	}, [groupCategories]);

	const handleCategorySelect = (id, name) => {
		getSelectedCategory(id);
		setSelectedRdBtn(name);
	};

	return (
		<>
			<div style={{ margin: '16px', padding: 24, background: '#fff' }}>
				<Spin spinning={categoryLoading}>
					{groupCategories.length !== 0 ? (
						<Radio.Group value={selectedRdBtn} buttonStyle='solid'>
							{groupCategories.map((category) => (
								<Radio.Button
									key={category.id}
									value={category.name}
									type='dashed'
									style={{ marginRight: '8px', marginBottom: '4px' }}
									onClick={() => handleCategorySelect(category.id, category.name)}
								>
									{category.name}
								</Radio.Button>
							))}
						</Radio.Group>
					) : null}
				</Spin>
			</div>
			<Content style={{ margin: '0 16px' }}>
				<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
					<Spin spinning={productLoading}>
						<CssBaseline />
						<EnhancedTable
							columns={columns}
							data={data}
							initialRecord={initProduct}
							fieldsForm={productFieldsForm}
							fieldsTableCell={productFieldsTableCell}
							deleteRecordInDB={deleteProducts}
							addRecordInDB={addProduct}
							updateRecordInDB={updateProduct}
							errorMsg={errorMsg}
							resetErrorMsg={resetErrorMsg}
							tableName='Products'
							makeSubRow={ProductSubRow}
						/>
					</Spin>
				</div>
			</Content>
		</>
	);
}

export default Products;
