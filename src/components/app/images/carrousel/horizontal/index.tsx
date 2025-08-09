import Back from "@svg/ArrowL.svg";
import Next from "@svg/ArrowR.svg";
import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import style from "./horizontal.module.css";

import Fav from "@svg/post/Fav.svg";
import Share from "@svg/post/Share.svg";

import { ModalZoon } from "@components/app/modal";
import { PostI } from "@redux/rtk/server/v1/post/post.interfaces";
import Close from "@svg/post/Close.svg";
import Email from "@svg/post/social/Email.svg";
import Facebook from "@svg/post/social/Facebook.svg";
import LinkedIn from "@svg/post/social/Linkedin.svg";
import Twitter from "@svg/post/social/Twitter.svg";
import Whatsapp from "@svg/post/social/Whatsapp.svg";
import Link from "next/link";

export default function PicturesCarrouselHorizontal({ items, post }: { items: string[], post: PostI }) {
  const [thumbIndex, setThumbIndex] = useState(0);
  const [thumbs, setThumbs] = useState<React.ReactElement[]>([]);
  const [copyUrl, setCopyUrl] = useState<boolean>(false)
  const [showShareModal, setShowShareModal] = useState<boolean>(false)

  const _items = useMemo(
    () =>
      items.map((src, i) => (
        <div
          key={`main-picture-post-${i}`}
          style={{ height: "500px", width: "100%" }}
        >
          <img
            src={src}
            role="presentation"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>
      )),
    [items]
  );

  const url = useMemo(() => (post?.url ? encodeURIComponent(post?.url) : ""), [post?.url])

  const shareListing = useMemo(() => ([
    {
      Icon: Whatsapp,
      label: "WhatsApp",
      link: `https://web.whatsapp.com/send?text=${url}`
    }, {
      Icon: Facebook,
      label: "Facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    }, {
      Icon: Twitter,
      label: "Twitter",
      link: `https://twitter.com/share?url=${url}`
    }, {
      Icon: LinkedIn,
      label: "LinkedIn",
      link: `https://linkedin.com/shareArticle?url=${url}`
    }, {
      Icon: Email,
      label: "Email",
      link: `mailto:?body=${url}`
    }
  ]), [url])


  const thumbItems = useCallback(
    (items: any[], [setThumbIndex]: any) => {
      return items.map((item, i) => (
        <div
          key={`thumb-${i}`}
          className={classNames(
            style.boxThumb,
            thumbIndex == i ? style.boxThumbActive : ""
          )}
          onClick={() => setThumbIndex(i)}
          style={{
            height: "60px",
            width: "100%",
            padding: "0 10px",
            boxSizing: "border-box",
          }}
        >
          {item}
        </div>
      ));
    },
    [thumbIndex]
  );

  const slideNext = useCallback(() => {
    setThumbIndex(thumbIndex < thumbs.length - 1 ? thumbIndex + 1 : 0);
  }, [thumbIndex, thumbs]);

  const slidePrev = useCallback(() => {
    setThumbIndex(thumbIndex > 0 ? thumbIndex - 1 : thumbs.length - 1);
  }, [thumbIndex, thumbs]);

  const syncThumbs = useCallback((e: any) => {
    setThumbIndex(e.item);
  }, [])

  const handleOpenShare = useCallback(() => {
    setShowShareModal(true)
  }, [])

  const closeOpenShare = useCallback(() => {
    setShowShareModal(false)
  }, [])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(post?.url as string).then(() => {
      setCopyUrl(true)

      setTimeout(() => {
        setCopyUrl(false)
      }, 1500)
    }).catch(() => { })
  }, [post?.url])



  useEffect(() => {
    setThumbs(thumbItems(_items, [setThumbIndex]));
  }, [_items]);

  return (
    <React.Fragment>
      {[
        <div className={style.containerView} key="container-view-carrousel">
          <div className={style.containerViewButtons}>
            <button><Fav /> <span>Favorito</span></button>
            <button onClick={handleOpenShare}><Share /> <span>Compartir</span></button>
          </div>
          <div className={style.boxView}>
            <AliceCarousel
              activeIndex={thumbIndex}
              autoWidth={true}
              disableDotsControls
              disableButtonsControls
              items={_items}
              mouseTracking={false}
              onSlideChanged={syncThumbs}
            />
            {_items.length > 1 ? (
              <React.Fragment>
                <button
                  className={classNames(style.buttonView, style.buttonViewL)}
                  onClick={slidePrev}
                >
                  <Back />
                </button>
                <button
                  className={classNames(style.buttonView, style.buttonViewR)}
                  onClick={slideNext}
                >
                  <Next />
                </button>
              </React.Fragment>
            ) : null}
          </div>
          <div className={style.cantPhoto}>{thumbIndex + 1} de {items.length} Fotos</div>
        </div>,
        <div
          className={classNames(style.containerThumb, "container-thumb-post")}
          key="container-thumb-carrousel"
        >
          <AliceCarousel
            activeIndex={thumbIndex}
            autoWidth={true}
            disableDotsControls
            disableButtonsControls
            items={thumbs}
            mouseTracking={false}
            onSlideChanged={syncThumbs}
          />
        </div>,
      ]}

      <ModalZoon
        show={showShareModal}
        onClose={closeOpenShare}
      >
        <div className={style.boxModalShare}>
          <div className={style.headerModalShare}>
            <div>
              <h2>Compartir este listado</h2>
            </div>
            <div onClick={closeOpenShare} className={style.closeShare}>
              <Close />
            </div>
          </div>
          <div className={style.contentModalShare}>
            <div className={style.boxSocialsModalShare}>
              {shareListing.map((item, i) => (
                <div key={`social-${i}`} className={style.boxSocialLink}>
                  <Link
                    href={""}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()

                      const a = document.createElement("a")
                      a.setAttribute("target", "_blank")
                      a.href = item.link

                      a.click()
                    }}
                  >
                    <div>
                      <item.Icon />
                    </div>
                    <span>{item.label}</span>
                  </Link>
                </div>
              ))}
            </div>

            <div className={style.boxSocialCopy}>
              <div className={style.boxSocialInputCopy}>
                <input type="text" value={post?.url} readOnly />
              </div>
              <div>
                <button className={style.buttonSocialCopy} onClick={handleCopy}>{copyUrl ? "Copiado" : "Copiar"}</button>
              </div>
            </div>
          </div>
        </div>
      </ModalZoon>

    </React.Fragment>
  );
}
