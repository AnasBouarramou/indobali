import ProgressBar from '../../atoms/ProgressBar/ProgressBar.jsx'
import styles from './LessonLayout.module.css'

/**
 * Template — LessonLayout
 * Full-page layout for lesson days.
 * Receives all content as props/slots — zero business logic.
 *
 * @param {React.ReactNode} nav       — DayNavBar organism
 * @param {React.ReactNode} header    — Day title + badge area
 * @param {React.ReactNode} content   — Main lesson content
 * @param {React.ReactNode} sidebar   — Optional right sidebar (progress, recap)
 * @param {number}          progress  — 0-100 for the top progress bar
 */
export default function LessonLayout({ nav, header, content, sidebar, progress = 0 }) {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.brand}>
            <span className={styles.flag}>🇮🇩</span>
            <span className={styles.brandName}>Bahasa Indonesia</span>
          </div>
          <ProgressBar value={progress} label="Progression de la semaine" size="sm" className={styles.progressBar} />
        </div>
      </header>

      <div className={styles.navWrapper}>{nav}</div>

      <main className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.contentArea}>
            {header && <div className={styles.dayHeader}>{header}</div>}
            <div className={styles.lessonContent}>{content}</div>
          </div>
          {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
        </div>
      </main>
    </div>
  )
}
