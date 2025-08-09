import classNames from "classnames";
import { BaseWrappeFilterI, ItemBaseWrappeFilterI } from "./base-wrappe.interface";
import style from "./base-wrappe.module.css";

export default function BaseWrappeFilter({
  items,
  value,
  disabled,
  identifier,
  onChange
}: BaseWrappeFilterI) {


  const handleChange = (item: ItemBaseWrappeFilterI, index: number) => {
    if (typeof onChange == "function") {
      onChange(item, index)
    }
  };


  return (
    <div className={style.container}>
      <div className={style.boxList}>
        {Array.from(!disabled ? items || [] : []).map((item, i) => (
          <div
            key={`${identifier}-${i}`}
            className={classNames(
              style.item,
              item.uuid === value || item.slug === value ? style.itemActive : ""
            )}
            onClick={() => handleChange(item, i)}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
