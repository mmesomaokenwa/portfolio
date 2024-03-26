import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { styles } from '../styles/styles'
import { navLinks } from '../constants'
import { mylogo, menu, close } from '../assets'
import { fadeIn } from '../utils/motion'

const Navbar = () => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)
  return (
    <motion.nav
      variants={fadeIn("top", "spring", 0.2, 0.75)}
      initial="hidden"
      animate="show"
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("")
            window.scrollTo(0, 0)
          }}
        >
          <img src={mylogo} alt="logo"
          width={9} height={9}  className="w-12 h-12 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">Mmesoma &nbsp;<span className="sm:block hidden"> | Portfolio</span></p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />
          <motion.div
            initial={{
              x: toggle ? 0 : 500,
              opacity: toggle ? 1 : 0,
              scale: toggle ? 1 : 0
            }}
            animate={{
              x: toggle ? 0 : 500,
              opacity: toggle ? 1 : 0,
              scale: toggle ? 1 : 0
            }}
            className={`flex p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`${
                    active === nav.title ? "text-white" : "text-secondary"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle)
                    setActive(nav.title)
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar