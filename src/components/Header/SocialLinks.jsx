/**
 * Componente de Links de Redes Sociais
 * Exibe ícones das redes sociais da rádio
 */
import { FaYoutube, FaFacebook, FaInstagram, FaApple } from 'react-icons/fa'
import { SiGoogleplay } from 'react-icons/si'

const socialLinks = [
  {
    name: 'YouTube',
    icon: FaYoutube,
    url: 'https://www.youtube.com',
    ariaLabel: 'Visite nosso canal no YouTube'
  },
  {
    name: 'Facebook',
    icon: FaFacebook,
    url: 'https://www.facebook.com',
    ariaLabel: 'Visite nossa página no Facebook'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://www.instagram.com',
    ariaLabel: 'Visite nosso perfil no Instagram'
  },
  {
    name: 'App Store',
    icon: FaApple,
    url: 'https://apps.apple.com',
    ariaLabel: 'Baixe nosso app na App Store'
  },
  {
    name: 'Play Store',
    icon: SiGoogleplay,
    url: 'https://play.google.com',
    ariaLabel: 'Baixe nosso app no Google Play'
  }
]

export default function SocialLinks() {
  return (
    <div className="flex justify-center items-center gap-6">
      {socialLinks.map((social) => {
        const Icon = social.icon
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            className="text-white hover:text-brasil-yellow transition-colors duration-200 text-2xl hover:scale-110 transform"
            title={social.name}
          >
            <Icon />
          </a>
        )
      })}
    </div>
  )
}
