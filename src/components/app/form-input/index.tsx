import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Autocomplete,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { DatePicker } from "@mui/x-date-pickers";
import classNames from "classnames";
import creditCardType from "credit-card-type";
import dayjs, { Dayjs } from "dayjs";
import { MuiTelInput } from "mui-tel-input";
import React, { useCallback, useState } from "react";
import Dropzone from "../dropzone";
import { FormInputPropsI, RightPositionI } from "./form-input.interface";
import style from "./form-input.module.css";

const FormInput = <T extends object>({
  errors,
  fields,
  rightPosition,
  form,
  isEditMode,
  setForm,
  responsive,
  order,
  padding = 1,
  spacing = 2,
}: FormInputPropsI<T> & { rightPosition?: RightPositionI }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (
    event:
      | React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleNumberInputChange = (
    event:
      | React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value || "" });
  };

  const handleTelChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (name: string, value: Dayjs | null) => {
    setForm({
      ...form,
      [name]: value?.format("YYYY-MM-DDTHH:mm:ss").toString(),
    });
  };

  const handleFileChange = (name: string, value: File | Buffer | null) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (name: string, value?: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, checked } = event.currentTarget;

      //@ts-ignore
      let arrayData = form[name] as string[];

      if (!Array.from(arrayData)) {
        return console.error(`${name} checkbox need value array`);
      }

      arrayData = [...arrayData];

      if (checked) {
        arrayData.push(value);
      } else {
        arrayData = arrayData.filter((d) => d !== value);
      }

      setForm({ ...form, [name]: arrayData });
    },
    [form]
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Grid
      item
      xs={12 - (rightPosition?.col || 0)}
      {...(responsive ? responsive : {})}
      {...(typeof order == "number" ? { order } : {})}
    >
      <Grid container spacing={spacing} padding={padding}>
        {fields.map((field, index) => {
          const name = field.name as keyof T;

          return (
            <Grid
              item
              {...(field.responsive ? field.responsive : {})}
              key={`field-${index}`}
            >

              {typeof field.forceRender === "function" ? (
                field.forceRenderWithoutContainer ? field.forceRender({}) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <strong
                        style={{ fontSize: ".8em" }}
                      >
                        {field.label}
                      </strong>
                    </div>
                    <div style={{ flex: "1 1 auto" }}>
                      <div>
                        {field.forceRender({})}
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <React.Fragment>
                  {field.type === "divider" &&
                    (field.label ? (
                      <Divider
                        textAlign={field?.textAlign || "left"}
                        style={{ ...(field.style || {}) }}
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{
                            width: "100%",
                            whiteSpace: "pre-wrap",
                            textAlign: "center",
                            ...(field.style || {}),
                          }}
                        >
                          {field.label}
                        </Typography>
                      </Divider>
                    ) : (
                      <Divider style={{ ...(field.style || {}) }} />
                    ))}
                  {["text", "textarea", "creditcard"].includes(`${field.type}`) ? (
                    <TextField
                      name={String(name)}
                      placeholder={field.placeholder}
                      label={field.label}
                      sx={field.sx}
                      // required={field.required}
                      fullWidth
                      style={{ ...(field.style || {}) }}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      variant={field.varient || "outlined"}
                      multiline={field.type === "textarea"}
                      error={errors && errors[name] ? true : false}
                      helperText={errors ? errors[name] || "" : ""}
                      value={form[name] || ""}
                      disabled={field.disabled ? field.disabled : !isEditMode}
                      {...(field.ref ? { inputRef: field.ref as any } : {})}
                      inputProps={{
                        ...(field.type === "textarea" ? {
                          style: {
                            height: "50px",
                            ...(field.style || {}),
                          }
                        } : {}),
                        ...(field.id ? { id: field.id } : {})
                      }}
                      onChange={(e) => {
                        const { value } = e.target;
                        const _value = value || form[name] || "";

                        if (
                          field.type == "creditcard" &&
                          !creditCardType(_value).length
                        ) {
                          return;
                        }

                        if (typeof field.handleChange == "function") {
                          field.handleChange(_value);
                        } else {
                          handleInputChange(e);
                        }
                      }}
                      {...(field.startAdornment && {
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              {field.startAdornment}
                            </InputAdornment>
                          ),
                        },
                      })}
                    />
                  ) : null}
                  {field.type === "number" && (
                    <TextField
                      name={String(name)}
                      label={field.label}
                      fullWidth
                      error={errors && errors[name] ? true : false}
                      helperText={errors ? errors[name] || "" : ""}
                      style={{ ...(field.style || {}) }}
                      variant={field.varient || "outlined"}
                      sx={field.sx}
                      defaultValue={
                        field.initialCero && !form[name]
                          ? 0
                          : !isNaN(form[name])
                            ? form[name]
                            : form[name] || ""
                      }
                      {...(form[name] || form[name] === 0
                        ? {
                          value: form[name],
                        }
                        : {})}
                      type="text"
                      inputProps={{
                        ...(!isNaN(field.min as number) ? { min: field.min } : {}),
                        ...(!isNaN(field.max as number) ? { max: field.max } : {}),
                      }}
                      disabled={field.disabled ? field.disabled : !isEditMode}
                      onChange={(e) => {
                        const { value } = e.target;
                        const _value = value || form[name] || "";

                        if (field.disabledDecimal) {
                          e.currentTarget.value = e.target.value.replace(/\D/g, '');
                        } else {
                          e.currentTarget.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                        }


                        if (typeof field.handleChange == "function") {
                          field.handleChange(_value);
                        } else {
                          handleNumberInputChange(e);
                        }
                      }}
                      {...(field.startAdornment && {
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              {field.startAdornment}
                            </InputAdornment>
                          ),
                        },
                      })}
                    />
                  )}
                  {field.type === "tel" && (
                    <MuiTelInput
                      defaultCountry="DO"
                      name={String(name)}
                      label={field.label}
                      fullWidth
                      // required={field.required}
                      variant={field.varient || "outlined"}
                      error={errors && errors[name] ? true : false}
                      helperText={errors ? errors[name] || "" : ""}
                      value={form[name] || ""}
                      disabled={field.disabled ? field.disabled : !isEditMode}
                      style={{ ...(field.style || {}) }}
                      onChange={(value) => {
                        const _value = value || form[name] || "";
                        typeof field.handleChange == "function" &&
                          field.handleChange(_value);

                        if (typeof field.handleChange == "function") {
                          field.handleChange(_value);
                        } else {
                          handleTelChange(String(name), _value);
                        }
                      }}
                      {...(field.startAdornment && {
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              {field.startAdornment}
                            </InputAdornment>
                          ),
                        },
                      })}
                    />
                  )}
                  {field.type === "password" && (
                    <TextField
                      name={String(name)}
                      label={field.label}
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      variant={field.varient || "outlined"}
                      error={errors && errors[name] ? true : false}
                      // required={field.required}
                      style={{ ...(field.style || {}) }}
                      helperText={errors ? errors[name] || "" : ""}
                      value={form[name] || ""}
                      disabled={field.disabled ? field.disabled : !isEditMode}
                      onChange={(e) => {
                        const { value } = e.target;
                        const _value = value || form[name] || "";

                        if (typeof field.handleChange == "function") {
                          field.handleChange(_value);
                        } else {
                          handleInputChange(e);
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  {field.type === "select" && (
                    <FormControl fullWidth>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        name={String(name)}
                        id={`${field.type}-${String(name)}-${field.label}`}
                        value={form[name] || ""}
                        variant={field.varient || "outlined"}
                        // required={field.required}
                        disabled={field.disabled ? field.disabled : !isEditMode}
                        style={{ ...(field.style || {}) }}
                        error={errors && errors[name] ? true : false}
                        onChange={(e) => {
                          const { value } = e.target;
                          const _value = value || form[name] || "";

                          if (typeof field.handleChange == "function") {
                            field.handleChange(_value);
                          } else {
                            handleInputChange(e);
                          }
                        }}
                      >
                        {(field.options || []).map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors && errors[name] && (
                        <FormHelperText error>
                          {errors ? errors[name] || "" : ""}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                  {field.type === "date" && (
                    <DatePicker
                      {...(form[name] ? { value: dayjs(form[name]) as any } : {})}
                      label={field.label}
                      disabled={field.disabled ? field.disabled : !isEditMode}
                      slotProps={{
                        textField: {
                          variant: field.varient || "outlined",
                          name: String(name),
                          fullWidth: true,
                          error: errors && errors[name] ? true : false,
                          helperText: errors ? errors[name] || "" : "",
                        },
                      }}
                      onChange={(date) => {
                        const _value = date || form[name] || "";

                        if (typeof field.handleChange == "function") {
                          field.handleChange(_value);
                        } else {
                          handleDateChange(String(name), date);
                        }
                      }}
                    />
                  )}
                  {field.type === "switch" && (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={form[name] || false}
                          style={{ ...(field.style || {}) }}
                          disabled={field.disabled ? field.disabled : !isEditMode}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const _value = checked || form[name] || "";

                            if (typeof field.handleChange == "function") {
                              field.handleChange(_value);
                            } else {
                              handleSwitchChange(String(name), checked);
                            }
                          }}
                        />
                      }
                      label={field.label}
                      name={String(name)}
                    />
                  )}
                  {field.type === "autocomplete" && (
                    <Autocomplete
                      clearOnEscape
                      disabled={field.disabled || !isEditMode}
                      options={Array.from(field.options || []).map((o) => o.value)}
                      getOptionLabel={(value) =>
                        Array.from(field.options || []).find(
                          (o) => o.value == value
                        )?.label || ""
                      }
                      value={form[name] || ""}
                      sx={field.sx}
                      loading={field.loading}
                      onChange={(_, value) => {
                        if (typeof field.handleChange == "function") {
                          field.handleChange(value);
                        } else {
                          handleAutocompleteChange(
                            field.name as string,
                            value as string
                          );
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`${field.label} ${!field.required ? "(Opcional)" : ""
                            }`.trim()}
                          error={errors && errors[name] ? true : false}
                          // required={field.required}
                          placeholder={field.placeholder}
                          helperText={errors ? errors[name] || "" : ""}
                          variant={field.varient || "outlined"}
                          InputProps={{
                            ...(params.InputProps || {}),
                            startAdornment:
                              typeof (field.options || []).find(
                                (o) => o.value == form[name]
                              )?.icon == "function" ? (
                                //@ts-ignore
                                (field.options || [])
                                  .find((o) => o.value == form[name])
                                  .icon()
                              ) : (
                                <span></span>
                              ),

                            endAdornment: (
                              <React.Fragment>
                                {field.loading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                  )}
                  {field.type === "radio" && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <strong
                          style={{
                            fontSize: ".9em",
                          }}
                        >
                          {field.label} {errors ? errors[name] ? (<span className={style.error}>{errors[name]}</span>) : "" : ""}
                        </strong>
                      </div>
                      <div style={{ flex: "1 1 auto" }}>
                        <div
                          className={style.containerRadioButton}
                        >
                          {Array.from(field?.dataRender || []).map((item, i) => (
                            <div
                              //@ts-ignore
                              className={classNames(style.boxRadioButton, item.key == form[field.name] ? style.boxRadioButtonActive : "")}
                              key={i}
                            >
                              {item.key ? (
                                <input
                                  type="radio"
                                  name={`${(field?.name as string) || ""}`}
                                  value={item.key}
                                  //@ts-ignore
                                  checked={item.key == form[field.name]}
                                  onChange={(e) => {
                                    const { value } = e.target;
                                    const _value = value || form[name] || "";

                                    if (typeof field.handleChange == "function") {
                                      field.handleChange(_value);
                                    } else {
                                      handleInputChange(e);
                                    }
                                  }}
                                />
                              ) : null}
                              <div
                                style={{
                                  position: "relative",
                                  left: 0,
                                  top: 0,
                                  width: "100%",
                                  height: "100%",
                                }}
                              >
                                {typeof field?.render == "function" &&
                                  field.render({
                                    ...item,
                                    active: (form[name] || "") == item.key,
                                    data: item.data || {},
                                  })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {field.type === "checkbox" && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <strong
                          style={{
                            fontSize: ".9em",
                          }}
                        >
                          {field.label}
                        </strong>
                      </div>
                      <div style={{ flex: "1 1 auto" }}>
                        <div
                          style={{
                            paddingTop: "12px",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1rem",
                          }}
                        >
                          {Array.from(field?.dataRender || []).map((item, i) => (
                            <div
                              style={{ position: "relative", cursor: "pointer" }}
                              key={i}
                            >
                              {item.key ? (
                                <input
                                  type="checkbox"
                                  checked={Array.from(form[name] || []).includes(
                                    item.key
                                  )}
                                  name={`${(field?.name as string) || ""}`}
                                  value={item.key}
                                  style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    left: 0,
                                    top: 0,
                                    zIndex: 1,
                                    cursor: "pointer",
                                    opacity: 0,
                                  }}
                                  onChange={(e) => {
                                    const { value } = e.target;

                                    if (typeof field.handleChange == "function") {
                                      field.handleChange(value);
                                    } else {
                                      handleCheckboxChange(e);
                                    }
                                  }}
                                />
                              ) : null}
                              <div
                                style={{
                                  position: "relative",
                                  left: 0,
                                  top: 0,
                                  width: "100%",
                                  height: "100%",
                                }}
                              >
                                {typeof field?.render == "function" &&
                                  field.render({
                                    ...item,
                                    active: Array.from(form[name] || []).includes(
                                      item.key
                                    ),
                                    data: item.data || {},
                                  })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {field.type === "file" && (
                    <Dropzone
                      label={field.label}
                      error={errors && errors[name] ? true : false}
                      disabled={field.disabled ? field.disabled : !isEditMode}
                      name={String(field.name)}
                      value={form[name] || ""}
                      isEditMode={field.isEditMode || false}
                      onChange={(data) => {
                        const _value = data || form[name] || "";
                        if (typeof field.handleChange == "function") {
                          field.handleChange(_value);
                        } else {
                          handleFileChange(String(field.name), data);
                        }
                      }}
                    />
                  )}
                </React.Fragment>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default FormInput;
