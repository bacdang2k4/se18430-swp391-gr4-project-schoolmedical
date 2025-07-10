import HeaderForm from "../../components/HeaderForm";
import FooterForm from "../../components/FooterForm";
import MedicalSendForm from "../../components/parent/MedicalSendForm";

export default function MedicalSend() {
  return (
    <>
      <HeaderForm />
      <MedicalSendForm />
      <FooterForm />
    </>
  );
}