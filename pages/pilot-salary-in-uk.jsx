import SalaryGuidePage from '../components/SalaryGuidePage';
import { salaryGuides } from '../data/salaryGuides';

export default function PilotSalaryInUkPage() {
  return <SalaryGuidePage guide={salaryGuides.uk} />;
}
