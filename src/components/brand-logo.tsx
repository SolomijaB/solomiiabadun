import Image from "next/image";

interface BrandLogoProps {
  compact?: boolean;
  inverse?: boolean;
  priority?: boolean;
}

export function BrandLogo({ compact = false, inverse = false, priority = false }: BrandLogoProps) {
  return (
    <span className={`brand-logo${compact ? " brand-logo--compact" : ""}${inverse ? " brand-logo--inverse" : ""}`}>
      <Image
        className="brand-logo__mark"
        src="/brand/mark-sb-selected.svg"
        alt=""
        width={2236}
        height={710}
        priority={priority}
        unoptimized
      />
      <span className="brand-logo__type">
        <span className="brand-logo__name">Solomiia Badun</span>
        {!compact && <span className="brand-logo__descriptor">Strength Coach for Women</span>}
      </span>
    </span>
  );
}
