import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Target } from 'lucide-react'

import LessonLayout from '../../components/templates/LessonLayout/LessonLayout.jsx'
import RevisionLayout from '../../components/templates/RevisionLayout/RevisionLayout.jsx'
import DayNavBar from '../../components/organisms/DayNavBar/DayNavBar.jsx'
import GrammarBlock from '../../components/organisms/GrammarBlock/GrammarBlock.jsx'
import DialogueBlock from '../../components/organisms/DialogueBlock/DialogueBlock.jsx'
import VocabContainer from '../VocabContainer/VocabContainer.jsx'
import QuizContainer from '../QuizContainer/QuizContainer.jsx'
import Badge from '../../components/atoms/Badge/Badge.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import Icon from '../../components/atoms/Icon/Icon.jsx'
import Tag from '../../components/atoms/Tag/Tag.jsx'

import styles from './LessonContainer.module.css'

/**
 * Container — LessonContainer
 * Manages active day selection, completed days tracking.
 * Owns: activeDayId, completedIds
 *
 * @param {object} weekData — Full week1.json data
 */
export default function LessonContainer({ weekData }) {
  const allDays = [
    { id: 'intro', number: null, title: weekData.intro.title },
    ...weekData.days,
  ]

  const [activeDayId, setActiveDayId] = useState('intro')
  const [completedIds, setCompletedIds] = useState(new Set())

  const activeDay =
    activeDayId === 'intro'
      ? weekData.intro
      : weekData.days.find((d) => d.id === activeDayId)

  const progress = Math.round((completedIds.size / weekData.days.length) * 100)

  function handleMarkComplete() {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      next.add(activeDayId)
      return next
    })
  }

  function handleNav(direction) {
    const idx = allDays.findIndex((d) => d.id === activeDayId)
    const next = allDays[idx + direction]
    if (next) setActiveDayId(next.id)
  }

  const isFirst = activeDayId === allDays[0].id
  const isLast = activeDayId === allDays[allDays.length - 1].id

  const nav = (
    <DayNavBar
      days={allDays}
      activeId={activeDayId}
      completedIds={completedIds}
      onSelect={setActiveDayId}
    />
  )

  const header = (
    <div className={styles.dayHeader}>
      {activeDay.number && (
        <Badge variant="day">Jour {activeDay.number}</Badge>
      )}
      <h1 className={styles.dayTitle}>{activeDay.title}</h1>
      {activeDay.duration && (
        <p className={styles.dayMeta}>
          <Icon icon={Clock} size={14} />
          {activeDay.duration}
          {activeDay.objective && (
            <>
              <span className={styles.sep}>·</span>
              <Icon icon={Target} size={14} />
              {activeDay.objective}
            </>
          )}
        </p>
      )}
    </div>
  )

  const content = (
    <div className={styles.dayContent}>
      {/* Grammar */}
      {activeDay.grammar_rules?.length > 0 && (
        <GrammarBlock title="Règles grammaticales" rules={activeDay.grammar_rules} />
      )}

      {/* Vocabulary */}
      {activeDay.vocabulary?.length > 0 && (
        <section>
          <div className={styles.sectionHeader}>
            <Tag type="vocab">Vocabulaire</Tag>
            <h2 className={styles.sectionTitle}>Mots du jour</h2>
          </div>
          <VocabContainer items={activeDay.vocabulary} />
        </section>
      )}

      {/* Exercises */}
      {activeDay.exercises?.length > 0 && (
        <section>
          <div className={styles.sectionHeader}>
            <Tag type="exercise">Exercices</Tag>
            <h2 className={styles.sectionTitle}>Pratique</h2>
          </div>
          <QuizContainer questions={activeDay.exercises} />
        </section>
      )}

      {/* Dialogues (Jour 7) */}
      {activeDay.dialogues?.length > 0 && (
        <section>
          <div className={styles.sectionHeader}>
            <Tag type="dialogue">Dialogues</Tag>
            <h2 className={styles.sectionTitle}>Pratique orale</h2>
          </div>
          <div className={styles.dialogues}>
            {activeDay.dialogues.map((d, i) => (
              <DialogueBlock
                key={i}
                title={d.title}
                context={d.context}
                lines={d.lines}
                newWords={d.new_words}
              />
            ))}
          </div>
        </section>
      )}

      {/* Navigation footer */}
      <div className={styles.footer}>
        <Button
          variant="ghost"
          onClick={() => handleNav(-1)}
          disabled={isFirst}
        >
          <Icon icon={ChevronLeft} size={16} />
          Précédent
        </Button>

        {!completedIds.has(activeDayId) && activeDayId !== 'intro' && (
          <Button variant="primary" onClick={handleMarkComplete}>
            Marquer comme terminé ✓
          </Button>
        )}

        <Button
          variant="ghost"
          onClick={() => handleNav(1)}
          disabled={isLast}
        >
          Suivant
          <Icon icon={ChevronRight} size={16} />
        </Button>
      </div>
    </div>
  )

  if (activeDayId === 'jour7') {
    return (
      <RevisionLayout
        nav={nav}
        header={header}
        content={content}
      />
    )
  }

  return (
    <LessonLayout
      nav={nav}
      header={header}
      content={content}
      progress={progress}
    />
  )
}
