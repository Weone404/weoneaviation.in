import SalaryGuidePage from '../components/SalaryGuidePage';
import { salaryGuides } from '../data/salaryGuides';

export default function AirlinePilotSalaryInIndiaPage() {
  return <SalaryGuidePage guide={salaryGuides.indiaAirline} />;
}
