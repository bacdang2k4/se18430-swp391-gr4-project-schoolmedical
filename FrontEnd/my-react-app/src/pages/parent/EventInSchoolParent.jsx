import HeaderForm from "../../components/HeaderForm";
import FooterForm from "../../components/FooterForm";
import EventInSchoolForm from "../../components/parent/EventInSchoolForm";

export default function EventInSchoolParent() {
  return (
    <>
      <HeaderForm />
      <EventInSchoolForm />
      <FooterForm />
    </>
  );
}