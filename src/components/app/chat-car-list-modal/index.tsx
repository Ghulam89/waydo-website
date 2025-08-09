import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchCarIcon from "@svg/search-with-car-icon.svg";
import Tippy from "@tippyjs/react";
import Image from "next/image";
import { useRef } from "react";
import Button from "../button/app";
import styles from "./chat-car-list-modal.module.css";

export default function ChatCarListModal() {
  /**@deprecated maybe not needed */
  const tippyRef = useRef<any>(null);

  return (
    <Tippy
      interactive
      trigger="click"
      arrow
      placement="bottom-start"
      animation="shift-away"
      maxWidth={"auto"}
      onCreate={(intance) => tippyRef.current = intance}
      className={styles.modalWrapper}
      content={
        <div className={styles.carListInChat}>
          <div className={styles.chatsSearch}>
            <input placeholder='Buscar vehiculos' />
            <FontAwesomeIcon
              icon={faSearch}
            />
          </div>
          <div className={styles.carsList}>
            {Array(7).fill(0).map((_, i) => (
              <div
                key={i}
                className={styles.carListItem}
                onClick={() => { }}
              >
                <Image
                  src={'/assets/img/mock/featured/1.png'}
                  style={{ borderRadius: '3px' }}
                  height={30}
                  width={45}
                  alt="car-item"
                />
                <div className={styles.carItemDescription}>
                  Toyota | Corolla | SX | 2022 | $1,000,000 | Azul
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sendCarButton}>
            <Button
              size="small"
              styles={{
                backgroundColor: "#d03e13",
                borderRadius: "6px",
                color: "white",
                padding: "7px",
                width: "200px",
                border: "none",
                fontSize: "0.75rem",
              }}
            >
              Enviar
            </Button>
          </div>
        </div>
      }
    >
      <div className={styles.chatSearchCarsButton}>
        <SearchCarIcon />
      </div>
    </Tippy>
  )
}