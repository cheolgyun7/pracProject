import { Outlet, useLocation } from 'react-router-dom'
import SideBar from './SideBar'
import { useMemo } from 'react'
import styled from 'styled-components'

function PageLayout() {
	const pathname = useLocation().pathname
	const sidebarPath = useMemo(() => ['/', '/search'], [])
	return (
		<SideBarLayout>
			{sidebarPath.includes(pathname) && <SideBar />}

			<main>
				<Outlet />
			</main>
		</SideBarLayout>
	)
}

export default PageLayout

const SideBarLayout = styled.div`
	display: flex;

	main {
		width: 100%;
	}
`
