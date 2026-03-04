import GrammarRule from '../../molecules/GrammarRule/GrammarRule.jsx'
import Tag from '../../atoms/Tag/Tag.jsx'
import styles from './GrammarBlock.module.css'

/**
 * Organism — GrammarBlock
 * Renders a titled section of grammar rules.
 *
 * @param {string} title
 * @param {Array}  rules  — Array of grammar rule objects
 */
export default function GrammarBlock({ title, rules = [] }) {
  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <Tag type="grammar">Grammaire</Tag>
        {title && <h3 className={styles.title}>{title}</h3>}
      </div>
      <div className={styles.rules}>
        {rules.map((rule, i) => (
          <GrammarRule
            key={rule.id ?? i}
            number={rule.number ?? i + 1}
            title={rule.title}
            explanation={rule.explanation}
            example={rule.example}
            note={rule.note}
          />
        ))}
      </div>
    </div>
  )
}
