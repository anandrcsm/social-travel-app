import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Trophy, 
  Globe, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Star,
  BookOpen,
  Award,
  RefreshCw
} from 'lucide-react';
import { culturalTriviaQuestions, culturalBadges, culturalFacts, TriviaQuestion } from '../data/culturalTrivia';
import { BrandLogo } from './BrandLogo';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CulturalTriviaPageProps {
  onBack: () => void;
}

interface TriviaState {
  currentQuestion: number;
  selectedAnswer: number | null;
  answers: (number | null)[];
  showExplanation: boolean;
  isComplete: false;
  score: number;
  timeSpent: number;
  earnedBadges: string[];
}

export function CulturalTriviaPage({ onBack }: CulturalTriviaPageProps) {
  const [triviaState, setTriviaState] = useState<TriviaState>({
    currentQuestion: 0,
    selectedAnswer: null,
    answers: new Array(culturalTriviaQuestions.length).fill(null),
    showExplanation: false,
    isComplete: false,
    score: 0,
    timeSpent: 0,
    earnedBadges: []
  });

  const [startTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);

  const currentQ = culturalTriviaQuestions[triviaState.currentQuestion];
  const isLastQuestion = triviaState.currentQuestion === culturalTriviaQuestions.length - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setTriviaState(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (triviaState.showExplanation) return;
    
    setTriviaState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      answers: prev.answers.map((ans, idx) => 
        idx === prev.currentQuestion ? answerIndex : ans
      )
    }));
  };

  const handleNextQuestion = () => {
    if (!triviaState.showExplanation) {
      setTriviaState(prev => ({ ...prev, showExplanation: true }));
      return;
    }

    if (isLastQuestion) {
      calculateResults();
      return;
    }

    setTriviaState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      selectedAnswer: null,
      showExplanation: false
    }));
  };

  const calculateResults = () => {
    const correctAnswers = triviaState.answers.filter((answer, index) => 
      answer === culturalTriviaQuestions[index].correctAnswer
    ).length;

    const regionsAnswered = new Set(
      culturalTriviaQuestions
        .filter((_, index) => triviaState.answers[index] !== null)
        .map(q => q.region)
    ).size;

    const earnedBadges: string[] = [];
    
    if (correctAnswers >= 1) earnedBadges.push('first_steps');
    if (correctAnswers >= 8) earnedBadges.push('culture_master');
    if (regionsAnswered >= 5) earnedBadges.push('world_explorer');
    if (triviaState.answers.every(a => a !== null)) earnedBadges.push('tradition_keeper');

    setTriviaState(prev => ({
      ...prev,
      score: correctAnswers,
      earnedBadges,
      isComplete: true
    }));
    
    setShowResults(true);
  };

  const resetTrivia = () => {
    setTriviaState({
      currentQuestion: 0,
      selectedAnswer: null,
      answers: new Array(culturalTriviaQuestions.length).fill(null),
      showExplanation: false,
      isComplete: false,
      score: 0,
      timeSpent: 0,
      earnedBadges: []
    });
    setShowResults(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    return (
      <div className="min-h-screen p-4 pb-20">
        {/* Header */}
        <div className="glass-effect rounded-2xl p-4 mb-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBack}
              className="flex items-center text-brand-primary hover:text-brand-primary-dark transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Back</span>
            </button>
            <BrandLogo size="sm" variant="icon" />
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Cultural Quest Complete!</h1>
            <p className="text-gray-600">You've explored cultures from around the world</p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Score Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/20">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-brand-primary mb-2">
                {triviaState.score}/{culturalTriviaQuestions.length}
              </div>
              <p className="text-gray-600">Questions Correct</p>
              <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{formatTime(triviaState.timeSpent)}</span>
                </div>
                <div className="flex items-center">
                  <Globe size={16} className="mr-1" />
                  <span>10 Cultures</span>
                </div>
              </div>
            </div>

            {/* Performance Badge */}
            <div className="text-center mb-4">
              {triviaState.score >= 8 && (
                <div className="inline-flex items-center bg-gradient-brand text-white px-4 py-2 rounded-full">
                  <Star size={16} className="mr-2" />
                  <span className="font-semibold">Excellent Cultural Knowledge!</span>
                </div>
              )}
              {triviaState.score >= 6 && triviaState.score < 8 && (
                <div className="inline-flex items-center bg-gradient-brand-secondary text-white px-4 py-2 rounded-full">
                  <Award size={16} className="mr-2" />
                  <span className="font-semibold">Great Cultural Explorer!</span>
                </div>
              )}
              {triviaState.score < 6 && (
                <div className="inline-flex items-center bg-gray-500 text-white px-4 py-2 rounded-full">
                  <BookOpen size={16} className="mr-2" />
                  <span className="font-semibold">Keep Learning!</span>
                </div>
              )}
            </div>
          </div>

          {/* Earned Badges */}
          {triviaState.earnedBadges.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/20">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Trophy size={20} className="mr-2 text-brand-accent" />
                Badges Earned
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {triviaState.earnedBadges.map(badgeId => {
                  const badge = culturalBadges.find(b => b.id === badgeId);
                  if (!badge) return null;
                  return (
                    <div 
                      key={badgeId} 
                      className="flex items-center p-3 rounded-xl border-2 border-gray-100 bg-gray-50"
                      style={{ borderColor: badge.color + '40' }}
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3"
                        style={{ backgroundColor: badge.color + '20' }}
                      >
                        {badge.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{badge.name}</div>
                        <div className="text-xs text-gray-600">{badge.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cultural Fact */}
          <div className="bg-gradient-to-r from-surface-warm to-surface-cool rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center">
              <Globe size={20} className="mr-2 text-brand-secondary" />
              Cultural Insight
            </h3>
            <div className="bg-white rounded-xl p-4">
              <p className="text-gray-700 italic text-center">
                "{culturalFacts[Math.floor(Math.random() * culturalFacts.length)].fact}"
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={resetTrivia}
              className="flex-1 bg-gradient-brand text-white py-4 rounded-2xl font-semibold hover:shadow-brand hover:scale-[1.02] transition-all duration-200 active:scale-95 flex items-center justify-center"
            >
              <RefreshCw size={20} className="mr-2" />
              Try Again
            </button>
            <button
              onClick={onBack}
              className="flex-1 bg-white text-brand-primary py-4 rounded-2xl font-semibold border border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200 flex items-center justify-center"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-4 mb-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-primary hover:text-brand-primary-dark transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock size={16} className="mr-1" />
            <span>{formatTime(triviaState.timeSpent)}</span>
          </div>
        </div>
        
        <div className="text-center">
          <BrandLogo size="sm" className="mb-3" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cultural Quest</h1>
          <p className="text-gray-600">Discover fascinating cultures from around the world</p>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {triviaState.currentQuestion + 1} of {culturalTriviaQuestions.length}
            </span>
            <span className="text-sm text-gray-500">
              {currentQ.culture} • {currentQ.region}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-brand h-2 rounded-full transition-all duration-300"
              style={{ width: `${((triviaState.currentQuestion + 1) / culturalTriviaQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-white/20 overflow-hidden mb-6">
        {/* Question Image */}
        {currentQ.imageUrl && (
          <div className="relative w-full h-48">
            <ImageWithFallback 
              src={currentQ.imageUrl} 
              alt={`${currentQ.culture} culture`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-sm font-medium">{currentQ.culture} Culture</span>
              </div>
            </div>
          </div>
        )}

        {/* Question Content */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              currentQ.difficulty === 'easy' ? 'bg-green-400' :
              currentQ.difficulty === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
            }`}></div>
            <span className="text-sm font-medium capitalize text-gray-600">
              {currentQ.difficulty}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";
              
              if (triviaState.showExplanation) {
                if (index === currentQ.correctAnswer) {
                  buttonClass += "bg-green-50 border-green-400 text-green-800";
                } else if (index === triviaState.selectedAnswer && index !== currentQ.correctAnswer) {
                  buttonClass += "bg-red-50 border-red-400 text-red-800";
                } else {
                  buttonClass += "bg-gray-50 border-gray-200 text-gray-600";
                }
              } else {
                if (triviaState.selectedAnswer === index) {
                  buttonClass += "bg-brand-primary/10 border-brand-primary text-brand-primary";
                } else {
                  buttonClass += "border-gray-200 hover:border-brand-primary/50 hover:bg-brand-primary/5 text-gray-700";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={triviaState.showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                      triviaState.showExplanation && index === currentQ.correctAnswer ? 'bg-green-400 border-green-400' :
                      triviaState.showExplanation && index === triviaState.selectedAnswer && index !== currentQ.correctAnswer ? 'bg-red-400 border-red-400' :
                      triviaState.selectedAnswer === index && !triviaState.showExplanation ? 'bg-brand-primary border-brand-primary' :
                      'border-gray-300'
                    }`}>
                      {triviaState.showExplanation && index === currentQ.correctAnswer && (
                        <CheckCircle size={14} className="text-white" />
                      )}
                      {triviaState.showExplanation && index === triviaState.selectedAnswer && index !== currentQ.correctAnswer && (
                        <XCircle size={14} className="text-white" />
                      )}
                      {triviaState.selectedAnswer === index && !triviaState.showExplanation && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {triviaState.showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start">
                <BookOpen size={20} className="text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Cultural Insight</h4>
                  <p className="text-blue-800 leading-relaxed">{currentQ.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNextQuestion}
            disabled={triviaState.selectedAnswer === null}
            className="w-full mt-6 bg-gradient-brand text-white py-4 rounded-2xl font-semibold hover:shadow-brand hover:scale-[1.02] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {!triviaState.showExplanation ? 'Submit Answer' : 
             isLastQuestion ? 'See Results' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}