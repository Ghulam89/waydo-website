'use client'

import LayoutAuth from '@components/layouts/auth'
import { useGetUserInfoV1Query, useLazyGetUserInfoV1Query } from '@redux/rtk/server/v1/me'
import React from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	const ref = useRef<LoadingBarRef>(null)
	const { data: user } = useGetUserInfoV1Query({})
	const [getUserInfo, { isLoading: isLoadingUserInfo}] = useLazyGetUserInfoV1Query({})

	const isLoading = useMemo(() => (isLoadingUserInfo), [isLoadingUserInfo])

	const handleGetData = useCallback(async () => {
		if (!ref?.current) return;

		ref.current.continuousStart()

		await getUserInfo({})

		ref.current.complete()
	}, [ref])

	useEffect(() => {
		if(user) return;
		handleGetData()
	}, [ref, user])

	return (
		<React.Fragment>
			<LoadingBar color='var(--primary-color)' ref={ref} />
			<LayoutAuth>
				{!isLoading ? children : null}
			</LayoutAuth>
		</React.Fragment>
	)
}
