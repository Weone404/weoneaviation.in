import SalaryGuidePage from '../components/SalaryGuidePage';
import { salaryGuides } from '../data/salaryGuides';

export default function FlightInstructorSalaryInIndiaPage() {
  return <SalaryGuidePage guide={salaryGuides.indiaInstructor} />;
}
