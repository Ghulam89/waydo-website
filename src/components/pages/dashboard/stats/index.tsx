"use client";

import QuickDetails from "@components/app/quick-details";
import DRtopology from "@highcharts/map-collection/countries/do/do-all.topo.json";
import { FormControl, MenuItem, Select } from "@mui/material";
import "chart.js/auto";
import classNames from "classnames";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highmaps";
import Image from "next/image";
import { Line } from "react-chartjs-2";
import DataTable, { TableColumn } from "react-data-table-component";
import { OfficeItemI } from "../offices";
import styles from "./stats.module.css";

export default function AdminStats() {
  const columns: TableColumn<OfficeItemI>[] = [
    {
      name: "Sucursal",
      selector: row => row?.id,
      sortable: true,
      style: {
        padding: "12px 16px"
      },
      format: (row) => (
        <div className={styles.itemOffice}>
          <Image
            height={40}
            width={40}
            alt={"Item-Avatar"}
            src={row?.imageSrc || ""}
            style={{ objectFit: "cover" }}
          />
          <span>{row.officeName}</span>
        </div>
      )
    },
    {
      name: "Vehiculos publicados",
      selector: row => row?.publicationsQty,
      format: row => {
        return (
          <div
            className={styles.publicationQtyContainer}
            style={{
              backgroundColor: row.publicationsQty === 0
                ? '#ffe3e7'
                : row.publicationsQty > 10
                  ? "#e1faed"
                  : "#fff4e6"
            }}
          >
            {row.publicationsQty}
          </div>
        )
      },
      sortable: true,
    },
    {
      name: "Interacciones",
      selector: row => (row?.interactionsQty || 0)?.toLocaleString(),
      sortable: true,
      width: "130px",
    },
    {
      name: "Vistas",
      selector: row => (row?.viewQty || 0)?.toLocaleString(),
      sortable: true,
      width: "90px",
    },
  ];

  const offices = Array(3).fill(0).map((_, i) => ({
    location: "Santo Domingo",
    officeName: "Mainstream Motors",
    publicationsQty: Math.round(Math.random() * 50),
    interactionsQty: Math.round(Math.random() * 60000),
    viewQty: Math.round(Math.random() * 30000),
    agentsQty: Math.round(Math.random() * 20),
    chiefOfficer: "Juan López",
    id: 'office-item-mock-' + i,
    imageSrc: '/assets/img/mock/featured/1.png',
  }));

  const provinceMetrics = [
    {
      name: "Santo Domingo",
      views: Math.round(Math.random() * 200000),
      color: '#a3a1fb'
    },
    {
      name: "Punta Cana",
      views: Math.round(Math.random() * 200000),
      color: '#5ee2a0'
    },
    {
      name: "Samaná",
      views: Math.round(Math.random() * 200000),
      color: '#ff6565'
    },
    {
      name: "Santiago",
      views: Math.round(Math.random() * 200000),
      color: '#fec163'
    },
    {
      name: "Sosúa",
      views: Math.round(Math.random() * 200000),
      color: '#ffa177'
    },
  ]

  const mostViewsProvince = provinceMetrics
    .map(p => p.views)
    .sort()[0];

  // const mostViewsProvince = provinceMetrics[mostViewsProvinceIndex];

  const data = [
    ['do-pn', 10], ['do-al', 11], ['do-pv', 12], ['do-jo', 13],
    ['do-hm', 14], ['do-mp', 15], ['do-du', 16], ['do-mt', 17],
    ['do-sm', 18], ['do-cr', 19], ['do-nc', 20], ['do-se', 21],
    ['do-ro', 22], ['do-st', 23], ['do-sr', 24], ['do-va', 25],
    ['do-ju', 26], ['do-sd', 27], ['do-pm', 28], ['do-mc', 29],
    ['do-pp', 30], ['do-da', 31], ['do-es', 32], ['do-1857', 33],
    ['do-br', 34], ['do-bh', 35], ['do-in', 36], ['do-ep', 37],
    ['do-az', 38], ['do-ve', 39], ['do-sz', 40], ['do-mn', 41]
  ];

  const baseOptions = {
    chart: {
      map: DRtopology
    },
    colorAxis: {
      min: 0,
      stops: [
        [0, '#f5f7f9'],
        [0.1, '#f5f7f9'],
        [1, '#f5f7f9']
      ]
    },
    mapNavigation: {
      enabled: false,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    title: null,
    series: [{
      data: data,
      states: {
        normal: {
          color: "#f5f7f9",
        },
        inactive: {
          color: "#f5f7f9",
        },
        hover: {
          color: '#e2e3e3'
        },
        select: {
          color: '#e2e3e3'
        }
      },
      dataLabels: {
        enabled: false,
      }
    }]
  };

  return (
    <div className={styles.dashboardStats}>
      <div>
        <div className={classNames(["shadow-card", styles.statsContainer])}>
          <div className={styles.titleArea}>
            <h3>
              Estadísticas
            </h3>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={30}
                onChange={() => { }}
              >
                <MenuItem value={10}>La ultima semana</MenuItem>
                <MenuItem value={20}>Ultimo mes</MenuItem>
                <MenuItem value={30}>Últimos 6 meses</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.lineCharts}>
            <Line
              data={{
                labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
                datasets: [
                  {
                    data: [1600, 1700, 1700, 1900, 2000, 2700],
                    borderColor: "#7ed8ff",
                    fill: true,
                    tension: 0.4,
                    backgroundColor: (context) => {
                      if (!context?.chart.chartArea) return "white";

                      const { ctx, chartArea: { top, bottom } } = context.chart;
                      const gradient = ctx.createLinearGradient(0, top, 0, bottom);

                      gradient.addColorStop(0, '#7ed8ff');
                      gradient.addColorStop(1, 'rgba(255,255,255,0)');

                      return gradient;
                    },
                    pointBackgroundColor: "#fff",
                    label: "Anuncios publicados",
                    pointRadius: 4,
                    pointBorderWidth: 2,
                    borderWidth: 2,
                  }, {
                    data: [300, 700, 2000, 5000, 6000, 4000],
                    borderColor: "#a3a0fb",
                    fill: true,
                    tension: 0.4,
                    backgroundColor: (context) => {
                      if (!context?.chart?.chartArea) return "white";

                      const { ctx, chartArea: { top, bottom } } = context.chart;
                      const gradient = ctx.createLinearGradient(0, top, 0, bottom);

                      gradient.addColorStop(0, '#a3a0fb');
                      gradient.addColorStop(1, 'rgba(255,255,255,0)');

                      return gradient;
                    },
                    pointBackgroundColor: "#fff",
                    label: "Visitas totales",
                    pointRadius: 4,
                    pointBorderWidth: 2,
                    borderWidth: 2,
                  }
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                  }
                }
              }}
            />
          </div>
        </div>
        <div className={classNames(["shadow-card", styles.statstsQuickDetails])}>
          <QuickDetails
            titleContent={(
              <h3>
                Detalles rápidos
              </h3>
            )}
          />
        </div>
      </div>
      <div className={styles.statsBottom}>
        <div className={classNames(["shadow-card", styles.statsOffices])}>
          <div className={styles.titleArea}>
            <h3>
              Sucursales
            </h3>
          </div>
          <div className={styles.officesContainer}>
            <DataTable<OfficeItemI>
              columns={columns}
              data={offices}
              className={styles.officesTable}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#f5f6fa",
                    borderBottom: "none",
                    maxHeight: "30px",
                    color: "#a3a6b4",
                    fontWeight: 600,
                  }
                }
              }}
            />
          </div>
          <div
            className={styles.officesTableBottom}
            onClick={() => { }}
          >
            <strong>Mostrar más</strong>
          </div>
        </div>
        <div className={classNames(["shadow-card", styles.mapWrapper])}>
          <div className={styles.titleArea}>
            <h3>
              Visitas por provincia
            </h3>
          </div>
          <div className={styles.mapContent}>
            <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={baseOptions}
                constructorType={"mapChart"}
              />
            </div>
            <div className={styles.mapLegends}>
              {provinceMetrics.map((p, i) => (
                <div
                  key={i}
                  className={styles.mapLegendItem}
                >
                  <div className={styles.legendItemTItle}>
                    <div>
                      {p.name}
                    </div>
                    <div>
                      {p.views.toLocaleString()} vistas
                    </div>
                  </div>
                  <div className={styles.mapLegendBar}>
                    <div style={{ backgroundColor: p.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}