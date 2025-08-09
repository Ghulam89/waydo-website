import classNames from "classnames";
import { useMemo } from "react";
import style from "./button.module.css";

type Variant = 'filled' | 'outlined';

type Size = "medium" | "small";

type PredefinedColors = 'default' | 'success' | 'danger';

/**
 * 'default' | 'success' | 'danger' | '#ff0000'
 */
type Color = PredefinedColors | string;

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  color?: Color;
  variant?: Variant;
  size?: Size;
  styles?: Record<string, unknown>;
  onClick?: () => void;
}

export default function Button({
  children,
  disabled,
  color,
  variant = 'filled',
  size = "medium",
  styles,
  onClick,
}: Props) {
  const selectedColor = (color: Color = 'default') => {
    const colors: Record<Color, string> = {
      'default': 'colorDefault',
      'success': 'colorSuccess',
      'danger': 'colorDanger',
      'custom': 'colorCustom',
    }

    return colors[color];
  }

  const selectedSize = (size: Size = 'medium') => {
    const sizes: Record<Size, string> = {
      'medium': 'sizeMedium',
      'small': 'sizeSmall',
    }

    return sizes[size];
  }

  const selectedVariant = (variant: Variant) => {
    const variants: Record<Variant, string> = {
      "filled": "variantFilled",
      "outlined": "variantOutlined",
    }

    return variants[variant];
  }

  const classes = useMemo(() => [
    style.button,
    style[selectedColor(color)],
    style[selectedSize(size)],
    style[selectedVariant(variant)],
  ], [color, variant, size]);

  return (
    <button
      className={classNames(classes)}
      disabled={disabled}
      style={{
        backgroundColor: color && !['default', 'success', 'danger'].includes(color)
          ? color
          : '',
        opacity: disabled ? 0.5 : 1,
        ...styles
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}