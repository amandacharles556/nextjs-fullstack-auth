import React from 'react'
import classNames from 'classnames'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  label?: string
}

const Input = (props: InputProps) => {
  const { className, label, id, ...rest } = props
  return (
    <div className={classNames('flex flex-col w-full', className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border_gray-600"
        {...rest}
      />
    </div>
  )
}

export default Input
