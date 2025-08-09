import LinkLogo from "@components/app/logo/link";
import SpeechRecognitionComponent from "@components/app/speech-recognition";
import { LayoutPropsI } from "@components/layouts/layout.interface";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useGetUserInfoV1Query, useLogoutV1Mutation } from "@redux/rtk/server/v1/me";
import { useGetInfoPostByImageMutation } from "@redux/rtk/server/v1/post";
import { TypeGetInfoByImageEnum } from "@redux/rtk/server/v1/post/post.interfaces";
import { updateFilter } from "@redux/slices/filter";
import { FilterSliceI } from "@redux/slices/filter/filter.interface";
import { updateLayout } from "@redux/slices/layout";
import { toggleModal } from "@redux/slices/user-verification-modal";
import Mic from "@svg/Mic.svg";
import Search from "@svg/Search.svg";
import VerifyIcon from "@svg/VerifyBlue.svg";
import Tippy from "@tippyjs/react";
import logout from "@utils/auth/logout";
import { generateUrlPost } from "@utils/filter";
import classNames from "classnames";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState
} from "react";
import { isMobile, isTablet } from 'react-device-detect';
import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";
import AnnouncementVersion1 from "./announcement";
import ChatVersion1 from "./chat";
import FavoriteVersion1 from "./favorite";
import style from "./header.module.css";
import NotificationVersion1 from "./notifications";
import SearchVersion1 from "./search";

type TippyInstance = {
  hide?: () => void;
};

export default function HeaderV1(props: LayoutPropsI) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>("");
  const [tippyInstance, setTippyInstance] = useState<TippyInstance>();
  const [logoutUser] = useLogoutV1Mutation();
  const [getInfoPostByImage, { isLoading: isLoadingImage }] = useGetInfoPostByImageMutation();

  const { search: _search, ...filters } = useAppSelector((s) => s.filters);
  const useSearchWithPicture = useMemo(() => (isMobile || isTablet), [isMobile, isTablet])

  const {
    isLoading: isLoadingUserInfo,
    data: user,
    // isFetching,
    // isError,
    // isSuccess,
  } = useGetUserInfoV1Query({});

  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const navs = useMemo(
    () => [
      {
        Icon: NotificationVersion1,
      },
      {
        Icon: SearchVersion1,
      },
      {
        Icon: FavoriteVersion1,
      },
      {
        Icon: ChatVersion1,
      },
      {
        Icon: AnnouncementVersion1,
      },
    ],
    []
  );

  const userOptionsDropdown = [
    {
      optionElement: (
        <div className={style.optionsItemContent}>
          <div>Mi Perfil</div>
        </div>
      ),
      onClick: () => router.push("/profile"),
    },
    {
      optionElement: (
        <div className={style.optionsItemContent}>
          <div>
            <span>
              Verificate
            </span>
            <VerifyIcon
              style={{
                height: '19px',
                marginLeft: '10px',
                position: 'relative',
                top: '3px'
              }}
            />
          </div>
        </div>
      ),
      onClick: () => dispatch(toggleModal(true)),
    },
    {
      optionElement: (
        <div className={style.optionsItemContent}>
          <div>Mi Compañía</div>
        </div>
      ),
      onClick: () => router.push("/my-company"),
    },
    {
      optionElement: (
        <div className={style.optionsItemContent}>
          <div>Dashboard</div>
        </div>
      ),
      onClick: () => router.push("/dashboard"),
    },
    {
      optionElement: (
        <div className={style.optionsItemContent}>
          <div>Mis anuncios</div>
        </div>
      ),
      onClick: () => router.push('/announcements'),
    },
    {
      optionElement: (
        <div className={style.optionsItemContent}>
          <div>Mis busquedas</div>
        </div>
      ),
      onClick: () => router.push('/searches'),
    },
    {
      optionElement: (
        <div className={style.optionsItemContent}>
          <div>Cerrar sesión</div>
        </div>
      ),
      onClick: () => handleLogout(),
    },
  ]

  const handleEnter = useCallback(() => {
    setSearchFocus(true);
  }, []);

  const handleOut = useCallback(() => {
    setSearchFocus(false);
  }, []);

  const handleClickLabelSearch = useCallback(() => {
    handleEnter();
    inputRef.current?.focus();
  }, [inputRef]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearch(value);
  }, []);

  const handleActionModalAuth = useCallback(() => {
    dispatch(
      updateLayout({
        showModalAuth: true,
      })
    );
  }, []);

  const handleActionModalSignUp = useCallback(() => {
    dispatch(
      updateLayout({
        showModalSignUp: true,
      })
    );
  }, []);

  const handleGoPost = useCallback(() => {
    if (!user) {
      return handleActionModalAuth();
    }

    router.push("/posts/create");
  }, [!user]);

  const handleFilterSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>, search: string, filters: FilterSliceI) => {
      e.preventDefault();
      e.stopPropagation();


      dispatch(
        updateFilter({
          search,
        })
      );

      router.push(generateUrlPost({
        ...filters,
        search
      }))
    },
    []
  );

  const handleLogout = () => {
    logout();
    // tippyInstance?.hide?.();

    logoutUser({}).unwrap().then(() => {
      toast("Cerrando sesión...", {
        type: "warning",
        autoClose: 1000,
        onClose: () => (window.location.href = "/"),
      });
    }).catch(() => {
      toast("Internal server error", {
        type: "error"
      })
    })
  };

  const handleSearchImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(e?.currentTarget?.files || [])[0]
    if (!file) return;

    getInfoPostByImage({
      file,
      type: TypeGetInfoByImageEnum.car
    }).unwrap().then((data) => {
      router.push(generateUrlPost({
        ...filters,
        search: data.brandSlug
      }))
    }).catch(() => { })
  }, [filters])

  return (
    <header className={classNames(style.header, "container")}>
      <div className={classNames(style.boxHeader)}>
        <div className={style.boxLogo}>
          <LinkLogo />
        </div>
        <div>
          <div className={style.boxSearch}>
            {isLoadingImage && (<div className={style.boxLoading}></div>)}
            <div className={style.boxSearchInput}>
              <div className={style.containSearch}>
                <Search />
              </div>
              {!searchFocus && !search && (
                <div
                  className={style.labelSearch}
                  onClick={handleClickLabelSearch}
                >
                  Encuentra
                </div>
              )}
              <form
                autoComplete="off"
                onSubmit={(e) => handleFilterSearch(e, search, filters as FilterSliceI)}
              >
                <input
                  ref={inputRef}
                  type="search"
                  onBlur={handleOut}
                  onFocus={handleEnter}
                  value={search || ""}
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="Encuentra tu vehículo ideal."
                />
              </form>
            </div>
            {useSearchWithPicture && (
              <div className={style.boxFile}>
                <div className={style.contentFIle}>
                  <input type="file" className={style.inputFile} onChange={handleSearchImage} />
                  <CameraAltIcon className={style.itemCamera} />
                </div>
              </div>
            )}
            <div className={style.boxMic}>
              <SpeechRecognitionComponent
                onStop={({ transcript }) => {
                  dispatch(updateFilter({
                    search: transcript
                  }))
                  router.push(`/search?keyword=${transcript}`)
                }}
              >
                {() => (
                  <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Mic />
                  </div>
                )}
              </SpeechRecognitionComponent>
            </div>
          </div>
        </div>
        <div className={style.boxNav}>
          <ul className={style.ulNav}>
            {navs.map(({ Icon }, i) => (
              <li key={i}>
                <div>
                  <div>
                    <Icon user={user!} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.boxButtonAuth}>
          {!isLoadingUserInfo && (
            <React.Fragment>
              {!user ? (
                <div>
                  <span onClick={handleActionModalAuth}>Iniciar session</span> o{" "}
                  <span onClick={handleActionModalSignUp}>registrate</span>
                </div>
              ) : (
                <Tippy
                  interactive
                  arrow={true}
                  trigger="click"
                  placement="top"
                  animation="shift-away"
                  maxWidth={"auto"}
                  hideOnClick
                  interactiveDebounce={75}
                  onCreate={(instance) => {
                    setTippyInstance(instance as TippyInstance);
                  }}
                  content={
                    <div
                      style={{ marginTop: 5 }}
                      className={style.optionsCard}
                    >
                      <ul>
                        {userOptionsDropdown.map((item, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              item?.onClick?.();
                              tippyInstance?.hide?.();
                            }}
                          >
                            {item.optionElement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                >
                  <div className={style.containerPicture}>
                    <div className={style.boxPicture}>
                      <Image
                        src={user.profileSrc}
                        height={150}
                        width={150}
                        alt="Profile"
                      />
                    </div>
                  </div>
                </Tippy>
              )}
            </React.Fragment>
          )}

          <Rings
            visible={isLoadingUserInfo}
            height="80"
            width="80"
            color="var(--primary-color-transparent)"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>

        <div className={style.boxButtonPost}>
          <button onClick={handleGoPost}>Publicar</button>
        </div>
      </div>
    </header>
  );
}
