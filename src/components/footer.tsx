import { AtSign, Github } from 'lucide-react'
import { VerbLink } from '@/components/shared/verb-link'

const footerLinks = [
  {
    href: 'mailto:ciao@italianverbs.info',
    icon: AtSign,
    title: 'Contact Us',
  },
  {
    href: 'https://github.com/rmanasyan/italianverbsnext',
    icon: Github,
    title: 'Open source on GitHub',
  },
]

export function Footer() {
  return (
    <footer className={'flex space-x-4 py-5 text-sm text-primary-500'}>
      {footerLinks.map(({ href, title, icon: Icon }) => (
        <VerbLink
          key={href}
          href={href}
          className={'flex items-center space-x-1'}
        >
          <Icon strokeWidth={1} className={'h-5 w-5'} />
          <span>{title}</span>
        </VerbLink>
      ))}
    </footer>
  )
}
