'use client';

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { clearCreatePostForm } from "@redux/slices/post";
import { useEffect } from "react";


import LastFormPost from "@components/pages/post/form/steps/last-form";

import FirstFormPost from "@components/pages/post/form/steps/first-form";
import SelectTypePost from "@components/pages/post/form/steps/select-type-post";
import config from "@config";
import { APIProvider } from "@vis.gl/react-google-maps";
import style from "./page.module.css";

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
            {step === 0 && (
              <SelectTypePost show />
            )}

            {step === 1 && (
              <FirstFormPost show />
            )}

            {step === 2 && (
              <LastFormPost show />
            )}
          </div>
        </div>
      </div>
    </APIProvider>
  );
}
