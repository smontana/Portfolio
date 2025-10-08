import { useEffect, useRef } from 'react'
import { animate, svg, stagger } from 'animejs'
import './Style.scss'

export const StephenSVG = () => {
  const ref = useRef(null)

  useEffect(() => {
    const lines = ref.current.querySelectorAll('.line')
    const drawable = svg.createDrawable(lines)
    
    animate(drawable, {
      draw: ['0 0', '0 1', '1 1'],
      ease: 'inSine',
      duration: 3000,
      delay: stagger(100),
      alternate: true,
      reversed: true,
      loop: true
    });
  }, [])

  return (
    <svg ref={ref} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3833 1000'>
            <g id='stephen-word'>
                <path
                    className='line'
                    d='M119 571q0 34 16 67.5t44 58.5q44 37 100 37q71 0 110 -38t39 -92q0 -53 -33.5 -83.5t-108.5 -50.5l-60 -16q-82 -22 -121.5 -66.5t-39.5 -122.5q0 -49 27.5 -93t77 -71t112.5 -27q67 0 114 31.5t70 80t23 98.5h-73q0 -27 -9.5 -53t-27.5 -45t-43 -29.5t-55 -10.5 q-42 0 -75 16.5t-50.5 44t-17.5 58.5q0 49 22 75t84 44l59 17q104 30 151 78t47 125q0 52 -26.5 98.5t-77 75t-118.5 28.5q-65 0 -119.5 -31.5t-86 -85.5t-31.5 -118h77z'
                    transform='translate(0, 0)'
                    stroke='#B6FF30'
                    fill='#1b1f22'
                    strokeWidth='3'
                />
                <path
                    className='line'
                    d='M187 670q0 34 19 49.5t51 15.5q21 0 43.5 -8t36.5 -17q1 -1 2 -1.5t2 -1.5v71q-12 8 -34.5 18t-47.5 10q-61 0 -102.5 -35.5t-41.5 -97.5v-327h-93v-62h93v-145h72v145h153v62h-153v324z'
                    transform='translate(546, 0)'
                    stroke='#B6FF30'
                    fill='#1b1f22'
                    strokeWidth='3'
                />
                <path
                    className='line'
                    d='M166.5 771q-55.5 -35 -86 -95t-30.5 -134q0 -73 31 -133t86 -95.5t124 -35.5t124 34.5t86 93t31 126.5q0 12 -2 36h-40h-32h-335q5 67 45 112q46 54 127 54q43 0 76 -17t51.5 -39t22.5 -38h78q-4 27 -31 66.5t-77 69.5t-120 30q-73 0 -128.5 -35zM125 503h333 q-4 -33 -19 -61q-21 -42 -59.5 -67t-88.5 -25t-88.5 25.5t-59.5 69.5q-13 27 -18 58z'
                    transform='translate(915, 0)'
                    stroke='#B6FF30'
                    fill='#1b1f22'
                    strokeWidth='3'
                />
                <path
                    className='line'
                    d='M446 313q52 35 82 96t30 133t-30 133t-82 96t-112 35q-69 0 -121 -36q-38 -26 -64 -66v331h-5h-62h-5v-689v-62h54h18v94q26 -39 64 -65q52 -35 121 -35q60 0 112 35zM224 374q-36 26 -56 69q-19 44 -19 99t19 99q20 44 56 69t87 25q51 1 90 -25t60 -70t21 -98t-21 -98 t-60 -70t-90 -26t-87 26z'
                    transform='translate(1491, 0)'
                    stroke='#B6FF30'
                    fill='#1b1f22'
                    strokeWidth='3'
                />
                <path
                    className='line'
                    d='M415 306q41 28 65.5 76t24.5 104v314h-5h-62h-5v-314q0 -37 -18.5 -69t-50.5 -50.5t-69 -18.5q-38 0 -70.5 19t-51 50.5t-18.5 68.5v314h-5h-62h-5v-720h4h64h4v265v25q30 -44 75 -68t96 -24q48 0 89 28z'
                    transform='translate(2099, 0)'
                    stroke='#B6FF30'
                    fill='#1b1f22'
                    strokeWidth='3'
                />
                <path
                    className='line'
                    d='M125 503h333q-4 -33 -19 -61q-21 -42 -59.5 -67t-88.5 -25t-88.5 25.5t-59.5 69.5q-13 27 -18 58zM166.5 771q-55.5 -35 -86 -95t-30.5 -134q0 -73 31 -133t86 -95.5t124 -35.5t124 34.5t86 93t31 126.5q0 12 -2 36h-40h-32h-335q5 67 45 112q46 54 127 54q43 0 76 -17 t51.5 -39t22.5 -38h78q-4 27 -31 66.5t-77 69.5t-120 30q-73 0 -128.5 -35z'
                    transform='translate(2678, 0)'
                    stroke='#B6FF30'
                    fill='#1b1f22'
                    strokeWidth='3'
                />
                <path
                    className='line'
                    d='M415 306q41 28 65.5 76t24.5 104v314h-4h-64h-4v-314q0 -37 -18.5 -69t-50.5 -50.5t-69 -18.5q-38 0 -70.5 19t-51 50.5t-18.5 68.5v314h-4h-64h-4v-516h4h59h9v86q30 -44 75 -68t96 -24q48 0 89 28z'
                    transform='translate(3254, 0)'
                    stroke='#B6FF30'
                    fill='#1b1f22'
                    strokeWidth='3'
                />
            </g>
        </svg>
  )
}