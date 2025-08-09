"use client";

import AddIcon from "@mui/icons-material/Add";
import { useGetAddressesV1Query } from "@redux/rtk/server/v1/me";
import MapIcon from "@svg/MapColored.svg";
import { useMemo, useState } from "react";
import AddressForm, { AddressTag, CreateAddressOption } from "./address-form";
import style from "./addresses.module.css";
import AddressItem from "./address-item";

export default function Addresses() {
  const [createAddressOpen, setCreateAddressOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<AddressTag>("custom");
  const { data: addresses, isLoading, refetch } = useGetAddressesV1Query({});
  const isDataLoading = useMemo(() => (isLoading), [isLoading]);

  /**
   * TODO:
   * - Set loading skeleton using `isDataLoading`
   */

  const addressTypes: CreateAddressOption[] = [
    {
      name: "Dirección del trabajo",
      tag: "work",
    },
    {
      name: "Dirección de residencia",
      tag: "home",
    },
  ];

  const handleOptionClick = (tag: AddressTag) => {
    setCreateAddressOpen(true);
    setSelectedTag(tag);
  }

  const handleCloseForm = () => {
    setCreateAddressOpen(false);
    refetch();
  }

  return (
    <div className={style.addresses}>
      <div className={style.titleArea}>
        <div>
          <h3>Direcciones</h3>
          <p>Administra tus direcciones guardadas</p>
        </div>
        <div>
          <button
            className={style.addLocationButton}
            onClick={() => handleOptionClick("custom")}
          >
            <AddIcon />
            <span>Agrega tu ubicación</span>
          </button>
        </div>
      </div>

      {!addresses?.length && (
        <div className={style.emptyAddresses}>
          <div>
            <h3>Aún no guardas una dirección</h3>
            <p>
              Tus direcciones guardadas nos ayudan a mejorar <br /> tu experiencia
              de compra y venta
            </p>
            <div>
              <MapIcon />
            </div>
          </div>
          <div className={style.addAddressOptions}>
            {!!addressTypes.length &&
              addressTypes.map((option: CreateAddressOption) => (
                <div
                  className={style.addressTypeOptionItem}
                  key={option.name.replace(" ", "")}
                  onClick={() => handleOptionClick(option.tag)}
                >
                  <AddIcon />
                  {option.name}
                </div>
              ))}
          </div>
        </div>
      )}

      <div className={style.list}>
        {!!addresses?.length && addresses.map((address) => (
          <AddressItem
            address={address}
            key={address.uuid}
            onChange={() => refetch()}
          />
        ))}
      </div>

      <div>
        <AddressForm
          isOpen={createAddressOpen}
          onClose={() => handleCloseForm()}
          addressTag={selectedTag}
        />
      </div>
    </div>
  );
}
