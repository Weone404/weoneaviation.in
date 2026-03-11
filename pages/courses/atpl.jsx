import { CoursePageTemplate } from '../../components/CoursePageTemplate';

export default function ATPL() {
    return (
        <CoursePageTemplate
            meta={{ title: 'ATPL Training in India | Airline Transport Pilot License | WeOne Aviation', description: 'ATPL training in India – the highest pilot certification. Become an airline captain with WeOne Aviation Academy. DGCA ATPL exam prep and guidance.' }}
            hero={{ image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80', tag: 'Highest Pilot Certification', title: 'Airline Transport Pilot License (ATPL)', sub: 'The Pinnacle of Aviation – Command large commercial aircraft as Captain' }}
            overview="The Airline Transport Pilot License (ATPL) is the highest level of pilot certification. It qualifies you to act as Pilot in Command (Captain) on commercial aircraft operations. Our ATPL prep program covers all 14 EASA/DGCA ATPL subjects and includes extensive simulator sessions on Boeing 737 and Airbus A320 type aircraft."
            facts={[['36+ months', 'Total Duration'], ['1500 hours', 'Min Flight Hours'], ['CPL holder', 'Eligibility'], ['₹15-25 Lakh', 'ATPL Prep Fee']]}
            highlights={['All 14 ATPL subjects covered', 'FFS (Full Flight Simulator) training', 'Boeing 737 & A320 type rating prep', '1500-hour flight experience pathway', 'ILS/CAT-III approach training', 'Multi-crew cooperation (MCC)', 'Jet orientation course (JOC)', 'Airline selection test prep (PABT)']}
            syllabus={['Advanced Air Navigation', 'Jet Meteorology', 'Aircraft Performance (Transport)', 'Mass & Balance', 'Flight Planning (Advanced)', 'Principles of Flight (Transport)', 'Air Law (International)', 'Human Factors & CRM', 'Communications (All systems)', 'Aircraft Systems & Instruments', 'MCC / TEM / LOFT', 'Type Rating Ground School']}
            career={{ text: 'ATPL is required to become an airline captain. Average captain salary:', salary: '₹5-8 LPM', salaryLabel: 'Senior Captain at major airlines' }}
        />
    );
}
