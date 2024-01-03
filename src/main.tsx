import { createRoot } from "react-dom/client";
import Wizard from "./Wizard";
import "./styles.css";

const skillStep = {
  title: "General Details",
  fields: [
    {
      key: "username",
      label: "Tell us your username",
      type: "text",
      placeholder: "Enter your username",
    },
    {
      key: "name",
      label: "What's your full name?",
      type: "text",
      placeholder: "e.g. John Smith",
    },
    {
      key: "email",
      label: "Your email address",
      type: "text",
      placeholder: "john@example.com",
    },
  ],
};

const personalInfoStep = {
  title: "Company Details",
  fields: [
    { key: "company", label: "What's your company name?", type: "text", placeholder: "e.g. Miter" },

    {
      key: "cnj",
      label: "CNJ",
      type: "text",
      placeholder: "e.g. 123456789",
    },
    { key: "accountNumber", label: "Account Number", type: "text", placeholder: "e.g. 123456789" },
    { key: "ispb", label: "ISPB", type: "text", placeholder: "e.g. 123456789" },
    { key: "issuer", label: "Issuer", type: "text", placeholder: "e.g. John Smith" },
    { key: "accountType", label: "Account Type", type: "text", options: ["Checking", "Savings"] },
  ],
};

const component = (
  <Wizard title="Looking For Open Positions?" steps={[skillStep, personalInfoStep]} submitLabel="Apply Now" />
);

const domNode = document.getElementById("root");
if (!domNode) throw new Error("Couldnt find root element");

const root = createRoot(domNode);
root.render(component);
