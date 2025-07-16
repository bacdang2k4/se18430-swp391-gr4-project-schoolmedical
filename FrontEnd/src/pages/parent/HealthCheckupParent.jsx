import HeaderForm from "../../components/HeaderForm";
import FooterForm from "../../components/FooterForm";
import HealthCheckupForm from "../../components/parent/HealthCheckupForm";

export default function HealthCheckupParent() {
  return (
    <>
      <HeaderForm />
      <HealthCheckupForm />
      <FooterForm />
    </>
  );
}