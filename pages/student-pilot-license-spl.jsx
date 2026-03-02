import { CoursePageTemplate } from '../components/CoursePageTemplate';

export default function SPL() {
  return (
    <CoursePageTemplate
      meta={{ title: 'Sport Pilot License (SPL) Training in India | WeOne Aviation', description: 'Get your Sport Pilot License (SPL) in India. Affordable, fast-track pilot certification for recreational flying. DGCA approved program.' }}
      hero={{ image: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=1920&q=80', tag: 'Sport Aviation', title: 'Sport Pilot License (SPL)', sub: 'Experience the joy of flying – affordable, fast-track recreational pilot license' }}
      overview="The Sport Pilot License (SPL) is designed for those who want to fly light sport aircraft for recreational purposes. It's the most affordable and fastest way to get a pilot certificate in India. Perfect for aviation enthusiasts, aerial photographers, and those looking to explore flying before committing to a full CPL program."
      facts={[['3-6 months', 'Duration'], ['20 hours', 'Min Flight Hours'], ['16+ years', 'Eligibility'], ['₹2-4 Lakh', 'Course Fee']]}
      highlights={['Fastest pilot certification available', 'Fly Light Sport Aircraft (LSA)', 'Most affordable training option', 'No complex DGCA medicals', 'Great stepping stone to PPL/CPL', 'Day VFR operations', 'Dual + Solo flight training', 'Endorsed by DGCA']}
      syllabus={['SPL Air Regulations', 'Basic Navigation & Weather', 'Aircraft Familiarization', 'Normal & Emergency procedures', 'Pre-solo dual training', 'Solo circuits & landings', 'Short cross-country flights', 'Skill test preparation']}
      career={{ text: 'SPL can be converted to PPL and eventually CPL:', salary: '₹40-70 Lakh', salaryLabel: 'CPL career opportunity ahead' }}
    />
  );
}
