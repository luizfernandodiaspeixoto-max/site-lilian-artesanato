'use client';

import type { Testimonial } from '@/lib/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  featured?: boolean;
}

export default function TestimonialCard({ testimonial, featured }: TestimonialCardProps) {
  if (featured) {
    return (
      <div className="glass-card rounded-3xl p-10 md:p-14">
        <div className="mb-6 flex gap-1 text-amber-400">
          {'★★★★★'.split('').map((s, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <span className="mb-6 block text-6xl leading-none text-accent/20">&ldquo;</span>
        <blockquote className="text-lg leading-relaxed text-foreground md:text-xl">
          {testimonial.quote}
        </blockquote>
        <div className="mt-8 flex items-center gap-4">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={`Foto de ${testimonial.name}`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
            />
          ) : null}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-accent text-sm font-bold text-white ${testimonial.avatar ? 'hidden' : ''}`}
          >
            {testimonial.initials}
          </div>
          <div className="flex-1">
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">
              {testimonial.city}, {testimonial.state}
              {testimonial.since && <span> · {testimonial.since}</span>}
            </p>
          </div>
          {testimonial.product && (
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {testimonial.product}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 transition hover:shadow-warm-md">
      <div className="mb-3 flex gap-0.5 text-amber-400">
        {'★★★★★'.split('').map((s, i) => (
          <span key={i} className="text-sm">★</span>
        ))}
      </div>

      <p className="mb-5 text-sm leading-relaxed text-foreground/85">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={`Foto de ${testimonial.name}`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
          />
        ) : null}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-accent text-xs font-bold text-white ${testimonial.avatar ? 'hidden' : ''}`}
        >
          {testimonial.initials}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.city}, {testimonial.state}
            {testimonial.since && <span> · {testimonial.since}</span>}
          </p>
        </div>
        {testimonial.product && (
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold text-accent">
            {testimonial.product}
          </span>
        )}
      </div>
    </div>
  );
}