'use client';

export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/lilianartesanato13/',
    label: 'Instagram da Lílian Artesanato',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/lilianartesanatoecroche',
    label: 'Facebook da Lílian Artesanato',
  },
  {
    name: 'X / Twitter',
    href: 'https://x.com/LilianCroche',
    label: 'X (Twitter) da Lílian Artesanato',
  },
  {
    name: 'Pinterest',
    href: 'https://br.pinterest.com/liliamdomingues/',
    label: 'Pinterest da Lílian Artesanato',
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@llianbareli',
    label: 'Medium da Lílian Artesanato',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/5528999057982',
    label: 'WhatsApp da Lílian Artesanato',
  },
] as const;

const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  className: 'h-[18px] w-[18px]',
  'aria-hidden': true,
} as const;

function InstagramIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg {...iconProps}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="7.1" cy="12" r="5.1" />
      <ellipse cx="13.8" cy="12" rx="3.6" ry="5.1" />
      <ellipse cx="20.4" cy="12" rx="1.7" ry="5.1" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg {...iconProps}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L0 24l6.335-1.508A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.76.895.952-3.653-.234-.374A9.818 9.818 0 1 1 12 21.818z" />
    </svg>
  );
}

const ICONS = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  'X / Twitter': XIcon,
  Pinterest: PinterestIcon,
  Medium: MediumIcon,
  WhatsApp: WhatsAppIcon,
} as const;

export default function SocialLinks({
  className = '',
  iconClassName = '',
  showLabels = false,
}: {
  className?: string;
  iconClassName?: string;
  showLabels?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`} role="list" aria-label="Redes sociais">
      {SOCIAL_LINKS.map((social) => {
        const Icon = ICONS[social.name];
        const isWhatsApp = social.name === 'WhatsApp';
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
            role="listitem"
            className={[
              'inline-flex items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent',
              isWhatsApp
                ? 'border-green-600/30 text-green-500 hover:border-green-500 hover:text-green-400'
                : '',
              showLabels ? 'gap-2 px-3 py-2' : 'h-10 w-10',
              iconClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <Icon />
            {showLabels && (
              <span className="text-xs font-medium">{social.name}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
