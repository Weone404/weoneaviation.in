import { CoursePageTemplate } from '../components/CoursePageTemplate';

export default function PPL() {
  return (
    <CoursePageTemplate
      meta={{ title: 'Private Pilot License (PPL) Training in India | WeOne Aviation', description: 'Get your PPL from India\'s top DGCA-approved aviation academy. Learn to fly with expert instructors. Eligibility, fees, and duration details inside.' }}
      hero={{ image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1920&q=80', tag: 'Private Pilot License', title: 'Private Pilot License (PPL)', sub: 'Your first step to the sky – learn to fly for leisure or professional aspirations' }}
      overview="The Private Pilot License (PPL) is the foundation of your aviation career. It allows you to fly single-engine aircraft for non-commercial purposes and is the prerequisite for the CPL. Our DGCA-approved PPL program covers 40+ hours of flight training, comprehensive ground school, and navigation flights across India."
      facts={[['6-12 months', 'Duration'], ['40 hours', 'Min Flight Hours'], ['10+2 any', 'Eligibility'], ['₹6-10 Lakh', 'Course Fee']]}
      highlights={['DGCA approved training aircraft', 'Expert CFIs with 5000+ hours', 'Cross-country navigation flights', 'Night flying included', 'Solo flight milestone', 'Instrument fundamentals', 'Radio telephony (RTR) included', 'Medical guidance provided']}
      syllabus={['Air Regulations & Law', 'Aviation Meteorology', 'Air Navigation Basics', 'Aircraft Technical Knowledge', 'Human Performance & Limitations', 'Pre-solo training (dual)', 'Solo circuits & emergencies', 'Navigation & cross-country', 'Night flying', 'Skill test preparation']}
      career={{ text: 'PPL opens doors to CPL and airline career. Average CPL salary:', salary: '₹1.8-2.5 LPM', salaryLabel: 'First Officer at airlines' }}
    />
  );
}
