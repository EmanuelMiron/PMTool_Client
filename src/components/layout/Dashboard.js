import React, { useState } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

export const drawerWidth = 240;

const Dashboard = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	return (
		<>
			<Navbar open={drawerOpen} openDrawer={handleDrawerOpen} />
			<SideMenu open={drawerOpen} closeDrawer={handleDrawerClose} />
		</>
	);
};

export default Dashboard;
