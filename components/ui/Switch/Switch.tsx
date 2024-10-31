import React, { Children, ReactElement, ReactNode, isValidElement } from "react"

interface MatchProps {
  when: boolean
  children: ReactNode
}

export const Match = ({ when, children }: MatchProps) => {
  return when ? <>{children}</> : null
}

interface SwitchProps {
  fallback?: ReactNode
  children: React.ReactElement<MatchProps>[]
}

export const Switch = ({ fallback = <></>, children }: SwitchProps) => {
  const match = Children.toArray(children).find(
    (child) => isValidElement<MatchProps>(child) && child.props.when,
  )

  return match ? <>{(match as ReactElement).props.children}</> : fallback
}
