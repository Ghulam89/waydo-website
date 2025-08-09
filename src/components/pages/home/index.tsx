"use client";

import Banner from "@components/app/banner";
import Banner2 from "@components/app/banner/banner-2";
import Banner4 from "@components/app/banner/banner-4";
import FeaturedHome from "@components/pages/home/featured";
import OpportunityHome from "@components/pages/home/opportunity";
import QuickSearchHome from "@components/pages/home/quick-search";
import RecentHome from "@components/pages/home/recent";
import { useAppSelector } from "@redux/hooks";
import { FilterSliceI } from "@redux/slices/filter/filter.interface";
import { updateListPost } from "@redux/slices/post";
import { useAppDispatch } from "@redux/store";
import { generateUrlPost } from "@utils/filter";
import { GetStaticProps } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import style from "./home.module.css";

export const getStaticProps = (async (context) => {
  const repo = { name: "asjdjas" };

  return { props: { repo } }
}) satisfies GetStaticProps<{
  repo: Record<string, any>
}>

export default function HomeComponent() {
  const dispatch = useAppDispatch()
  const router = useRouter();
  const query = useSearchParams()

  const { filters } = useAppSelector((s) => s);

  const handleSearch = useCallback((filters: FilterSliceI) => {
    dispatch(updateListPost({
      loading: true
    }))
    router.push(generateUrlPost(filters))
  }, [filters]);

  return (
    <div>
      <section>
        <div>
          <Banner withFilter onSearch={handleSearch} />
        </div>
      </section>

      <section className={style.section2}>
        <div className={style.boxQuickSearch}>
          <QuickSearchHome />
        </div>
        <div className={style.boxFeatured}>
          <FeaturedHome />
        </div>
      </section>

      <section className={style.banner2}>
        <div>
          <Banner2 />
        </div>
      </section>

      <section className={style.sectionRecent}>
        <div>
          <RecentHome />
        </div>
      </section>

      <section className={style.sectionOpportunity}>
        <OpportunityHome />
      </section>

      <section className={style.banner4}>
        <div>
          <Banner4 />
        </div>
      </section>
    </div>
  );
}
