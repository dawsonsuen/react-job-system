import { Link } from 'react-router-dom';
import React from 'react';
import classnames from 'classnames'

export default function Button({
    children,
    className,
    primary,
    danger,
    linkTo,
    type='button',
    ...rest
}) {
    let buttonStyle = 'btn-default';
    if (primary) {
        buttonStyle = 'btn-primary';
    }
    if (danger) {
        buttonStyle = 'btn-danger';
    }
    if (linkTo) {
        return (
            <Link to={linkTo} className={classnames('btn-borderless')} {...rest}>
                {children}
            </Link>
        )
    }
    return (
        <button className={classnames('btn',buttonStyle,className)} {...rest}>
            {children}
        </button>
    )
}

export function LoadingButton({children, loading, ...rest}) {
    return (
        <Button primary disableed={loading} {...rest}>
            {loading && <i className='fa fa-circle-'></i>}
            {children}
        </Button>
    )
}