'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageZoomProps {
  imageSrc: string;
  alt?: string;
}

export default function ImageZoom({ imageSrc, alt = '' }: ImageZoomProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`Ampliar imagem: ${alt}`}
        title="Clique para ampliar"
        className="absolute inset-0 z-20 cursor-zoom-in bg-transparent"
      />

      {open && (
        <div
          className="fixed inset-0 z-[9999] cursor-zoom-out bg-black/90 backdrop-blur-sm"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Imagem ampliada"
        >
          <div className="relative flex h-full w-full items-center justify-center p-6 md:p-12">
            <div className="relative h-full w-full max-w-6xl">
              <Image
                src={imageSrc}
                alt={alt}
                fill
                unoptimized
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Fechar imagem"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/25"
            >
              ✕
            </button>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/70">
              Clique para voltar ao tamanho normal
            </p>
          </div>
        </div>
      )}
    </>
  );
}