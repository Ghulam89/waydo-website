import config from "@config";
import { LayoutVersionType, NavFooterI } from "./layout.interface";

export const layoutVersion: LayoutVersionType = config.layout.version
export const layoutAuthVersion: LayoutVersionType = config.layout.authVersion

export const navFooter: NavFooterI[] = [
    {
        label: "Compañía",
        items: [
            {
                label: "Sobre nosotros",
                link: "/about-us"
            },
            {
                label: "Contáctanos",
                link: "#"
            }
        ]
    },
    {
        label: "Usuario",
        items: [
            {
                label: "Registrarse",
                link: "/auth/signup"
            },
            {
                label: "Iniciar sesión",
                link: "/auth/signin"
            }
        ]
    },
    {
        label: "Legal",
        items: [
            {
                label: "Términos de uso",
                link: "/terms"
            },
            {
                label: "Política de privacidad",
                link: "/privacy"
            }
        ]
    }
]