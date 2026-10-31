import SalaryGuidePage from '../components/SalaryGuidePage';
import { salaryGuides } from '../data/salaryGuides';

export default function PilotSalaryInUaePage() {
  return <SalaryGuidePage guide={salaryGuides.uae} />;
}
