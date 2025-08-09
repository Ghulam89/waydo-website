"use client";

import Button from "@components/app/button/app";
import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useAppDispatch } from "@redux/hooks";
import {
  useGetUserInfoV1Query,
  useUpdateProfilePictureV1Mutation,
  useUpdateUserV1Mutation
} from "@redux/rtk/server/v1/me";
import { UserGenderI } from "@redux/rtk/server/v1/me/me.interfaces";
import { toggleModal } from "@redux/slices/user-verification-modal";
import CalendarIcon from "@svg/calendar.svg";
import GlobeIcon from "@svg/globe.svg";
import PencilIcon from "@svg/pencil-solid.svg";
import UserIcon from "@svg/UserCircle.svg";
import VerifyIcon from "@svg/VerifyGray.svg";
import dayjs from "dayjs";
import moment from "moment";
import { ChangeEvent, useMemo, useState } from "react";
import { toast } from "react-toastify";
import style from "./profile.module.css";
// import Dropzone from "react-dropzone";


// ADD TOPBAR LOADING

export default function Profile() {
  const { data: user } = useGetUserInfoV1Query({});
  const [firstNameValue, setFirstNameValue] = useState(user?.info?.firstName || '');
  const [lastNameValue, setLastNameValue] = useState(user?.info?.lastName || '');
  const [birthValue, setBirthValue] = useState(user?.info?.birthDate || '');
  const [genderValue, setGenderValue] = useState<UserGenderI>(user?.info?.gender || 'other');
  const [updateUser, { isLoading }] = useUpdateUserV1Mutation();
  const [
    updateProfilePicture,
    { isLoading: profileLoading }
  ] = useUpdateProfilePictureV1Mutation();
  const dispatch = useAppDispatch();
  const timeAgo = useMemo(() => (moment(user?.createdAt).locale("es").fromNow()), [user]);
  const [profileSrc, setProfileSrc] = useState(user?.profileSrc || "");

  const handleUpdatePhoto = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = (ev?.target as HTMLInputElement)?.files;

    if (files?.length) {
      const fileURL = URL.createObjectURL(files[0]);

      setProfileSrc(fileURL);
      handleUploadImage(files[0]);
    }
  }

  const handleBirth = (value: dayjs.Dayjs | null) => {
    setBirthValue(value?.format("YYYY-MM-DD[T12:00]") || '');
  }

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    ev.stopPropagation();

    const data = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      birthDate: birthValue,
      gender: genderValue,
    }

    updateUser(data)
      .unwrap()
      .then(() => {
        toast("Datos actualizados", {
          type: "success",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast(error?.data?.error?.message || "Error interno", {
          type: "error",
        });
      });
  }

  const handleUploadImage = (picture: Blob) => {
    const formData = new FormData();

    formData.append('picture', picture);

    updateProfilePicture(formData)
      .unwrap()
      .then(() => {
        toast("Datos actualizados", {
          type: "success",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast(error?.data?.error?.message || "Error interno", {
          type: "error",
        });
      });
  }

  return (
    <form
      className={style.container}
      onSubmit={(ev: React.FormEvent<HTMLFormElement>) => handleSubmit(ev)}
    >
      <div className={style.header}>
        <h3>Mi perfil</h3>
        <p>Actualiza los detalles de tu perfil aquí</p>
      </div>
      <div className={style.profileBasics}>
        <div className={style.identity}>
          <div className={style.avatar}>
            <div className={style.avatarContent}>
              {profileSrc ? (
                <div className={style.boxAvatarContent}>
                  <img src={profileSrc} alt={user?.info?.firstName || ''} />
                </div>
              ) : (
                <div>
                  {(user?.info?.firstName || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <label
                className={style.avatarEditButton}
                htmlFor="profile-upload-input"
              >
                <PencilIcon />
                <input
                  type="file"
                  id="profile-upload-input"
                  onChange={handleUpdatePhoto}
                />
              </label>
            </div>

            {/* <FormInput<FormCreatePostImage>
            isEditMode
            spacing={3}
            form={{ picture: {} }}
            setForm={() => { }}
            fields={[
              {
                label: "Anadir imagenes",
                name: "picture",
                type: "file",
                required: true,
                responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                handleChange(picture) {
                  console.log(picture);
                  // setForm((prev) => ({
                  //     ...prev,
                  //     picture
                  // }))
                },
              }
            ]}
            errors={{} as any}
          /> */}
            {/* <div>
            <Dropzone
              label={'field.label'}
              disabled={false}
              name={'String(field.name)'}
              value={'form[name] || ""'}
              isEditMode
              onChange={(data: Buffer | IFile) => {

                const _value = data || form[name] || "";
                if (typeof field.handleChange == "function") {
                  field.handleChange(_value);
                } else {
                  handleUpdatePhoto(String(field.name), data);
                }
                handleUpdatePhoto(String('field.name'), data);
              }}
            />
          </div> */}
          </div>
          <div className={style.identityDetails}>
            <h3>{user?.info?.firstName || ""} {user?.info?.lastName || ""}</h3>
            <div
              className={style.getVerifiedButton}
              onClick={() => dispatch(toggleModal(true))}
            >
              <span>Verificate</span>
              <div>
                <VerifyIcon />
              </div>
            </div>
            <div className={style.joinedTime}>
              <p>Se unió {timeAgo}</p>
            </div>
          </div>
        </div>
        <div className={style.name}>
          <div className={style.nameTitles}>
            <h4>Profile name</h4>
            <p>Esto será mostrado en tu perfil.</p>
          </div>
          <div className={style.nameFields}>
            <TextField
              label="Nombre"
              variant="outlined"
              className={style.textField}
              value={firstNameValue}
              onChange={(ev) => setFirstNameValue(ev.target.value)}
            />
            <TextField
              label="Apellido"
              variant="outlined"
              value={lastNameValue}
              onChange={(ev) => setLastNameValue(ev.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={style.profileMoreDetails}>
        <div>
          <h4>Detalles de la cuenta</h4>
          <p>Esto no está visible a otros usuarios.</p>
        </div>
        <div className={style.profileDataFields}>
          <div>
            <div className={style.label}>
              <div>
                <CalendarIcon />
                <strong>Fecha de nacimiento</strong>
              </div>
            </div>
            <div className={style.field}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de nacimiento"
                  {...(user?.info?.birthDate ? { value: dayjs(user?.info?.birthDate) } : {})}
                  defaultValue={dayjs(birthValue)}
                  onChange={(value) => handleBirth(value)}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div>
            <div className={style.label}>
              <div>
                <GlobeIcon style={{ height: "16px" }} />
                <strong>Nacionalidad</strong>
              </div>
            </div>
            <div className={style.field}>
              <TextField
                id="outlined-select-currency"
                select
                label="Elije un país"
                defaultValue={"DO"}
              >
                {[{ label: "Republica Dominicana", value: "DO" }].map((option: Record<string, string>) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div>
            <div className={style.label}>
              <div>
                <UserIcon style={{ height: "19px" }} />
                <strong>Género</strong>
              </div>
            </div>
            <div className={style.field}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="gender"
                value={genderValue}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => (
                  setGenderValue(ev.target.value as UserGenderI)
                )}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Masculino"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Femenino"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Prefiero no decirlo"
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      <div className={style.saveButton}>
        <div>
          <Button color="success">
            Guardar cambios
          </Button>
        </div>
      </div>
    </form>
  );
}
