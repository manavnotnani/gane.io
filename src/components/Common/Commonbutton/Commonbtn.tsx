import React from 'react';
import { Link } from 'react-router-dom';
import style from './Commonbtn.module.scss';

const Commonbtn = (
    {
        title,
        className,
        onClick,
        to,
        role,
        type,
        disabled,
        lefticon,
        righticon,
        data_aos,
        ...rest
    }: any) => {
    return (
        <>
            {(() => {
                switch (role) {
                    case "anchor":
                        return (<a href={to} className={`${style.commonBtn} ${className || ""}`}
                            {
                            ...rest
                            }
                        >
                            {lefticon && (
                                <>
                                    <span>{lefticon}</span>
                                </>
                            )}
                            {title}
                            {righticon && (
                                <>
                                    <span>{righticon}</span>
                                </>
                            )}
                        </a>)
                    case "link":
                        return (
                            <Link
                                className={`commonBtn ${style.commonBtn} ${className || ""}`}
                                to={to}
                                onClick={onClick}
                            >
                                {lefticon && (
                                    <>
                                        <span>{lefticon}</span>
                                    </>
                                )}
                                {title}
                                {righticon && (
                                    <>
                                        <span>{righticon}</span>
                                    </>
                                )}
                            </Link>
                        );
                    default:
                        return <>
                            <button
                                type={type}
                                className={`${style.commonBtn} ${className || ""}`}
                                onClick={onClick}
                                disabled={disabled}
                                {...rest}
                            >
                                {lefticon && (
                                    <>
                                        <span>{lefticon}</span>
                                    </>
                                )}
                                {title}
                                {righticon && (
                                    <>
                                        <span>{righticon}</span>
                                    </>
                                )}
                            </button></>;
                }
            })()}
        </>
    )
}

export default Commonbtn