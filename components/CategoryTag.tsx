import { Tag, Hotel, Utensils, Mountain, Sparkles } from 'lucide-react';

interface CategoryTagProps {
  category: 'Accommodation' | 'Food' | 'Activities' | 'Events';
}

export function CategoryTag({ category }: CategoryTagProps) {
  let bgColor = 'bg-blue-100';
  let textColor = 'text-blue-800';
  let icon = <Tag size={14} />;

  switch (category) {
    case 'Accommodation':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
      icon = <Hotel size={14} />;
      break;
    case 'Food':
      bgColor = 'bg-orange-100';
      textColor = 'text-orange-800';
      icon = <Utensils size={14} />;
      break;
    case 'Activities':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      icon = <Mountain size={14} />;
      break;
    case 'Events':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      icon = <Sparkles size={14} />;
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${bgColor} ${textColor}`}>
      {icon} {category}
    </span>
  );
}