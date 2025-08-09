import { ItemRequirementListPasswordI } from "@settings/password/password.interface"
import { requirementListPasswordSetting } from "@settings/password/password.setting"
import { useCallback, useEffect, useState } from "react"
import { RequirementListPropsI } from "./requirements-list.interface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons"

import style from "./requirements-list.module.css"
import classNames from "classnames"

export default function RequirementList({ data, password, handleValid }: RequirementListPropsI) {
    const [lists, setList] = useState<ItemRequirementListPasswordI[]>([])

    const handleVerifyValidation = useCallback(() => {
        const valid = lists.filter((list) => (!list.valid)).length === 0
        handleValid(valid)
    }, [lists])

    const handleValidate = useCallback(() => {
        setList((lists) => (lists.map(list => {
            const value = data[list.name]
            if (!value) return list

            if (typeof list.regex == "function") {
                list.valid = list.regex(value).test(password)
            } else {
                list.valid = list.regex.test(password)
            }

            return list
        })))
    }, [data, password])

    useEffect(() => {
        setList(requirementListPasswordSetting)
    }, [requirementListPasswordSetting])

    useEffect(() => {
        handleValidate()
    }, [data, password])

    useEffect(() => {
        handleVerifyValidation()
    }, [lists])

    return (
        <div>
            <ul className={style.ul}>
                {lists.map((list, i) => (
                    <li className={style.li} key={i}>
                        <div className={classNames(style.boxIcon, list.valid ? style.boxIconValid : style.boxIconInvalid)}>
                            <FontAwesomeIcon icon={list.valid ? faCheck : faX} />
                        </div>
                        <span className={style.span}>{list.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}