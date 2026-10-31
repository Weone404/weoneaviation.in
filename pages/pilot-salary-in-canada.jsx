import SalaryGuidePage from '../components/SalaryGuidePage';
import { salaryGuides } from '../data/salaryGuides';

export default function PilotSalaryInCanadaPage() {
  return <SalaryGuidePage guide={salaryGuides.canada} />;
}
