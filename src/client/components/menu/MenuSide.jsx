import { Menu } from 'antd';
import { useCategories } from '../app-context/CategoryProvider';

const { SubMenu } = Menu;

function MenuSide() {
	const { categories, categoryLoading, getSelectedCategory } = useCategories();

	return (
		<div className='mt-10'>
			{!categoryLoading ? (
				<Menu mode='inline' defaultOpenKeys={['sub1', 'sub2']}>
					<SubMenu key='sub1' title='Beverage' className='text-xl font-semibold'>
						{categories
							.filter((category) => category.id < 7)
							.map((category) => (
								<Menu.Item key={category.id} onClick={() => getSelectedCategory(category.id, category.name)}>
									<p className='text-base font-semibold mt-2 text-gray-500'>{category.name}</p>
								</Menu.Item>
							))}
					</SubMenu>
					<SubMenu key='sub2' title='Food' className='text-xl font-semibold'>
						{categories
							.filter((category) => category.id >= 7)
							.map((category) => (
								<Menu.Item key={category.id} onClick={() => getSelectedCategory(category.id, category.name)}>
									<p className='text-base font-semibold mt-2 text-gray-500'>{category.name}</p>
								</Menu.Item>
							))}
					</SubMenu>
				</Menu>
			) : null}
		</div>
	);
}

export default MenuSide;
