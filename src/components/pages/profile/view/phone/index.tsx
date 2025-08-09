"use client";

import {
  useGetUserPhonesV1Query
} from "@redux/rtk/server/v1/me";
import { UserPhoneV1I } from "@redux/rtk/server/v1/me/me.interfaces";
import { useEffect, useState } from "react";
import PhoneItem from "./phone-item";
import style from "./phone.module.css";

type Phone = {
  value: string;
  maskedValue: string;
  uuid: string;
}

export default function Phone() {
  const { data: phones } = useGetUserPhonesV1Query({});
  const [primaryPhone, setPrimaryPhone] = useState<Phone>();

  useEffect(() => {
    const defaultPrimaryIndex = (phones || []).findIndex((phone: UserPhoneV1I) => phone.isDefault);
    const defaultPrimary = defaultPrimaryIndex > -1
      ? (phones || [])[defaultPrimaryIndex]
      : null;

    setPrimaryPhone({
      value: defaultPrimary?.phone || "",
      maskedValue: defaultPrimary?.phone || "",
      uuid: defaultPrimary?.uuid || ""
    });
  }, [phones]);

  return (
    <div className={style.phone}>
      <div className={style.header}>
        <h3>Números de teléfono</h3>
        <p>
          Para garantizar seguridad, es recommendable que agregues tu número de
          teléfono. Recibirás un SMS con un código de autenticación para
          conectar tu número de telefono con tu cuenta.
        </p>
      </div>
      <div className={style.content}>
        <PhoneItem
          label="Teléfono principal"
          phoneItem={{
            value: primaryPhone?.value || "",
            maskedValue: primaryPhone?.maskedValue || "",
            uuid: primaryPhone?.uuid || ''
          }}
          isEditMode={!!primaryPhone?.uuid}
          isAvailableToDelete={(phones || []).length > 1}
        />
      </div>
      <div className={style.header}>
        <h3>Números adicionales</h3>
        <p>
          Los números múltiples le permiten utilizar distintos números de forma intercambiable al publicar anuncios.
        </p>
      </div>
      <div className={style.aditionalPhoneNumbers}>
        {(phones || [])
          .filter((phone: UserPhoneV1I) => !phone.isDefault)
          .map((phone, i) => (
            <PhoneItem
              key={i}
              label={`Teléfono adicional ${i + 1}`}
              phoneItem={{
                value: phone.phone,
                maskedValue: phone.phone,
                uuid: phone?.uuid || ''
              }}
              isEditMode={Boolean(phone?.uuid || "")}
              isAvailableToDelete={(phones || []).length > 1}
            />
          ))
        }
        <PhoneItem
          key='new-phone-field'
          label={`Teléfono adicional ${(phones || [])
            .filter((phone: UserPhoneV1I) => !phone.isDefault).length + 1}`}
          phoneItem={{
            value: '',
            maskedValue: '',
          }}
        />
      </div>
    </div>
  );
}
