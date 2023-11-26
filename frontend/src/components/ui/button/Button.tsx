import { Button as AntdButton, Tooltip } from 'antd';
import { ButtonType } from 'antd/es/button';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { TooltipPlacement } from 'antd/es/tooltip';
import React, { memo } from 'react';

interface ButtonWithTooltipsProps {
    id: string; // Сделал обяз параметром
    tooltipTitle?: string | null;
    className?: string;
    onClick?: React.MouseEventHandler | (() => void);
    icon?: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
    size?: SizeType;
    type?: ButtonType;
    ghost?: boolean;
    style?: React.CSSProperties;
    tooltipPlacement?: TooltipPlacement;
    htmlType?: 'button' | 'submit' | 'reset';
    danger?: boolean;
}

export const ButtonWithTooltips: React.FunctionComponent<ButtonWithTooltipsProps> = memo(
    ({
        children,
        id,
        tooltipTitle, // текст всплывающий при наведение на иконку
        className = 'btn-blue', // цвет кнопки, по дефолту голубой как на yard
        onClick = () => {},
        icon,
        size, // "small" | "medium" | "large"
        type, // "link" | "text" | "default" | "primary" | "ghost" | "dashed"
        style,
        danger,
        ghost,
        tooltipPlacement = 'bottom',
        htmlType = 'button',
        disabled = false
    }) => {
        const classNames = disabled ? 'btn-disabled' : className;
        const antdButton = (
            <AntdButton
                id={id}
                className={classNames}
                onClick={onClick}
                icon={icon}
                disabled={disabled}
                size={size}
                type={type}
                ghost={ghost}
                style={style}
                htmlType={htmlType}
                // key={key}
                danger={danger}
            >
                {children}
            </AntdButton>
        );
        return (
            <Tooltip id={id} title={tooltipTitle} placement={tooltipPlacement}>
                {antdButton}
            </Tooltip>
        );
    }
);
