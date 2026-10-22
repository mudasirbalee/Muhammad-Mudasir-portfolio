import { useEffect, useRef } from 'react'
import './CursorFollower.css'

export default function CursorFollower() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    const motion = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    )

    if (!cursor || !ring || !motion.matches) return

    let frame = 0
    let visible = false
    let targetX = 0
    let targetY = 0
    let ringX = 0
    let ringY = 0

    function update() {
      frame = 0
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18
      cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      ring.style.transform = `translate3d(${ringX - targetX}px, ${ringY - targetY}px, 0) translate(-50%, -50%)`

      if (
        visible &&
        (Math.abs(targetX - ringX) > 0.1 || Math.abs(targetY - ringY) > 0.1)
      ) {
        frame = window.requestAnimationFrame(update)
      }
    }

    function move(event) {
      if (event.pointerType !== 'mouse') return

      targetX = event.clientX
      targetY = event.clientY
      visible = true
      cursor.classList.add('is-visible')
      cursor.classList.toggle(
        'is-interactive',
        Boolean(event.target.closest('a, button, [role="button"]'))
      )

      if (!frame) frame = window.requestAnimationFrame(update)
    }

    function hide() {
      visible = false
      cursor.classList.remove('is-visible', 'is-interactive')
      window.cancelAnimationFrame(frame)
      frame = 0
    }

    function handlePointerOut(event) {
      if (!event.relatedTarget) hide()
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    document.addEventListener('pointerout', handlePointerOut)
    motion.addEventListener('change', hide)

    return () => {
      hide()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      document.removeEventListener('pointerout', handlePointerOut)
      motion.removeEventListener('change', hide)
    }
  }, [])

  return (
    <div className="cursor-follower" ref={cursorRef} aria-hidden="true">
      <span className="cursor-follower-dot" />
      <span className="cursor-follower-ring" ref={ringRef} />
    </div>
  )
}