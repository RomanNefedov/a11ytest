import { useA11y, useTTS, stripHtmlForTTS, AccessibilityPanel } from 'a11y-react-kit'
import './App.css'

// ─── Article content for TTS demo ────────────────────────────────────────────
const ARTICLE_HTML = `
<p>Доступность в вебе — это практика создания сайтов и приложений, которыми могут пользоваться все люди, включая тех, кто имеет нарушения зрения, слуха, моторики или когнитивные особенности.</p>
<p>Хорошая доступность не только помогает людям с ограниченными возможностями — она улучшает пользовательский опыт для всех. Крупный шрифт удобен не только слабовидящим, но и тем, кто читает на ярком солнце. Чёткие ссылки помогают при навигации с клавиатуры.</p>
<p>Пакет <strong>a11y-react-kit</strong> предоставляет готовый набор инструментов: панель настроек, управление размером шрифта и контрастностью, широкий интервал, выделение ссылок, ограничение анимаций и озвучку текста через Web Speech API.</p>
<p>Все настройки сохраняются в <code>localStorage</code> и применяются при следующем открытии страницы. Пользователю не нужно выставлять предпочтения заново.</p>
`

// ─── Feature cards ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '🔤',
    title: 'Размер шрифта',
    desc: 'А / А+ / А++ — три ступени увеличения базового размера текста на всей странице.',
  },
  {
    icon: '🎨',
    title: 'Цветовая схема',
    desc: 'Высококонтрастный режим — оттенки серого с усиленным контрастом через CSS filter.',
  },
  {
    icon: '↔️',
    title: 'Широкий интервал',
    desc: 'Увеличенный межбуквенный, межстрочный и межсловный интервал для лучшей читаемости.',
  },
  {
    icon: '🔗',
    title: 'Выделять ссылки',
    desc: 'Все ссылки получают подчёркивание и пунктирный контур — легко отличить от текста.',
  },
  {
    icon: '⚡',
    title: 'Стоп-анимации',
    desc: 'Все CSS-переходы и анимации сокращаются до 0.001 мс — сайт становится статичным.',
  },
  {
    icon: '📐',
    title: 'Узкая строка',
    desc: 'Ширина статьи ограничивается до 65 символов — оптимальная длина для чтения.',
  },
  {
    icon: '🔊',
    title: 'Озвучка (TTS)',
    desc: 'Статья читается вслух через Web Speech API с контролем скорости и выбором голоса.',
  },
  {
    icon: '💾',
    title: 'Автосохранение',
    desc: 'Все настройки сохраняются в localStorage и восстанавливаются при следующем визите.',
  },
]

// ─── TTS controls ─────────────────────────────────────────────────────────────
function TTSBar() {
  const { ttsRate, ttsVoiceURI } = useA11y()
  const tts = useTTS('ru-RU', ttsRate, ttsVoiceURI)

  if (!tts.isSupported) return (
    <p className="tts-unsupported">
      ⚠️ Web Speech API не поддерживается в этом браузере (используйте Chrome или Edge)
    </p>
  )

  return (
    <div className="tts-bar">
      <button
        className={`tts-btn${tts.state !== 'idle' ? ' tts-btn--active' : ''}`}
        onClick={() => {
          if (tts.state === 'speaking') tts.pause()
          else if (tts.state === 'paused') tts.resume()
          else tts.speak(stripHtmlForTTS(ARTICLE_HTML), 'demo-article')
        }}
      >
        {tts.state === 'speaking'
          ? '⏸ Пауза'
          : tts.state === 'paused'
          ? '▶ Продолжить'
          : '🔊 Озвучить статью'}
      </button>
      {tts.state !== 'idle' && (
        <button className="tts-stop" onClick={tts.stop}>⏹ Стоп</button>
      )}
      {tts.state !== 'idle' && (
        <span className="tts-status">
          {tts.state === 'speaking' ? '● Читаю...' : '⏸ Пауза'}
        </span>
      )}
    </div>
  )
}

// ─── Main demo app ─────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="page">

      {/* ── Header ── */}
      <header className="header">
        <div className="header-logo">
          <span className="logo-icon">♿</span>
          <span className="logo-text">a11y-react-kit</span>
          <span className="logo-badge">demo</span>
        </div>
        <nav className="header-nav">
          <a href="https://www.npmjs.com/package/a11y-react-kit" target="_blank" rel="noreferrer">npm</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis" target="_blank" rel="noreferrer">Web Speech API</a>
          <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noreferrer">WCAG 2.1</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-orb" aria-hidden="true" />
        <div className="hero-content">
          <h1>
            Доступность<br />
            <span className="hero-accent">из коробки</span>
          </h1>
          <p className="hero-sub">
            Готовая панель настроек, TTS и CSS-хуки для любого React-проекта.
            Установка за 3 шага — никаких лишних зависимостей.
          </p>
          <div className="hero-install">
            <code>npm install a11y-react-kit</code>
          </div>
          <div className="hero-hint">
            👇 Нажми кнопку <strong>♿</strong> в правом нижнем углу
          </div>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="section">
        <h2 className="section-title">Что входит в пакет</h2>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Article demo (TTS + narrow width) ── */}
      <section className="section">
        <h2 className="section-title">Демо: статья + TTS</h2>
        <p className="section-sub">
          Включи <strong>Узкую строку</strong> в панели — статья сузится до 65 символов.
          Нажми <strong>Озвучить</strong> — статья читается вслух.
        </p>
        <div className="article-wrapper">
          <TTSBar />
          <article
            className="article-content"
            dangerouslySetInnerHTML={{ __html: ARTICLE_HTML }}
          />
        </div>
      </section>

      {/* ── Animation demo ── */}
      <section className="section">
        <h2 className="section-title">Демо: анимации</h2>
        <p className="section-sub">
          Включи <strong>Стоп-анимации</strong> в панели — элементы ниже станут полностью статичными.
        </p>
        <div className="anim-demo">
          <div className="anim-card">
            <div className="anim-spin">⚙️</div>
            <span>Вращение</span>
          </div>
          <div className="anim-card">
            <div className="anim-pulse">💜</div>
            <span>Пульсация</span>
          </div>
          <div className="anim-card">
            <div className="anim-bounce">🏀</div>
            <span>Прыжок</span>
          </div>
          <div className="anim-card">
            <div className="anim-fade">🌟</div>
            <span>Мигание</span>
          </div>
        </div>
      </section>

      {/* ── Links demo ── */}
      <section className="section">
        <h2 className="section-title">Демо: ссылки</h2>
        <p className="section-sub">
          Включи <strong>Выделять ссылки</strong> — все ссылки получат подчёркивание и пунктирный контур.
        </p>
        <div className="links-demo">
          <p>
            Ознакомьтесь с{' '}
            <a href="https://www.w3.org/WAI/" target="_blank" rel="noreferrer">руководством W3C по доступности</a>,{' '}
            <a href="https://developer.mozilla.org/ru/docs/Web/Accessibility" target="_blank" rel="noreferrer">документацией MDN</a>{' '}
            и стандартом{' '}
            <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noreferrer">WCAG 2.1</a>.
            Также рекомендуем{' '}
            <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noreferrer">проверку контрастности WebAIM</a>{' '}
            и инструмент{' '}
            <a href="https://wave.webaim.org/" target="_blank" rel="noreferrer">WAVE</a>.
          </p>
        </div>
      </section>

      {/* ── Integration steps ── */}
      <section className="section section--code">
        <h2 className="section-title">Интеграция</h2>
        <div className="code-steps">
          <div className="code-step">
            <div className="step-num">1</div>
            <div className="step-body">
              <p className="step-label">Установить пакет</p>
              <code>npm install a11y-react-kit</code>
            </div>
          </div>
          <div className="code-step">
            <div className="step-num">2</div>
            <div className="step-body">
              <p className="step-label">CSS-переменная в index.css</p>
              <code>html {'{ font-size: var(--rak-font-size, 16px); }'}</code>
            </div>
          </div>
          <div className="code-step">
            <div className="step-num">3</div>
            <div className="step-body">
              <p className="step-label">Обернуть приложение в main.tsx</p>
              <code>import 'a11y-react-kit/styles.css'</code>
              <code>{'<A11yProvider><App /></A11yProvider>'}</code>
            </div>
          </div>
          <div className="code-step">
            <div className="step-num">4</div>
            <div className="step-body">
              <p className="step-label">Добавить панель в App.tsx</p>
              <code>{'<AccessibilityPanel ttsLang="ru" />'}</code>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>
          <strong>a11y-react-kit</strong> — MIT licence ·{' '}
          <a href="https://www.npmjs.com/package/a11y-react-kit" target="_blank" rel="noreferrer">npm</a>
          {' · '}
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </footer>

      <AccessibilityPanel ttsLang="ru" />
    </div>
  )
}
