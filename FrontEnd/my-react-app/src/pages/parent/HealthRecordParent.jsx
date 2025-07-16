import HeaderForm from "../../components/HeaderForm";
import FooterForm from "../../components/FooterForm";
import HealthRecordForm from "../../components/parent/HealthRecordForm";

export default function HealthRecordParent() {
  return (
    <>
      <HeaderForm />
      <HealthRecordForm />
      <FooterForm />
    </>
  );
}