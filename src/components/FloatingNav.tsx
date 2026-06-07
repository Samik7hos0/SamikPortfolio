import { useEffect, useState } from 'react'

export default function FloatingNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-5 left-1/2 z-50"
      style={{
        transform: `translateX(-50%) translateY(${visible ? 0 : -16}px)`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s',
      }}
    >
      <div
        className="flex items-center gap-6 rounded-full px-6 py-3"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: 'rgba(5,26,36,0.75)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,255,163,0.08)',
        }}
      >
        <span className="font-serif text-xl font-semibold" style={{ color: '#F6FCFF' }}>S</span>
        <div className="flex gap-5 text-xs font-medium" style={{ color: 'rgba(224,235,240,0.75)' }}>
          {['About', 'Work', 'Notes', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition-colors duration-200 hover:text-[#00ffa3]"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="/resume/Samik_Sengupta_Data_Engineer_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-white/10 active:scale-95"
          style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(224,235,240,0.7)' }}
        >
          Resume
        </a>
        <a
          href="#contact"
          className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{ background: '#00ffa3', color: '#051A24' }}
        >
          Hire me
        </a>
      </div>
    </nav>
  )
}
