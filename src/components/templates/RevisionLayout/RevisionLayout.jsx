import styles from './RevisionLayout.module.css'

/**
 * Template — RevisionLayout
 * Used for Jour 7 (revision + dialogues).
 * Full-width, no sidebar — focused on practice.
 *
 * @param {React.ReactNode} nav
 * @param {React.ReactNode} header
 * @param {React.ReactNode} content
 * @param {number}          score    — Final score (0-100), shown when completed
 */
export default function RevisionLayout({ nav, header, content, score }) {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.brand}>
            <span className={styles.flag}>🇮🇩</span>
            <span className={styles.brandName}>Grande révision — Semaine 1</span>
          </div>
          {score !== undefined && (
            <div className={styles.scoreBadge}>
              Score : <strong>{score}/15</strong>
            </div>
          )}
        </div>
      </header>

      <div className={styles.navWrapper}>{nav}</div>

      <main className={styles.main}>
        <div className={styles.mainInner}>
          {header && <div className={styles.revisionHeader}>{header}</div>}
          {content}
        </div>
      </main>
    </div>
  )
}
