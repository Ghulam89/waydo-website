import { LayoutPropsI } from "@components/layouts/layout.interface";
import classNames from "classnames";
import FooterV1 from "./footer";
import HeaderV1 from "./header";
import style from "./main.module.css";

const LayoutV1 = (props: LayoutPropsI) => {
  return (
    <div className={style.container}>
      <HeaderV1 {...props} />
      <main className={classNames(style.main, "container")}>
        {props.children}
      </main>
      <FooterV1 />
    </div>
  );
};

export default LayoutV1;
