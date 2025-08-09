'use client'

import LayoutAuth from '@components/layouts/auth'

export default function MainLayout({ children }: { children: React.ReactNode }) {

	return (
		<LayoutAuth>
			{children}
		</LayoutAuth>
	)
}
