import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles/styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../lib/emailjs/config'

const ContactForm = () => {
  const formRef = useRef()
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    emailjs
      .send(
        emailjsConfig.serviceID,
        emailjsConfig.templateID,
        {
          from_name: form.name,
          to_name: "Mmesoma",
          from_email: form.email,
          to_email: "godsfavourokenwa12@gmail.com",
          message: form.message,
        },
        {
          publicKey: emailjsConfig.publicKey,
        }
      )
      .then(() => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        alert("Something went wrong.");
      });
  }
  return (
    <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
      <label className='flex flex-col'>
        <span className='text-white font-medium mb-4'>Your Name</span>
        <input
          required
          type='text'
          name='name'
          value={form.name}
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          placeholder="What's your name?"
          className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
        />
      </label>
      <label className='flex flex-col'>
        <span className='text-white font-medium mb-4'>Your Email</span>
        <input
          required
          type='email'
          name='email'
          value={form.email}
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          placeholder="What's your email address?"
          className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
        />
      </label>
      <label className='flex flex-col'>
        <span className='text-white font-medium mb-4'>Your Message</span>
        <textarea
          required
          rows={7}
          name='message'
          value={form.message}
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          placeholder='What do you want to say?'
          className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
        />
      </label>
      <button
        type='submit'
        className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}

const Contact = () => {
  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <ContactForm />
      </motion.div>
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')