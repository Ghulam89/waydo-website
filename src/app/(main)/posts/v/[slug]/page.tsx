'use client';

import Banner from "@components/app/banner";
import BannerVertical1 from "@components/app/banner/banner-vertical-1";
import BannerVertical2 from "@components/app/banner/banner-vertical-2";
import PicturesCarrouselHorizontal from "@components/app/images/carrousel/horizontal";
import ReportModal from "@components/app/report-modal";
import PostedBy from "@components/pages/post/view/posted-by";
import SimilarPost from "@components/pages/post/view/similar-post";
import config from "@config";
import { Grid } from "@mui/material";
import { useLazyGetPostBySlugQuery } from "@redux/rtk/server/v1/post";
import Autonomy from "@svg/Autonomy.svg";
import ChargingTime from "@svg/ChargingTime.svg";
import Cylinder from "@svg/Cylinder.svg";
import Date from "@svg/Date.svg";
import Fuel from "@svg/Fuel.svg";
import HorsePower from "@svg/HorsePower.svg";
import Marker from "@svg/Marker.svg";
import Millero from "@svg/Millero.svg";
import Motor from "@svg/Motor.svg";
import TourVirtual360 from "@svg/TourVirtual360.svg";
import Trim from "@svg/Trim.svg";
import {
  AdvancedMarker,
  APIProvider,
  Map
} from '@vis.gl/react-google-maps';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import moment from 'moment';
import Image from "next/image";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import style from "./page.module.css";

dayjs.extend(relativeTime);
dayjs.locale('es');

// Mock data for testing
const MOCK_POST = {
  id: "post-123",
  title: "Toyota Corolla 2023 en excelente estado",
  description: "Vendo mi Toyota Corolla 2023 en perfecto estado, siempre mantenido en agencia. Full extras, vidrios eléctricos, espejos eléctricos, aire acondicionado, dirección hidráulica, alarma, cierre centralizado, llantas de aleación, vidrios polarizados, sistema de audio premium, cámara de reversa, sensores de estacionamiento, etc.",
  price: 25000,
  currency: {
    iso3: "USD"
  },
  createdAt: "2023-06-15T10:30:00Z",
  car: {
    brand: {
      uuid: "1",
      name: "Toyota"
    },
    model: {
      uuid: "m1",
      name: "Corolla"
    },
    year: 2023,
    mileage: 15000,
    fuelType: {
      slug: "gasoline",
      name: "Gasolina"
    },
    version: {
      name: "LE Plus"
    },
    cylinder: {
      cant: 4
    },
    horsepower: {
      name: "169 HP",
      from: 169,
      to: 169
    },
    autonomy: {
      name: "500 km"
    },
    chargingTime: {
      name: "8 horas"
    },
    exteriorColor: {
      color: {
        name: "Blanco Perla"
      }
    },
    interiorColor: {
      color: {
        name: "Negro"
      }
    },
    transmissionType: {
      name: "Automática"
    },
    drivetrainType: {
      name: "Delantera"
    },
    batteryCapacity: {
      from: 0,
      to: 0
    },
    body: {
      name: "Sedán",
      type: "sedan"
    },
    door: {
      cant: 4
    },
    seating: {
      cant: 5
    },
    status: {
      name: "Usado"
    },
    extras: [
      { name: "Aire acondicionado" },
      { name: "Vidrios eléctricos" },
      { name: "Espejos eléctricos" },
      { name: "Dirección hidráulica" },
      { name: "Alarma" },
      { name: "Cierre centralizado" },
      { name: "Llantas de aleación" },
      { name: "Vidrios polarizados" },
      { name: "Sistema de audio premium" },
      { name: "Cámara de reversa" },
      { name: "Sensores de estacionamiento" }
    ]
  },
  geolocation: {
    address: "Av. Principal 123, Santo Domingo, República Dominicana",
    latitude: 18.4861,
    longitude: -69.9312
  },
  pictures: [
    { src: "/assets/img/car-sample-1.jpg" },
    { src: "/assets/img/car-sample-2.jpg" },
    { src: "/assets/img/car-sample-3.jpg" },
    { src: "/assets/img/car-sample-4.jpg" },
    { src: "/assets/img/car-sample-5.jpg" }
  ],
  user: {
    name: "Juan Pérez",
    phone: "+1 809-555-1234",
    email: "juan.perez@example.com",
    avatar: "/assets/img/user-avatar.jpg",
    rating: 4.5,
    reviews: 12,
    memberSince: "2021-03-15"
  }
};

export default function ListPost({ params }: { params: { slug: string } }) {
  const [showMap, setShowMap] = useState<boolean>(false)
  const [showReportModal, setShowReportModal] = useState<boolean>(false)
  const [getPost, { isLoading, isError, data }] = useLazyGetPostBySlugQuery()

  // For testing, we'll use mock data instead of API call
  const [mockData, setMockData] = useState<any>(null);

  const isSuperCar = useMemo(() => (((mockData?.car?.cylinder?.cant || 0) > 8) && ["coupe", "convertible"].includes(`${mockData?.car?.body?.type}`)), [mockData])
  const isElectric = useMemo(() => (["electric"].includes(`${mockData?.car?.fuelType?.slug}`)), [mockData])

  const summaryCarItems = useMemo(() => [
    ...(!isSuperCar ? [{
      title: "Combustible",
      Icon: Fuel,
      value: mockData?.car?.fuelType?.name || "--"
    }] : []),
    ...(!isSuperCar && !isElectric ? [
      {
        title: "VERSIÓN",
        Icon: Trim,
        value: mockData?.car?.version?.name || "--"
      }
    ] : []),
    {
      title: "Año",
      Icon: Date,
      value: mockData?.car?.year || "--"
    },
    {
      title: "Kilometraje",
      Icon: Millero,
      value: `${parseFloat(`${mockData?.car?.mileage || "0"}`).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })} km`
    },
    ...(isElectric ? [
      {
        title: "Autonomia",
        Icon: Autonomy,
        value: mockData?.car?.autonomy?.name || "--"
      },
      {
        title: "Tiempo de carga",
        Icon: ChargingTime,
        value: mockData?.car?.chargingTime?.name || "--"
      }
    ] : []),
    ...(!isElectric ? [
      {
        title: "Cilindros",
        Icon: Cylinder,
        value: mockData?.car?.cylinder?.cant || "--"
      }
    ] : []),
    ...(isSuperCar ? [
      {
        title: "Motor",
        Icon: Motor,
        value: "--"
      },
      {
        title: "Potencia",
        Icon: HorsePower,
        value: mockData?.car?.horsepower?.name || "--"
      }
    ] : [])
  ], [mockData, isSuperCar, isElectric])

  const aditionalDetails = useMemo(() => [
    {
      title: "Color exterior",
      value: mockData?.car?.exteriorColor?.color?.name || "--"
    },
    {
      title: "Color interior",
      value: mockData?.car?.interiorColor?.color?.name || "--"
    },
    ...(isElectric || isSuperCar ? [
      {
        title: "Versión",
        value: mockData?.car?.version?.name || "--"
      }
    ] : []),
    ...(isSuperCar ? [
      {
        title: "Combustible",
        value: mockData?.car?.fuelType?.name || "--"
      }
    ] : []),
    {
      title: "Transmisión",
      value: mockData?.car?.transmissionType?.name || "--"
    },
    {
      title: "Tracción",
      value: mockData?.car?.drivetrainType?.name || "--"
    },
    ...(!isSuperCar ? [
      {
        title: "Potencia",
        value: mockData?.car?.horsepower ? `${mockData?.car?.horsepower?.from} - ${mockData?.car?.horsepower?.to} (hp)` : "--"
      },
    ] : []),
    ...(!isSuperCar && !isElectric ? [
      {
        title: "Capacidad de motor",
        value: "--"
      }
    ] : []),
    ...(isElectric ? [
      {
        title: "Batería",
        value: mockData?.car?.batteryCapacity ? `${mockData?.car?.batteryCapacity.from} - ${mockData?.car?.batteryCapacity.to} (kwh)` : "--"
      }
    ] : []),
    {
      title: "Carrocería",
      value: mockData?.car?.body?.name || "--"
    },
    {
      title: "Puertas",
      value: mockData?.car?.door?.cant || 0
    },
    {
      title: "Asientos",
      value: mockData?.car?.seating?.cant || 0
    },
    {
      title: "Condición",
      value: mockData?.car?.status?.name || "--"
    },
    ...(Array.from(mockData?.car?.extras || []).length ? [
      {
        title: "Extra",
        value: Array.from(mockData?.car?.extras || []).map((e: any) => (e.name)).join(", ")
      }
    ] : [])
  ], [mockData])

  const timeAgo = useMemo(() => (moment(mockData?.createdAt).locale("es").fromNow()), [mockData]);
  const itemsPicture = useMemo(() => (Array.from(mockData?.pictures || []).map((p: any) => p.src || "")), [mockData])

  const handleGetData = useCallback(async () => {
    if (!params.slug) return;

    // Mock API call
    setTimeout(() => {
      setMockData(MOCK_POST);
    }, 500);
    
    // Original API call (commented out for testing)
    // await getPost({
    //   slug: params.slug
    // }).catch(() => {
    // })
  }, [params.slug])

  useEffect(() => {
    handleGetData()
  }, [params.slug])


  if (!mockData) return <div>Loading...</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <Suspense>
      <APIProvider
        apiKey={config.googleMap.apiKey}
        solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
      >
        <div>
          <div>
            <Banner />
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={style.header}>
                  <div>
                    <h1 className={style.title} title={mockData?.title}>{mockData?.title}</h1>
                    <span>Publicado hace {timeAgo}</span>
                  </div>
                  <div>
                    <strong>
                      {mockData?.currency?.iso3 || ""} {(mockData?.price || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </strong>
                  </div>
                </div>
              </Grid>
              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={12}>
                    {!isLoading && itemsPicture.length > 0 && (
                      <PicturesCarrouselHorizontal
                        items={itemsPicture}
                        post={mockData}
                      />
                    )}

                    {!isLoading && !itemsPicture.length && (
                      <div className={style.boxNotImage}>
                        <Image src="/assets/img/no-car-photo.png" alt="Thumbnail post" height={533} width={600} />
                      </div>
                    )}
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: 35 }}>
                    <div className={style.tourVirtual360}>
                      <span>Vista virtual</span>
                      <p>Mira los vehículos desde la comodidad de tu hogar.</p>

                      <div >
                        <div>
                          <TourVirtual360 />
                        </div>
                        <span>Tour virtual</span>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: 35 }}>
                    <div className={style.content}>
                      <div>
                        <h4 className={style.titleContent}>Resumen del vehículo</h4>
                      </div>
                      <div className={style.summaryCar} >
                        <div
                          style={{
                            gridTemplateColumns: "1fr ".repeat(summaryCarItems.length).trim()
                          }}
                        >
                          {summaryCarItems.map((item, i) => (
                            <div className={style.summaryBox} key={i}>
                              <span>{item.title}</span>
                              <div className={style.boxImgSummaryBox}>
                                <item.Icon />
                              </div>
                              <p>
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: 35 }}>
                    <div className={style.content}>
                      <div>
                        <h4 className={style.titleContent}>Detalles adicionales</h4>
                      </div>
                      <div>
                        <table className={style.tableAditionalDetail}>
                          <tbody>
                            {aditionalDetails.map((item, i) => (
                              <tr key={i}>
                                <td style={{ display: "flex", alignItems: "flex-start", whiteSpace: "nowrap" }}>
                                  <div >
                                    {item.title}
                                  </div>
                                </td>
                                <td>{item.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: 35 }}>
                    <div className={style.content}>
                      <div>
                        <h4 className={style.titleContent}>Descripción</h4>
                      </div>
                      <div className={style.boxDescription}>
                        <div>
                          <p>{mockData?.description || ""}</p>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  {mockData.geolocation ? (
                    <Grid item xs={12} style={{ paddingTop: 35 }}>
                      <div className={style.content}>
                        <div>
                          <h4 className={style.titleContent}>Ubicación</h4>
                        </div>
                        <div className={style.boxShowMap}>
                          <div>
                            <Marker />
                            <p>{mockData.geolocation.address}</p>
                          </div>
                          {!showMap && (
                            <button className={style.buttonShowMap} onClick={() => setShowMap(true)}>
                              <Image src="/assets/img/show-map.png" alt="Show map" height={62} width={383} />
                            </button>
                          )}
                        </div>
                      </div>
                      {showMap && (
                        <div className={style.contentMap}>
                          <Map
                            mapId={'bf51a910020fa25a'}
                            defaultZoom={12}
                            defaultCenter={{ lat: mockData.geolocation.latitude, lng: mockData.geolocation.longitude }}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                          >
                            <AdvancedMarker position={{ lat: mockData.geolocation.latitude, lng: mockData.geolocation.longitude }} />
                          </Map>
                        </div>
                      )}
                    </Grid>
                  ) : null}

                  <div className={style.reportArea}>
                    <div onClick={() => setShowReportModal(true)}>
                      <span>¿Hay algún inconveniente? </span>
                      <span className={style.report}>Reportar anuncio</span>
                    </div>

                    <ReportModal
                      show={showReportModal}
                      handleClose={() => setShowReportModal(false)}
                    />
                  </div>

                  <Grid item xs={12} style={{ paddingTop: 35 }}>
                    <SimilarPost
                      filters={{
                        ...(mockData?.car?.brand ? { "car.brand.uuid": mockData?.car?.brand.uuid, } : {}),
                        ...(mockData?.car?.model ? { "car.model.uuid": mockData?.car?.model.uuid, } : {})
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <PostedBy post={mockData} />
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: "58.5px" }}>
                    <BannerVertical1 />
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: "41px" }}>
                    <BannerVertical2 />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </APIProvider>
    </Suspense>
  );
}