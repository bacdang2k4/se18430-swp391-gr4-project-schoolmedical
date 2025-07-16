import HeaderForm from "../../components/HeaderForm";
import FooterForm from "../../components/FooterForm";
import VaccinationForm from "../../components/parent/VaccinationForm";

export default function VaccinationParent() {
  return (
    <>
      <HeaderForm />
      <VaccinationForm />
      <FooterForm />
    </>
  );
}