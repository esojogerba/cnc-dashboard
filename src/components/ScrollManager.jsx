import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const positionsRef = useRef(new Map())

  useEffect(() => {
    return () => {
      positionsRef.current.set(location.key, window.scrollY)
    }
  }, [location.key])

  useLayoutEffect(() => {
    const saved = positionsRef.current.get(location.key)
    const top = navigationType === 'POP' && typeof saved === 'number' ? saved : 0
    window.scrollTo(0, top)
  }, [location.key, navigationType])

  return null
}

export default ScrollManager
