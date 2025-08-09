import Tippy from "@tippyjs/react";
import { useMemo, useRef } from "react";
import { ItemNavFavoritePropsI } from "./item-nav.interface";
import style from "./item-nav.module.css";


export default function ItemNavFavorite({ isDefault, title, collaborators, total }: ItemNavFavoritePropsI) {
    const tippyInstance = useRef<any>();

    const countCollaborators = useMemo(() => (Array.from(collaborators || []).length), [collaborators])

    return (
        <div className={style.item}>
            <img className={style.thumbnail} src="https://dbz-images.dubizzle.com/images/2024/09/16/2da9fa6e91694c2ca3386655072af9a2-.jpeg?impolicy=dpv" />
            <div className={style.boxInfo}>
                {!isDefault ? (
                    <h6 className={style.title}>{title}</h6>
                ) : (
                    <div className={style.boxTitle}>
                        <h6>{title}</h6>
                        <div className={style.boxDefault}>
                            <span>Por defecto</span>
                        </div>
                    </div>
                )}

                <p className={style.count}>{total} Saved&nbsp;Ad</p>
                <div className={style.boxCollaborator}>
                    {!collaborators ? (
                        <img src="/assets/img/people.svg" alt="people" />
                    ) : null}
                    <p>
                        {!collaborators ? "Privado" : countCollaborators > 0 ? `Compartido con ${collaborators.map((c) => (c.firstName)).join(", ")}` : "Todavía no hay colaboradores"}
                    </p>
                </div>
                {!isDefault && (
                    <div className={style.boxButton}>
                        <Tippy
                            key={`model-filter`}
                            interactive
                            arrow={false}
                            trigger="click"
                            placement="bottom-start"
                            animation="shift-away"
                            maxWidth={"auto"}
                            onCreate={(intance) => tippyInstance.current = intance}
                            content={
                                <div className={style.boxList}>
                                    <ul>
                                        <li>Compartir lista</li>
                                        <li>Renombrar lista</li>
                                        <li>Borrar lista</li>
                                    </ul>
                                </div>
                            }
                        >
                            <button type="button" id="action-button">
                                <img src="/assets/img/dot-overflow-menu.svg" alt="Menu Action" />
                            </button>
                        </Tippy>

                    </div>
                )}
            </div>
        </div>
    )
}