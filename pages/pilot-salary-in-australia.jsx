import SalaryGuidePage from '../components/SalaryGuidePage';
import { salaryGuides } from '../data/salaryGuides';

export default function PilotSalaryInAustraliaPage() {
  return <SalaryGuidePage guide={salaryGuides.australia} />;
}
