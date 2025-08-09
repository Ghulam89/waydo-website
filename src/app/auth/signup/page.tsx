'use client'

import BackHistory from "@components/app/back/history";

import SignUpComponent from "@components/pages/auth/signup";
import style from "./page.module.css";

export default function Signup() {

	return (
		<div className={style.component}>
			<BackHistory />
			<div className={style.main}>
				<SignUpComponent />
			</div>
		</div>
	);
}