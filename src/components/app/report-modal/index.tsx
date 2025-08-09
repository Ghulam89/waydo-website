import { ArrowBack, Check, Close } from "@mui/icons-material";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";
import Button from "../button/app";
import { ModalZoon } from "../modal";
import styles from "./report-modal.module.css";

type ReportType = "spam"
  | "fraud"
  | "miscategorized"
  | "repetitive-listing"
  | "copyright-infringement"
  | "not-available"
  | "incorrect-pricing";

type SpamType = "commercial" | "offensive" | "irrelevant" | "other";

type ReportDataI = {
  description: string;
  reportType?: ReportType;
  spamType?: SpamType;
}

type ReportRadioInputI<T> = {
  label: string;
  name: string;
  options: {
    label: string;
    key: T;
  }[];
}

type ReportTypeDataI = {
  name: string;
  key: ReportType;
  radio?: ReportRadioInputI<SpamType>;
}

type Props = {
  show: boolean;
  handleClose?: () => void;
}

export default function ReportModal({ show, handleClose }: Props) {
  const [viewIndex, setViewIndex] = useState(0);
  const [selectedReportType, setSelectedReportType] = useState<ReportTypeDataI | null>(null);
  const [reportForm, setReportForm] = useState<ReportDataI>({
    description: "",
  });

  const reportOptions: ReportTypeDataI[] = [
    {
      name: "Spam",
      key: "spam",
      radio: {
        label: "What kind of spam is it?",
        name: "spamType",
        options: [
          {
            label: "Comercial",
            key: "commercial",
          },
          {
            label: "Ofensivo",
            key: "offensive",
          },
          {
            label: "Irrelevante",
            key: "irrelevant",
          },
          {
            label: "Otro",
            key: "other",
          },
        ]
      }
    },
    {
      name: "Fraude",
      key: "fraud",
    },
    {
      name: "No categorizado",
      key: "miscategorized",
    },
    {
      name: "Publicación repetida",
      key: "repetitive-listing",
    },
    {
      name: "Violación de derechos de autor",
      key: "copyright-infringement",
    },
    {
      name: "No disponible",
      key: "not-available",
    },
    {
      name: "Precio incorrecto",
      key: "incorrect-pricing",
    },
  ]

  const handleStartReporting = (reportIndex: number) => {
    setSelectedReportType(reportOptions[reportIndex]);
    setViewIndex(1);
  }

  const onClose = () => {
    handleClose?.();
    setTimeout(() => setViewIndex(0), 1000);
  }

  return (
    <ModalZoon
      show={show}
      onClose={() => onClose()}
    >
      <div className={styles.reportContainer}>
        <div className={styles.header}>
          <ArrowBack
            className={styles.boxClose}
            style={{
              visibility: viewIndex === 0 ? 'hidden' : 'visible'
            }}
            onClick={() => setViewIndex(0)}
          />
          <h3>Reportar esta publicación</h3>
          <Close
            className={styles.boxClose}
            onClick={() => onClose()}
          />
        </div>
        <div className={styles.content}>
          {viewIndex === 0 && (
            <div className={styles.list}>
              {reportOptions.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleStartReporting(i)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}

          {viewIndex === 1 && (
            <div>
              <div className={styles.reportTypeHeader}>
                <h4>{selectedReportType?.name || ""}</h4>
                <Check />
              </div>
              <div className={styles.reportForm}>
                {selectedReportType?.radio && (
                  <div className={styles.reportRadio}>
                    <strong>
                      {selectedReportType?.radio.label}
                    </strong>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name={selectedReportType.radio.name}
                      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { }}
                    >
                      {selectedReportType.radio.options.map((option, i) => (
                        <FormControlLabel
                          key={i}
                          value={option.key}
                          control={<Radio />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  </div>
                )}

                <div className={styles.reportField}>
                  <label>
                    Por favor, explica la razón de este reporte de &quot;{selectedReportType?.name.toLowerCase()}&quot;
                  </label>
                  <div>
                    <TextField
                      className={styles.reportTextArea}
                      multiline
                      fullWidth
                      helperText="Minimum 20 characters"
                      minRows={2}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.submitArea}>
                <h4>Has seleccionado reportar esta como {selectedReportType?.name?.toLowerCase() || ''}</h4>
                <Button disabled>
                  Enviar reporte
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalZoon>
  );
}