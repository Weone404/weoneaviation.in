import SalaryGuidePage from '../components/SalaryGuidePage';
import { salaryGuides } from '../data/salaryGuides';

export default function PilotSalaryInUsaPage() {
  return <SalaryGuidePage guide={salaryGuides.usa} />;
}
