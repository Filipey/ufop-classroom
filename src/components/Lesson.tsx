import classNames from 'classnames';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import { Link, useParams } from 'react-router-dom';

interface LessosProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessosProps) {
  const { slug } = useParams<{ slug: string }>() // URL SLUG

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd ' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  const isActiveLesson = slug === props.slug

  return (
    <Link to={`/classroom/lesson/${props.slug}`} className='group'>
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div 
      className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-white', {
        'bg-red-800': isActiveLesson
      })}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames('text-sm font-medium flex items-center gap-2' ,{
              'text-white': isActiveLesson,
              'text-red-700': !isActiveLesson

            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
          </span>
          )}

          <span className={classNames('text-xs rounded py-[0.125rem] px-2 text-white border font-bold', {
            'border-white': isActiveLesson,
            'border-red-800': !isActiveLesson
          })}>
            {props.type === 'live' ? 'AO VIVO' : 'AULA GRAVADA'}
          </span>
        </header>

        <strong className={classNames('mt-5 block', {
          'text-white': isActiveLesson,
          'text-gray-300': !isActiveLesson
        })}>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}