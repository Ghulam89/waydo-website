import { AnnouncementItemI } from '@components/app/announcement-item';
import OverlappingGallery from '@components/app/overlapping-gallery';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { alpha, styled, Switch } from '@mui/material';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import Button from '../button/app';
import { ModalZoon } from '../modal';
import styles from "./search-item.module.css";

export type SearchItemI = {
  id: string;
  articleTags: string[];
  title: string;
  location: string;
  date: Date;
  /**
   * Move property to single interface file
   */
  items: AnnouncementItemI[];
}

export type NotificationMethodI = {
  icon: ReactNode;
  title: string;
  enabled: boolean;
  subtitle: string;
}

type Props = {
  search: SearchItemI;
}

const BlackSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#000',
    '&:hover': {
      backgroundColor: alpha('#000', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#919294',
  },
}));

export default function SearchItem({ search }: Props) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [methods, setMethods] = useState<NotificationMethodI[]>([]);

  console.log({ search });

  const notificationMethods = [
    {
      icon: (
        <Image
          src='/assets/img/email-notifications.png'
          alt="Email"
          width={36}
          height={47}
        />
      ),
      title: 'Correo',
      enabled: true,
      subtitle: 'Recibe correos con nuevos anuncios que se ajusten',
    },
    {
      icon: (
        <Image
          src='/assets/img/push-notifications.png'
          alt="Push"
          width={36}
          height={47}
        />
      ),
      title: 'Push',
      enabled: true,
      subtitle: 'Recibe notificaciones en tu telefono con nuevos anuncios.',
    },
  ]

  useEffect(() => {
    setMethods(notificationMethods);
  }, []);

  const handleSwitchMethod = (methodIndex: number) => {
    const currentMethod = methods[methodIndex];

    methods.splice(
      methodIndex,
      1,
      {
        ...methods[methodIndex],
        enabled: !currentMethod.enabled
      }
    );

    setMethods(methods);
  }

  return (
    <div className={styles.searchItem}>
      <div className={styles.rightSide}>
        <div className={styles.articleTags}>
          <span>Sedan</span>
          <span>|</span>
          <span>Yipeta</span>
          <span>|</span>
          <span>Camioneta</span>
        </div>
        <div>
          <strong>{search.title}</strong>
        </div>
        <p className={styles.location}>
          {search.location}
        </p>
        <div className={styles.dateSave}>
          Guardado: 6 de Julio
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.resultsGallery}>
          <OverlappingGallery
            images={search.items
              .map(item => item.images[0])
              .slice(0, 3)
            }
          />
        </div>
        <div className={styles.itemActions}>
          <div onClick={() => setNotificationsOpen(true)} >
            <NotificationsOutlinedIcon />
            <strong>
              Notificaciones: Email y Push
            </strong>
          </div>
          <div>
            <ShareOutlinedIcon />
            <strong>
              Compartir
            </strong>
          </div>
          <div>
            <MoreHorizIcon />
          </div>
        </div>
      </div>
      <ModalZoon
        key={`notification-modal-` + search.id}
        show={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      >
        <div className={styles.notifications}>
          <div className={styles.header}>
            <div>
              <NotificationsOutlinedIcon />
            </div>
            <div>
              <h3>
                Habilitar notificaciones
              </h3>
              <p>
                Recibe una notificación cuando un anuncio se ajuste a tu búsqueda.
              </p>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.selectedItem}>
              <div>
                <div className={styles.articleTags}>
                  <span>Sedan</span>
                  <span>|</span>
                  <span>Yipeta</span>
                  <span>|</span>
                  <span>Camioneta</span>
                </div>
                <strong>{search.title}</strong>
              </div>
              <div>
                <OverlappingGallery
                  hideToRightOffset={25}
                  slideStyle={{
                    width: '50px',
                    height: '50px',
                  }}
                  images={search.items
                    .map(item => item.images[0])
                    .slice(0, 3)
                  }
                />
              </div>
            </div>

            <div className={styles.notificationMethods}>
              {methods.map((item, i) => (
                <div
                  className={styles.notificationMethod}
                  key={i}
                >
                  {item.icon}
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.subtitle}</span>
                  </div>
                  <div className={styles.switch}>
                    <BlackSwitch
                      aria-label={`notification-method-` + i}
                      checked={item.enabled}
                      onClick={() => handleSwitchMethod(i)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.footer}>
            <div>
              <Button
                variant="outlined"
                onClick={() => setNotificationsOpen(false)}
              >
                Cancelar
              </Button>
            </div>
            <div>
              <Button
                disabled
              >
                Actualizar Notificaciones
              </Button>
            </div>
          </div>
        </div>
      </ModalZoon>
    </div>
  )
}