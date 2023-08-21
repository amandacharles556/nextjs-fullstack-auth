import React from 'react'
import classNames from 'classnames'

type ContainerProps = {
  className?: string
  title: string
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
  const { className, title, children } = props
  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center min-h-screen py-6 px-4 m-auto',
        className
      )}
    >
      <h1>{title}</h1>
      <hr />
      {children}
    </div>
  )
}

export default Container
