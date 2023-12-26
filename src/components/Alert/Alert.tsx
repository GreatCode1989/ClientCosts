import { IAlertProps } from '../../types'
import './styles.css'

export const Alert = ({ props}: IAlertProps) => {
  return (
    <div className={`alert alert-wrapper alert-${props.alertStatus} `}
    >{props.alertText}</div>
  )
}
