
import HomeComponent from "@components/pages/home";
import config from "@config";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Inicio - ${config.app.name}`,
  description: config.app.description,
  openGraph: {
    title: config.app.name,
    description: config.app.description,
    url: config.app.url,
    type: 'website',
    images: [
      {
        url: '/assets/img/logo.png',
        width: 800,
        height: 600,
        alt: 'Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: config.app.name,
    description: config.app.description,
    images: ['/assets/img/logo.png']
  }
}

export default function Home() {

  return (
    <Suspense>
      <HomeComponent />
    </Suspense>
  );
}
