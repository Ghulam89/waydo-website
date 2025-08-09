'use client';

import AuthComponent from "@components/app/auth";
import style from "./page.module.css";

export default function Auth() {
	return (
		<div className={style.component}>
			<AuthComponent />
		</div>
	);
}