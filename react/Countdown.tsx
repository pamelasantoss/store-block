import React, { useState } from 'react'
import { TimeSplit } from './typings/global'
import { tick } from './utils/time'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage } from 'react-intl'

// Valor utilizado como padrão caso não tenha nada preenchido no cms
const DEFAULT_TARGET_DATE = (new Date('2020-08-25')).toISOString()
const CSS_HANDLES = ['container', 'countdown', 'title']

interface CountdownProps {
  title: string
  targetDate: string
}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ targetDate }) => {
  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  // Título do app
  const titleText = title || <FormattedMessage id="countdown.title" />
  // Usado para definir o css
  const handles = useCssHandles(CSS_HANDLES)

  // Fazendo o contador
  tick(targetDate, setTime)

  return (
    <div className={`${handles.container} t-heading-2 fw3 w-100 c-muted-1`}>
      <div className={`${handles.title} db tc`}>
        {titleText}
      </div>
      <div className={`${handles.countdown} db tc`}>
        {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
      </div>
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    title: {
      title: 'Sou um título',
      type: 'string',
      default: null
    },
    targetDate: {
      title: 'Data final',
      description: 'Data final utilizada no contador',
      type: 'string',
      default: null
    }
  },
}

export default Countdown
