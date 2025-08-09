"use client"

import { useMemo } from "react"

import style from "./favorite.module.css"

import classNames from "classnames"
import Image from "next/image"
import ItemNavFavorite from "./item-nav"

export default function FavoriteComponent() {
    const items = useMemo(() => ([
        {
            name: "All favorites",
            isDefault: true,
            countItems: 4,
            shareUsers: []
        },
        {
            name: "Test",
            countItems: 2,
            shareUsers: [{

            }]
        }
    ]), [])

    return (
        <div className={style.content}>
            <div className={style.header}>
                <h2 className={style.title}>Mis Favoritos</h2>
                <p>Crea una lista para organizar tus anuncios favoritos</p>
            </div>
            <div className={style.boxList}>
                <div className={style.boxNav}>
                    <div className={style.boxHeader}>
                        <h6>Mis Favoritos</h6>
                        <button type="button">
                            <span className="MuiButton-startIcon MuiButton-iconSizeMedium mui-style-ltr-1l6c7y9">
                                <Image src="/assets/img/plus.png" width={11.85} height={11.85} alt="plus" />
                            </span>
                            Crear una Lista
                        </button>
                    </div>
                    <div className={style.boxListNav}>
                        <div>
                            <ul>
                                <li>
                                    <ItemNavFavorite
                                        isDefault
                                        total={27}
                                        title="All Favorites"
                                    />
                                </li>

                                <li>
                                    <ItemNavFavorite
                                        title="Nuevos favoritos"
                                        total={25}
                                        collaborators={[{
                                            firstName: "Jei"
                                        }]}
                                    />
                                </li>

                                <li>
                                    <ItemNavFavorite
                                        title="Nuevos favoritos 2"
                                        total={1}
                                        collaborators={[]}
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className={style.contentAdd}>
                            <div className={style.boxAdd}>
                                <div>
                                    <Image src="/assets/img/favorite.png" alt="favorite icon add" width={83} height={83} />
                                </div>
                                <h3>
                                    Crea tu lista personalizada
                                </h3>
                                <span>Organiza tus favoritos</span>
                                <button>Crear una lista</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.boxListR}>
                    <div className={style.boxListRHeader}>
                        <div className={style.boxListRHeaderTop}>
                            <h6>Nuevos favoritos</h6>
                            <div className={style.boxListRHeaderTopButton}>
                                <button className={classNames(style.boxListRHeaderTopButtonB, style.buttonShare)}>
                                    <span>
                                        <img src="/assets/img/share-black.svg" alt="share" />
                                    </span>
                                    Share
                                </button>
                                <button className={classNames(style.boxListRHeaderTopButtonB)}>
                                    <img src="/assets/img/delete.svg" alt="delete" />
                                </button>
                                <button className={classNames(style.boxListRHeaderTopButtonB)} >
                                    <img src="/assets/img/edit-outlined.svg" alt="edit" />
                                </button>
                            </div>
                        </div>
                        <div className={style.boxInvite}>
                            <div className={style.buttonInvite}>
                                <img src="/assets/img/friends.svg" alt="friends" />
                                <p >Invite others to collaborate</p>
                            </div>
                            <img src="/assets/img/arrow-next.svg" alt="arrow-next" />
                        </div>
                    </div>
                    <div className={style.contentBoxList}>
                        <div className={style.boxImageContentBoxList}>
                            <Image src="/assets/img/empty-state.png" width={460} height={414} alt="Empty favorite" />
                        </div>
                        <div className={style.boxInfoContentBoxList}>
                            <h5>Todavía no tienes favoritos</h5>
                            <p>Usa el icono de favorito para guardar los anuncios que quieras ver luego.</p>
                            <button>Continuar buscando</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}