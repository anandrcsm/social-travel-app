export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  culture: string;
  region: string;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
}

export interface CulturalBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
}

export const culturalTriviaQuestions: TriviaQuestion[] = [
  {
    id: 'q1',
    question: 'In Japan, what is the traditional art of paper folding called?',
    options: ['Ikebana', 'Origami', 'Calligraphy', 'Bonsai'],
    correctAnswer: 1,
    explanation: 'Origami is the Japanese art of paper folding, which has been practiced since the 6th century. It represents patience, precision, and creativity in Japanese culture.',
    culture: 'Japanese',
    region: 'East Asia',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    id: 'q2',
    question: 'Which festival is known as the "Festival of Colors" in India?',
    options: ['Diwali', 'Holi', 'Navratri', 'Karva Chauth'],
    correctAnswer: 1,
    explanation: 'Holi is the vibrant Hindu festival celebrating the arrival of spring, love, and new beginnings. People throw colored powders and water at each other in joyful celebration.',
    culture: 'Indian',
    region: 'South Asia',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1583307005534-180d1b309d56?w=400&h=300&fit=crop'
  },
  {
    id: 'q3',
    question: 'In Māori culture of New Zealand, what is a "hongi"?',
    options: ['A traditional dance', 'A type of food', 'A traditional greeting', 'A ceremonial garment'],
    correctAnswer: 2,
    explanation: 'A hongi is a traditional Māori greeting where two people press their noses and foreheads together, sharing the breath of life (hā). It represents the unity of life force.',
    culture: 'Māori',
    region: 'Oceania',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
  },
  {
    id: 'q4',
    question: 'What is the traditional Mexican celebration honoring deceased family members?',
    options: ['Cinco de Mayo', 'Day of the Dead', 'Posadas', 'Quinceañera'],
    correctAnswer: 1,
    explanation: 'Día de los Muertos (Day of the Dead) is a Mexican tradition where families honor deceased loved ones with altars, marigolds, and their favorite foods, celebrating life rather than mourning death.',
    culture: 'Mexican',
    region: 'North America',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop'
  },
  {
    id: 'q5',
    question: 'In Ethiopian culture, what is the traditional coffee ceremony called?',
    options: ['Buna', 'Injera', 'Berbere', 'Teff'],
    correctAnswer: 0,
    explanation: 'The Ethiopian coffee ceremony, called "buna," is a cultural ritual involving roasting, grinding, and brewing coffee beans. It symbolizes community, respect, and spiritual connection.',
    culture: 'Ethiopian',
    region: 'East Africa',
    difficulty: 'hard',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop'
  },
  {
    id: 'q6',
    question: 'Which traditional Scandinavian concept emphasizes coziness and comfortable living?',
    options: ['Lagom', 'Hygge', 'Fika', 'Janteloven'],
    correctAnswer: 1,
    explanation: 'Hygge (pronounced "hoo-guh") is a Danish concept representing coziness, comfort, and contentment. It emphasizes enjoying simple pleasures and creating warm atmospheres.',
    culture: 'Danish',
    region: 'Northern Europe',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop'
  },
  {
    id: 'q7',
    question: 'What is the traditional Moroccan steam bath called?',
    options: ['Hammam', 'Tagine', 'Couscous', 'Argan'],
    correctAnswer: 0,
    explanation: 'A hammam is a traditional Moroccan steam bath and social gathering place. It\'s an important part of Moroccan culture, promoting cleanliness, relaxation, and community bonding.',
    culture: 'Moroccan',
    region: 'North Africa',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d5d9d7?w=400&h=300&fit=crop'
  },
  {
    id: 'q8',
    question: 'In Brazilian culture, what is "saudade"?',
    options: ['A type of dance', 'A feeling of longing', 'A musical instrument', 'A traditional food'],
    correctAnswer: 1,
    explanation: 'Saudade is a uniquely Brazilian emotional state of deep longing, nostalgia, and bittersweet melancholy for something absent. It\'s considered untranslatable to other languages.',
    culture: 'Brazilian',
    region: 'South America',
    difficulty: 'hard',
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop'
  },
  {
    id: 'q9',
    question: 'Which Korean concept emphasizes respect for elderly family members?',
    options: ['Hanbok', 'Filial Piety', 'K-pop', 'Kimchi'],
    correctAnswer: 1,
    explanation: 'Filial piety (효, hyo) is a fundamental Korean Confucian value emphasizing respect, care, and devotion to one\'s parents and elderly family members throughout their lives.',
    culture: 'Korean',
    region: 'East Asia',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop'
  },
  {
    id: 'q10',
    question: 'What is the traditional Russian wooden doll that contains smaller dolls inside?',
    options: ['Baba Yaga', 'Matryoshka', 'Balalaika', 'Troika'],
    correctAnswer: 1,
    explanation: 'Matryoshka dolls, also known as Russian nesting dolls, represent motherhood, family, and fertility in Russian culture. Each doll contains progressively smaller dolls inside.',
    culture: 'Russian',
    region: 'Eastern Europe',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop'
  }
];

export const culturalBadges: CulturalBadge[] = [
  {
    id: 'world_explorer',
    name: 'World Explorer',
    description: 'Answered questions from 5 different regions',
    icon: '🌍',
    color: '#FF6B4A',
    requirement: '5_regions'
  },
  {
    id: 'culture_master',
    name: 'Culture Master',
    description: 'Got 8 or more questions correct',
    icon: '🏆',
    color: '#FFB347',
    requirement: '8_correct'
  },
  {
    id: 'tradition_keeper',
    name: 'Tradition Keeper',
    description: 'Completed all trivia questions',
    icon: '📚',
    color: '#20B2AA',
    requirement: 'complete_all'
  },
  {
    id: 'first_steps',
    name: 'Cultural Curious',
    description: 'Completed your first trivia',
    icon: '🌱',
    color: '#34D399',
    requirement: 'first_complete'
  }
];

export const culturalFacts = [
  {
    culture: 'Japanese',
    fact: 'Japan has over 6,800 islands, but only about 430 are inhabited.',
    region: 'East Asia'
  },
  {
    culture: 'Indian',
    fact: 'India is home to over 1,600 spoken languages, making it one of the most linguistically diverse countries.',
    region: 'South Asia'
  },
  {
    culture: 'Mexican',
    fact: 'Mexico introduced chocolate, corn, and tomatoes to the world.',
    region: 'North America'
  },
  {
    culture: 'Ethiopian',
    fact: 'Ethiopia follows a unique calendar with 13 months and is about 7-8 years behind the Gregorian calendar.',
    region: 'East Africa'
  },
  {
    culture: 'Māori',
    fact: 'The Māori language has only 13 letters in its alphabet.',
    region: 'Oceania'
  }
];