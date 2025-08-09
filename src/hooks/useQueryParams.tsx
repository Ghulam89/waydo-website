import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams() {
	const router = useRouter()
	const searchParams = useSearchParams()!

	const updateQueryParams = (key: string, value: string) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.set(key, value);
		router.push(`?${currentParams.toString()}`, { scroll: false });
	};

	const removeQueryParams = (key: string) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.delete(key);
		router.push(`?${currentParams.toString()}`, { scroll: false });
	};

	const createQueryString = useCallback((name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);

		return params.toString();
	}, []);

	return {
		updateQueryParams, removeQueryParams, createQueryString
	}
}