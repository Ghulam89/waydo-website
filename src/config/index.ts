import { LayoutVersionType } from "@settings/layout/layout.interface";

const config = {
  app: {
    name: process.env.NEXT_PUBLIC_NAME || "",
    url: process.env.NEXT_PUBLIC_APP_URL,
    description: "El mejor sitio web de autos",
    keywords: ["Autos", "Venta", "Alquiler"]
  },
  server: {
    api: process.env.NEXT_PUBLIC_SERVER_URL || ''
  },
  layout: {
    version: (process.env.NEXT_PUBLIC_LAYOUT_VERSION || '') as LayoutVersionType,
    authVersion: (process.env.NEXT_PUBLIC_LAYOUT_AUTH_VERSION || '') as LayoutVersionType
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  },
  basicAuth: {
    active: process.env.NEXT_PUBLIC_BASIC_AUTH_ACTIVE == "true",
    username: process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME,
    password: process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD
  },
  googleMap: {
    url: process.env.NEXT_PUBLIC_GOOGLE_MAP_CDN_URL,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string
  },
  paypal: {
    clientId: process.env.NEXT_PAYPAL_CLIENT_ID || "",
  },
}

export default config;
