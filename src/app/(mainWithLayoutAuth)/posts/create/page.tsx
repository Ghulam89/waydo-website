'use client';

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { clearCreatePostForm } from "@redux/slices/post";
import { useEffect } from "react";
import dynamic from 'next/dynamic';
import config from "@config";
import { APIProvider } from "@vis.gl/react-google-maps";
import style from "./page.module.css";

// Dynamically import components with SSR disabled
const SelectTypePost = dynamic(
  () => import('@components/pages/post/form/steps/select-type-post'),
  { ssr: false }
);

const FirstFormPost = dynamic(
  () => import('@components/pages/post/form/steps/first-form'),
  { ssr: false }
);

const LastFormPost = dynamic(
  () => import('@components/pages/post/form/steps/last-form'),
  { ssr: false }
);

export default function CreatePost() {
  const dispatch = useAppDispatch()
  const { step } = useAppSelector((s) => s.post.createForm)

  useEffect(() => {
    return () => {
      dispatch(clearCreatePostForm())
    }
  }, [])

  return (
    <APIProvider
      apiKey={config.googleMap.apiKey}
      solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
    >
      <div className={style.content}>
        <div className={style.box}>
          <div>
            {step === 0 && <SelectTypePost show />}
            {step === 1 && <FirstFormPost show />}
            {step === 2 && <LastFormPost show />}
          </div>
        </div>
      </div>
    </APIProvider>
  );
}