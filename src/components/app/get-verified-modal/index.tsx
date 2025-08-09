import { useAppDispatch } from "@redux/hooks";
import { toggleModal } from "@redux/slices/user-verification-modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ModalZoon } from "../modal";
import styles from "./verify-modal.module.css";
import VerifyingID from "./view/add-id";
import StartVerifying from "./view/start";

export default function GetVerifiedModal() {
  const [openView, setOpenView] = useState(0);
  const dispatch = useAppDispatch();
  const { isModalActive } = useSelector(
    (s: { verificationModal: { isModalActive: boolean } }) => s.verificationModal
  );

  const handleCloseModal = (val: boolean) => {
    dispatch(toggleModal(val));
  }

  useEffect(() => {
    if (!isModalActive) setTimeout(() => setOpenView(0), 1000);
  }, [isModalActive]);

  return (
    <ModalZoon
      show={isModalActive}
      onClose={() => handleCloseModal(false)}
    >
      <div className={styles.getVerified}>
        <div className={styles.content}>
          {openView === 0 && (
            <StartVerifying goTo={(viewIndex) => setOpenView(viewIndex)} />
          )}

          {openView === 1 && (
            <VerifyingID goTo={(viewIndex) => setOpenView(viewIndex)} />
          )}
        </div>
      </div>
    </ModalZoon>
  )
}