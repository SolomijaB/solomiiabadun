import {
  IconBarbell,
  IconBolt,
  IconBrandInstagram,
  IconCrown,
  IconMessageCircle,
  IconRoute,
  IconSparkles,
  IconTargetArrow,
  IconUserHeart,
  type IconProps,
} from "@tabler/icons-react";
import type { IconName } from "@/content/site";

const icons: Record<IconName, React.ComponentType<IconProps>> = {
  barbell: IconBarbell,
  movement: IconRoute,
  confidence: IconUserHeart,
  freedom: IconBolt,
  message: IconMessageCircle,
  target: IconTargetArrow,
  spark: IconSparkles,
};

export function BrandIcon({ name, size = 28 }: { name: IconName; size?: number }) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" size={size} stroke={1.35} />;
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return <IconBrandInstagram aria-hidden="true" size={size} stroke={1.6} />;
}

export function CrownIcon({ size = 18 }: { size?: number }) {
  return <IconCrown aria-hidden="true" size={size} stroke={1.5} />;
}
