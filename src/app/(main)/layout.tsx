'use client'

import ModalAuth from '@components/app/auth/modal';
import ModalSignUpAuth from '@components/app/auth/modal/signup';
import GetVerifiedModal from '@components/app/get-verified-modal';
import Layout from '@components/layouts';
import MessageActiveAccount from '@components/pages/commun/message-active-account';
import { useLazyGetUserInfoV1Query } from '@redux/rtk/server/v1/me';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	const ref = useRef<LoadingBarRef>(null)
	const [getUserInfo, { isLoading: isLoadingUserInfo, data: user }] = useLazyGetUserInfoV1Query({})

	const isLoading = useMemo(() => (isLoadingUserInfo), [isLoadingUserInfo])

	const handleGetData = useCallback(async () => {
		if (!ref?.current) return;

		ref.current.continuousStart()

		await getUserInfo({})

		ref.current.complete()
	}, [ref])

	useEffect(() => {
		handleGetData()
	}, [ref])

	return (
		<React.Fragment>
			<LoadingBar color='var(--primary-color)' ref={ref} />
			<Layout>
				{user && !user.verify && !isLoading ? (
					<MessageActiveAccount />
				) : null}
				{!isLoading || (user && user.verify) ? (
					children
				) : null}
			</Layout>

			{!isLoading && !user && (
				<React.Fragment>
					<ModalAuth />
					<ModalSignUpAuth />
				</React.Fragment>
			)}

			<GetVerifiedModal />
		</React.Fragment>
	)
}
